import { Button } from "@/app/shared/ui/button"
import { PanelLeft, PanelLeftClose, User } from "lucide-react"
import { useState } from "react"
import { UserBadge } from "@/app/entities/user"
import { useAutoAnimate } from "@formkit/auto-animate/react"

interface SideBarProps {
    className?: string
}

export const Sidebar: React.FC<SideBarProps> = ({className}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [parent] = useAutoAnimate();

    const toggleSidebar = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div
            className={`flex flex-col justify-between h-full bg-background p-4 gap-4 rounded-2xl overflow-hidden transition-all duration-300 ease-in-out ${className} ${
                isOpen ? "w-[296px]" : "w-[68px]"
            }`}
        >
            <div ref={parent} className="flex justify-between items-center">
                {isOpen ? (
                    <>
                        <h2 className="text-lg font-semibold">History</h2>
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
                    <div className="grid grid-cols-2 gap-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((item) => (
                            <div key={item} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                                <span className="text-xs text-muted-foreground">Изображение {item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            { isOpen ? <UserBadge/> : <Button variant={'ghost'} size={'icon'}><User/></Button>}
        </div>
    )
}