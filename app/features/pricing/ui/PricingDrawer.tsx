"use client";

import React, { useEffect } from 'react';
import { Drawer, Typography } from 'antd';

import { SubscriptionsList } from '@/app/widgets/subscription/list/ui/SubscriptionsList';
import { useGetSubscriptionsListMutation } from '@/app/widgets/subscription/list';
import { ISubscriptionProduct } from '@/app/entities/subscription/card';
import { useCheckoutMutation } from '../hooks';
import { SubscriptionAlert } from '@/app/entities/subscription/alert';

interface PricingDrawerProps {
  open: boolean;
  onClose: () => void;
}

const { Title } = Typography;

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
      <div className="flex flex-col items-center text-center md:p-10 p-2 gap-4">
        <Title level={3}>Compare our plans to find what suits you best</Title>
        <SubscriptionsList subscriptions={subscriptions} onSubscriptionSelect={handleSelectPlan} className='grid md:grid-cols-3 md:max-w-[960px] grid-cols-1 gap-4'/>
        <SubscriptionAlert/>
      </div>
    </Drawer>
  );
};
