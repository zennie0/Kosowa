import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import styles from './SignIn.module.css'

const SignIn = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log('Sign in data:', form)
    // later this will call the backend API
  }

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.wrap}>

        <div className={styles.left}>
          <div className={styles.leftInner}>
            <div className={styles.tagline}>Every great story needs one more voice.</div>
            <p className={styles.sub}>
              Sign in and continue the stories waiting for your paragraph.
              The circle is never complete without you.
            </p>
            <div className={styles.quote}>
              "A story untold is a door left unopened. Step inside."
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.formBox}>
            <div className={styles.formTitle}>Welcome back</div>
            <div className={styles.formSub}>Sign in to your Kōsōwa account</div>

            <form onSubmit={handleSubmit}>
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
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button className={styles.submit} type="submit">Enter the circle</button>
            </form>

            <div className={styles.switch}>
              Don't have an account?{' '}
              <span onClick={() => navigate('/signup')}>Join Kōsōwa</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SignIn