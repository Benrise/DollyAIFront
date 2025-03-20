export interface ISubscriptionProduct {
    id: string;
    object: string;
    active: boolean;
    billing_scheme: string;
    created: number;
    currency: string;
    custom_unit_amount: null | string;
    livemode: boolean;
    lookup_key: null | string;
    metadata: {
      generations_count: string;
      models_count: string;
    };
    nickname: string;
    product: string;
    recurring: {
      aggregate_usage: null | string;
      interval: string;
      interval_count: number;
      meter: null | string;
      trial_period_days: null | number;
      usage_type: string;
    };
    tax_behavior: string;
    tiers_mode: null | string;
    transform_quantity: null | string
    type: string;
    unit_amount: number;
    unit_amount_decimal: string;
  }

  export interface ISubscriptionsResponse {
      prices: ISubscriptionProduct[];
  }

  export interface ICheckoutResponse {
    url: string;
  }