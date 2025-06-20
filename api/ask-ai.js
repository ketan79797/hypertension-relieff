export default async function handler(req, res) {
  try {
    const { mood } = req.body;
    const key = process.env.OPENAI_API_KEY;

    if (!key) {
      return res.status(500).json({ reply: "Missing API Key" });
    }

    const prompt = `Suggest a healing sound frequency or tone to calm someone feeling "${mood}".`;

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await openaiRes.json();

    const reply = data?.choices?.[0]?.message?.content || "No suggestion received from AI.";

    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ reply: "AI Error: " + error.message });
  }
}
