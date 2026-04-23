import * as categoryService from '../services/categoryService.js';
export const getCategories = async (_req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.json(categories);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching categories" });
    }
};
export const postCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name)
            return res.status(400).json({ message: "Name is required" });
        const category = await categoryService.createCategory(name);
        res.status(201).json(category);
    }
    catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({ message: "Category already exists" });
        }
        res.status(500).json({ message: "Internal server error" });
    }
};
export const putCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const category = await categoryService.updateCategory(Number(id), name);
        res.json(category);
    }
    catch (error) {
        res.status(404).json({ message: "Category not found" });
    }
};
export const removeCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryService.deleteCategory(Number(id));
        res.status(204).send();
    }
    catch (error) {
        res.status(404).json({ message: "Category not found" });
    }
};
//# sourceMappingURL=categoryController.js.map