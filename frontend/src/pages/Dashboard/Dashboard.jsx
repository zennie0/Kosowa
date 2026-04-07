import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import StoryCard from '../../components/StoryCard/StoryCard'
import { dummyDashboard } from '../../data/dummyStories'
import styles from './Dashboard.module.css'

const getInitial = (name) => name.charAt(0).toUpperCase()

const getAvatarColor = (name) => {
  const colors = ['#c8922a', '#5a7a9a', '#7a5a9a', '#5a9a7a', '#9a5a5a', '#7a7a5a']
  const index = name.charCodeAt(0) % colors.length
  return colors[index]
}

const Dashboard = () => {
  const navigate = useNavigate()
  const data = dummyDashboard
  const [notifications, setNotifications] = useState(data.notifications)
  const [showNotifs, setShowNotifs] = useState(false)

  const unreadCount = notifications.filter(n => !n.read).length

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const totalContributors = data.myStories.reduce((sum, s) => sum + s.contributors, 0)
  const totalMyParagraphs = data.contributedStories.reduce((sum, s) => sum + s.myParagraphs, 0)

  return (
    <div className={styles.page}>
      <Navbar />

      {/* PROFILE HEADER */}
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.headerLeft}>
            <div
              className={styles.avatar}
              style={{ background: getAvatarColor(data.name) }}
            >
              {getInitial(data.name)}
            </div>
            <div className={styles.info}>
              <h1 className={styles.name}>{data.name}</h1>
              <div className={styles.handle}>@{data.username} · Member since {data.joinedAt}</div>
              <p className={styles.bio}>{data.bio}</p>
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
                    {notifications.map(n => (
                      <div
                        key={n.id}
                        className={`${styles.notifItem} ${!n.read ? styles.notifUnread : ''}`}
                      >
                        <div className={styles.notifDot} style={{ opacity: n.read ? 0 : 1 }} />
                        <div className={styles.notifContent}>
                          <div className={styles.notifMsg}>{n.message}</div>
                          <div className={styles.notifTime}>{n.createdAt}</div>
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

        {/* STATS */}
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Stories started</div>
            <div className={styles.statVal}>{data.myStories.length}</div>
            <div className={styles.statSub}>{data.myStories.filter(s => s.status === 'completed').length} completed</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Total contributors</div>
            <div className={styles.statVal}>{totalContributors}</div>
            <div className={styles.statSub}>across all stories</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>My paragraphs</div>
            <div className={styles.statVal}>{totalMyParagraphs}</div>
            <div className={styles.statSub}>in other stories</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Today's quota</div>
            <div className={styles.statVal}>3 / 5</div>
            <div className={styles.statSub}>paragraphs left today</div>
          </div>
        </div>
      </div>

      <div className={styles.body}>

        {/* MY STORIES */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Stories I started</div>
          <div className={styles.grid}>
            {data.myStories.map(story => (
              <div key={story.id} onClick={() => navigate(`/mystory/${story.id}`)}>
                <StoryCard story={story} />
              </div>
            ))}
          </div>
        </div>

        {/* CONTRIBUTED TO */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Stories I contributed to</div>
          <div className={styles.contribGrid}>
            {data.contributedStories.map(story => (
              <div
                key={story.id}
                className={styles.contribCard}
                onClick={() => navigate(`/story/${story.id}`)}
              >
                <div className={styles.contribGenre}>{story.genre}</div>
                <div className={styles.contribTitle}>{story.title}</div>
                <div className={styles.contribBy}>by @{story.author}</div>
                <div className={styles.contribFooter}>
                  <span className={styles.contribMeta}>
                    {story.myParagraphs} paragraph{story.myParagraphs > 1 ? 's' : ''} by you
                  </span>
                  <span className={styles.contribTime}>Last: {story.lastContributed}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard