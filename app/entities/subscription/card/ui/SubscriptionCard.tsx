import { CheckOutlined } from '@ant-design/icons';
import { ArrowUpRight } from "lucide-react"

import { Button } from '@/app/shared/ui/button';
import { ISubscriptionProduct } from "../model";


interface ISubscriptionCardProps {
    subscription: ISubscriptionProduct;
    onSelect: (subscription: ISubscriptionProduct) => void;
    isActive: boolean;
    className?: string
    actionLabel?: string
    isDisabled?: boolean
    isLoading?: boolean
}


export const SubscriptionCard: React.FC<ISubscriptionCardProps> = ({ subscription, onSelect, isActive, className, actionLabel, isDisabled, isLoading }) => {
    return (
        <>
            <div
              className={`${className} ${
                isActive ? 'border-1 border-primary' : 'border-1 border-border'
              } px-8 py-12 bg-card rounded-2xl flex flex-col justify-between gap-14 min-w-[228px] min-h-[500px] text-foreground`}
            >
                <div className="flex flex-col gap-6">
                    <h2 className='text-2xl md:text-3xl font-bold text-start'>{subscription.nickname}</h2>
                    <div className="flex items-end gap-2 text-primary">
                        <div className="text-5xl font-semibold">${subscription.unit_amount / 100}</div>
                        <p className='font-bold leading-[28px]'>{subscription.recurring.interval}</p>
                    </div>
                    <ul className="text-[16px] mt-4">
                        <li className="flex items-center text-nowrap">
                            <CheckOutlined className="mr-2 text-green-500!" /> Models: {subscription.metadata.models_count}
                        </li>
                        <li className="flex items-center text-nowrap">
                            <CheckOutlined className="mr-2 text-green-500!" /> Generations: {subscription.metadata.generations_count}
                        </li>
                    </ul>
                </div>
                <Button
                    disabled={isDisabled}
                    size='lg'
                    className='w-full'
                    onClick={() => onSelect(subscription)}
                    isLoading={isLoading}
                >
                    {actionLabel || `Get ${subscription.nickname}`}
                    <ArrowUpRight className="ml-2"/>
                </Button>
            </div>
        </>
    )
}