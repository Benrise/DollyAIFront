import { ISubscriptionProduct, SubscriptionCard } from "@/app/entities/subscription";

interface SubscriptionsListProps {
    subscriptions: ISubscriptionProduct[];
    onSubscriptionSelect: (subscription: ISubscriptionProduct) => void;
    className?: string
    actionLabel?: string
}

export function SubscriptionsList({subscriptions, onSubscriptionSelect, className, actionLabel}: SubscriptionsListProps) {
    const handleSelectPlan = (subscription: ISubscriptionProduct) => {
        onSubscriptionSelect(subscription);
      };

    return (
        <div className={`w-full h-full ${className}`}>
            {subscriptions.map((subscribtion, index) => (
                <SubscriptionCard
                    actionLabel={actionLabel}
                    subscription={subscribtion} 
                    key={index} 
                    onSelect={handleSelectPlan} 
                    isActive={subscribtion.nickname === "Premium"}
                    isPriority={subscribtion.nickname === "Premium"}
                    className="w-full h-fit"/>
            ))}
        </div>
    )
}