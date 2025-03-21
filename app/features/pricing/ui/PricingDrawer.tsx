"use client";

import React, { useEffect } from 'react';
import { Alert, Drawer, Typography } from 'antd';

import { HighlightedText } from '@/app/shared/ui/highlighted-text';
import { SubscriptionsList } from '@/app/widgets/subscription/list/ui/SubscriptionsList';
import { useGetSubscriptionsListMutation } from '@/app/widgets/subscription/list';
import { ISubscriptionProduct } from '@/app/entities/subscription/card';
import { useCheckoutMutation } from '../hooks';

interface PricingDrawerProps {
  open: boolean;
  onClose: () => void;
}

const { Title, Text } = Typography;

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
        <Alert className='w-full max-w-[960px]' 
          description={
            <div className='flex flex-col gap-4'>
              <Text className='text-start'>
                <HighlightedText>Models:</HighlightedText> Your subscription gives you a fixed number of model slots. Once all slots are filled, you can either upgrade your plan for more slots or pay extra to retrain an existing model.
              </Text>
              <Text className='text-start'>
                <HighlightedText>Generations:</HighlightedText> Each month, you get a base number of image generations. You can also purchase additional generations if needed. Unused generations don’t expire—they carry over to the next month, but you’ll need an active subscription to use them.
              </Text>
            </div>}
        />
      </div>
    </Drawer>
  );
};
