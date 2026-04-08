import { useNavigate } from 'react-router-dom'
import styles from './NotFound.module.css'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <div className={styles.inner}>

        <div className={styles.logoArea} onClick={() => navigate('/')}>
          <div className={styles.circle}>構</div>
          <span className={styles.logoName}>Kōsōwa</span>
        </div>

        <div className={styles.kanji}>迷</div>

        <div className={styles.code}>404</div>
        <h1 className={styles.title}>This page got lost at sea</h1>
        <p className={styles.desc}>
          Like a map that only appears at midnight, the page you're looking for
          can't be found. It may have been deleted, moved, or never existed at all.
        </p>

        <div className={styles.actions}>
          <button className={styles.btnHome} onClick={() => navigate('/')}>
            Back to homepage
          </button>
          <button className={styles.btnExplore} onClick={() => navigate('/')}>
            Explore stories
          </button>
        </div>

      </div>
    </div>
  )
}

export default NotFound