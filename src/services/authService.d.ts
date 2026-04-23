export declare const loginUser: (email: string, password: string) => Promise<{
    success: boolean;
    message: string;
    userId?: never;
    token?: never;
} | {
    success: boolean;
    userId: string;
    token: string;
    message?: never;
}>;
//# sourceMappingURL=authService.d.ts.map