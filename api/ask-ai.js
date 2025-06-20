export default async function handler(req, res) {
  const { mood } = req.body;

  // ⚠️ TEMPORARY — Replace this with your real OpenAI API key
  const key = "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";

  if (!key) {
    return res.status(500).json({ reply: "Missing OpenAI API Key." });
  }

  try {
    const prompt = `Suggest a healing sound frequency or tone to calm someone feeling "${mood}"`;

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
            content: "You are a calming wellness assistant who recommends sound healing tones.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    const data = await openaiRes.json();

    const reply = data?.choices?.[0]?.message?.content?.trim() || "No suggestion received from OpenAI.";
    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ reply: "AI Error: " + error.message });
  }
}
