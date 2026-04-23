import type { Request, Response } from 'express';
import * as orderItemService from '../services/orderItemService.js';

export const postOrderItem = async (req: Request, res: Response) => {
  try {
    const item = await orderItemService.addOrderItem(req.body);
    res.status(201).json(item);
  } catch (error: any) {
    console.error("POST order item error:", error); // 👈 IMPORTANT

    res.status(400).json({
      message: "Error adding item to order",
      error: error.message // 👈 show real error
    });
  }
};

export const patchOrderItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const updated = await orderItemService.updateItemQuantity(
      Number(id),
      quantity
    );

    res.json(updated);
  } catch (error: any) {
    console.error("PATCH order item error:", error);

    res.status(404).json({
      message: "Order item not found",
      error: error.message
    });
  }
};

export const deleteOrderItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await orderItemService.removeOrderItem(Number(id));

    res.status(204).send();
  } catch (error: any) {
    console.error("DELETE order item error:", error);

    res.status(404).json({
      message: "Order item not found",
      error: error.message
    });
  }
};