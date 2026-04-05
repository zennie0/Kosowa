import { useNavigate } from 'react-router-dom'
import styles from './StoryCard.module.css'

const StoryCard = ({ story }) => {
  const navigate = useNavigate()

  return (
    <div className={styles.card} onClick={() => navigate(`/story/${story.id}`)}>
      <div className={styles.genre}>{story.genre}</div>
      <div className={styles.title}>{story.title}</div>
      <div className={styles.desc}>{story.description}</div>
      <div className={styles.footer}>
        <span className={styles.meta}>by @{story.author} · {story.contributors} writers</span>
        <span className={`${styles.badge} ${story.status === 'open' ? styles.open : styles.done}`}>
          {story.status === 'open' ? 'Open' : 'Completed'}
        </span>
      </div>
    </div>
  )
}

export default StoryCard