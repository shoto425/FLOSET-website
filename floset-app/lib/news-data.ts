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
  {
    id: "tongali-mitsui-fudosan-2026",
    slug: "tongali-mitsui-fudosan-2026",
    category: "INFO",
    date: "2026.06.20",
    title: "Tongali ビジネスプランコンテスト2026にて三井不動産賞を受賞しました",
    description:
      "FLOSETは、2026年6月20日に開催された「Tongali ビジネスプランコンテスト2026」において、三井不動産賞を受賞しました。",
    imageUrl: "/images/news/tongali-mitsui-fudosan-2026.png",
    bgColor: "#1a1410",
    logoColor: "#ffffff",
    published: true,
    body: {
      lead: [
        "FLOSETは、2026年6月20日に開催された「Tongali ビジネスプランコンテスト2026」において、三井不動産賞を受賞しました。",
        "FLOSETは、「音楽から、服と出会う。」をコンセプトに、好きな音楽やカルチャーを起点として、自分らしい服と出会える新しい体験をつくるアプリです。",
      ],
      closing: [
        "今回の受賞を励みに、音楽・服・人が自然に混ざり合うカルチャーを、デジタルとリアルの両方で広げていきます。",
        "日頃より応援・ご協力いただいている皆さまに、心より感謝申し上げます。",
        "これからのFLOSETにも、ぜひご期待ください。",
      ],
      sections: [
        {
          heading: "受賞概要",
          items: [
            { label: "イベント名", value: "Tongali ビジネスプランコンテスト2026" },
            { label: "受賞", value: "三井不動産賞" },
            { label: "開催日", value: "2026年6月20日" },
          ],
        },
      ],
    },
  },
  {
    id: "staps-station-ai-2026",
    slug: "staps-station-ai-2026",
    category: "INFO",
    date: "2026.03.15",
    title: "STAPS 2026にてSTATION Ai賞を受賞しました",
    description:
      "FLOSETは、2026年3月15日（日）に開催された、STATION Ai主催の学生起業家・スタートアップ育成プログラム「STAPS 2026」において、STATION Ai賞を受賞しました。",
    imageUrl: "/images/news/staps-station-ai-2026.png",
    bgColor: "#0a2540",
    logoColor: "#ffffff",
    published: true,
    body: {
      lead: [
        "FLOSETは、2026年3月15日（日）に開催された、STATION Ai主催の学生起業家・スタートアップ育成プログラム「STAPS 2026」において、STATION Ai賞を受賞しました。",
        "FLOSETは、「音楽から、服と出会う。」をコンセプトに、好きな音楽やカルチャーを起点として、自分らしい一着と出会えるファッション探索アプリです。",
        "プログラム期間中は、事業アイデアの壁打ちやユーザー検証を重ね、届けたいユーザー像をより具体化してきました。その結果、アプリ経由で購入ページへ遷移したユーザーのうち、4.3%が購入に至る実証結果を得ることができました。",
      ],
      closing: [
        "今回の受賞により、STATION Aiへの入居をはじめ、CatapultおよびPITCH&MEETUPへの登壇機会をいただきました。",
        "この機会を力に変え、音楽・服・人が自然に混ざり合い、新しいカルチャーが生まれる場として、FLOSETをより多くの人へ届けていきます。",
        "日頃より応援・ご協力いただいている皆さまに、心より感謝申し上げます。",
        "これからのFLOSETにも、ぜひご期待ください。",
      ],
      sections: [
        {
          heading: "受賞概要",
          items: [
            { label: "プログラム名", value: "STAPS 2026（STATION Ai Program for Students）" },
            { label: "主催", value: "STATION Ai" },
            { label: "受賞", value: "STATION Ai賞" },
            { label: "開催日", value: "2026年3月15日（日）" },
          ],
        },
      ],
    },
  },
  {
    id: "100-program-grand-prize-2026",
    slug: "100-program-grand-prize-2026",
    category: "INFO",
    date: "2026.03.29",
    title: "東京大学発「100 Program」最終発表にて最優秀賞を受賞しました",
    description:
      "FLOSETは、2026年3月29日（日）に行われた、学生のプロダクト開発を支援する「100 Program」最終発表において、最優秀賞を受賞しました。",
    imageUrl: "/images/news/100-program-grand-prize-2026.png",
    bgColor: "#1a1535",
    logoColor: "#ff6b35",
    published: true,
    body: {
      lead: [
        "FLOSETは、2026年3月29日（日）に行われた、学生のプロダクト開発を支援する「100 Program」最終発表において、最優秀賞を受賞しました。",
        "受賞したプロジェクトは、「音楽から、服と出会うアプリ」です。",
        "FLOSETは、「音楽から、服と出会う。」をコンセプトに、好きな音楽やカルチャーを起点として、自分らしい一着と出会えるファッション探索アプリです。",
        "アイデアを形にすることから始まり、チームでの開発と検証を重ねるなかで、音楽とファッションをつなぐ新しい体験の可能性を提案しました。",
      ],
      closing: [
        "今回の受賞を励みに、音楽・服・人が自然に混ざり合い、新しいカルチャーが生まれる場として、FLOSETをより多くの人へ届けていきます。",
        "日頃より応援・ご協力いただいている皆さまに、心より感謝申し上げます。",
        "これからのFLOSETにも、ぜひご期待ください。",
      ],
      sections: [
        {
          heading: "受賞概要",
          items: [
            { label: "プログラム名", value: "100 Program" },
            { label: "主催", value: "東京大学発" },
            { label: "受賞", value: "最優秀賞" },
            { label: "開催日", value: "2026年3月29日（日）" },
          ],
        },
      ],
    },
  },
]

const COMING_SOON_PLACEHOLDERS: NewsArticle[] = []

export function getNewsArticle(slug: string) {
  return NEWS_ARTICLES.find((article) => article.slug === slug)
}

export function getNewsCarouselItems(): NewsArticle[] {
  return [...NEWS_ARTICLES, ...COMING_SOON_PLACEHOLDERS]
}
