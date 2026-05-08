import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import StoryCard from '../../components/StoryCard/StoryCard'
import { storyAPI, notificationAPI } from '../../services/api'
import { useAuth } from '../../context/authContext'
import styles from './Dashboard.module.css'

const getInitial = (name) => name.charAt(0).toUpperCase()

const getAvatarColor = (name) => {
  const colors = ['#c8922a', '#5a7a9a', '#7a5a9a', '#5a9a7a', '#9a5a5a', '#7a7a5a']
  const index = name.charCodeAt(0) % colors.length
  return colors[index]
}

const Dashboard = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [myStories, setMyStories] = useState([])
  const [notifications, setNotifications] = useState([])
  const [showNotifs, setShowNotifs] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return navigate('/signin')
    fetchData()
  }, [user])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [storiesData, notifsData] = await Promise.all([
        storyAPI.getMine(),
        notificationAPI.getAll(),
      ])
      setMyStories(storiesData)
      setNotifications(notifsData)
    } catch (err) {
      console.error('Failed to fetch dashboard data', err)
    } finally {
      setLoading(false)
    }
  }

  const markAllRead = async () => {
    try {
      await notificationAPI.markAllRead()
      setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    } catch (err) {
      console.error('Failed to mark all read', err)
    }
  }

  const unreadCount = notifications.filter(n => !n.read).length
  const totalContributors = myStories.reduce((sum, s) => sum + (s.contributorCount || 0), 0)
  const completedCount = myStories.filter(s => s.status === 'completed').length

  return (
    <div className={styles.page}>
      <Navbar />

      <div className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.headerLeft}>
            <div
              className={styles.avatar}
              style={{ background: getAvatarColor(user?.name || 'U') }}
            >
              {getInitial(user?.name || 'U')}
            </div>
            <div className={styles.info}>
              <h1 className={styles.name}>{user?.name}</h1>
              <div className={styles.handle}>@{user?.username}</div>
            </div>
          </div>

          <div className={styles.headerRight}>
            <div className={styles.bellWrap}>
              <button
                className={styles.bell}
                onClick={() => setShowNotifs(prev => !prev)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                {unreadCount > 0 && (
                  <span className={styles.bellBadge}>{unreadCount}</span>
                )}
              </button>

              {showNotifs && (
                <div className={styles.notifDropdown}>
                  <div className={styles.notifHeader}>
                    <span className={styles.notifTitle}>Notifications</span>
                    {unreadCount > 0 && (
                      <span className={styles.markRead} onClick={markAllRead}>
                        Mark all read
                      </span>
                    )}
                  </div>
                  <div className={styles.notifList}>
                    {notifications.length === 0 && (
                      <div style={{ padding: '16px', fontSize: '12px', color: 'var(--ink-soft)' }}>
                        No notifications yet
                      </div>
                    )}
                    {notifications.map(n => (
                      <div
                        key={n._id}
                        className={`${styles.notifItem} ${!n.read ? styles.notifUnread : ''}`}
                      >
                        <div className={styles.notifDot} style={{ opacity: n.read ? 0 : 1 }} />
                        <div className={styles.notifContent}>
                          <div className={styles.notifMsg}>{n.message}</div>
                          <div className={styles.notifTime}>
                            {new Date(n.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              className={styles.btnNewStory}
              onClick={() => navigate('/story/new')}
            >
              + Begin a story
            </button>
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Stories started</div>
            <div className={styles.statVal}>{myStories.length}</div>
            <div className={styles.statSub}>{completedCount} completed</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Total contributors</div>
            <div className={styles.statVal}>{totalContributors}</div>
            <div className={styles.statSub}>across all stories</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Notifications</div>
            <div className={styles.statVal}>{notifications.length}</div>
            <div className={styles.statSub}>{unreadCount} unread</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Member since</div>
            <div className={styles.statVal} style={{ fontSize: '16px', marginTop: '4px' }}>
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) : '—'}
            </div>
            <div className={styles.statSub}>Kōsōwa member</div>
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Stories I started</div>

          {loading && <div style={{ color: 'var(--ink-soft)', fontSize: '14px' }}>Loading...</div>}

          {!loading && myStories.length === 0 && (
            <div style={{ color: 'var(--ink-soft)', fontSize: '14px' }}>
              You haven't started any stories yet.{' '}
              <span
                style={{ color: 'var(--gold)', cursor: 'pointer' }}
                onClick={() => navigate('/story/new')}
              >
                Begin one now!
              </span>
            </div>
          )}

          <div className={styles.grid}>
            {myStories.map(story => (
              <div key={story._id} onClick={() => navigate(`/mystory/${story._id}`)}>
                <StoryCard story={{
                  id: story._id,
                  title: story.title,
                  genre: story.genre,
                  description: story.description,
                  author: user?.username,
                  contributors: story.contributorCount,
                  status: story.status,
                  createdAt: story.createdAt,
                }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard