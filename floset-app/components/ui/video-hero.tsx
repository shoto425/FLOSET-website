"use client"

import { useEffect, useRef, useState } from "react"

export default function VideoHero({ onScrollToGallery }: { onScrollToGallery?: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [textVisible, setTextVisible] = useState(false)

  // スクロール追従: ビデオズーム＋フェード
  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const sectionH = section.offsetHeight
      const progress = Math.max(0, Math.min(1, -rect.top / sectionH))
      setScrollProgress(progress)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // テキストリビール: ロード後に遅延表示
  useEffect(() => {
    const t = setTimeout(() => setTextVisible(true), 300)
    return () => clearTimeout(t)
  }, [])

  // ビデオ自動再生
  useEffect(() => {
    videoRef.current?.play().catch(() => {})
  }, [])

  const videoScale = 1 + scrollProgress * 0.18
  const heroOpacity = 1 - scrollProgress * 1.6
  const videoOpacity = 1 - scrollProgress * 0.85

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ background: "#050505" }}
    >
      {/* ── ビデオ背景 ── */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `scale(${videoScale})`,
          transformOrigin: "center center",
          opacity: videoOpacity,
          transition: "opacity 0.05s linear",
          willChange: "transform, opacity",
        }}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          // ← ここに実際の動画パスを入れる (例: src="/video/floset-bg.mp4")
          // 動画がない場合はグラデーションアニメが背景として表示される
        />
        {/* 動画がない場合のシネマティックグラデーション背景 */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 120% 80% at 50% 30%, rgba(70,102,255,0.18) 0%, transparent 55%),
              radial-gradient(ellipse 60% 60% at 20% 80%, rgba(9,172,67,0.09) 0%, transparent 50%),
              radial-gradient(ellipse 80% 60% at 80% 60%, rgba(13,109,221,0.1) 0%, transparent 50%),
              linear-gradient(180deg, #04040a 0%, #080815 40%, #050510 100%)
            `,
            animation: "bgShift 12s ease-in-out infinite alternate",
          }}
        />
        {/* グレインテクスチャ */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* ── 上下グラデーションオーバーレイ ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(4,4,10,0.35) 0%, transparent 30%, transparent 60%, rgba(4,4,10,0.95) 100%)",
        }}
      />

      {/* ── ヒーローコンテンツ ── */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center z-10"
        style={{ opacity: heroOpacity, transition: "opacity 0.05s linear" }}
      >
        {/* バッジ */}
        <div
          style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.9s cubic-bezier(0.4,0,0.2,1) 0.1s, transform 0.9s cubic-bezier(0.4,0,0.2,1) 0.1s",
          }}
          className="flex items-center gap-2 mb-8"
        >
          <span
            className="text-xs font-bold tracking-[4px] uppercase px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(70,102,255,0.12)",
              border: "1px solid rgba(70,102,255,0.3)",
              color: "#7a9aff",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#09ac43",
                marginRight: 8,
                animation: "pulse 2s infinite",
                verticalAlign: "middle",
              }}
            />
            Coming Soon
          </span>
        </div>

        {/* メインロゴ */}
        <div className="overflow-hidden mb-4">
          <h1
            style={{
              fontFamily: "Impact, Arial Black, sans-serif",
              fontSize: "clamp(80px, 16vw, 220px)",
              lineHeight: 0.88,
              letterSpacing: "-2px",
              color: "#fff",
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? "translateY(0)" : "translateY(100%)",
              transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.25s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.25s",
            }}
          >
            FLOS<span style={{ color: "#4666ff" }}>E</span>T
          </h1>
        </div>

        {/* 日本語タグライン */}
        <div className="overflow-hidden mb-10">
          <p
            style={{
              fontFamily: "'Noto Sans JP', sans-serif",
              fontSize: "clamp(11px, 1.2vw, 14px)",
              letterSpacing: "0.55em",
              color: "rgba(255,255,255,0.28)",
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? "translateY(0)" : "translateY(100%)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.5s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.5s",
            }}
          >
            音　楽　か　ら　、　服　と　出　会　う　。
          </p>
        </div>

        {/* キャッチコピー */}
        <div
          style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.9s cubic-bezier(0.4,0,0.2,1) 0.65s, transform 0.9s cubic-bezier(0.4,0,0.2,1) 0.65s",
            textAlign: "center",
            marginBottom: "48px",
          }}
        >
          <p
            style={{
              fontSize: "clamp(14px, 1.6vw, 18px)",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.8,
              maxWidth: 520,
              margin: "0 auto",
              fontWeight: 300,
            }}
          >
            好きなアーティストを入力するだけ。<br />
            AIがあなたの音楽感性を読み解き、<br />
            <span style={{ color: "rgba(70,102,255,0.9)", fontWeight: 500 }}>
              あなただけのスタイル
            </span>
            を提案します。
          </p>
        </div>

        {/* CTAボタン */}
        <div
          style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.9s cubic-bezier(0.4,0,0.2,1) 0.85s, transform 0.9s cubic-bezier(0.4,0,0.2,1) 0.85s",
            display: "flex",
            gap: 14,
          }}
        >
          <button
            onClick={onScrollToGallery}
            style={{
              background: "#4666ff",
              color: "#fff",
              border: "none",
              borderRadius: 100,
              padding: "14px 32px",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              letterSpacing: "0.5px",
              transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
              boxShadow: "0 0 40px rgba(70,102,255,0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px) scale(1.04)"
              e.currentTarget.style.boxShadow = "0 16px 40px rgba(70,102,255,0.45)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)"
              e.currentTarget.style.boxShadow = "0 0 40px rgba(70,102,255,0.3)"
            }}
          >
            ギャラリーを体験する
          </button>
          <button
            style={{
              background: "rgba(255,255,255,0.06)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 100,
              padding: "14px 32px",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              backdropFilter: "blur(8px)",
              transition: "all 0.25s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)"
              e.currentTarget.style.transform = "translateY(-2px)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.06)"
              e.currentTarget.style.transform = "translateY(0)"
            }}
          >
            事前登録する
          </button>
        </div>
      </div>

      {/* ── スクロールインジケーター ── */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        style={{
          opacity: textVisible ? Math.max(0, 1 - scrollProgress * 4) : 0,
          transition: textVisible ? "none" : "opacity 0.9s 1.2s",
          color: "rgba(255,255,255,0.2)",
          fontSize: 9,
          letterSpacing: "3px",
        }}
      >
        <div
          style={{
            width: 1,
            height: 40,
            background: "linear-gradient(to bottom, #4666ff, transparent)",
            animation: "scrollPulse 2s infinite",
          }}
        />
        SCROLL
      </div>

      <style>{`
        @keyframes bgShift {
          0%   { filter: hue-rotate(0deg) brightness(1); }
          50%  { filter: hue-rotate(15deg) brightness(1.05); }
          100% { filter: hue-rotate(-10deg) brightness(0.95); }
        }
        @keyframes pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.4; transform:scale(1.4); }
        }
        @keyframes scrollPulse {
          0%   { transform:scaleY(0); transform-origin:top; }
          50%  { transform:scaleY(1); transform-origin:top; }
          50.01% { transform:scaleY(1); transform-origin:bottom; }
          100% { transform:scaleY(0); transform-origin:bottom; }
        }
      `}</style>
    </section>
  )
}
