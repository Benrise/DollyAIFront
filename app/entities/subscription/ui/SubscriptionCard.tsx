import styles from './styles.module.scss';

import React from "react";
import { Button, Typography, Tag } from 'antd';
import { ISubscriptionProduct } from "../model";
import { CheckOutlined } from '@ant-design/icons';

interface ISubscriptionCardProps {
    subscription: ISubscriptionProduct;
    onSelect: (subscription: ISubscriptionProduct) => void;
    isPriority?: boolean;
    isActive: boolean;
    className?: string
}

const { Title } = Typography;

export const SubscriptionCard: React.FC<ISubscriptionCardProps> = ({ subscription, onSelect, isActive, isPriority, className }) => {
    return (
        <>
            <div
              onClick={() => onSelect(subscription)}
              className={`${className} ${
                isActive ? 'border-2 border-indigo-500' : 'border-2 border-indigo-100'
              } p-6 ${isPriority ? 'bg-indigo-50' : 'bg-grey-100'} rounded-2xl flex flex-col justify-between gap-14`}
            >
                <div className="flex flex-col">
                    {isPriority ? <Tag bordered={false} style={styles} className={styles.tag}>Most popular</Tag> : <div className='w-full h-[32px]'></div>}
                    <Title className="text-left" level={2}>{subscription.nickname}</Title>
                    <div className="flex items-end gap-2 text-indigo-600">
                        <Title level={1} className="text-indigo-600! font-semibold mt-0! mb-0!">${subscription.unit_amount / 100}</Title>
                        <p className='font-bold leading-[28px]'>{subscription.recurring.interval}</p>
                    </div>
                    <ul className="text-left text-[16px] mt-4">
                        <li className="flex items-center">
                            <CheckOutlined className="mr-2 text-green-500!" /> Generations: {subscription.metadata.generations_count}
                        </li>
                        <li className="flex items-center">
                            <CheckOutlined className="mr-2 text-green-500!" /> Models: {subscription.metadata.models_count}
                        </li>
                    </ul>
                </div>
                <Button
                    type="primary"
                    size='large'
                    className={`w-full ${isActive ? 'pointer-events-none' : ''} py-2 rounded`}
                >
                    Subscribe
                </Button>
            </div>
        </>
    )
}