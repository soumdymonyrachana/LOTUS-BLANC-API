import type { Request, Response } from "express";
import * as dishService from "../services/dishService.js";

// GET ALL
export const getDishes = async (_req: Request, res: Response) => {
  try {
    const data = await dishService.getAllDishes();
    return res.status(200).json(data);
  } catch (err: unknown) {
    console.error("Error fetching dishes:", err);

    return res.status(500).json({
      message: "Error fetching dishes",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

// GET ONE
export const getDishById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid dish ID" });
    }

    const dish = await dishService.getDishById(id);

    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }

    return res.status(200).json(dish);
  } catch (err: unknown) {
    console.error("Error fetching dish:", err);

    return res.status(500).json({
      message: "Error fetching dish",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

// CREATE
export const postDish = async (req: Request, res: Response) => {
  try {
    const dish = await dishService.createDish(req.body);

    return res.status(201).json({
      message: "Dish created successfully",
      data: dish,
    });
  } catch (err: unknown) {
    console.error("Error creating dish:", err);

    return res.status(400).json({
      message: "Error creating dish",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

// UPDATE (PUT)
export const updateDish = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid dish ID" });
    }

    const dish = await dishService.updateDish(id, req.body);

    return res.status(200).json({
      message: "Dish updated successfully",
      data: dish,
    });
  } catch (err: unknown) {
    console.error("Error updating dish:", err);

    return res.status(400).json({
      message: "Error updating dish",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

// PATCH
export const patchDish = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid dish ID" });
    }

    const dish = await dishService.patchDish(id, req.body);

    return res.status(200).json({
      message: "Dish patched successfully",
      data: dish,
    });
  } catch (err: unknown) {
    console.error("Error patching dish:", err);

    return res.status(400).json({
      message: "Error patching dish",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

// DELETE
export const removeDish = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid dish ID" });
    }

    await dishService.deleteDish(id);

    return res.status(200).json({
      message: "Dish deleted successfully",
    });
  } catch (err: unknown) {
    console.error("Error deleting dish:", err);

    return res.status(400).json({
      message: "Error deleting dish",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};
