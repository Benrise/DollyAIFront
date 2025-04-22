import { PlusOutlined } from "@ant-design/icons";
import { LoadingOutlined } from "@ant-design/icons";

import { Button } from "@/app/shared/ui/button";
import { useUserContext } from "@/app/providers";


export function SubscriptionBadge() {
    const { user, openPricingDrawer } = useUserContext();
    
    return (
        <div className="px-4 sm:px-10">
            <div className="flex gap-2 pl-4 pr-2 py-2 justify-between rounded-full w-full bg-accent">
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
                <Button size="icon" className='rounded-full!' onClick={openPricingDrawer}><PlusOutlined/></Button>
            </div>
            </div>
        </div> 
    )
}