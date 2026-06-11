"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel"

export interface NewsItem {
  id: string
  category: "EVENT" | "RELEASE" | "UPDATE" | "INFO"
  date: string
  title: string
  description: string
  href: string
  bgColor: string
  logoColor: string
}

const LOGO_MASK_URL = "/images/floset-logo-blue.png"

export interface NewsGalleryProps {
  items?: NewsItem[]
}

const CATEGORY_COLORS: Record<NewsItem["category"], string> = {
  EVENT:   "#e85f0a",
  RELEASE: "#0536f4",
  UPDATE:  "#0aa436",
  INFO:    "#6c3fc7",
}

const COMING_SOON_COPY = {
  title: "準備中",
  description: "最新のお知らせを準備しています。",
  date: "—",
} as const

const defaultItems: NewsItem[] = [
  {
    id: "news-event-01",
    category: "EVENT",
    date: COMING_SOON_COPY.date,
    title: COMING_SOON_COPY.title,
    description: COMING_SOON_COPY.description,
    href: "#",
    bgColor: "#C8FF00",
    logoColor: "#5B0FFF",
  },
  {
    id: "news-release-01",
    category: "RELEASE",
    date: COMING_SOON_COPY.date,
    title: COMING_SOON_COPY.title,
    description: COMING_SOON_COPY.description,
    href: "#",
    bgColor: "#FF2D8A",
    logoColor: "#00F5FF",
  },
  {
    id: "news-update-01",
    category: "UPDATE",
    date: COMING_SOON_COPY.date,
    title: COMING_SOON_COPY.title,
    description: COMING_SOON_COPY.description,
    href: "#",
    bgColor: "#E8D5FF",
    logoColor: "#1A0533",
  },
  {
    id: "news-info-01",
    category: "INFO",
    date: COMING_SOON_COPY.date,
    title: COMING_SOON_COPY.title,
    description: COMING_SOON_COPY.description,
    href: "#",
    bgColor: "#FF5500",
    logoColor: "#FFF8E7",
  },
]

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

const CategoryBadge = ({ category }: { category: NewsItem["category"] }) => (
  <span
    style={{ background: CATEGORY_COLORS[category] }}
    className="inline-block rounded-full px-2.5 py-0.5 text-[9px] font-black tracking-[.14em] uppercase text-white leading-none"
  >
    {category}
  </span>
)

const NewsGallery = ({ items = defaultItems }: NewsGalleryProps) => {
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
    return () => { carouselApi.off("select", update) }
  }, [carouselApi])

  return (
    <section className="pt-10 pb-12" style={{ background: "#dfd6cc" }}>
      {/* header row */}
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

      {/* carousel */}
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
                <div className="group block rounded-2xl">
                  <div
                    className="relative h-full min-h-[26rem] max-w-full overflow-hidden rounded-2xl md:aspect-[5/4] lg:aspect-[4/3]"
                    style={{ background: item.bgColor }}
                  >
                    <div className="absolute inset-x-0 top-0 z-10 flex h-[58%] items-center justify-center">
                      <FlosetLogoMark color={item.logoColor} />
                    </div>
                    {/* gradient overlay — lower half only so logo stays visible */}
                    <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
                    {/* content */}
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
                        className="mb-6 line-clamp-2 text-[13px] leading-relaxed"
                        style={{ color: "rgba(255,255,255,.45)", fontFamily: "Noto Sans JP, sans-serif" }}
                      >
                        {item.description}
                      </p>
                      <p
                        className="text-[12px] font-bold tracking-[.12em] uppercase"
                        style={{ color: "rgba(255,255,255,.45)", fontFamily: "Archivo, sans-serif" }}
                      >
                        Coming Soon
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* dot pagination */}
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
