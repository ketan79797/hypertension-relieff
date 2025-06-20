
import React, { useState } from "react";

export default function App() {
  const [mood, setMood] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const handleAskAI = async () => {
    if (!mood) return;
    try {
      const response = await fetch("/api/ask-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood }),
      });
      const data = await response.json();
      setSuggestion(data.reply || "No AI suggestion received.");
    } catch (err) {
      setSuggestion("AI Error: " + err.message);
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>Hypertension Relief AI</h1>
      <input
        type="text"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        placeholder="Enter your mood (e.g. stressed)"
        style={{ padding: "0.5rem", width: "300px" }}
      />
      <button onClick={handleAskAI} style={{ marginLeft: "1rem", padding: "0.5rem 1rem" }}>
        Ask AI
      </button>
      {suggestion && <p style={{ marginTop: "1rem" }}><strong>AI Suggestion:</strong> {suggestion}</p>}
    </div>
  );
}
