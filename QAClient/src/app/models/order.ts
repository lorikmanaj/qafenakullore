import { Discount } from "./discount";
import { OrderStatus } from "./orderStatus";
import { PaymentMethod } from "./paymentMethod";
import { User } from "./user";

export interface Order {
    orderId: number;
    userId: string;
    date: Date;
    orderStatusId: number;
    shippingAddress: string;
    paymentMethodId: number;
    orderNotes: string;
    total: number;

    user?: User;
    discounts?: Discount[];
    paymentMethod?: PaymentMethod;
    orderStatus?: OrderStatus;
    // orderProducts?: OrderProduct[];
}