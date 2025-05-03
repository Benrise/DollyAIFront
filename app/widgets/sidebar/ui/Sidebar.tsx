import { Button } from "@/app/shared/ui/button"
import { PanelLeft, PanelLeftClose } from "lucide-react"
import { useState } from "react"
import { useAutoAnimate } from "@formkit/auto-animate/react"

interface SideBarProps {
    className?: string
    contentComponent: React.ReactNode
    bottomComponent: React.ReactNode
    bottomCollapsedComponent: React.ReactNode
    title?: string
}

export const Sidebar: React.FC<SideBarProps> = ({
    className = "",
    contentComponent,
    bottomComponent,
    bottomCollapsedComponent,
    title = "History"
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [parent] = useAutoAnimate()

    const toggleSidebar = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div
            className={`flex flex-col justify-between h-full bg-background p-4 gap-4 rounded-2xl overflow-hidden transition-all duration-300 ease-in-out ${className} ${
                isOpen ? "w-[324px]" : "w-[68px]"
            }`}
        >
            <div ref={parent} className="flex justify-between items-center">
                {isOpen ? (
                    <>
                        <h2 className="text-lg font-semibold">{title}</h2>
                        <Button variant={'ghost'} size="icon" onClick={toggleSidebar}>
                            <PanelLeftClose className="h-5 w-5" />
                        </Button>
                    </>
                ) : (
                    <Button variant={'ghost'} size="icon" onClick={toggleSidebar}>
                        <PanelLeft className="h-5 w-5" />
                    </Button>
                )}
            </div>
            {isOpen && (
                <div className="flex-1 overflow-y-auto">
                    {contentComponent}
                </div>
            )}
            <div>
                {isOpen 
                    ? bottomComponent
                    : bottomCollapsedComponent
                }
            </div>
        </div>
    )
}