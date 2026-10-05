"use client";

import { use, useState } from "react";
import Link from "next/link";
import { CASES } from "@/data/cases";
import { notFound } from "next/navigation";

interface ChatMsg {
  from: "you" | "suspect";
  text: string;
}

export default function CasePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const found = CASES.find((c) => c.id === id);
  if (!found) notFound();
  const gameCase = found;

  const [tab, setTab] = useState<"scene" | "suspects" | "clues" | "solve">("scene");
  const [activeSuspect, setActiveSuspect] = useState(0);
  const [chats, setChats] = useState<Record<string, ChatMsg[]>>({});
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [foundClues, setFoundClues] = useState<string[]>([]);
  const [accused, setAccused] = useState<string | null>(null);
  const [solved, setSolved] = useState<boolean | null>(null);

  const suspect = gameCase.suspects[activeSuspect];
  const messages = chats[suspect.id] || [];

  async function sendMessage() {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    const newChats = {
      ...chats,
      [suspect.id]: [...messages, { from: "you" as const, text: userMsg }],
    };
    setChats(newChats);
    setLoading(true);

    try {
      const res = await fetch("/api/interrogate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemPrompt: suspect.systemPrompt,
          history: newChats[suspect.id].map((m) => ({
            role: m.from === "you" ? "user" : "assistant",
            content: m.text,
          })),
        }),
      });
      const data = await res.json();
      setChats({
        ...newChats,
        [suspect.id]: [
          ...newChats[suspect.id],
          { from: "suspect" as const, text: data.reply || "…" },
        ],
      });
    } catch {
      setChats({
        ...newChats,
        [suspect.id]: [
          ...newChats[suspect.id],
          { from: "suspect" as const, text: "(jawab nahi aya, dubara try karo)" },
        ],
      });
    }
    setLoading(false);
  }

  function toggleClue(id: string) {
    setFoundClues((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }

  function submitAccusation(suspectId: string) {
    setAccused(suspectId);
    setSolved(suspectId === gameCase.solution.culpritId);
    setTab("solve");
  }

  return (
    <main className="min-h-screen pb-24">
      <div className="tape h-4 w-full" />
      <div className="mx-auto max-w-lg px-5 pt-4">
        <Link href="/" className="text-sm text-zinc-500">
          ← All cases
        </Link>
        <h1 className="mt-2 text-3xl font-black">
          {gameCase.emoji} {gameCase.title}
        </h1>
        <p className="text-sm text-zinc-500">
          Victim: {gameCase.victim} • {"⭐".repeat(gameCase.difficulty)}
        </p>

        {/* Tabs */}
        <div className="mt-4 grid grid-cols-4 gap-1 rounded-xl bg-[#12121a] p-1">
          {(
            [
              ["scene", "📸 Scene"],
              ["suspects", "🗣️ Suspects"],
              ["clues", `📌 Clues (${foundClues.length})`],
              ["solve", "⚖️ Solve"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`rounded-lg px-1 py-2 text-xs font-bold ${
                tab === key ? "bg-[#ff2d55] text-white" : "text-zinc-400"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* SCENE */}
        {tab === "scene" && (
          <div className="mt-4">
            <div className="relative overflow-hidden rounded-2xl scanlines">
              <img src={gameCase.scene} alt="Crime scene" className="w-full" />
              <div className="absolute top-3 left-3 stamp bg-black/60 px-3 py-1 text-xs">
                Evidence
              </div>
            </div>
            <div className="mt-4 rounded-2xl border border-[#23232e] bg-[#12121a] p-4">
              <div className="font-typewriter text-sm leading-relaxed text-zinc-300">
                {gameCase.story}
              </div>
            </div>
            <button
              onClick={() => setTab("suspects")}
              className="mt-4 w-full rounded-xl bg-[#ff2d55] py-3 font-black"
            >
              Suspects se pucho →
            </button>
          </div>
        )}

        {/* SUSPECTS */}
        {tab === "suspects" && (
          <div className="mt-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {gameCase.suspects.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSuspect(i)}
                  className={`shrink-0 rounded-xl border p-3 text-center ${
                    activeSuspect === i
                      ? "border-[#ff2d55] bg-[#ff2d55]/10"
                      : "border-[#23232e] bg-[#12121a]"
                  }`}
                >
                  <div className="text-3xl">{s.avatar}</div>
                  <div className="mt-1 text-xs font-bold">{s.name}</div>
                  <div className="text-[10px] text-zinc-500">{s.role}</div>
                </button>
              ))}
            </div>

            <div className="mt-2 rounded-2xl border border-[#23232e] bg-[#12121a] p-3">
              <div className="text-sm">
                <span className="font-bold">{suspect.name}</span>
                <span className="text-zinc-500"> • {suspect.role}</span>
              </div>
              <div className="text-xs text-zinc-500 italic">
                "{suspect.personality}" • Alibi: {suspect.alibi}
              </div>
            </div>

            <div className="mt-3 h-64 space-y-2 overflow-y-auto rounded-2xl border border-[#23232e] bg-black/40 p-3">
              {messages.length === 0 && (
                <p className="text-center text-xs text-zinc-600 pt-20">
                  Sawal pucho... jhoot pakro 👀
                </p>
              )}
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                    m.from === "you"
                      ? "ml-auto bg-[#ff2d55]/20 text-right"
                      : "bg-[#1a1a24]"
                  }`}
                >
                  {m.text}
                </div>
              ))}
              {loading && (
                <div className="text-xs text-zinc-500">likh raha hai…</div>
              )}
            </div>

            <div className="mt-2 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder={`${suspect.name} se pucho...`}
                className="flex-1 rounded-xl border border-[#23232e] bg-[#12121a] px-4 py-3 text-sm outline-none focus:border-[#ff2d55]"
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                className="rounded-xl bg-[#ff2d55] px-5 font-black disabled:opacity-50"
              >
                →
              </button>
            </div>
          </div>
        )}

        {/* CLUES */}
        {tab === "clues" && (
          <div className="mt-4 space-y-3">
            <p className="text-xs text-zinc-500">
              Jo clues mil jayein unhe tap karke pin karo 📌
            </p>
            {gameCase.clues.map((clue) => (
              <button
                key={clue.id}
                onClick={() => toggleClue(clue.id)}
                className={`w-full rounded-2xl border p-4 text-left ${
                  foundClues.includes(clue.id)
                    ? "border-[#ffbf00] bg-[#ffbf00]/10 glow-amber"
                    : "border-[#23232e] bg-[#12121a]"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="font-bold">{clue.title}</div>
                  <div>{foundClues.includes(clue.id) ? "📌" : "○"}</div>
                </div>
                <div className="mt-1 text-sm text-zinc-400">
                  {clue.description}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* SOLVE */}
        {tab === "solve" && (
          <div className="mt-4">
            {solved === null ? (
              <>
                <p className="text-center text-zinc-400">
                  Mujrim kaun hai? Soch samajh kar ilzaam lagao ⚖️
                </p>
                <div className="mt-4 space-y-3">
                  {gameCase.suspects.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => submitAccusation(s.id)}
                      className="w-full rounded-2xl border border-[#23232e] bg-[#12121a] p-4 text-left active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-4xl">{s.avatar}</div>
                        <div>
                          <div className="font-bold">{s.name}</div>
                          <div className="text-xs text-zinc-500">{s.role}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <p className="mt-4 text-center text-xs text-zinc-600">
                  Pinned clues: {foundClues.length}/{gameCase.clues.length}
                </p>
              </>
            ) : (
              <div
                className={`rounded-2xl border p-6 text-center ${
                  solved
                    ? "border-green-500 bg-green-500/10"
                    : "border-[#ff2d55] bg-[#ff2d55]/10"
                }`}
              >
                <div className="text-6xl">{solved ? "🎉" : "💀"}</div>
                <h2 className="mt-2 text-2xl font-black">
                  {solved ? "CASE CRACKED!" : "Galat ilzaam!"}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                  {gameCase.solution.explanation}
                </p>
                <div className="mt-4 rounded-xl bg-black/40 p-3 text-left">
                  <div className="text-xs font-bold text-[#ffbf00]">KEY SABOOT:</div>
                  {gameCase.solution.keyClueIds.map((id) => {
                    const clue = gameCase.clues.find((c) => c.id === id);
                    return (
                      <div key={id} className="mt-1 text-xs text-zinc-400">
                        📌 {clue?.title}
                      </div>
                    );
                  })}
                </div>
                {!solved && (
                  <button
                    onClick={() => {
                      setSolved(null);
                      setAccused(null);
                    }}
                    className="mt-4 w-full rounded-xl bg-[#ff2d55] py-3 font-black"
                  >
                    Dubara try karo
                  </button>
                )}
                <Link
                  href="/"
                  className="mt-3 block text-sm text-zinc-500"
                >
                  ← Agla case
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
