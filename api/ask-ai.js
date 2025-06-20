export default async function handler(req, res) {
  const { mood } = req.body;
  const key = process.env.OPENAI_API_KEY;

  if (!key) {
    return res.status(500).json({ reply: "Missing OpenAI API Key." });
  }

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content: "You are a relaxation assistant that suggests healing sound frequencies.",
          },
          {
            role: "user",
            content: `What healing sound or frequency would you suggest to someone feeling "${mood}"?`,
          },
        ],
      }),
    });

    const data = await openaiRes.json();

    if (data?.choices?.[0]?.message?.content) {
      res.status(200).json({ reply: data.choices[0].message.content.trim() });
    } else {
      res.status(200).json({ reply: "No AI response received from OpenAI." });
    }
  } catch (err) {
    res.status(500).json({ reply: "AI Error: " + err.message });
  }
}
