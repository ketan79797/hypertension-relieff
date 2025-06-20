export default async function handler(req, res) {
  try {
    const { mood } = req.body;
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    if (!OPENAI_API_KEY) {
      return res.status(500).json({ reply: "Missing OpenAI API Key." });
    }

    const prompt = `Suggest a healing sound frequency or music tone for someone who is feeling: ${mood}`;

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    const data = await openaiRes.json();

    const reply =
      data.choices && data.choices[0]?.message?.content
        ? data.choices[0].message.content
        : "No suggestion received from OpenAI.";

    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ reply: "AI Error: " + error.message });
  }
}
