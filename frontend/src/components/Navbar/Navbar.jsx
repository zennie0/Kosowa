import { useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'

const Navbar = () => {
  const navigate = useNavigate()

  return (
    <nav className={styles.nav}>
      <div className={styles.logo} onClick={() => navigate('/')}>
        <div className={styles.circle}>構</div>
        <span className={styles.name}>Kōsōwa</span>
      </div>

      <div className={styles.links}>
        <span className={styles.link}>Explore</span>
        <span className={styles.link}>Fantasy</span>
        <span className={styles.link}>Horror</span>
        <span className={styles.link}>Romance</span>
      </div>

      <div className={styles.actions}>
        <button className={styles.ghost} onClick={() => navigate('/signin')}>Sign in</button>
        <button className={styles.gold} onClick={() => navigate('/signup')}>Join the circle</button>
      </div>
    </nav>
  )
}

export default Navbar