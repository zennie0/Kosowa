import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import CommentSection from '../../components/CommentSection/CommentSection'
import { dummyStoryDetail } from '../../data/dummyStories'
import styles from './Story.module.css'

const getInitial = (name) => name.charAt(0).toUpperCase()

const getAvatarColor = (name) => {
  const colors = ['#c8922a', '#5a7a9a', '#7a5a9a', '#5a9a7a', '#9a5a5a', '#7a7a5a']
  const index = name.charCodeAt(0) % colors.length
  return colors[index]
}

const Story = () => {
  const navigate = useNavigate()
  const [story, setStory] = useState(dummyStoryDetail)
  const [contribText, setContribText] = useState('')

  const wordCount = contribText.trim() === '' ? 0 : contribText.trim().split(/\s+/).length

  const handleContribute = () => {
    if (contribText.trim() === '') return
    if (wordCount > 200) return

    const newPara = {
      id: `p${Date.now()}`,
      author: 'zainab',
      isOwner: false,
      text: contribText.trim(),
      createdAt: 'just now',
    }

    setStory(prev => ({
      ...prev,
      paragraphs: [...prev.paragraphs, newPara],
    }))

    setContribText('')
  }

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.layout}>

        {/* LEFT — CONTRIBUTE */}
        <div className={styles.left}>
          <div className={styles.leftTitle}>Contribute</div>

          <div className={styles.contribBox}>
            <textarea
              className={styles.contribTextarea}
              placeholder="Continue the story... (max 200 words)"
              value={contribText}
              onChange={e => setContribText(e.target.value)}
            />
            <div className={styles.contribFooter}>
              <span className={`${styles.wordCount} ${wordCount > 200 ? styles.wordOver : ''}`}>
                {wordCount} / 200 words
              </span>
              <button
                className={styles.btnContribute}
                onClick={handleContribute}
                disabled={wordCount > 200 || contribText.trim() === ''}
              >
                Add paragraph
              </button>
            </div>
          </div>

          <div className={styles.quotaNote}>
            You have used 3 of 5 paragraphs today for this story.
          </div>

          <div className={styles.infoBox}>
            <div className={styles.infoLabel}>Genre</div>
            <div className={styles.infoVal}>{story.genre}</div>
          </div>

          <div className={styles.infoBox}>
            <div className={styles.infoLabel}>Owner's vision</div>
            <div className={styles.infoDesc}>{story.description}</div>
          </div>

          <div className={styles.rules}>
            <div className={styles.rulesTitle}>Rules</div>
            200 words max per paragraph. Stay true to the owner's vision above.
          </div>
        </div>

        {/* MIDDLE — STORY */}
        <div className={styles.middle}>
          <div className={styles.storyHeader}>
            <div className={styles.storyGenre}>{story.genre}</div>
            <h1 className={styles.storyTitle}>{story.title}</h1>
            <div className={styles.storyMeta}>
              Started by{' '}
              <span
                className={styles.authorLink}
                onClick={() => navigate(`/profile/${story.author}`)}
              >
                @{story.author}
              </span>
              {' '}· {story.paragraphs.length} paragraphs · {story.contributors} contributors
            </div>
          </div>

          <div className={styles.paragraphs}>
            {story.paragraphs.map((para, index) => (
              <div
                key={para.id}
                className={`${styles.paraBlock} ${index === story.paragraphs.length - 1 && para.createdAt === 'just now' ? styles.paraNew : ''}`}
              >
                <div className={styles.paraAuthor}>
                  <div
                    className={styles.paraAvatar}
                    style={{ background: getAvatarColor(para.author) }}
                  >
                    {getInitial(para.author)}
                  </div>
                  <div>
                    <div className={styles.paraName}>
                      @{para.author}
                      {para.isOwner && <span className={styles.ownerTag}>Owner</span>}
                    </div>
                    <div className={styles.paraTime}>{para.createdAt}</div>
                  </div>
                </div>
                <p className={styles.paraText}>{para.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — COMMENTS */}
        <div className={styles.right}>
          <CommentSection
            comments={story.comments}
            currentUser="zainab"
            isOwner={story.author === 'zainab'}
          />
        </div>

      </div>
    </div>
  )
}

export default Story
//des