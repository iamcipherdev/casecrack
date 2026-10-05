import Link from "next/link";
import { CASES } from "@/data/cases";

export default function Home() {
  return (
    <main className="min-h-screen pb-20">
      {/* Crime scene tape top */}
      <div className="tape h-6 w-full" />

      <div className="mx-auto max-w-lg px-5 pt-8">
        {/* Header */}
        <div className="text-center">
          <div className="stamp inline-block px-4 py-1 text-sm">
            Case File #001-005
          </div>
          <h1 className="mt-4 text-5xl font-black tracking-tight">
            CASE<span className="text-[#ff2d55]">CRACK</span>
          </h1>
          <p className="mt-2 text-zinc-400">
            Tum detective. AI tumhara assistant. 🔍
          </p>
        </div>

        {/* Mode select */}
        <div className="mt-8 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-[#23232e] bg-[#12121a] p-4 text-center">
            <div className="text-3xl">🕵️</div>
            <div className="mt-1 font-bold">Solo</div>
            <div className="text-xs text-zinc-500">Akele solve karo</div>
          </div>
          <div className="rounded-2xl border border-[#ff2d55]/40 bg-[#12121a] p-4 text-center glow-red">
            <div className="text-3xl">👥</div>
            <div className="mt-1 font-bold">Partner</div>
            <div className="text-xs text-zinc-500">Dost ke saath solve karo</div>
          </div>
        </div>

        {/* Cases */}
        <h2 className="mt-10 mb-4 text-xl font-black uppercase tracking-wider">
          📁 Open Cases
        </h2>
        <div className="space-y-4">
          {CASES.map((c, i) => (
            <Link
              key={c.id}
              href={`/case/${c.id}`}
              className="block overflow-hidden rounded-2xl border border-[#23232e] bg-[#12121a] transition-transform active:scale-[0.98]"
            >
              <div className="relative h-40 scanlines">
                <img
                  src={c.scene}
                  alt={c.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute top-3 left-3 rounded bg-black/70 px-2 py-1 text-xs font-mono">
                  #{String(i + 1).padStart(3, "0")}
                </div>
                <div className="absolute top-3 right-3 rounded bg-black/70 px-2 py-1 text-xs">
                  {"⭐".repeat(c.difficulty)}
                </div>
                <div className="absolute bottom-3 left-4 right-4">
                  <div className="text-2xl font-black">
                    {c.emoji} {c.title}
                  </div>
                  <div className="text-xs text-zinc-400">{c.timeEstimate}</div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-zinc-400 line-clamp-2">{c.story}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-zinc-500">
                    {c.suspects.length} suspects • {c.clues.length} clues
                  </span>
                  <span className="font-bold text-[#ff2d55] text-sm">
                    INVESTIGATE →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-zinc-600">
          Har case mein ek mujrim hai. Saboot dhoondo. Jhoot pakro. Case crack karo.
        </p>
      </div>

      {/* Crime scene tape bottom */}
      <div className="tape h-6 w-full mt-12" />
    </main>
  );
}
