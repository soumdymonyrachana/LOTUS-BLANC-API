export declare const getAllCategories: () => Promise<{
    id: number;
    name: string;
}[]>;
export declare const createCategory: (name: string) => Promise<{
    id: number;
    name: string;
}>;
export declare const updateCategory: (id: number, name: string) => Promise<{
    id: number;
    name: string;
}>;
export declare const deleteCategory: (id: number) => Promise<{
    id: number;
    name: string;
}>;
//# sourceMappingURL=categoryService.d.ts.map