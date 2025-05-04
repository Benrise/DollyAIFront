import React from "react"
import { cn } from "@/app/shared/lib/utils"
import { useTheme } from "next-themes"

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
  const { theme } = useTheme()
  
  const isDarkTheme = theme === 'dark';
  
  return (
    isDarkTheme &&
    <div
      className={cn(
        "pointer-events-none absolute",
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
