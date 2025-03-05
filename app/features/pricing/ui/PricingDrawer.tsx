import React, { useState } from 'react';
import { Drawer, Button, Radio, Typography, Card } from 'antd';
import { CheckOutlined, CreditCardOutlined, MoneyCollectOutlined, AlipayCircleOutlined } from '@ant-design/icons';

interface PricingDrawerProps {
  open: boolean;
  onClose: () => void;
}

const { Title } = Typography;

export const PricingDrawer: React.FC<PricingDrawerProps> = ({ open, onClose }) => {
  const pricingData = [
    { name: '1 Model + 100 Generations/Month', price: '$15', features: ['1 Model', '100 Generations per month'], length: '1 month' },
    { name: '1 Model + 300 Generations/Month', price: '$25', features: ['1 Model', '300 Generations per month'], length: '1 month' },
    { name: '1 Model + 500 Generations/Month', price: '$45', features: ['1 Model', '500 Generations per month'], length: '1 month' },
  ];

  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [selectedPlan, setSelectedPlan] = useState<number | null>(1);

  const handlePaymentMethodChange = (e: any) => {
    setPaymentMethod(e.target.value);
  };

  const handleSelectPlan = (index: number) => {
    setSelectedPlan(index);
  };

  return (
    <Drawer
      title="Pricing & Plans"
      open={open}
      onClose={onClose}
      placement="bottom"
      height="100vh"
    >
      <div className="flex flex-col items-center text-center p-10 gap-6">
        <Title level={3}>Compare our plans to find what suits you best.</Title>

        {/* Grid for pricing plans */}
        <div className="grid md:grid-cols-3 gap-6 w-full">
          {pricingData.map((plan, index) => (
            <div
              onClick={() => handleSelectPlan(index)}
              key={index}
              className={`${
                selectedPlan === index ? 'ring-2 ring-offset-2 ring-indigo-500' : ''
              } p-5 ${index === 1 ? 'bg-indigo-50' : 'bg-grey-100'} shadow-md rounded-lg flex flex-col justify-between`}
            >
              <Title level={4}>{plan.name}</Title>
              <p className="text-lg text-indigo-600 font-semibold mb-4">{plan.price}/month</p>
              <p className="mb-4 text-sm">{plan.length}</p>
              <ul className="text-left mb-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center mb-2">
                    <CheckOutlined className="text-green-500 mr-2" /> {feature}
                  </li>
                ))}
              </ul>
              <Button
                type="primary"
                size='large'
                ghost={selectedPlan !== index}
                className={`w-full ${selectedPlan === index ? 'pointer-events-none' : ''} py-2 rounded`}
              >
                {selectedPlan === index ? 'Selected' : 'Select'}
              </Button>
            </div>
          ))}
        </div>

        {/* Card for payment methods */}
        <div className="flex justify-center w-full">
          <Card className="w-full md:w-1/3 shadow-md rounded-lg p-5">
            <p className="text-lg mb-4 text-left">Payment Methods:</p>
            <Radio.Group
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
              style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              <Radio value="creditCard" className="flex items-center text-lg! border border-gray-200 rounded-xl p-2! px-8!">
                <CreditCardOutlined className="mr-2" />
                Credit Card
              </Radio>
              <Radio value="paypal" className="flex items-center text-lg! border border-gray-200 rounded-xl p-2! px-8!">
                <AlipayCircleOutlined className="mr-2" />
                Aliay
              </Radio>
              <Radio value="payCircle" className="flex items-center text-lg! border border-gray-200 rounded-xl p-2! px-8!">
                <MoneyCollectOutlined className="mr-2" />
                ЮMoney
              </Radio>
            </Radio.Group>
            <Button
                size="large"
                type="primary"
                className="mt-8 bg-indigo-500 text-white hover:bg-indigo-600"
                block
                onClick={() => alert(`Proceeding with ${paymentMethod} payment method`)}
                >
                Continue
            </Button>
          </Card>
        </div>
      </div>
    </Drawer>
  );
};
