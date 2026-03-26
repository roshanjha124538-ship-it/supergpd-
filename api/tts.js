export default async function handler(req, res) {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text required" });
    }

    const response = await fetch(
      "https://api.elevenlabs.io/v1/text-to-speech/YOUR_VOICE_ID",
      {
        method: "POST",
        headers: {
          "xi-api-key": process.env.ELEVENLABS_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          model_id: "eleven_multilingual_v2",
        }),
      }
    );

    if (!response.ok) {
      return res.status(500).json({ error: "TTS failed" });
    }

    const audio = await response.arrayBuffer();

    res.setHeader("Content-Type", "audio/mpeg");
    res.send(Buffer.from(audio));

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
                                   }
