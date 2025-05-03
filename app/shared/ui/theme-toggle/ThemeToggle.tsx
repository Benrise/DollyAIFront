"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/app/shared/ui/button"

const THEMES = ["light", "dark"] as const

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()

  const getNextTheme = () => {
    const currentIndex = THEMES.indexOf((theme as typeof THEMES[number]) || "light")
    const nextIndex = (currentIndex + 1) % THEMES.length
    return THEMES[nextIndex]
  }

  const handleToggle = () => {
    const nextTheme = getNextTheme()
    setTheme(nextTheme)
  }

  const renderIcon = () => {
    return theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />
  }

  return (
    <Button className={className} variant="ghost" size="icon" onClick={handleToggle}>
      {renderIcon()}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}