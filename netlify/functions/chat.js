const LANGUAGES = {
  en: 'English', hi: 'Hindi', bn: 'Bengali', te: 'Telugu', mr: 'Marathi', ta: 'Tamil', gu: 'Gujarati',
  kn: 'Kannada', ml: 'Malayalam', pa: 'Punjabi', or: 'Odia', as: 'Assamese', ur: 'Urdu'
};

const SYSTEM_PROMPT = `You are JanSetu AI, a clear and compassionate guide for Indian citizens.
Help only with government welfare schemes, scholarships, agriculture and farm subsidies, simple eligibility guidance, application steps, and grievance escalation for delayed DBT or stuck applications. Use the information supplied by the user cautiously: do not invent scheme rules, deadlines, amounts, or government contacts. Encourage users to verify current details on an official department website.
Never request Aadhaar numbers, bank account details, OTPs, passwords, or other sensitive personal data. For emergencies, advise contacting relevant official services.
Always say, briefly and naturally, that JanSetu is an independent prototype and not an official government portal. Reply in the user's requested Indian language, using simple citizen-friendly wording.`;

export default async function handler(request) {
  if (request.method !== 'POST') return Response.json({ error: 'Method not allowed' }, { status: 405 });
  const body = await request.json().catch(() => null);
  if (body?.mode === 'translate-ui') return translateUI(body);
  if (!body || !Array.isArray(body.messages) || body.messages.length === 0) {
    return Response.json({ error: 'A chat message is required.' }, { status: 400 });
  }
  const language = LANGUAGES[body.language] || LANGUAGES.en;
  const messages = body.messages.slice(-8).map((message) => ({
    role: message.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: String(message.content || '').slice(0, 1200) }]
  }));
  const apiKey = process.env.GEMINI_API_KEY;
  const baseUrl = process.env.GOOGLE_GEMINI_BASE_URL;
  if (!apiKey || !baseUrl) {
    return Response.json({ error: 'AI Gateway is not enabled for this Netlify site yet.' }, { status: 503 });
  }
  try {
    const endpoint = `${baseUrl.replace(/\/$/, '')}/v1beta/models/gemini-2.5-flash:generateContent`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: `${SYSTEM_PROMPT}\nRequested reply language: ${language}.` }] },
        contents: messages,
        generationConfig: { temperature: 0.35, maxOutputTokens: 500 }
      })
    });
    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('').trim();
    if (!response.ok || !reply) throw new Error(data.error?.message || 'No response from AI Gateway');
    return Response.json({ reply });
  } catch (error) {
    console.error('JanSetu chat error', error);
    return Response.json({ error: 'The assistant is temporarily unavailable. Please try again.' }, { status: 502 });
  }
}

async function translateUI(body) {
  const language = LANGUAGES[body.language] || LANGUAGES.en;
  const texts = Array.isArray(body.texts) ? body.texts.slice(0, 220).map((text) => String(text).slice(0, 500)) : [];
  if (!texts.length) return Response.json({ translations: [] });
  const apiKey = process.env.GEMINI_API_KEY;
  const baseUrl = process.env.GOOGLE_GEMINI_BASE_URL;
  if (!apiKey || !baseUrl) return Response.json({ error: 'AI Gateway is not enabled for this Netlify site yet.' }, { status: 503 });
  try {
    const endpoint = `${baseUrl.replace(/\/$/, '')}/v1beta/models/gemini-2.5-flash:generateContent`;
    const prompt = `Translate every item in this JSON array from English into natural, simple ${language} for an Indian citizen-services website. Preserve brand names, URLs, numbers, abbreviations such as DBT, and HTML-free text. Return ONLY a JSON array with exactly the same number and order of strings.\n\n${JSON.stringify(texts)}`;
    const response = await fetch(endpoint, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: prompt }] }], generationConfig: { temperature: 0.1, maxOutputTokens: 8000, responseMimeType: 'application/json' } })
    });
    const data = await response.json();
    const raw = data.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('').trim();
    const translations = JSON.parse(raw);
    if (!response.ok || !Array.isArray(translations) || translations.length !== texts.length) throw new Error('Invalid translation response');
    return Response.json({ translations });
  } catch (error) {
    console.error('JanSetu UI translation error', error);
    return Response.json({ error: 'Translations are temporarily unavailable.' }, { status: 502 });
  }
}

export const config = { path: '/api/chat' };
