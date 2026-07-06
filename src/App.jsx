import { useState } from 'react'
import ActivityGenerator from './components/ActivityGenerator'
import WorldExplorer from './components/WorldExplorer'

function App() {
  const [tab, setTab] = useState('activities')

  return (
    <div>
      <h1 style={{ textAlign: 'center', padding: '1rem' }}>Toddler Toolkit</h1>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <button
          onClick={() => setTab('activities')}
          style={{ fontWeight: tab === 'activities' ? 'bold' : 'normal' }}
        >
          Activity Generator
        </button>
        <button
          onClick={() => setTab('explorer')}
          style={{ fontWeight: tab === 'explorer' ? 'bold' : 'normal' }}
        >
          What is THAT?
        </button>
      </div>

      {tab === 'activities' && <ActivityGenerator />}
      {tab === 'explorer' && <WorldExplorer />}
    </div>
  )
}

export default App