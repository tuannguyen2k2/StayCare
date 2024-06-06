import { IPayment } from "@/interfaces/payment.interface";

export const PaymentType: IPayment[] = [
  {
    label: "Monthly Payment",
    price: 100,
    refundable: false,
    adminFee: 0,
    benefits: ["Free Breakfast", "Free WiFi", "Free Parking"],
  },
  {
    label: "3-5 months Payment",
    price: 50,
    refundable: true,
    refundableUntil: "2022-12-31",
    adminFee: 10,
    benefits: ["Free Breakfast", "Free WiFi", "Free Parking"],
  },
  {
    label: "6 months Payment",
    price: 25,
    refundable: true,
    refundableUntil: "2022-12-31",
    adminFee: 10,
    benefits: ["Free Breakfast", "Free WiFi", "Free Parking"],
  },
  {
    label: "12 months Payment",
    price: 10,
    refundable: true,
    refundableUntil: "2022-12-31",
    adminFee: 10,
    benefits: ["Free Breakfast", "Free WiFi", "Free Parking"],
  },
];
