import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import StoryCard from '../../components/StoryCard/StoryCard.jsx'
import { storyAPI } from '../../services/api.js'
import styles from './Home.module.css'

const genres = ['All', 'Fantasy', 'Horror', 'Romance', 'Sci-Fi', 'Mystery', 'Thriller', 'Folklore', 'Drama', 'Comedy', 'Adventure']

const Home = () => {
  const [activeGenre, setActiveGenre] = useState('All')
  const [search, setSearch] = useState('')
  const [searchGenre, setSearchGenre] = useState('All genres')
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchStories()
  }, [])

  const fetchStories = async (params = {}) => {
    setLoading(true)
    try {
      const data = await storyAPI.getAll(params)
      setStories(data)
    } catch (err) {
      setError('Failed to load stories')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    const params = {}
    if (search) params.search = search
    if (searchGenre !== 'All genres') params.genre = searchGenre
    fetchStories(params)
  }

  const handleGenrePill = (genre) => {
    setActiveGenre(genre)
    const params = {}
    if (genre !== 'All') params.genre = genre
    if (search) params.search = search
    fetchStories(params)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch()
  }

  const trending = stories.slice(0, 6)
  const newest = stories.slice(6)

  return (
    <div className={styles.page}>
      <Navbar />

      <div className={styles.hero}>
        <div className={styles.heroSub}>The collaborative storytelling circle</div>
        <h1 className={styles.heroTitle}>Where one vision becomes<br />a thousand voices</h1>
        <p className={styles.heroDesc}>
          Start a story. Let the world continue it. Every paragraph is written by a different soul.
        </p>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search stories, genres, authors..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            className={styles.searchInput}
          />
          <select
            className={styles.searchSelect}
            value={searchGenre}
            onChange={e => setSearchGenre(e.target.value)}
          >
            <option>All genres</option>
            {genres.filter(g => g !== 'All').map(g => (
              <option key={g}>{g}</option>
            ))}
          </select>
          <button className={styles.searchBtn} onClick={handleSearch}>Search</button>
        </div>
      </div>

      <div className={styles.genreRow}>
        {genres.map(genre => (
          <button
            key={genre}
            className={`${styles.pill} ${activeGenre === genre ? styles.pillActive : ''}`}
            onClick={() => handleGenrePill(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      <div className={styles.body}>
        {loading && (
          <div className={styles.empty}>Loading stories...</div>
        )}

        {error && (
          <div className={styles.empty}>{error}</div>
        )}

        {!loading && !error && stories.length === 0 && (
          <div className={styles.empty}>No stories found. Be the first to begin one!</div>
        )}

        {!loading && !error && trending.length > 0 && (
          <>
            <div className={styles.sectionTitle}>Trending now</div>
            <div className={styles.grid}>
              {trending.map(story => (
                <StoryCard key={story._id} story={{
                  id: story._id,
                  title: story.title,
                  genre: story.genre,
                  description: story.description,
                  author: story.owner?.username,
                  contributors: story.contributorCount,
                  status: story.status,
                  createdAt: story.createdAt,
                }} />
              ))}
            </div>
          </>
        )}

        {!loading && !error && newest.length > 0 && (
          <>
            <div className={styles.sectionTitle}>Newest stories</div>
            <div className={styles.grid}>
              {newest.map(story => (
                <StoryCard key={story._id} story={{
                  id: story._id,
                  title: story.title,
                  genre: story.genre,
                  description: story.description,
                  author: story.owner?.username,
                  contributors: story.contributorCount,
                  status: story.status,
                  createdAt: story.createdAt,
                }} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Home