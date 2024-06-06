export interface IPayment {
    label: string;
    price: number;
    refundable: boolean;
    refundableUntil?: string;
    adminFee: number;
    benefits: string[];
}

export interface ICardDetails {
    bankName: string;
    nameOnCard: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
}

export interface IPaymentUpdate {
    rent_time_unit : string;
    rent_state : string;
    id : number;
    duration : number;
    currency : string;
    admin_fee : number | null;
    house_id : number;
    benefits : string[] | null;
    rent_time_title : string;
    price : number;
    deposit : number | null;
    is_lock : boolean;
}