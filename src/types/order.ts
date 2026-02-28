// ------------------------------------------------------------------
// Order Types — matches https://fake.jsonmockapi.com/orders response
// ------------------------------------------------------------------

export interface OrderAddress {
    street: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
}

export interface OrderCustomer {
    customerId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: OrderAddress;
}

export interface OrderItem {
    productId: string;
    productName: string;
    category: string;
    quantity: number;
    price: number;
}

export interface OrderPayment {
    paymentMethod: string;
    transactionId: string;
    creditCard: string;
}

export interface OrderTracking {
    carrier: string;
    trackingNumber: string;
    estimatedDelivery: string;
}

export interface Order {
    orderId: string;
    orderDate: string;
    customer: OrderCustomer;
    items: OrderItem[];
    totalAmount: number;
    payment: OrderPayment;
    status: string;
    tracking: OrderTracking;
}

// ------------------------------------------------------------------
// Payload shape for creating an order (checkout form → API)
// ------------------------------------------------------------------
export interface CreateOrderPayload {
    customer: OrderCustomer;
    items: OrderItem[];
    totalAmount: number;
    payment: {
        paymentMethod: string;
        creditCard?: string;
    };
}

// ------------------------------------------------------------------
// Redux state shape for the orders slice
// ------------------------------------------------------------------
export interface OrderState {
    orders: Order[];
    currentOrder: Order | null; // newly created order (for confirmation)
    loading: boolean;
    error: string | null;
}
