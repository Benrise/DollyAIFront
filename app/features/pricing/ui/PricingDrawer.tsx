import React, { useEffect } from 'react';
import { Drawer, Typography } from 'antd';

import { SubscriptionsList } from '@/app/widgets/subscription/list/ui/SubscriptionsList';
import { useGetSubscriptionsListMutation } from '@/app/widgets/subscription/list/hooks';
import { ISubscriptionProduct } from '@/app/entities/subscription';

interface PricingDrawerProps {
  open: boolean;
  onClose: () => void;
}

const { Title } = Typography;

export const PricingDrawer: React.FC<PricingDrawerProps> = ({ open, onClose }) => {
  const { subscriptions, getSubscriptionsListMutation } = useGetSubscriptionsListMutation();

  const handleSelectPlan = (subscription: ISubscriptionProduct) => {
    console.log(subscription);
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
      <div className="flex flex-col items-center text-center p-10 gap-6 h-full">
        <Title level={3}>Compare our plans to find what suits you best</Title>

        <SubscriptionsList subscriptions={subscriptions} onSubscriptionSelect={handleSelectPlan}/>
      </div>
    </Drawer>
  );
};
