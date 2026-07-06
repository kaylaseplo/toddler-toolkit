import { useState } from 'react'
import { exploreImage } from '../lib/claude'

export default function WorldExplorer() {
  const [ageRange, setAgeRange] = useState('2-3')
  const [preview, setPreview] = useState(null)
  const [imageBase64, setImageBase64] = useState(null)
  const [mediaType, setMediaType] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function handleImageUpload(e) {
    const file = e.target.files[0]
    if (!file) return
    setMediaType(file.type)
    setPreview(URL.createObjectURL(file))
    const reader = new FileReader()
    reader.onload = () => {
      const base64 = reader.result.split(',')[1]
      setImageBase64(base64)
    }
    reader.readAsDataURL(file)
  }

  async function handleSubmit() {
    if (!imageBase64) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const data = await exploreImage({ imageBase64, mediaType, ageRange })
      setResult(data)
    } catch (err) {
      setError('Something went wrong. Try again.')
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
        <h2 style={{ marginBottom: '1.25rem', fontSize: '1.25rem' }}>Upload something curious</h2>

        <label>Child's age range</label>
        <select value={ageRange} onChange={e => setAgeRange(e.target.value)}>
          <option value="1-2">1 – 2 years</option>
          <option value="2-3">2 – 3 years</option>
          <option value="3-4">3 – 4 years</option>
          <option value="4-5">4 – 5 years</option>
        </select>

        <label>Upload a photo</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />

        {preview && (
          <img
            src={preview}
            alt="preview"
            style={{
              marginTop: '1rem',
              maxWidth: '100%',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)'
            }}
          />
        )}

        <button
          onClick={handleSubmit}
          disabled={!imageBase64 || loading}
          style={{
            width: '100%',
            backgroundColor: 'var(--accent)',
            color: 'white',
            padding: '0.75rem',
            fontSize: '1rem',
            marginTop: '1rem',
            opacity: !imageBase64 ? 0.5 : 1
          }}
        >
          {loading ? 'Exploring...' : 'What is this? 🔍'}
        </button>

        {error && <p style={{ color: '#c0392b', marginTop: '1rem' }}>{error}</p>}
      </div>

      {result && (
        <div style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '1.75rem',
          marginTop: '1rem',
          boxShadow: 'var(--shadow)'
        }}>
          <h3 style={{ color: 'var(--accent)', marginBottom: '0.75rem' }}>{result.what}</h3>
          <p style={{ marginBottom: '1.25rem' }}>{result.explanation}</p>

          <h4 style={{ marginBottom: '0.5rem' }}>A little story... 📖</h4>
          <p style={{
            fontStyle: 'italic',
            padding: '1rem',
            backgroundColor: 'var(--accent-light)',
            borderRadius: '8px',
            marginBottom: '1.25rem'
          }}>{result.story}</p>

          <h4 style={{ marginBottom: '0.5rem' }}>Ask your toddler... 💬</h4>
          <ul style={{ paddingLeft: '1.25rem' }}>
            {result.questions.map((q, i) => (
              <li key={i} style={{ marginBottom: '0.4rem' }}>{q}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}