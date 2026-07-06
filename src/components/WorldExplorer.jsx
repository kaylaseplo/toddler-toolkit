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
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <h2>What is THAT?</h2>

      <label>Child's age range</label>
      <select value={ageRange} onChange={e => setAgeRange(e.target.value)}>
        <option value="1-2">1 - 2 years</option>
        <option value="2-3">2 - 3 years</option>
        <option value="3-4">3 - 4 years</option>
        <option value="4-5">4 - 5 years</option>
      </select>

      <div style={{ marginTop: '1rem' }}>
        <label>Upload a photo</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>

      {preview && (
        <img
          src={preview}
          alt="preview"
          style={{ marginTop: '1rem', maxWidth: '100%', borderRadius: '8px' }}
        />
      )}

      <button
        onClick={handleSubmit}
        disabled={!imageBase64 || loading}
        style={{ marginTop: '1rem' }}
      >
        {loading ? 'Exploring...' : 'What is this?'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {result && (
        <div style={{ marginTop: '2rem' }}>
          <h3>{result.what}</h3>
          <p>{result.explanation}</p>

          <h4>A little story...</h4>
          <p style={{ fontStyle: 'italic' }}>{result.story}</p>

          <h4>Ask your toddler...</h4>
          <ul>
            {result.questions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}