import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import styles from './Navbar.module.css'

const getInitial = (name) => name.charAt(0).toUpperCase()

const getAvatarColor = (name) => {
  const colors = ['#c8922a', '#5a7a9a', '#7a5a9a', '#5a9a7a', '#9a5a5a', '#7a7a5a']
  const index = name.charCodeAt(0) % colors.length
  return colors[index]
}

const Navbar = () => {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = () => {
    signOut()
    setShowDropdown(false)
    navigate('/')
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.logo} onClick={() => navigate('/')}>
        <div className={styles.circle}>構</div>
        <span className={styles.name}>Kōsōwa</span>
      </div>

      <div className={styles.links}>
        <span className={styles.link} onClick={() => navigate('/')}>Explore</span>
        <span className={styles.link}>Fantasy</span>
        <span className={styles.link}>Horror</span>
        <span className={styles.link}>Romance</span>
      </div>

      <div className={styles.actions}>
        {user ? (
          <>
            {/* BELL */}
            <div className={styles.bellWrap} onClick={() => navigate('/dashboard')}>
              <button className={styles.bell}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                {user.unreadCount > 0 && (
                  <span className={styles.bellBadge}>{user.unreadCount}</span>
                )}
              </button>
            </div>

            {/* AVATAR DROPDOWN */}
            <div className={styles.avatarWrap} ref={dropdownRef}>
              <div
                className={styles.avatar}
                style={{ background: getAvatarColor(user.name) }}
                onClick={() => setShowDropdown(prev => !prev)}
              >
                {getInitial(user.name)}
              </div>

              {showDropdown && (
                <div className={styles.dropdown}>
                  <div className={styles.dropdownHeader}>
                    <div className={styles.dropdownName}>{user.name}</div>
                    <div className={styles.dropdownHandle}>@{user.username}</div>
                  </div>

                  <div className={styles.dropdownDivider} />

                  <div className={styles.dropdownItem} onClick={() => { navigate('/dashboard'); setShowDropdown(false) }}>
                    <span className={styles.dropdownIcon}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                      </svg>
                    </span>
                    Dashboard
                  </div>

                  <div className={styles.dropdownItem} onClick={() => { navigate('/mystory/1'); setShowDropdown(false) }}>
                    <span className={styles.dropdownIcon}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                      </svg>
                    </span>
                    My stories
                  </div>

                  <div className={styles.dropdownItem} onClick={() => { navigate(`/profile/${user.username}`); setShowDropdown(false) }}>
                    <span className={styles.dropdownIcon}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                    </span>
                    My profile
                  </div>

                  <div className={styles.dropdownDivider} />

                  <div className={`${styles.dropdownItem} ${styles.dropdownSignOut}`} onClick={handleSignOut}>
                    <span className={styles.dropdownIcon}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                        <polyline points="16 17 21 12 16 7"/>
                        <line x1="21" y1="12" x2="9" y2="12"/>
                      </svg>
                    </span>
                    Sign out
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <button className={styles.ghost} onClick={() => navigate('/signin')}>Sign in</button>
            <button className={styles.gold} onClick={() => navigate('/signup')}>Join the circle</button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar