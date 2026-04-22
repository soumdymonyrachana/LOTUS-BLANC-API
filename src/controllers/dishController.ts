import type { Request, Response } from 'express';
import * as dishService from '../services/dishService.js';

export const getDishes = async (_req: Request, res: Response) => {
  try {
    const dishes = await dishService.getAllDishes();
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching dishes" });
  }
};

export const postDish = async (req: Request, res: Response) => {
  try {
    const dish = await dishService.createDish(req.body);
    res.status(201).json(dish);
  } catch (error) {
    res.status(400).json({ message: "Error creating dish. Check if categoryId exists." });
  }
};

export const removeDish = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await dishService.deleteDish(Number(id));
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: "Dish not found" });
  }
};