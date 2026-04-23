import type { Request, Response } from "express";
export declare const getDishes: (_req: Request, res: Response) => Promise<void>;
export declare const getDishById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const postDish: (req: Request, res: Response) => Promise<void>;
export declare const updateDish: (req: Request, res: Response) => Promise<void>;
export declare const removeDish: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=dishController.d.ts.map