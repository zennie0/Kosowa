import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import StoryCard from '../../components/StoryCard/StoryCard'
import { dummyProfile } from '../../data/dummyStories'
import styles from './Profile.module.css'

const getInitial = (name) => name.charAt(0).toUpperCase()

const getAvatarColor = (name) => {
  const colors = ['#c8922a', '#5a7a9a', '#7a5a9a', '#5a9a7a', '#9a5a5a', '#7a7a5a']
  const index = name.charCodeAt(0) % colors.length
  return colors[index]
}

const Profile = () => {
  const navigate = useNavigate()
  const profile = dummyProfile

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
            <div className={styles.handle}>@{profile.username} · Member since {profile.joinedAt}</div>
            <p className={styles.bio}>{profile.bio}</p>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statVal}>{profile.stories.length}</div>
              <div className={styles.statLabel}>Stories</div>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <div className={styles.statVal}>{profile.totalParagraphsWritten}</div>
              <div className={styles.statLabel}>Paragraphs written</div>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <div className={styles.statVal}>{profile.totalContributors}</div>
              <div className={styles.statLabel}>Total contributors</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.sectionTitle}>
          Stories by @{profile.username}
        </div>
        <div className={styles.grid}>
          {profile.stories.map(story => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>

        {profile.stories.length === 0 && (
          <div className={styles.empty}>
            This user hasn't started any stories yet.
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile