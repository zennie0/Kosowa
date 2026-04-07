import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import { dummyMyStory } from '../../data/dummyStories'
import styles from './MyStory.module.css'

const getInitial = (name) => name.charAt(0).toUpperCase()

const getAvatarColor = (name) => {
  const colors = ['#c8922a', '#5a7a9a', '#7a5a9a', '#5a9a7a', '#9a5a5a', '#7a7a5a']
  const index = name.charCodeAt(0) % colors.length
  return colors[index]
}

const MyStory = () => {
  const navigate = useNavigate()
  const [story, setStory] = useState(dummyMyStory)
  const [completed, setCompleted] = useState(false)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [showConfirmComplete, setShowConfirmComplete] = useState(false)

  const handleDeletePara = (paraId) => {
    setStory(prev => ({
      ...prev,
      paragraphs: prev.paragraphs.filter(p => p.id !== paraId),
    }))
  }

  const handleComplete = () => {
    setCompleted(true)
    setShowConfirmComplete(false)
  }

  const handleDeleteStory = () => {
    navigate('/')
  }

  return (
    <div className={styles.page}>
      <Navbar />

      <div className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.genreTag}>{story.genre}</div>
          {completed && <span className={styles.completedBadge}>Completed</span>}
        </div>
        <h1 className={styles.title}>{story.title}</h1>
        <div className={styles.meta}>
          Started {story.createdAt} · {story.paragraphs.length} paragraphs · {story.contributors.length} contributors
        </div>
        <p className={styles.desc}>{story.description}</p>

        <div className={styles.actions}>
          {!completed && (
            <button
              className={styles.btnComplete}
              onClick={() => setShowConfirmComplete(true)}
            >
              Mark as completed
            </button>
          )}
          <button
            className={styles.btnDanger}
            onClick={() => setShowConfirmDelete(true)}
          >
            Delete story
          </button>
        </div>
      </div>

      {/* CONFIRM COMPLETE MODAL */}
      {showConfirmComplete && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalTitle}>Mark as completed?</div>
            <p className={styles.modalDesc}>Once completed, no one will be able to add new paragraphs to this story.</p>
            <div className={styles.modalActions}>
              <button className={styles.btnComplete} onClick={handleComplete}>Yes, complete it</button>
              <button className={styles.btnCancel} onClick={() => setShowConfirmComplete(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {showConfirmDelete && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalTitle}>Delete this story?</div>
            <p className={styles.modalDesc}>This will permanently delete the story and all its paragraphs. This cannot be undone.</p>
            <div className={styles.modalActions}>
              <button className={styles.btnDanger} onClick={handleDeleteStory}>Yes, delete it</button>
              <button className={styles.btnCancel} onClick={() => setShowConfirmDelete(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.body}>

        {/* PARAGRAPHS */}
        <div className={styles.paraSection}>
          <div className={styles.sectionLabel}>All paragraphs</div>
          <div className={styles.paraList}>
            {story.paragraphs.map(para => (
              <div key={para.id} className={styles.paraItem}>
                <div className={styles.paraHead}>
                  <div
                    className={styles.paraAvatar}
                    style={{ background: getAvatarColor(para.author) }}
                  >
                    {getInitial(para.author)}
                  </div>
                  <div>
                    <div className={styles.paraName}>
                      @{para.author}
                      {para.isOwner && <span className={styles.ownerTag}>You · Owner</span>}
                    </div>
                    <div className={styles.paraTime}>{para.createdAt}</div>
                  </div>
                  {!para.isOwner && (
                    <button
                      className={styles.btnDelete}
                      onClick={() => handleDeletePara(para.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
                <p className={styles.paraText}>{para.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CONTRIBUTORS */}
        <div className={styles.writersPanel}>
          <div className={styles.writersTitle}>Contributors</div>
          <div className={styles.writersList}>
            {story.contributors.map(c => (
              <div key={c.author} className={styles.writerRow}>
                <div
                  className={styles.writerAvatar}
                  style={{ background: getAvatarColor(c.author) }}
                >
                  {getInitial(c.author)}
                </div>
                <span className={styles.writerName}>@{c.author}</span>
                <span className={styles.writerCount}>{c.count} para</span>
                {c.isNew && <span className={styles.writerNew}>New</span>}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default MyStory