import { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import StoryCard from '../../components/StoryCard/StoryCard'
import dummyStories from '../../data/dummyStories.js'
import styles from './Home.module.css'

const genres = ['All', 'Fantasy', 'Horror', 'Romance', 'Sci-Fi', 'Mystery', 'Thriller', 'Folklore', 'Drama', 'Comedy', 'Adventure']

const Home = () => {
  const [activeGenre, setActiveGenre] = useState('All')
  const [search, setSearch] = useState('')
  const [searchGenre, setSearchGenre] = useState('All genres')

  const filtered = dummyStories.filter(story => {
    const matchesGenre = activeGenre === 'All' || story.genre === activeGenre
    const matchesSearch = story.title.toLowerCase().includes(search.toLowerCase())
    const matchesSearchGenre = searchGenre === 'All genres' || story.genre === searchGenre
    return matchesGenre && matchesSearch && matchesSearchGenre
  })

  const trending = filtered.slice(0, 6)
  const newest = filtered.slice(6)

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
          <button className={styles.searchBtn}>Search</button>
        </div>
      </div>

      <div className={styles.genreRow}>
        {genres.map(genre => (
          <button
            key={genre}
            className={`${styles.pill} ${activeGenre === genre ? styles.pillActive : ''}`}
            onClick={() => setActiveGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      <div className={styles.body}>
        {trending.length > 0 && (
          <>
            <div className={styles.sectionTitle}>Trending now</div>
            <div className={styles.grid}>
              {trending.map(story => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          </>
        )}

        {newest.length > 0 && (
          <>
            <div className={styles.sectionTitle}>Newest stories</div>
            <div className={styles.grid}>
              {newest.map(story => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          </>
        )}

        {filtered.length === 0 && (
          <div className={styles.empty}>
            No stories found. Try a different search or genre.
          </div>
        )}
      </div>
    </div>
  )
}

export default Home