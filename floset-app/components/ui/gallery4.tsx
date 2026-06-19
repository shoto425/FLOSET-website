"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { getNewsCarouselItems, type NewsArticle } from "@/lib/news-data"

const LOGO_MASK_URL = "/images/floset-logo-blue.png"

const CATEGORY_COLORS: Record<NewsArticle["category"], string> = {
  EVENT: "#e85f0a",
  RELEASE: "#0536f4",
  UPDATE: "#0aa436",
  INFO: "#6c3fc7",
}

const FlosetLogoMark = ({ color }: { color: string }) => (
  <div
    role="img"
    aria-label="FLOSET"
    className="w-[78%] max-w-[240px] aspect-[1067/349] transition-transform duration-500 group-hover:scale-105"
    style={{
      backgroundColor: color,
      WebkitMaskImage: `url(${LOGO_MASK_URL})`,
      maskImage: `url(${LOGO_MASK_URL})`,
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
    }}
  />
)

const CategoryBadge = ({ category }: { category: NewsArticle["category"] }) => (
  <span
    style={{ background: CATEGORY_COLORS[category] }}
    className="inline-block rounded-full px-2.5 py-0.5 text-[9px] font-black tracking-[.14em] uppercase text-white leading-none"
  >
    {category}
  </span>
)

const NewsCard = ({ item }: { item: NewsArticle }) => {
  const cardInner = (
    <div
      className="relative h-full min-h-[26rem] max-w-full overflow-hidden rounded-2xl md:aspect-[5/4] lg:aspect-[4/3]"
      style={{ background: item.bgColor }}
    >
      <div className="absolute inset-x-0 top-0 z-10 flex h-[58%] items-center justify-center overflow-hidden">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <FlosetLogoMark color={item.logoColor} />
        )}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-start p-6 md:p-7">
        <div className="mb-2 flex items-center gap-2">
          <CategoryBadge category={item.category} />
          <span
            className="text-[11px] font-semibold tracking-[.06em]"
            style={{ color: "rgba(255,255,255,.45)", fontFamily: "Archivo, sans-serif" }}
          >
            {item.date}
          </span>
        </div>
        <p
          className="mb-3 text-lg font-extrabold leading-snug md:text-xl"
          style={{
            color: "rgba(255,255,255,.95)",
            fontFamily: "Archivo, sans-serif",
            letterSpacing: "-0.01em",
          }}
        >
          {item.title}
        </p>
        <p
          className="mb-6 line-clamp-3 text-[13px] leading-relaxed"
          style={{ color: "rgba(255,255,255,.45)", fontFamily: "Noto Sans JP, sans-serif" }}
        >
          {item.description}
        </p>
        <div
          className="flex items-center gap-2 text-[12px] font-bold tracking-[.1em] uppercase transition-all duration-300 group-hover:gap-3"
          style={{ color: "rgba(255,255,255,.6)", fontFamily: "Archivo, sans-serif" }}
        >
          {item.published ? (
            <>
              詳細を見る
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </>
          ) : (
            "Coming Soon"
          )}
        </div>
      </div>
    </div>
  )

  if (item.published) {
    return (
      <a
        href={`/news/${item.slug}`}
        target="_top"
        rel="noopener noreferrer"
        className="group block rounded-2xl"
      >
        {cardInner}
      </a>
    )
  }

  return <div className="group block rounded-2xl">{cardInner}</div>
}

const NewsGallery = () => {
  const items = getNewsCarouselItems()
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (!carouselApi) return
    const update = () => {
      setCanScrollPrev(carouselApi.canScrollPrev())
      setCanScrollNext(carouselApi.canScrollNext())
      setCurrentSlide(carouselApi.selectedScrollSnap())
    }
    update()
    carouselApi.on("select", update)
    return () => {
      carouselApi.off("select", update)
    }
  }, [carouselApi])

  return (
    <section className="pt-10 pb-12" style={{ background: "#dfd6cc" }}>
      <div className="mx-auto mb-8 flex items-end justify-between px-6 md:px-12 lg:px-16 max-w-[1180px]">
        <div className="flex flex-col gap-3">
          <p
            className="text-[11px] font-black tracking-[.22em] uppercase"
            style={{ color: "#0536f4", fontFamily: "Archivo, sans-serif" }}
          >
            Latest News
          </p>
          <h2
            className="text-4xl font-black italic md:text-5xl lg:text-6xl"
            style={{
              fontFamily: '"Archivo", "Noto Sans JP", sans-serif',
              color: "#14110f",
              lineHeight: 0.88,
              letterSpacing: "-0.035em",
            }}
          >
            NEWS
          </h2>
        </div>
        <div className="hidden shrink-0 gap-2 md:flex">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => carouselApi?.scrollPrev()}
            disabled={!canScrollPrev}
            style={{ color: canScrollPrev ? "rgba(20,17,15,.7)" : "rgba(20,17,15,.2)" }}
          >
            <ArrowLeft className="size-5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => carouselApi?.scrollNext()}
            disabled={!canScrollNext}
            style={{ color: canScrollNext ? "rgba(20,17,15,.7)" : "rgba(20,17,15,.2)" }}
          >
            <ArrowRight className="size-5" />
          </Button>
        </div>
      </div>

      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: { "(max-width: 768px)": { dragFree: true } },
          }}
        >
          <CarouselContent className="ml-0 px-6 md:px-12 lg:px-16 2xl:ml-[max(4rem,calc(50vw-590px))]">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="max-w-[300px] pl-[20px] md:max-w-[340px] lg:max-w-[380px]"
              >
                <NewsCard item={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-8 flex justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`スライド ${index + 1} へ`}
              className="rounded-full transition-all duration-300"
              style={{
                width: currentSlide === index ? "20px" : "8px",
                height: "8px",
                background: currentSlide === index ? "#0536f4" : "rgba(20,17,15,.15)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export { NewsGallery }
