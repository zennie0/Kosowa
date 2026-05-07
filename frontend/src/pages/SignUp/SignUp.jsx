import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext.jsx'
import Navbar from '../../components/Navbar/Navbar'
import styles from './SignUp.module.css'

const SignUp = () => {
  const navigate = useNavigate()
  const { signUp } = useAuth()
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await signUp(form)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.wrap}>
        <div className={styles.left}>
          <div className={styles.leftInner}>
            <div className={styles.tagline}>Start a story.<br />Let the world finish it.</div>
            <p className={styles.sub}>
              Join thousands of storytellers building worlds one paragraph at a time.
              Your first story is waiting to be written.
            </p>
            <div className={styles.quote}>
              "The best stories are the ones no single person could have told."
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.formBox}>
            <div className={styles.formTitle}>Join the circle</div>
            <div className={styles.formSub}>Create your Kōsōwa account — it's free</div>

            {error && <div className={styles.errorBox}>{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className={styles.group}>
                <label className={styles.label}>Full name</label>
                <input
                  className={styles.input}
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.group}>
                <label className={styles.label}>Username</label>
                <input
                  className={styles.input}
                  type="text"
                  name="username"
                  placeholder="@yourhandle"
                  value={form.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.group}>
                <label className={styles.label}>Email address</label>
                <input
                  className={styles.input}
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.group}>
                <label className={styles.label}>Password</label>
                <input
                  className={styles.input}
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                className={styles.submit}
                type="submit"
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Begin your story'}
              </button>
            </form>

            <div className={styles.switch}>
              Already have an account?{' '}
              <span onClick={() => navigate('/signin')}>Sign in</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp