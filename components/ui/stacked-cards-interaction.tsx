"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";

const Card = ({ className, image, children }: { className?: string; image?: string; children?: React.ReactNode }) => {
  return (
    <div className={cn("w-[300px] cursor-pointer h-[360px] overflow-hidden bg-white rounded-2xl shadow-[0_0_10px_rgba(0,0,0,0.06)] border border-gray-200/80", className)}>
      {image && (
        <div className="relative h-64 rounded-xl shadow-lg overflow-hidden w-[calc(100%-1rem)] mx-2 mt-2">
          <img src={image} alt="card" className="object-cover w-full h-full" />
        </div>
      )}
      {children && <div className="px-4 pt-3 flex flex-col gap-y-1">{children}</div>}
    </div>
  );
};

interface CardData { image: string; title: string; description: string }

const StackedCardsInteraction = ({
  cards,
  spreadDistance = 45,
  rotationAngle = 6,
}: {
  cards: CardData[];
  spreadDistance?: number;
  rotationAngle?: number;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const limitedCards = cards.slice(0, 3);

  const orderedCards = [
    ...limitedCards.slice(activeIndex),
    ...limitedCards.slice(0, activeIndex),
  ];

  const getOffset = (index: number) => {
    if (index === 0) return { x: 0, rotate: 0 };
    if (index === 1) return { x: -spreadDistance, rotate: -rotationAngle };
    return { x: spreadDistance, rotate: rotationAngle };
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-[300px] h-[360px]">
        {orderedCards.map((card, index) => {
          const isFirst = index === 0;
          const { x, rotate } = getOffset(index);
          return (
            <motion.div
              key={card.title}
              className="absolute"
              style={{ zIndex: isFirst ? 10 : index === 1 ? 5 : 0 }}
              animate={{ x, rotate }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              onClick={() => {
                if (!isFirst) {
                  const originalIndex = limitedCards.findIndex(c => c.title === card.title);
                  setActiveIndex(originalIndex);
                }
              }}
            >
              <Card image={card.image}>
                <h3 className="font-display text-base text-encre font-bold">{card.title}</h3>
                <p className="text-xs text-encre/50">{card.description}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export { StackedCardsInteraction, Card };
