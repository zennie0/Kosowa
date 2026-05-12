import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import StoryCard from '../../components/StoryCard/StoryCard'
import { storyAPI } from '../../services/api'
import styles from './Profile.module.css'

const getInitial = (name) => name.charAt(0).toUpperCase()

const getAvatarColor = (name) => {
  const colors = ['#c8922a', '#5a7a9a', '#7a5a9a', '#5a9a7a', '#9a5a5a', '#7a7a5a']
  const index = name.charCodeAt(0) % colors.length
  return colors[index]
}

const Profile = () => {
  const { username } = useParams()
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProfile()
  }, [username])

  const fetchProfile = async () => {
    setLoading(true)
    try {
      const data = await storyAPI.getProfile(username)
      setProfile(data.user)
      setStories(data.stories)
    } catch (err) {
      setError('User not found')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return (
    <div style={{ background: 'var(--parch)', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ textAlign: 'center', padding: '60px', color: 'var(--ink-soft)' }}>Loading profile...</div>
    </div>
  )

  if (error) return (
    <div style={{ background: 'var(--parch)', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ textAlign: 'center', padding: '60px', color: 'var(--ink-soft)' }}>{error}</div>
    </div>
  )

  const totalContributors = stories.reduce((sum, s) => sum + (s.contributorCount || 0), 0)

  return (
    <div className={styles.page}>
      <Navbar />

      <div className={styles.header}>
        <div className={styles.headerInner}>
          <div
            className={styles.avatar}
            style={{ background: getAvatarColor(profile.name) }}
          >
            {getInitial(profile.name)}
          </div>

          <div className={styles.info}>
            <h1 className={styles.name}>{profile.name}</h1>
            <div className={styles.handle}>
              @{profile.username} · Member since{' '}
              {new Date(profile.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
            </div>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statVal}>{stories.length}</div>
              <div className={styles.statLabel}>Stories</div>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <div className={styles.statVal}>{totalContributors}</div>
              <div className={styles.statLabel}>Total contributors</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.sectionTitle}>
          Stories by @{profile.username}
        </div>

        {stories.length === 0 && (
          <div className={styles.empty}>
            This user hasn't started any stories yet.
          </div>
        )}

        <div className={styles.grid}>
          {stories.map(story => (
            <StoryCard key={story._id} story={{
              id: story._id,
              title: story.title,
              genre: story.genre,
              description: story.description,
              author: profile.username,
              contributors: story.contributorCount,
              status: story.status,
              createdAt: story.createdAt,
            }} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile