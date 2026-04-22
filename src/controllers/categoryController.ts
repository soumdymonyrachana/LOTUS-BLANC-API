import type { Request, Response } from 'express';
import * as categoryService from '../services/categoryService.js';

export const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories" });
  }
};

export const postCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });
    
    const category = await categoryService.createCategory(name);
    res.status(201).json(category);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(400).json({ message: "Category already exists" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

export const putCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await categoryService.updateCategory(Number(id), name);
    res.json(category);
  } catch (error) {
    res.status(404).json({ message: "Category not found" });
  }
};

export const removeCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await categoryService.deleteCategory(Number(id));
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: "Category not found" });
  }
};