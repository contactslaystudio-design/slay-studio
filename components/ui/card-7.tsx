"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface InteractiveProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  title: string;
  subtitle: string;
  items: { label: string; price: string }[];
  accentColor?: string;
}

export function InteractiveProductCard({
  className, imageUrl, title, subtitle, items, accentColor = "#fae38f", ...props
}: InteractiveProductCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [style, setStyle] = React.useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rotateX = ((y - height / 2) / (height / 2)) * -8;
    const rotateY = ((x - width / 2) / (width / 2)) * 8;
    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`,
      transition: "transform 0.1s ease-out",
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.4s ease-in-out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={cn(
        "relative cursor-pointer flex-shrink-0 flex flex-col",
        "bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.10)]",
        "p-3 pb-5",
        className
      )}
      {...props}
    >
      {/* Photo polaroid */}
      <div className="relative w-full h-44 rounded-xl overflow-hidden mb-4">
        <img src={imageUrl} alt={title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Texte sous la photo — style polaroid */}
      <div className="px-1 flex flex-col flex-1">
        <h3 className="font-display text-base text-encre mb-3 leading-tight">{title}</h3>
        <div className="flex flex-col gap-2">
          {items.map((item, i) => (
            <div key={i} className="flex items-center justify-between border-b border-encre/8 pb-1.5 last:border-0 last:pb-0">
              <span className="text-xs text-encre/60">{item.label}</span>
              <span className="text-sm font-bold text-encre">{item.price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
