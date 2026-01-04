import { useRef, useEffect, useState } from "react";
import Card from "../Card";

interface ScrollableCardsProps {
  cards: Array<{ Icon: React.ElementType; text: string }>;
}

/**
 * ScrollableCards component
 *
 * Displays a scrollable list of cards with intersection observer
 * animations. Cards fade in and slide up as they enter the viewport.
 *
 * Features:
 * - Intersection Observer for scroll-triggered animations
 * - Staggered animation delays for visual appeal
 * - Responsive grid/flex layout
 *
 * @param props - ScrollableCardsProps containing cards array
 */
export default function ScrollableCards({ cards }: ScrollableCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cardElements = Array.from(container.querySelectorAll("[data-scroll-card]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardElements.indexOf(entry.target as HTMLElement);
            if (index !== -1) {
              setVisibleCards((prev) => {
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    cardElements.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col md:flex-row gap-4 justify-center items-center md:items-stretch"
    >
      {cards.map((card, index) => (
        <div
          key={index}
          data-scroll-card
          className={`translate-y-8 transition-transform duration-300 ease-out ${
            visibleCards[index] ? "translate-y-0 animate-fade-in-up" : ""
          }`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <Card Icon={card.Icon} text={card.text} />
        </div>
      ))}
    </div>
  );
}
