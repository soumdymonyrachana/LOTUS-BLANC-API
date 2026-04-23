import type { Request, Response } from 'express';
export declare const getCategories: (_req: Request, res: Response) => Promise<void>;
export declare const postCategory: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const putCategory: (req: Request, res: Response) => Promise<void>;
export declare const removeCategory: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=categoryController.d.ts.map