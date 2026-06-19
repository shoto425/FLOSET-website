export type NewsCategory = "EVENT" | "RELEASE" | "UPDATE" | "INFO"

export interface NewsArticle {
  id: string
  slug: string
  category: NewsCategory
  date: string
  title: string
  description: string
  imageUrl?: string
  bgColor: string
  logoColor: string
  published: boolean
  body: {
    lead: string[]
    highlights?: string[]
    sections?: {
      heading: string
      items: { label: string; value: string }[]
    }[]
    closing?: string[]
  }
}

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: "kozarocks-2026",
    slug: "kozarocks-2026",
    category: "EVENT",
    date: "2026.06.20",
    title: "FLOSET、KOZAROCKS 2026への出店が決定しました",
    description:
      "FLOSETは、2026年7月10日（金）・11日（土）に開催される「KOZAROCKS Conference & Festival 2026」への出店が決定しました。音楽から服と出会うFLOSETの体験を、沖縄・コザの会場でお届けします。",
    imageUrl: "/images/news/kozarocks-2026.png",
    bgColor: "#2B0A4A",
    logoColor: "#00F5FF",
    published: true,
    body: {
      lead: [
        "音楽から、服と出会う。",
        "FLOSETは、2026年7月10日（金）・11日（土）に開催される KOZAROCKS Conference & Festival 2026 への出店が決定しました。",
        "KOZAROCKSは、沖縄・コザを舞台に、音楽、スタートアップ、カルチャー、エンターテインメントが交差するカンファレンス＆フェスティバルです。",
        "今回FLOSETでは、来場者が自分の好きな音楽や感性をもとに、ファッションとの新しい出会いを体験できるブースを展開します。",
      ],
      highlights: [
        "好きな音楽から、自分らしい服を見つける",
        "音楽の趣味をきっかけに、まだ知らないスタイルと出会う",
      ],
      closing: [
        "そんなFLOSETならではの体験を、KOZAROCKSの会場でお届けします。",
        "当日は、FLOSETのアプリ体験をはじめ、会場限定の企画も準備予定です。",
        "詳細はFLOSET公式サイト・Instagramにて順次お知らせいたします。",
      ],
      sections: [
        {
          heading: "開催概要",
          items: [
            { label: "イベント名", value: "KOZAROCKS Conference & Festival 2026" },
            { label: "開催日", value: "2026年7月10日（金）〜 7月11日（土）" },
            { label: "会場", value: "Koza Startup Arcade / コザ・ミュージックタウン音市場" },
            { label: "出店内容", value: "FLOSETアプリ体験ブース / 音楽からファッションと出会う体験コンテンツ" },
          ],
        },
      ],
    },
  },
]

const COMING_SOON_PLACEHOLDERS: NewsArticle[] = [
  {
    id: "news-release-01",
    slug: "release-01",
    category: "RELEASE",
    date: "—",
    title: "準備中",
    description: "最新のお知らせを準備しています。",
    bgColor: "#FF2D8A",
    logoColor: "#00F5FF",
    published: false,
    body: { lead: [] },
  },
  {
    id: "news-update-01",
    slug: "update-01",
    category: "UPDATE",
    date: "—",
    title: "準備中",
    description: "最新のお知らせを準備しています。",
    bgColor: "#E8D5FF",
    logoColor: "#1A0533",
    published: false,
    body: { lead: [] },
  },
  {
    id: "news-info-01",
    slug: "info-01",
    category: "INFO",
    date: "—",
    title: "準備中",
    description: "最新のお知らせを準備しています。",
    bgColor: "#FF5500",
    logoColor: "#FFF8E7",
    published: false,
    body: { lead: [] },
  },
]

export function getNewsArticle(slug: string) {
  return NEWS_ARTICLES.find((article) => article.slug === slug)
}

export function getNewsCarouselItems(): NewsArticle[] {
  return [...NEWS_ARTICLES, ...COMING_SOON_PLACEHOLDERS]
}
