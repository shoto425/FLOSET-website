import type { Metadata } from "next"

import { getNewsArticle } from "@/lib/news-data"

type NewsArticleLayoutProps = {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = getNewsArticle(slug)

  if (!article || !article.published) {
    return { title: "News — FLOSET" }
  }

  return {
    title: `${article.title} — FLOSET`,
    description: article.description,
  }
}

export default function NewsArticleLayout({ children }: NewsArticleLayoutProps) {
  return <>{children}</>
}
