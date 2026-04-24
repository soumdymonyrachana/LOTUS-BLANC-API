import type { Request, Response } from "express";
import * as dishService from "../services/dishService.js";

// ======================
// GET ALL DISHES
// ======================
export const getDishes = async (_req: Request, res: Response) => {
  try {
    const dishes = await dishService.getAllDishes();
    res.json(dishes);
  } catch {
    res.status(500).json({ message: "Error fetching dishes" });
  }
};

// ======================
// GET ONE DISH
// ======================
export const getDishById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const dish = await dishService.getDishById(id);

    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }

    res.json(dish);
  } catch {
    res.status(500).json({ message: "Error fetching dish" });
  }
};

// ======================
// CREATE DISH
// ======================
export const postDish = async (req: Request, res: Response) => {
  try {
    console.log("Creating dish with body:", req.body);
    const dish = await dishService.createDish(req.body);
    res.status(201).json(dish);
  } catch (error) {
    console.error("Error creating dish:", error);
    const message = error instanceof Error ? error.message : "Error creating dish";
    res.status(400).json({ message });
  }
};

// ======================
// UPDATE DISH
// ======================
export const updateDish = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const updatedDish = await dishService.updateDish(id, req.body);

    res.json(updatedDish);
  } catch (error: any) {
    if (error.message === "Dish not found") {
      return res.status(404).json({ message: error.message });
    }

    res.status(400).json({ message: error.message || "Error updating dish" });
  }
};

// ======================
// DELETE DISH (SOFT DELETE)
// ======================
export const removeDish = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const deletedDish = await dishService.deleteDish(id);

    res.json({ 
      message: "Dish deleted successfully",
      data: deletedDish 
    });
  } catch (error: any) {
    if (error.message === "Dish not found") {
      return res.status(404).json({ message: error.message });
    }

    res.status(400).json({
      message: error.message || "Error deleting dish"
    });
  }
};