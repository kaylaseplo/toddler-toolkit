import { useState } from 'react'
import ActivityGenerator from './components/ActivityGenerator'
import WorldExplorer from './components/WorldExplorer'

function App() {
  const [tab, setTab] = useState('activities')

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg)' }}>
      <header style={{
        textAlign: 'center',
        padding: '2.5rem 1rem 1.5rem',
        borderBottom: '1px solid var(--border)'
      }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--text-primary)', letterSpacing: '0.02em' }}>
          🌿 Toddler Toolkit
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.4rem', fontSize: '0.95rem' }}>
          For the "what do we do now?" moments
        </p>
      </header>

      <nav style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '0.75rem',
        padding: '1.25rem 1rem'
      }}>
        {['activities', 'explorer'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              backgroundColor: tab === t ? 'var(--accent)' : 'var(--surface)',
              color: tab === t ? 'white' : 'var(--text-secondary)',
              border: `1px solid ${tab === t ? 'var(--accent)' : 'var(--border)'}`,
              fontWeight: tab === t ? 'bold' : 'normal',
              padding: '0.6rem 1.4rem'
            }}
          >
            {t === 'activities' ? '🎨 Activities' : '🔍 What is THAT?'}
          </button>
        ))}
      </nav>

      <main style={{ padding: '0 1rem 4rem' }}>
        {tab === 'activities' && <ActivityGenerator />}
        {tab === 'explorer' && <WorldExplorer />}
      </main>
    </div>
  )
}

export default App