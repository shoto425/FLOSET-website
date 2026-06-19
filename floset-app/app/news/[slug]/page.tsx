import { notFound } from "next/navigation"

import { getNewsArticle } from "@/lib/news-data"

type NewsDetailPageProps = {
  params: Promise<{ slug: string }>
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params
  const article = getNewsArticle(slug)

  if (!article || !article.published) notFound()

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#efe5da",
        color: "#14110f",
        fontFamily: '"Noto Sans JP", system-ui, sans-serif',
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px clamp(20px, 5vw, 48px)",
          borderBottom: "1px solid rgba(20,17,15,.08)",
          background: "rgba(239,229,218,.96)",
        }}
      >
        <a href="/">
          <img src="/assets/logo_blue.png" alt="FLOSET" style={{ height: 28, width: "auto", display: "block" }} />
        </a>
        <span
          style={{
            fontFamily: "Archivo, sans-serif",
            fontWeight: 800,
            fontSize: 11,
            letterSpacing: ".18em",
            textTransform: "uppercase",
            color: "#0536f4",
          }}
        >
          {article.category}
        </span>
      </header>

      <article>
        <section
          style={{
            padding: "clamp(40px, 7vw, 72px) clamp(20px, 5vw, 48px) clamp(28px, 4vw, 40px)",
            maxWidth: 920,
            marginInline: "auto",
          }}
        >
          <p
            style={{
              fontFamily: "Archivo, sans-serif",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: ".14em",
              color: "#8a8178",
              marginBottom: 16,
            }}
          >
            {article.date}
          </p>
          <h1
            style={{
              fontFamily: '"Archivo", "Noto Sans JP", sans-serif',
              fontWeight: 900,
              fontStyle: "italic",
              fontSize: "clamp(32px, 6vw, 56px)",
              lineHeight: 1.08,
              letterSpacing: "-.02em",
              marginBottom: 0,
            }}
          >
            {article.title}
          </h1>
        </section>

        {article.imageUrl && (
          <section style={{ maxWidth: 760, margin: "0 auto", padding: "0 clamp(20px, 5vw, 48px) 40px" }}>
            <div
              style={{
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: "0 20px 48px rgba(20,17,15,.16)",
              }}
            >
              <img
                src={article.imageUrl}
                alt={article.title}
                style={{ width: "100%", display: "block" }}
              />
            </div>
          </section>
        )}

        <section
          style={{
            maxWidth: 720,
            marginInline: "auto",
            padding: "clamp(32px, 5vw, 56px) clamp(20px, 5vw, 48px)",
            fontSize: "clamp(15px, 2vw, 17px)",
            lineHeight: 2,
            color: "#3a3733",
          }}
        >
          {article.body.lead.map((paragraph, index) => (
            <p key={paragraph} style={{ marginTop: index === 0 ? 0 : "1.5em" }}>
              {paragraph}
            </p>
          ))}
        </section>

        {article.body.highlights && article.body.highlights.length > 0 && (
          <section
            style={{
              maxWidth: 720,
              marginInline: "auto",
              padding: "0 clamp(20px, 5vw, 48px) clamp(32px, 5vw, 48px)",
            }}
          >
            {article.body.highlights.map((text) => (
              <p
                key={text}
                style={{
                  fontFamily: '"Archivo", "Noto Sans JP", sans-serif',
                  fontWeight: 800,
                  fontSize: "clamp(18px, 3vw, 24px)",
                  lineHeight: 1.55,
                  color: "#14110f",
                  marginBottom: 14,
                }}
              >
                「{text}」
              </p>
            ))}
          </section>
        )}

        {article.body.closing && (
          <section
            style={{
              maxWidth: 720,
              marginInline: "auto",
              padding: "0 clamp(20px, 5vw, 48px) clamp(40px, 6vw, 64px)",
              fontSize: "clamp(15px, 2vw, 17px)",
              lineHeight: 2,
              color: "#3a3733",
            }}
          >
            {article.body.closing.map((paragraph, index) => (
              <p key={paragraph} style={{ marginTop: index === 0 ? 0 : "1.5em" }}>
                {paragraph}
              </p>
            ))}
          </section>
        )}

        {article.body.sections?.map((section) => (
          <section
            key={section.heading}
            style={{
              maxWidth: 720,
              marginInline: "auto",
              padding: "clamp(36px, 5vw, 52px) clamp(20px, 5vw, 48px)",
              borderTop: "1px solid #e7dccd",
            }}
          >
            <h2
              style={{
                fontFamily: '"Archivo", "Noto Sans JP", sans-serif',
                fontWeight: 800,
                fontSize: "clamp(18px, 2.5vw, 22px)",
                marginBottom: 24,
              }}
            >
              {section.heading}
            </h2>
            <dl style={{ display: "grid", gap: 20 }}>
              {section.items.map((item) => (
                <div key={item.label}>
                  <dt
                    style={{
                      fontFamily: "Archivo, sans-serif",
                      fontWeight: 800,
                      fontSize: 11,
                      letterSpacing: ".14em",
                      textTransform: "uppercase",
                      color: "#0536f4",
                      marginBottom: 8,
                    }}
                  >
                    {item.label}
                  </dt>
                  <dd style={{ fontSize: 16, lineHeight: 1.8, color: "#3a3733" }}>{item.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </article>

      <footer
        style={{
          marginTop: 48,
          padding: "32px clamp(20px, 5vw, 48px) 48px",
          borderTop: "1px solid #e7dccd",
          textAlign: "center",
        }}
      >
        <a href="/" style={{ display: "inline-block", marginBottom: 12 }}>
          <img src="/assets/logo_blue.png" alt="FLOSET" style={{ height: 24, width: "auto" }} />
        </a>
        <p style={{ fontSize: 12, color: "#8a8178" }}>© FLOSET All Rights Reserved.</p>
      </footer>
    </div>
  )
}
