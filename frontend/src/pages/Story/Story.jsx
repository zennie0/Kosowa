import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import CommentSection from '../../components/CommentSection/CommentSection'
import { storyAPI, paragraphAPI } from '../../services/api'
import { useAuth } from '../../context/authContext'
import styles from './Story.module.css'

const getInitial = (name) => name.charAt(0).toUpperCase()

const getAvatarColor = (name) => {
  const colors = ['#c8922a', '#5a7a9a', '#7a5a9a', '#5a9a7a', '#9a5a5a', '#7a7a5a']
  const index = name.charCodeAt(0) % colors.length
  return colors[index]
}

const Story = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [story, setStory] = useState(null)
  const [paragraphs, setParagraphs] = useState([])
  const [contribText, setContribText] = useState('')
  const [quota, setQuota] = useState({ used: 0, limit: 5, remaining: 5 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [contribError, setContribError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const wordCount = contribText.trim() === '' ? 0 : contribText.trim().split(/\s+/).length

  useEffect(() => {
    fetchStory()
  }, [id])

  useEffect(() => {
    if (user && story) fetchQuota()
  }, [user, story])

  const fetchStory = async () => {
    setLoading(true)
    try {
      const data = await storyAPI.getById(id)
      setStory(data.story)
      setParagraphs(data.paragraphs)
    } catch (err) {
      setError('Story not found')
    } finally {
      setLoading(false)
    }
  }

  const fetchQuota = async () => {
    try {
      const data = await paragraphAPI.getQuota(id)
      setQuota(data)
    } catch (err) {
      console.error('Quota fetch failed', err)
    }
  }

  const handleContribute = async () => {
    if (!user) return navigate('/signin')
    if (contribText.trim() === '') return
    if (wordCount > 200) return

    setSubmitting(true)
    setContribError('')
    try {
      const newPara = await paragraphAPI.add(id, contribText.trim())
      setParagraphs(prev => [...prev, newPara])
      setContribText('')
      fetchQuota()
    } catch (err) {
      setContribError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.loadingMsg}>Loading story...</div>
    </div>
  )

  if (error) return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.loadingMsg}>{error}</div>
    </div>
  )

  const isOwner = user && story.owner._id === user.id

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.layout}>

        {/* LEFT — CONTRIBUTE */}
        <div className={styles.left}>
          <div className={styles.leftTitle}>Contribute</div>

          {story.status === 'completed' ? (
            <div className={styles.completedNote}>
              This story has been completed by the owner and is no longer accepting contributions.
            </div>
          ) : (
            <>
              <div className={styles.contribBox}>
                <textarea
                  className={styles.contribTextarea}
                  placeholder={user ? 'Continue the story... (max 200 words)' : 'Sign in to contribute...'}
                  value={contribText}
                  onChange={e => setContribText(e.target.value)}
                  disabled={!user || submitting}
                />
                <div className={styles.contribFooter}>
                  <span className={`${styles.wordCount} ${wordCount > 200 ? styles.wordOver : ''}`}>
                    {wordCount} / 200 words
                  </span>
                  <button
                    className={styles.btnContribute}
                    onClick={handleContribute}
                    disabled={wordCount > 200 || contribText.trim() === '' || submitting}
                  >
                    {submitting ? 'Adding...' : 'Add paragraph'}
                  </button>
                </div>
              </div>

              {contribError && <div className={styles.contribError}>{contribError}</div>}

              {user && !isOwner && (
                <div className={styles.quotaNote}>
                  You have used {quota.used} of {quota.limit} paragraphs today for this story.
                </div>
              )}

              {!user && (
                <div className={styles.quotaNote}>
                  <span
                    className={styles.signinLink}
                    onClick={() => navigate('/signin')}
                  >
                    Sign in
                  </span>{' '}
                  to contribute to this story.
                </div>
              )}
            </>
          )}

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
                onClick={() => navigate(`/profile/${story.owner.username}`)}
              >
                @{story.owner.username}
              </span>
              {' '}· {paragraphs.length} paragraphs · {story.contributorCount} contributors
              {story.status === 'completed' && (
                <span className={styles.completedTag}>Completed</span>
              )}
            </div>
          </div>

          <div className={styles.paragraphs}>
            {paragraphs.map((para, index) => (
              <div
                key={para._id}
                className={`${styles.paraBlock} ${index === paragraphs.length - 1 && para.createdAt === 'just now' ? styles.paraNew : ''}`}
              >
                <div className={styles.paraAuthor}>
                  <div
                    className={styles.paraAvatar}
                    style={{ background: getAvatarColor(para.author.username) }}
                  >
                    {getInitial(para.author.username)}
                  </div>
                  <div>
                    <div className={styles.paraName}>
                      @{para.author.username}
                      {para.isOwnerParagraph && <span className={styles.ownerTag}>Owner</span>}
                    </div>
                    <div className={styles.paraTime}>
                      {new Date(para.createdAt).toLocaleDateString()}
                    </div>
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
            storyId={id}
            currentUser={user?.username}
            isOwner={isOwner}
          />
        </div>

      </div>
    </div>
  )
}

export default Story