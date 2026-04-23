import * as dishService from "../services/dishService.js";
// ======================
// GET ALL DISHES
// ======================
export const getDishes = async (_req, res) => {
    try {
        const dishes = await dishService.getAllDishes();
        res.json(dishes);
    }
    catch {
        res.status(500).json({ message: "Error fetching dishes" });
    }
};
// ======================
// GET ONE DISH
// ======================
export const getDishById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const dish = await dishService.getDishById(id);
        if (!dish) {
            return res.status(404).json({ message: "Dish not found" });
        }
        res.json(dish);
    }
    catch {
        res.status(500).json({ message: "Error fetching dish" });
    }
};
// ======================
// CREATE DISH
// ======================
export const postDish = async (req, res) => {
    try {
        const dish = await dishService.createDish(req.body);
        res.status(201).json(dish);
    }
    catch {
        res.status(400).json({ message: "Error creating dish" });
    }
};
// ======================
// UPDATE DISH
// ======================
export const updateDish = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const updatedDish = await dishService.updateDish(id, req.body);
        res.json(updatedDish);
    }
    catch {
        res.status(404).json({ message: "Dish not found or update failed" });
    }
};
// ======================
// DELETE DISH (SOFT DELETE)
// ======================
export const removeDish = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const deletedDish = await dishService.deleteDish(id);
        res.json({
            message: "Dish deleted successfully",
            data: deletedDish
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message || "Error deleting dish"
        });
    }
};
//# sourceMappingURL=dishController.js.map