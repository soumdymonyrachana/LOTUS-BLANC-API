import type { Request, Response } from "express";
import * as orderService from "../services/orderService.js";

// CREATE
export const postOrder = async (req: Request, res: Response) => {
  try {
    const { customerName, phone, totalPrice, items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "Order must have at least one item" });
    }

    const order = await orderService.createOrder({
      customerName,
      phone,
      totalPrice,
      items,
    });

    res.status(201).json(order);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// READ ALL
export const getOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// READ ONE
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const order = await orderService.getOrderById(id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch {
    res.status(500).json({ error: "Failed to fetch order" });
  }
};

// UPDATE (status only)
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    const updated = await orderService.updateOrderStatus(id, status);

    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await orderService.deleteOrder(id);

    res.json({ message: "Order deleted successfully" });
  } catch {
    res.status(500).json({ error: "Failed to delete order" });
  }
};