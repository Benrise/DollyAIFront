"use client";

import React, { useEffect } from 'react';
import { Drawer } from 'antd';

import { SubscriptionsList } from '@/app/widgets/subscription/list/ui/SubscriptionsList';
import { useGetSubscriptionsListMutation } from '@/app/widgets/subscription/list';
import { ISubscriptionProduct } from '@/app/entities/subscription/card';
import { useCheckoutMutation } from '../hooks';
import { SubscriptionAlert } from '@/app/entities/subscription/alert';
import { H2 } from '@/app/shared/ui/typography';

interface PricingDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const PricingDrawer: React.FC<PricingDrawerProps> = ({ open, onClose }) => {
  const { subscriptions, getSubscriptionsListMutation } = useGetSubscriptionsListMutation();
  const { checkoutMutation } = useCheckoutMutation();

  const handleSelectPlan = async (subscription: ISubscriptionProduct) => {
    checkoutMutation(subscription.id);
  };

  useEffect(() => {
    getSubscriptionsListMutation();
  }, []);

  return (
    <Drawer
      title="Pricing & Plans"
      open={open}
      onClose={onClose}
      placement="bottom"
      height="100vh"
    >
      <div className="flex text-foreground flex-col items-center text-center md:p-10 p-2 gap-4 md:gap-12">
        <H2>Compare our plans to find what suits you best</H2>
        <SubscriptionsList subscriptions={subscriptions} onSubscriptionSelect={handleSelectPlan} className='grid md:grid-cols-3 md:max-w-[960px] grid-cols-1 gap-4'/>
        <SubscriptionAlert/>
      </div>
    </Drawer>
  );
};
