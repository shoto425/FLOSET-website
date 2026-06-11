"use client"

import React, {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  createContext,
  useContext,
} from "react"
import * as THREE from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Environment, Html, Plane, Sphere } from "@react-three/drei"
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib"
import { Download, Heart, X } from "lucide-react"

/* =========================
   型定義
   ========================= */

type Card = {
  id: string
  imageUrl: string
  alt: string
  title: string
  genre: string
  artist?: string
}

type CardContextType = {
  selectedCard: Card | null
  setSelectedCard: (card: Card | null) => void
  cards: Card[]
}

/* =========================
   FLOSETカードデータ
   ========================= */

const FLOSET_CARDS: Card[] = [
  {
    id: "1",
    imageUrl: "/images/IMG_2843.jpg",
    alt: "J-POP スタイル",
    title: "J-POP",
    genre: "J-POP",
    artist: "YOASOBI",
  },
  {
    id: "2",
    imageUrl: "/images/IMG_2845.jpg",
    alt: "K-POP スタイル",
    title: "K-POP",
    genre: "K-POP",
    artist: "BTS",
  },
  {
    id: "3",
    imageUrl: "/images/IMG_2846.jpg",
    alt: "ROCK スタイル",
    title: "ROCK",
    genre: "ROCK",
    artist: "ONE OK ROCK",
  },
  {
    id: "4",
    imageUrl: "/images/IMG_2847.jpg",
    alt: "RADWIMPS スタイル",
    title: "RADWIMPS",
    genre: "J-ROCK",
    artist: "RADWIMPS",
  },
  {
    id: "5",
    imageUrl: "/images/IMG_2848.jpg",
    alt: "King Gnu スタイル",
    title: "King Gnu",
    genre: "ART ROCK",
    artist: "King Gnu",
  },
  {
    id: "6",
    imageUrl: "/images/IMG_2849.jpg",
    alt: "Vaundy スタイル",
    title: "Vaundy",
    genre: "J-POP",
    artist: "Vaundy",
  },
  {
    id: "7",
    imageUrl: "/images/IMG_2850.jpg",
    alt: "HIP-HOP スタイル",
    title: "HIP-HOP",
    genre: "HIP-HOP",
    artist: "Ado",
  },
  {
    id: "8",
    imageUrl: "/images/IMG_2851.jpg",
    alt: "CITY POP スタイル",
    title: "CITY POP",
    genre: "CITY POP",
  },
  {
    id: "9",
    imageUrl: "/images/IMG_2852.jpg",
    alt: "Mrs. GREEN APPLE スタイル",
    title: "Mrs. GREEN APPLE",
    genre: "J-POP",
    artist: "Mrs. GREEN APPLE",
  },
  {
    id: "10",
    imageUrl: "/images/IMG_2853.jpg",
    alt: "INDIE スタイル",
    title: "INDIE",
    genre: "INDIE",
  },
  {
    id: "11",
    imageUrl: "/images/IMG_2854.jpg",
    alt: "藤井風 スタイル",
    title: "藤井風",
    genre: "J-POP",
    artist: "藤井風",
  },
  {
    id: "12",
    imageUrl: "/images/IMG_2855.jpg",
    alt: "あいみょん スタイル",
    title: "あいみょん",
    genre: "J-POP",
    artist: "あいみょん",
  },
  {
    id: "13",
    imageUrl: "/images/IMG_2856.jpg",
    alt: "PUNK スタイル",
    title: "PUNK",
    genre: "PUNK",
  },
  {
    id: "14",
    imageUrl: "/images/IMG_2857.jpg",
    alt: "Taylor Swift スタイル",
    title: "Taylor Swift",
    genre: "POP",
    artist: "Taylor Swift",
  },
  {
    id: "15",
    imageUrl: "/images/IMG_2858.jpg",
    alt: "R&B スタイル",
    title: "R&B / SOUL",
    genre: "R&B",
  },
  {
    id: "16",
    imageUrl: "/images/IMG_2859.jpg",
    alt: "ELECTRONIC スタイル",
    title: "ELECTRONIC",
    genre: "ELECTRONIC",
  },
  {
    id: "17",
    imageUrl: "/images/IMG_2860.jpg",
    alt: "Ado スタイル",
    title: "Ado",
    genre: "J-POP",
    artist: "Ado",
  },
  {
    id: "18",
    imageUrl: "/images/IMG_2861.jpg",
    alt: "YOASOBI スタイル",
    title: "YOASOBI",
    genre: "J-POP",
    artist: "YOASOBI",
  },
  {
    id: "19",
    imageUrl: "/images/IMG_2862.jpg",
    alt: "METAL スタイル",
    title: "METAL",
    genre: "METAL",
  },
  {
    id: "20",
    imageUrl: "/images/IMG_2863.jpg",
    alt: "REGGAE スタイル",
    title: "REGGAE",
    genre: "REGGAE",
  },
  {
    id: "21",
    imageUrl: "/images/IMG_2864.jpg",
    alt: "JAZZ スタイル",
    title: "JAZZ",
    genre: "JAZZ",
  },
  {
    id: "22",
    imageUrl: "/images/IMG_2865.jpg",
    alt: "スピッツ スタイル",
    title: "スピッツ",
    genre: "J-ROCK",
    artist: "スピッツ",
  },
  {
    id: "23",
    imageUrl: "/images/IMG_2866.jpg",
    alt: "BUMP OF CHICKEN スタイル",
    title: "BUMP OF CHICKEN",
    genre: "J-ROCK",
    artist: "BUMP OF CHICKEN",
  },
]

/* =========================
   ジャンルカラーマップ
   ========================= */

const GENRE_COLORS: Record<string, string> = {
  "J-POP":      "#4666ff",
  "K-POP":      "#ff4d9e",
  "ROCK":       "#ff6b35",
  "J-ROCK":     "#ff6b35",
  "ART ROCK":   "#9b59b6",
  "HIP-HOP":    "#f1c40f",
  "CITY POP":   "#1abc9c",
  "INDIE":      "#95a5a6",
  "PUNK":       "#e74c3c",
  "POP":        "#3498db",
  "R&B":        "#e67e22",
  "ELECTRONIC": "#00d4ff",
  "METAL":      "#7f8c8d",
  "REGGAE":     "#27ae60",
  "JAZZ":       "#d4ac0d",
}

const getGenreColor = (genre: string) => GENRE_COLORS[genre] ?? "#4666ff"

/* =========================
   Card Context
   ========================= */

const CardContext = createContext<CardContextType | undefined>(undefined)

function useCard() {
  const ctx = useContext(CardContext)
  if (!ctx) throw new Error("useCard must be used within CardProvider")
  return ctx
}

function CardProvider({ children }: { children: React.ReactNode }) {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)
  return (
    <CardContext.Provider value={{ selectedCard, setSelectedCard, cards: FLOSET_CARDS }}>
      {children}
    </CardContext.Provider>
  )
}

/* =========================
   Starfield Background
   ========================= */

function StarfieldBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x0a0a0a, 1)
    mountRef.current.appendChild(renderer.domElement)

    const starsGeometry = new THREE.BufferGeometry()
    const starsCount = 12000
    const positions = new Float32Array(starsCount * 3)
    const colors = new Float32Array(starsCount * 3)
    for (let i = 0; i < starsCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000
      // たまに青っぽい星
      const r = Math.random()
      colors[i * 3] = r > 0.9 ? 0.5 : 1
      colors[i * 3 + 1] = r > 0.9 ? 0.7 : 1
      colors[i * 3 + 2] = 1
    }
    starsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    starsGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    const starsMaterial = new THREE.PointsMaterial({
      size: 0.6,
      sizeAttenuation: true,
      vertexColors: true,
    })
    const stars = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(stars)

    camera.position.z = 10

    let animationId = 0
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      stars.rotation.y += 0.00008
      stars.rotation.x += 0.00004
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
      starsGeometry.dispose()
      starsMaterial.dispose()
    }
  }, [])

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full z-0" />
}

/* =========================
   Floating Card
   ========================= */

type Position = {
  x: number; y: number; z: number
  rotationX: number; rotationY: number; rotationZ: number
}

function FloatingCard({ card, position }: { card: Card; position: Position }) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const { setSelectedCard } = useCard()
  const genreColor = getGenreColor(card.genre)

  useFrame(({ camera }) => {
    groupRef.current?.lookAt(camera.position)
  })

  return (
    <group ref={groupRef} position={[position.x, position.y, position.z]}>
      <Plane
        args={[4.5, 6.5]}
        onClick={(e) => { e.stopPropagation(); setSelectedCard(card) }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer" }}
        onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = "auto" }}
      >
        <meshBasicMaterial transparent opacity={0} />
      </Plane>

      <Html
        transform
        distanceFactor={10}
        position={[0, 0, 0.01]}
        style={{
          transition: "all 0.3s ease",
          transform: hovered ? "scale(1.18)" : "scale(1)",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: "160px",
            height: "220px",
            borderRadius: "12px",
            overflow: "hidden",
            background: "#111",
            padding: "10px",
            boxShadow: hovered
              ? `0 25px 50px ${genreColor}66, 0 0 30px ${genreColor}44`
              : "0 15px 30px rgba(0,0,0,0.7)",
            border: hovered
              ? `2px solid ${genreColor}99`
              : "1px solid rgba(255,255,255,0.08)",
            userSelect: "none",
          }}
        >
          <img
            src={card.imageUrl}
            alt={card.alt}
            style={{ width: "100%", height: "172px", objectFit: "cover", borderRadius: "8px", display: "block" }}
            loading="lazy"
            draggable={false}
          />
          <div style={{ marginTop: "8px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <span
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: genreColor,
                letterSpacing: "1.2px",
                textTransform: "uppercase",
                textAlign: "center",
              }}
            >
              {card.genre}
            </span>
          </div>
        </div>
      </Html>
    </group>
  )
}

/* =========================
   Card Modal
   ========================= */

function CardModal() {
  const { selectedCard, setSelectedCard } = useCard()
  const [isFavorited, setIsFavorited] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsFavorited(false)
  }, [selectedCard])

  if (!selectedCard) return null

  const genreColor = getGenreColor(selectedCard.genre)

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const rotateX = ((e.clientY - rect.top - rect.height / 2) / 15)
    const rotateY = ((rect.width / 2 - (e.clientX - rect.left)) / 15)
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 0.5s ease-out"
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)"
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) setSelectedCard(null) }}
    >
      <div className="relative max-w-md w-full mx-4">
        <button
          onClick={() => setSelectedCard(null)}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
        >
          <X className="w-8 h-8" />
        </button>

        <div style={{ perspective: "1000px" }} className="w-full">
          <div
            ref={cardRef}
            className="relative cursor-pointer rounded-2xl p-4 transition-all duration-500 ease-out w-full"
            style={{
              background: "#111",
              transformStyle: "preserve-3d",
              boxShadow: `0 40px 80px rgba(0,0,0,0.6), 0 0 60px ${genreColor}22`,
              border: `1px solid ${genreColor}44`,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* ジャンルバッジ */}
            <div className="flex items-center gap-2 mb-3">
              <span
                className="text-xs font-bold px-3 py-1 rounded-full"
                style={{ background: `${genreColor}22`, color: genreColor, border: `1px solid ${genreColor}55` }}
              >
                {selectedCard.genre}
              </span>
              {selectedCard.artist && (
                <span className="text-xs text-white/50">#{selectedCard.artist}</span>
              )}
            </div>

            <div className="relative w-full mb-4" style={{ aspectRatio: "3/4" }}>
              <img
                loading="lazy"
                className="absolute inset-0 h-full w-full rounded-xl object-cover"
                alt={selectedCard.alt}
                src={selectedCard.imageUrl}
              />
            </div>

            <h3 className="text-white text-lg font-bold mb-1 text-center">{selectedCard.title}</h3>
            {selectedCard.artist && (
              <p className="text-center text-sm mb-4" style={{ color: genreColor }}>
                {selectedCard.artist}
              </p>
            )}

            <div className="flex gap-2">
              <button
                type="button"
                className="inline-flex h-10 flex-1 items-center justify-center rounded-xl text-sm font-bold text-white transition duration-200 hover:opacity-80 active:scale-[0.97]"
                style={{ background: genreColor }}
              >
                <Download className="h-4 w-4 mr-1.5" strokeWidth={2} />
                このスタイルを見る
              </button>
              <button
                type="button"
                onClick={() => setIsFavorited((v) => !v)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-white transition duration-200 hover:opacity-80 active:scale-[0.97]"
                style={{ background: genreColor }}
              >
                <Heart
                  className="h-4 w-4"
                  strokeWidth={2}
                  fill={isFavorited ? "currentColor" : "none"}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* =========================
   Card Galaxy
   ========================= */

function CardGalaxy() {
  const { cards } = useCard()

  const cardPositions = useMemo<Position[]>(() => {
    const positions: Position[] = []
    const numCards = cards.length
    const goldenRatio = (1 + Math.sqrt(5)) / 2

    for (let i = 0; i < numCards; i++) {
      const y = 1 - (i / (numCards - 1)) * 2
      const radiusAtY = Math.sqrt(1 - y * y)
      const theta = (2 * Math.PI * i) / goldenRatio
      const x = Math.cos(theta) * radiusAtY
      const z = Math.sin(theta) * radiusAtY
      const layerRadius = 12 + (i % 3) * 4

      positions.push({
        x: x * layerRadius,
        y: y * layerRadius,
        z: z * layerRadius,
        rotationX: Math.atan2(z, Math.sqrt(x * x + y * y)),
        rotationY: Math.atan2(x, z),
        rotationZ: (Math.random() - 0.5) * 0.2,
      })
    }
    return positions
  }, [cards.length])

  return (
    <>
      {/* 中心球体 */}
      <Sphere args={[1.5, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#4666ff" transparent opacity={0.12} wireframe />
      </Sphere>
      <Sphere args={[12, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#4666ff" transparent opacity={0.04} wireframe />
      </Sphere>
      <Sphere args={[16, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#09ac43" transparent opacity={0.025} wireframe />
      </Sphere>
      <Sphere args={[20, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#4666ff" transparent opacity={0.015} wireframe />
      </Sphere>

      {cards.map((card, i) => (
        <FloatingCard key={card.id} card={card} position={cardPositions[i]} />
      ))}
    </>
  )
}

/* =========================
   ズーム限界で親ページへスクロールを渡す
   ========================= */

const MIN_ZOOM_DISTANCE = 5
const MAX_ZOOM_DISTANCE = 45
const ZOOM_EDGE_EPSILON = 0.35

function GalleryScrollHandoff({ controlsRef }: { controlsRef: React.RefObject<OrbitControlsImpl | null> }) {
  const { camera, gl } = useThree()

  useEffect(() => {
    const canvas = gl.domElement

    const onWheel = (e: WheelEvent) => {
      const controls = controlsRef.current
      if (!controls) return

      const distance = camera.position.distanceTo(controls.target)
      const zoomingOut = e.deltaY > 0
      const zoomingIn = e.deltaY < 0
      const atMaxZoomOut = distance >= MAX_ZOOM_DISTANCE - ZOOM_EDGE_EPSILON
      const atMaxZoomIn = distance <= MIN_ZOOM_DISTANCE + ZOOM_EDGE_EPSILON

      if ((zoomingOut && atMaxZoomOut) || (zoomingIn && atMaxZoomIn)) {
        e.preventDefault()
        e.stopImmediatePropagation()
        if (window.parent !== window) {
          window.parent.postMessage({ type: "gallery-scroll-pass", deltaY: e.deltaY }, "*")
        }
      }
    }

    canvas.addEventListener("wheel", onWheel, { capture: true, passive: false })
    return () => canvas.removeEventListener("wheel", onWheel, { capture: true })
  }, [camera, gl, controlsRef])

  return null
}

/* =========================
   メインコンポーネント
   ========================= */

export default function StellarCardGallerySingle() {
  const controlsRef = useRef<OrbitControlsImpl>(null)

  return (
    <CardProvider>
      <div className="w-full h-screen relative overflow-hidden" style={{ background: "#0a0a0a" }}>
        <StarfieldBackground />

        <Canvas
          camera={{ position: [0, 0, 18], fov: 60 }}
          className="absolute inset-0 z-10"
          onCreated={({ gl }) => {
            gl.domElement.style.pointerEvents = "auto"
          }}
        >
          <Suspense fallback={null}>
            <Environment preset="night" />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={0.8} color="#4666ff" />
            <pointLight position={[-10, -10, -10]} intensity={0.4} color="#09ac43" />
            <CardGalaxy />
            <OrbitControls
              ref={controlsRef}
              enablePan
              enableZoom
              enableRotate
              minDistance={MIN_ZOOM_DISTANCE}
              maxDistance={MAX_ZOOM_DISTANCE}
              autoRotate
              autoRotateSpeed={0.4}
              rotateSpeed={0.5}
              zoomSpeed={1.2}
              panSpeed={0.8}
              target={[0, 0, 0]}
            />
            <GalleryScrollHandoff controlsRef={controlsRef} />
          </Suspense>
        </Canvas>

        <CardModal />

        {/* ヘッダーUI */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none">
          <h1
            className="text-3xl font-black mb-1 tracking-widest"
            style={{ fontFamily: "Impact, Arial Black, sans-serif", color: "#4666ff" }}
          >
            FLOSET
          </h1>
          <p className="text-xs text-white/40 mb-3" style={{ letterSpacing: "0.3em" }}>
            音楽から、服と出会う。
          </p>
          <p className="text-xs text-white/30">
            ドラッグで回転 · スクロールでズーム · カードをクリック
          </p>
        </div>
      </div>
    </CardProvider>
  )
}
