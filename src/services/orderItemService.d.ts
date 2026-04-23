export declare const addOrderItem: (data: {
    orderId: number;
    dishId: number;
    quantity: number;
}) => Promise<{
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
}>;
export declare const updateItemQuantity: (id: number, quantity: number) => Promise<{
    id: number;
    quantity: number;
    dishId: number;
    orderId: number;
}>;
export declare const removeOrderItem: (id: number) => Promise<{
    id: number;
    quantity: number;
    dishId: number;
    orderId: number;
}>;
//# sourceMappingURL=orderItemService.d.ts.map