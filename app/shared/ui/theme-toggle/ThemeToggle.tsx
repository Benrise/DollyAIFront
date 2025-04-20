"use client"

import * as React from "react"
import { Moon, Sun, Laptop2 } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/app/shared/ui/button"

const THEMES = ["light", "dark", "system"] as const

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const getNextTheme = () => {
    const currentIndex = THEMES.indexOf((theme as typeof THEMES[number]) || "system")
    const nextIndex = (currentIndex + 1) % THEMES.length
    return THEMES[nextIndex]
  }

  const handleToggle = () => {
    const nextTheme = getNextTheme()
    setTheme(nextTheme)
  }

  const renderIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-5 w-5" />
      case "dark":
        return <Moon className="h-5 w-5" />
      default:
        return <Laptop2 className="h-5 w-5" />
    }
  }

  return (
    <Button variant="outline" size="icon" onClick={handleToggle}>
      {renderIcon()}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
