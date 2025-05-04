import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { SubscriptionsList, useGetSubscriptionsListMutation } from "@/app/widgets/subscription/list";
import { H1 } from "@/app/shared/ui/typography";


export function LandingPricing() {
    const REGISTER_URL = "/pages/auth/register"

    const { subscriptions, getSubscriptionsListMutation, isGettingSubscriptions } = useGetSubscriptionsListMutation();
    const router = useRouter();

    const handleSubscriptionSelect = async () => {
        router.push(REGISTER_URL)
    }

    useEffect(() => {
        getSubscriptionsListMutation();
    }, [])

    return (
        isGettingSubscriptions && <div className="flex flex-col gap-6 w-full">
            <H1>Pricing</H1>
            <SubscriptionsList 
                subscriptions={subscriptions} 
                onSubscriptionSelect={handleSubscriptionSelect}
                className='flex md:flex-nowrap flex-wrap gap-4'
            />
        </div>
    )
}