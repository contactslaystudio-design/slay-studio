"use client"
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const liquidbuttonVariants = cva(
  "inline-flex items-center transition-colors justify-center cursor-pointer gap-2 whitespace-nowrap rounded-full text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-bordeaux",
  {
    variants: {
      variant: {
        default: "bg-white/10 hover:bg-white/25 hover:scale-105 duration-300 transition text-primary backdrop-blur-sm",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-4 py-2", sm: "h-8 text-xs px-4", lg: "h-10 px-6",
        xl: "h-12 px-8", xxl: "h-14 px-10 text-base font-semibold", icon: "size-9",
      },
    },
    defaultVariants: { variant: "default", size: "xxl" },
  }
)

function LiquidButton({ className, variant, size, asChild = false, children, ...props }: React.ComponentProps<"button"> & VariantProps<typeof liquidbuttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp data-slot="button" className={cn("relative", liquidbuttonVariants({ variant, size, className }))} {...props}>
      <div className="absolute inset-0 z-0 rounded-full shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(255,255,255,0.4),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.2),inset_0_0_6px_6px_rgba(255,255,255,0.08)] transition-all" />
      <div className="absolute inset-0 isolate -z-10 overflow-hidden rounded-full" style={{ backdropFilter: 'blur(8px) url("#container-glass")' }} />
      <span className="pointer-events-none relative z-10">{children}</span>
      <svg className="hidden" aria-hidden><defs><filter id="container-glass" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="0.05 0.05" numOctaves="1" seed="1" result="turbulence" /><feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" /><feDisplacementMap in="SourceGraphic" in2="blurredNoise" scale="70" xChannelSelector="R" yChannelSelector="B" result="displaced" /><feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" /><feComposite in="finalBlur" in2="finalBlur" operator="over" /></filter></defs></svg>
    </Comp>
  )
}

export { LiquidButton, liquidbuttonVariants }
