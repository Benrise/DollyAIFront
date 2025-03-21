import { ISubscriptionProduct, SubscriptionCard } from "@/app/entities/subscription/card";
import { useEffect, useState } from "react";

interface SubscriptionsListProps {
    subscriptions: ISubscriptionProduct[];
    onSubscriptionSelect: (subscription: ISubscriptionProduct) => Promise<void>;
    className?: string
    actionLabel?: string
    isActionsDisabled?: boolean
    isActionsLoading?: boolean
}

export function SubscriptionsList({subscriptions, onSubscriptionSelect, className, actionLabel, isActionsDisabled, isActionsLoading}: SubscriptionsListProps) {
    const [loadingSubscriptionId, setLoadingSubscriptionId] = useState<string | null>(null);
    const handleSelectPlan = async (subscription: ISubscriptionProduct) => {
        await onSubscriptionSelect(subscription);
        setLoadingSubscriptionId(subscription.id);
      };

    return (
        <div className={`w-full h-full ${className}`}>
            {subscriptions.map((subscription, index) => (
                <SubscriptionCard
                    isDisabled={isActionsDisabled}
                    isLoading={isActionsLoading && loadingSubscriptionId === subscription.id}
                    actionLabel={actionLabel}
                    subscription={subscription} 
                    key={index} 
                    onSelect={handleSelectPlan} 
                    isActive={subscription.nickname === "Premium"}
                    isPriority={subscription.nickname === "Premium"}
                    className="w-full h-fit"/>
            ))}
        </div>
    )
}