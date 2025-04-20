import React from "react"
import { cn } from "@/app/shared/lib/utils"

interface GlowingBlobProps {
  size?: number 
  color?: string
  className?: string
  blur?: number
  opacity?: number
}

export function GlowingBlob({
  size = 400,
  color = "bg-fuchsia-500",
  blur = 120,
  opacity = 0.5,
  className = "",
}: GlowingBlobProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute -z-10",
        className
      )}
      style={{
        width: size,
        height: size,
        filter: `blur(${blur}px)`,
        opacity: opacity,
      }}
    >
      <div className={cn("rounded-full", color, "w-full h-full")} />
    </div>
  )
}
