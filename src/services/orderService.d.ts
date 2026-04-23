export declare const createOrder: (data: {
    customerName: string;
    phone: string;
    totalPrice: number;
    items: {
        dishId: number;
        quantity: number;
    }[];
}) => Promise<{
    items: ({
        dish: {
            id: number;
            name: string;
            description: string;
            price: number;
            imageUrl: string | null;
            categoryId: number;
            isDeleted: boolean;
        };
    } & {
        id: number;
        quantity: number;
        dishId: number;
        orderId: number;
    })[];
} & {
    id: number;
    customerName: string;
    phone: string;
    orderTime: Date;
    totalPrice: number;
    status: string;
}>;
export declare const getAllOrders: () => Promise<({
    items: ({
        dish: {
            id: number;
            name: string;
            description: string;
            price: number;
            imageUrl: string | null;
            categoryId: number;
            isDeleted: boolean;
        };
    } & {
        id: number;
        quantity: number;
        dishId: number;
        orderId: number;
    })[];
} & {
    id: number;
    customerName: string;
    phone: string;
    orderTime: Date;
    totalPrice: number;
    status: string;
})[]>;
export declare const updateOrderStatus: (id: number, status: string) => Promise<{
    id: number;
    customerName: string;
    phone: string;
    orderTime: Date;
    totalPrice: number;
    status: string;
}>;
//# sourceMappingURL=orderService.d.ts.map