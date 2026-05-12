import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import { storyAPI, paragraphAPI } from '../../services/api'
import { useAuth } from '../../context/authContext.jsx'
import styles from './MyStory.module.css'

const getInitial = (name) => name.charAt(0).toUpperCase()

const getAvatarColor = (name) => {
  const colors = ['#c8922a', '#5a7a9a', '#7a5a9a', '#5a9a7a', '#9a5a5a', '#7a7a5a']
  const index = name.charCodeAt(0) % colors.length
  return colors[index]
}

const MyStory = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [story, setStory] = useState(null)
  const [paragraphs, setParagraphs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [showConfirmComplete, setShowConfirmComplete] = useState(false)

  useEffect(() => {
    if (!user) return navigate('/signin')
    fetchStory()
  }, [id, user])

  const fetchStory = async () => {
    setLoading(true)
    try {
      const data = await storyAPI.getById(id)
      if (data.story.owner._id !== user.id) {
        return navigate('/')
      }
      setStory(data.story)
      setParagraphs(data.paragraphs)
    } catch (err) {
      setError('Story not found')
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePara = async (paraId) => {
    try {
      await paragraphAPI.delete(paraId)
      setParagraphs(prev => prev.filter(p => p._id !== paraId))
    } catch (err) {
      console.error('Failed to delete paragraph', err)
    }
  }

  const handleComplete = async () => {
    try {
      const updated = await storyAPI.complete(id)
      setStory(updated)
      setShowConfirmComplete(false)
    } catch (err) {
      console.error('Failed to complete story', err)
    }
  }

  const handleDeleteStory = async () => {
    try {
      await storyAPI.delete(id)
      navigate('/dashboard')
    } catch (err) {
      console.error('Failed to delete story', err)
    }
  }

  const contributors = [...new Map(
    paragraphs
      .filter(p => !p.isOwnerParagraph)
      .map(p => [p.author._id, p.author])
  ).values()]

  if (loading) return (
    <div style={{ background: 'var(--parch)', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ textAlign: 'center', padding: '60px', color: 'var(--ink-soft)' }}>Loading...</div>
    </div>
  )

  if (error) return (
    <div style={{ background: 'var(--parch)', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ textAlign: 'center', padding: '60px', color: 'var(--ink-soft)' }}>{error}</div>
    </div>
  )

  return (
    <div className={styles.page}>
      <Navbar />

      <div className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.genreTag}>{story.genre}</div>
          {story.status === 'completed' && (
            <span className={styles.completedBadge}>Completed</span>
          )}
        </div>
        <h1 className={styles.title}>{story.title}</h1>
        <div className={styles.meta}>
          Started {new Date(story.createdAt).toLocaleDateString()} · {paragraphs.length} paragraphs · {contributors.length} contributors
        </div>
        <p className={styles.desc}>{story.description}</p>

        <div className={styles.actions}>
          {story.status !== 'completed' && (
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
        <div className={styles.paraSection}>
          <div className={styles.sectionLabel}>All paragraphs</div>
          <div className={styles.paraList}>
            {paragraphs.map(para => (
              <div key={para._id} className={styles.paraItem}>
                <div className={styles.paraHead}>
                  <div
                    className={styles.paraAvatar}
                    style={{ background: getAvatarColor(para.author.username) }}
                  >
                    {getInitial(para.author.username)}
                  </div>
                  <div>
                    <div className={styles.paraName}>
                      @{para.author.username}
                      {para.isOwnerParagraph && (
                        <span className={styles.ownerTag}>You · Owner</span>
                      )}
                    </div>
                    <div className={styles.paraTime}>
                      {new Date(para.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  {!para.isOwnerParagraph && (
                    <button
                      className={styles.btnDelete}
                      onClick={() => handleDeletePara(para._id)}
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

        <div className={styles.writersPanel}>
          <div className={styles.writersTitle}>Contributors</div>
          <div className={styles.writersList}>
            {contributors.length === 0 && (
              <div style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>
                No contributors yet.
              </div>
            )}
            {contributors.map(c => (
              <div key={c._id} className={styles.writerRow}>
                <div
                  className={styles.writerAvatar}
                  style={{ background: getAvatarColor(c.username) }}
                >
                  {getInitial(c.username)}
                </div>
                <span className={styles.writerName}>@{c.username}</span>
                <span className={styles.writerCount}>
                  {paragraphs.filter(p => p.author._id === c._id).length} para
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyStory