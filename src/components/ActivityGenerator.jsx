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
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <h2>Activity Generator</h2>

      <label>Age range</label>
      <select name="ageRange" value={form.ageRange} onChange={handleChange}>
        <option value="1-2">1 - 2 years</option>
        <option value="2-3">2 - 3 years</option>
        <option value="3-4">3 - 4 years</option>
        <option value="4-5">4 - 5 years</option>
      </select>

      <label>Energy level</label>
      <select name="energyLevel" value={form.energyLevel} onChange={handleChange}>
        <option value="wild">Wild</option>
        <option value="medium">Medium</option>
        <option value="calm">Calm</option>
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
        <option value="indoor">Indoor</option>
        <option value="outdoor">Outdoor</option>
        <option value="either">Either</option>
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

      <button onClick={handleSubmit} disabled={loading} style={{ marginTop: '1rem' }}>
        {loading ? 'Finding activities...' : 'Generate activities'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {activities.map((activity, i) => (
        <div key={i} style={{ marginTop: '1.5rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h3>{activity.name}</h3>
          <ol>
            {activity.instructions.map((step, j) => (
              <li key={j}>{step}</li>
            ))}
          </ol>
          <p style={{ color: '#666', fontStyle: 'italic' }}>{activity.why}</p>
        </div>
      ))}
    </div>
  )
}