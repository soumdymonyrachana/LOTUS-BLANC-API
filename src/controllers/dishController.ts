import type { Request, Response } from "express";
import * as dishService from "../services/dishService.js";

// GET ALL
export const getDishes = async (_req: Request, res: Response) => {
  try {
    const data = await dishService.getAllDishes();
    res.json(data);
  } catch {
    res.status(500).json({ message: "Error fetching dishes" });
  }
};

// GET ONE
export const getDishById = async (req: Request, res: Response) => {
  try {
    const dish = await dishService.getDishById(Number(req.params.id));

    if (!dish) return res.status(404).json({ message: "Not found" });

    res.json(dish);
  } catch {
    res.status(500).json({ message: "Error fetching dish" });
  }
};

// CREATE
export const postDish = async (req: Request, res: Response) => {
  try {
    const dish = await dishService.createDish(req.body);
    res.status(201).json(dish);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Error creating dish" });
  }
};

// UPDATE
export const updateDish = async (req: Request, res: Response) => {
  try {
    const dish = await dishService.updateDish(Number(req.params.id), req.body);
    res.json(dish);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// PATCH
export const patchDish = async (req: Request, res: Response) => {
  try {
    const dish = await dishService.patchDish(Number(req.params.id), req.body);
    res.json(dish);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
export const removeDish = async (req: Request, res: Response) => {
  try {
    await dishService.deleteDish(Number(req.params.id));
    res.json({ message: "Deleted successfully" });
  } catch {
    res.status(400).json({ message: "Error deleting dish" });
  }
};