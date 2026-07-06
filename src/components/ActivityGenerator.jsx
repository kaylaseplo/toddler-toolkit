import { useState } from 'react'
import { generateActivities } from '../lib/claude'

export default function ActivityGenerator() {
  const [form, setForm] = useState({
    ageRange: '2-3',
    energyLevel: 'medium',
    timeAvailable: '30 min',
    location: 'indoor',
    supplies: '',
    needsParent: 'either'
  })
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit() {
    setLoading(true)
    setError(null)
    setActivities([])
    try {
      const results = await generateActivities(form)
      setActivities(results)
    } catch (err) {
      setError('Something went wrong. Check your API key and try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '620px', margin: '0 auto', paddingTop: '1.5rem' }}>
      <div style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '1.75rem',
        boxShadow: 'var(--shadow)'
      }}>
        <h2 style={{ marginBottom: '1.25rem', fontSize: '1.25rem' }}>Tell me about your situation</h2>

        <label>Age range</label>
        <select name="ageRange" value={form.ageRange} onChange={handleChange}>
          <option value="1-2">1 – 2 years</option>
          <option value="2-3">2 – 3 years</option>
          <option value="3-4">3 – 4 years</option>
          <option value="4-5">4 – 5 years</option>
        </select>

        <label>Energy level</label>
        <select name="energyLevel" value={form.energyLevel} onChange={handleChange}>
          <option value="wild">🌪 Wild</option>
          <option value="medium">😊 Medium</option>
          <option value="calm">😌 Calm</option>
        </select>

        <label>Time available</label>
        <select name="timeAvailable" value={form.timeAvailable} onChange={handleChange}>
          <option value="15 min">15 minutes</option>
          <option value="30 min">30 minutes</option>
          <option value="1 hour">1 hour</option>
          <option value="all day">We've got all day</option>
        </select>

        <label>Indoor or outdoor</label>
        <select name="location" value={form.location} onChange={handleChange}>
          <option value="indoor">🏠 Indoor</option>
          <option value="outdoor">🌳 Outdoor</option>
          <option value="either">Either is fine</option>
        </select>

        <label>Supplies you have around</label>
        <input
          type="text"
          name="supplies"
          value={form.supplies}
          onChange={handleChange}
          placeholder="e.g. paper, markers, cardboard box"
        />

        <label>Solo or needs a parent?</label>
        <select name="needsParent" value={form.needsParent} onChange={handleChange}>
          <option value="solo">Solo — kid can do it alone</option>
          <option value="parent">Needs a parent</option>
          <option value="either">Either is fine</option>
        </select>

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: '100%',
            backgroundColor: 'var(--accent)',
            color: 'white',
            padding: '0.75rem',
            fontSize: '1rem',
            marginTop: '0.5rem'
          }}
        >
          {loading ? 'Finding activities...' : 'Generate activities ✨'}
        </button>

        {error && <p style={{ color: '#c0392b', marginTop: '1rem' }}>{error}</p>}
      </div>

      {activities.map((activity, i) => (
        <div key={i} style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '1.5rem',
          marginTop: '1rem',
          boxShadow: 'var(--shadow)'
        }}>
          <h3 style={{ color: 'var(--accent)', marginBottom: '0.75rem' }}>{activity.name}</h3>
          <ol style={{ paddingLeft: '1.25rem' }}>
            {activity.instructions.map((step, j) => (
              <li key={j} style={{ marginBottom: '0.4rem' }}>{step}</li>
            ))}
          </ol>
          <p style={{
            marginTop: '1rem',
            padding: '0.75rem',
            backgroundColor: 'var(--accent-light)',
            borderRadius: '8px',
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            fontStyle: 'italic'
          }}>{activity.why}</p>
        </div>
      ))}
    </div>
  )
}