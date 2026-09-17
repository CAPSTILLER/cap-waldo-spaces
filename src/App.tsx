import { useEffect, useState } from 'react'
import './App.css'

type Post = {
  postUrl: string
  imageUrl: string
  title?: string
  date?: string
}

type Profile = {
  handle: string
  url: string
  pfp: string
}

type Profiles = {
  capstiller: Profile
  waldoforrealz: Profile
  GEARonbase: Profile
}

export default function App() {
  const [posts, setPosts] = useState<Post[] | null>(null)
  const [profiles, setProfiles] = useState<Profiles | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([
      fetch('./posts.json').then((r) => {
        if (!r.ok) throw new Error('posts.json missing')
        return r.json()
      }),
      fetch('./profiles.json').then((r) => {
        if (!r.ok) throw new Error('profiles.json missing')
        return r.json()
      }),
    ])
      .then(([p, pr]) => {
        setPosts(Array.isArray(p) ? p : [])
        setProfiles(pr)
      })
      .catch((e: Error) => setError(e.message))
  }, [])

  return (
    <div className="app">
      <header className="top">
        <div>
          <h1>Cap × Waldo Spaces</h1>
          <p>
            Every recorded @waldoforrealz Space that @capstiller reposted —
            tap the image to open the post.
          </p>
        </div>
        {profiles && (
          <nav className="pfp-row" aria-label="X profiles">
            <a
              className="pfp-btn"
              href={profiles.capstiller.url}
              target="_blank"
              rel="noopener noreferrer"
              title={`@${profiles.capstiller.handle}`}
              aria-label={`@${profiles.capstiller.handle} on X`}
            >
              <img src={profiles.capstiller.pfp} alt="" />
            </a>
            <a
              className="pfp-btn"
              href={profiles.waldoforrealz.url}
              target="_blank"
              rel="noopener noreferrer"
              title={`@${profiles.waldoforrealz.handle}`}
              aria-label={`@${profiles.waldoforrealz.handle} on X`}
            >
              <img src={profiles.waldoforrealz.pfp} alt="" />
            </a>
            <a
              className="pfp-btn"
              href={profiles.GEARonbase.url}
              target="_blank"
              rel="noopener noreferrer"
              title={`@${profiles.GEARonbase.handle}`}
              aria-label={`@${profiles.GEARonbase.handle} on X`}
            >
              <img src={profiles.GEARonbase.pfp} alt="" />
            </a>
          </nav>
        )}
      </header>

      {error && <p className="status">Couldn’t load data: {error}</p>}
      {!error && posts === null && <p className="status">Loading…</p>}
      {!error && posts && posts.length === 0 && (
        <p className="empty">No matching Space reposts found yet.</p>
      )}
      {posts && posts.length > 0 && (
        <div className="grid">
          {posts.map((post) => (
            <a
              key={post.postUrl}
              className="card"
              href={post.postUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="media" src={post.imageUrl} alt="" loading="lazy" />
              <div className="meta">
                <strong>{post.title || 'Waldo Space — Cap repost'}</strong>
                {post.date ? <span>{post.date}</span> : null}
              </div>
            </a>
          ))}
        </div>
      )}

      <a
        className="gear-sticker"
        href="https://landonthis.gearup.wtf"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Gear home — landonthis"
      >
        <img src="./assets/gear-logo.png" alt="" />
      </a>
    </div>
  )
}
