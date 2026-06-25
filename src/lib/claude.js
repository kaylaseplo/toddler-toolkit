import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true
})

export async function generateActivities({ ageRange, energyLevel, timeAvailable, location, supplies, needsParent }) {
  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `You are a helpful assistant for busy parents of toddlers. Generate 3 activity ideas based on the following:
        
- Child's age range: ${ageRange}
- Energy level: ${energyLevel}
- Time available: ${timeAvailable}
- Indoor or outdoor: ${location}
- Supplies available: ${supplies}
- Needs a parent: ${needsParent}

Respond ONLY with a JSON array, no markdown, no explanation. Format:
[
  {
    "name": "Activity name",
    "instructions": ["step 1", "step 2", "step 3"],
    "why": "Why this works for this age and energy level"
  }
]`
      }
    ]
  })

  const text = message.content[0].text
  return JSON.parse(text)
}