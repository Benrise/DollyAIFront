import React from 'react';
import { Drawer, Button } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

interface PricingDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const PricingDrawer: React.FC<PricingDrawerProps> = ({ open, onClose }) => {
    const pricingData = [
        { name: '1 Model + 100 Generations/Month', price: '$15', features: ['1 Model', '100 Generations per month'], length: '1 month' },
        { name: '1 Model + 300 Generations/Month', price: '$25', features: ['1 Model', '300 Generations per month'], length: '1 month' },
        { name: '1 Model + 500 Generations/Month', price: '$45', features: ['1 Model', '500 Generations per month'], length: '1 month' },
      ];

    return (
        <Drawer
        title="Pricing & Plans"
        open={open}
        onClose={onClose}
        placement="bottom"
        height="100vh"
        >
        <div className="text-center p-10">
            <p className="text-lg mb-5">Compare our plans to find what suits you best.</p>
            <div className="grid md:grid-cols-3 gap-4 my-10">
            {pricingData.map((plan, index) => (
                <div
                key={index}
                className={`${
                    plan.name === '1 Model + 300 Generations/Month' ? 'ring-2 ring-offset-2 ring-indigo-500' : ''
                } p-5 bg-gray-50 shadow-md rounded-lg flex flex-col justify-between`}
                >
                <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                <p className="text-lg text-indigo-600 font-semibold mb-4">{plan.price}/month</p>
                <p className="mb-4 text-sm">{plan.length}</p>
                <ul className="text-left mb-4">
                    {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center mb-2">
                        <CheckOutlined className="text-green-500 mr-2" /> {feature}
                    </li>
                    ))}
                </ul>
                <Button className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600">
                    Get Started
                </Button>
                </div>
            ))}
            </div>
        </div>
        </Drawer>
    );
};
