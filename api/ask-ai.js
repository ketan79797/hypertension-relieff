export default async function handler(req, res) {
  const { mood } = req.body;
  const key = process.env.OPENAI_API_KEY;
  if (!key) return res.status(500).json({ reply: "Missing API Key" });

  const prompt = `Suggest a healing frequency for someone feeling: ${mood}`;
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      })
    });
    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No response from AI.";
    res.status(200).json({ reply });
  } catch (err) {
    res.status(500).json({ reply: "API Error: " + err.message });
  }
}
