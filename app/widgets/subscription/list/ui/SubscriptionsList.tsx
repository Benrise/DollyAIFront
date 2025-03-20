import { ISubscriptionProduct, SubscriptionCard } from "@/app/entities/subscription";

interface SubscriptionsListProps {
    subscriptions: ISubscriptionProduct[]
    onSubscriptionSelect: (subscription: ISubscriptionProduct) => void
}

export function SubscriptionsList({subscriptions, onSubscriptionSelect}: SubscriptionsListProps) {
    const handleSelectPlan = (subscription: ISubscriptionProduct) => {
        onSubscriptionSelect(subscription);
      };

    return (
        <div className="grid md:grid-cols-3 md:max-w-[960px] grid-cols-1 gap-4 w-full h-full">
            {subscriptions.map((subscribtion, index) => (
                <SubscriptionCard 
                    subscription={subscribtion} 
                    key={index} 
                    onSelect={handleSelectPlan} 
                    isActive={subscribtion.nickname === "Pro"}
                    isPriority={subscribtion.nickname === "Pro"}
                    className="w-full h-fit"/>
            ))}
        </div>
    )
}