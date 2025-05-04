import { PlusOutlined } from "@ant-design/icons";
import { LoadingOutlined } from "@ant-design/icons";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/shared/ui/tooltip";
import { Button } from "@/app/shared/ui/button";
import { useUserContext } from "@/app/providers";

interface SubscriptionBadgeProps {
    className?: string;
}


export const SubscriptionBadge: React.FC<SubscriptionBadgeProps> = ({className}) => {
    const { user, openPricingDrawer } = useUserContext();
    
    return (
        <div className={`flex gap-4 justify-between rounded-full bg-accent sm:bg-popover ${className}`}>
            {user ? <div className="flex flex-nowrap gap-4 overflow-hidden">
                <div className="flex items-center text-sm gap-2">
                    <div className='font-bold text-primary'>{user?.models_left || 0}</div>
                    <div>models</div>
                </div>
                <div className="flex items-center text-sm gap-2">
                    <div className='font-bold text-primary'>{user?.generations_left || 0}</div>
                    <div>generations</div>
                </div>
            </div> : <LoadingOutlined />}
            <div className="flex">
                <TooltipProvider>
                    <Tooltip>
                    <TooltipTrigger asChild>
                        <Button 
                        size="icon" 
                        className='rounded-full!' 
                        onClick={openPricingDrawer}
                        disabled={!user}
                        >
                        <PlusOutlined/>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Pay here for subscription</p>
                    </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    )
}