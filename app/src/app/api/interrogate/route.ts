import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { systemPrompt, history } = await req.json();

    // Use Pollinations free API (same as other projects)
    const messages = [
      {
        role: "system",
        content: `${systemPrompt}\n\nRules: Roman Urdu mein jawab do (jaise Pakistani log baat karte hain). 2-3 jumlon se zyada lamba jawab mat do. Kabhi ye mat batao ke tum AI ho. Tum sirf apne character mein raho.`,
      },
      ...history.slice(-8), // last 8 messages for context
    ];

    const res = await fetch("https://text.pollinations.ai/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages,
        model: "openai",
      }),
    });

    if (!res.ok) throw new Error("AI failed");

    const reply = await res.text();
    return NextResponse.json({ reply: reply.trim() });
  } catch (e) {
    return NextResponse.json(
      { reply: "(kuch garbar hui, dubara pucho)" },
      { status: 200 }
    );
  }
}
