import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import styles from './CreateStory.module.css'

const genres = [
  'Fantasy', 'Horror', 'Romance', 'Sci-Fi',
  'Mystery', 'Thriller', 'Folklore', 'Drama',
  'Comedy', 'Adventure'
]

const CreateStory = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '',
    genre: '',
    description: '',
    firstParagraph: '',
  })
  const [errors, setErrors] = useState({})

  const wordCount = form.firstParagraph.trim() === ''
    ? 0
    : form.firstParagraph.trim().split(/\s+/).length

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const validate = () => {
    const newErrors = {}
    if (!form.title.trim()) newErrors.title = 'Please give your story a title'
    if (!form.genre) newErrors.genre = 'Please pick a genre'
    if (!form.description.trim()) newErrors.description = 'Please write a short vision for your story'
    if (!form.firstParagraph.trim()) newErrors.firstParagraph = 'Please write the opening paragraph'
    if (wordCount > 200) newErrors.firstParagraph = 'Opening paragraph must be under 200 words'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    console.log('New story:', form)
    // later this will call the backend API
    navigate('/')
  }

  return (
    <div className={styles.page}>
      <Navbar />

      <div className={styles.wrap}>
        <div className={styles.left}>
          <div className={styles.leftInner}>
            <div className={styles.tagline}>Every great<br />story needs<br />a first word.</div>
            <p className={styles.sub}>
              Set the stage. Give contributors a vision to follow.
              The opening paragraph is yours — make it unforgettable.
            </p>
            <div className={styles.tips}>
              <div className={styles.tipsTitle}>Tips for a great story</div>
              <div className={styles.tip}>
                <span className={styles.tipDot} />
                Write a description that gives contributors direction without limiting their imagination
              </div>
              <div className={styles.tip}>
                <span className={styles.tipDot} />
                Your opening paragraph sets the tone — every contributor will follow your lead
              </div>
              <div className={styles.tip}>
                <span className={styles.tipDot} />
                Leave something unresolved so others have something to continue
              </div>
              <div className={styles.tip}>
                <span className={styles.tipDot} />
                Pick the right genre so the right readers find your story
              </div>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.formBox}>
            <div className={styles.formTitle}>Begin a story</div>
            <div className={styles.formSub}>Start the vision. Let the circle continue it.</div>

            <form onSubmit={handleSubmit}>

              <div className={styles.group}>
                <label className={styles.label}>Story title</label>
                <input
                  className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
                  type="text"
                  name="title"
                  placeholder="Give your story a compelling title..."
                  value={form.title}
                  onChange={handleChange}
                />
                {errors.title && <div className={styles.error}>{errors.title}</div>}
              </div>

              <div className={styles.group}>
                <label className={styles.label}>Genre</label>
                <div className={styles.genreGrid}>
                  {genres.map(genre => (
                    <button
                      key={genre}
                      type="button"
                      className={`${styles.genreBtn} ${form.genre === genre ? styles.genreActive : ''}`}
                      onClick={() => {
                        setForm({ ...form, genre })
                        setErrors({ ...errors, genre: '' })
                      }}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
                {errors.genre && <div className={styles.error}>{errors.genre}</div>}
              </div>

              <div className={styles.group}>
                <label className={styles.label}>
                  Your vision
                  <span className={styles.labelHint}>— tell contributors how the story should feel and end</span>
                </label>
                <textarea
                  className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
                  name="description"
                  placeholder="Describe the tone, the direction, and how you imagine this story ending. Contributors will read this before writing."
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                />
                {errors.description && <div className={styles.error}>{errors.description}</div>}
              </div>

              <div className={styles.group}>
                <label className={styles.label}>
                  Opening paragraph
                  <span className={styles.labelHint}>— this is where your story begins</span>
                </label>
                <textarea
                  className={`${styles.textarea} ${styles.textareaLarge} ${errors.firstParagraph ? styles.inputError : ''}`}
                  name="firstParagraph"
                  placeholder="Write the opening paragraph of your story. Set the scene, introduce a character, begin in the middle of something..."
                  value={form.firstParagraph}
                  onChange={handleChange}
                  rows={6}
                />
                <div className={styles.wordCountRow}>
                  <div className={styles.error}>{errors.firstParagraph || ''}</div>
                  <span className={`${styles.wordCount} ${wordCount > 200 ? styles.wordOver : ''}`}>
                    {wordCount} / 200 words
                  </span>
                </div>
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.btnCancel}
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.btnSubmit}>
                  Begin the story
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateStory