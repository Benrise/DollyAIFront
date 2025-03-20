import { PlusOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd"
import { LoadingOutlined } from "@ant-design/icons";

import { useUserContext } from "@/app/providers";

const { Text } = Typography;


export function SubscriptionBadge() {
    const { user, openPricingDrawer } = useUserContext();
    
    return (
        <div className="px-10">
            <div className="flex gap-2 pl-4 pr-2 py-2 justify-between rounded-full w-full bg-indigo-100">
            {user ? <div className="flex flex-nowrap gap-4 overflow-hidden">
                <div className="flex items-center gap-1">
                    <Text ellipsis className='font-bold text-indigo-500!'>{user?.models_left || 0}</Text>
                    <Text ellipsis>models</Text>
                </div>
                <div className="flex items-center gap-1">
                    <Text ellipsis className='font-bold text-indigo-500!'>{user?.generations_left || 0}</Text>
                    <Text ellipsis>generations</Text>
                </div>
            </div> : <LoadingOutlined />}
            <div className="flex">
                <Button type="primary" size="middle" className='rounded-full!' onClick={openPricingDrawer} icon={<PlusOutlined/>}/>
            </div>
            </div>
        </div> 
    )
}