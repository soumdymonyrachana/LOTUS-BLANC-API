interface DishInput {
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
    categoryId: number;
}
export declare const getAllDishes: () => Promise<({
    category: {
        id: number;
        name: string;
    };
} & {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string | null;
    categoryId: number;
    isDeleted: boolean;
})[]>;
export declare const getDishById: (id: number) => Promise<({
    category: {
        id: number;
        name: string;
    };
} & {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string | null;
    categoryId: number;
    isDeleted: boolean;
}) | null>;
export declare const createDish: (data: DishInput) => Promise<{
    category: {
        id: number;
        name: string;
    };
} & {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string | null;
    categoryId: number;
    isDeleted: boolean;
}>;
export declare const updateDish: (id: number, data: Partial<DishInput>) => Promise<{
    category: {
        id: number;
        name: string;
    };
} & {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string | null;
    categoryId: number;
    isDeleted: boolean;
}>;
export declare const deleteDish: (id: number) => Promise<{
    category: {
        id: number;
        name: string;
    };
} & {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string | null;
    categoryId: number;
    isDeleted: boolean;
}>;
export {};
//# sourceMappingURL=dishService.d.ts.map