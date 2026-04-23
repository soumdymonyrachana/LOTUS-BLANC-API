import * as orderService from '../services/orderService.js';
export const postOrder = async (req, res) => {
    try {
        const { customerName, phone, totalPrice, items } = req.body;
        // Logic: Simple validation
        if (!items || items.length === 0) {
            return res.status(400).json({ error: "Order must have at least one item" });
        }
        const order = await orderService.createOrder({
            customerName,
            phone,
            totalPrice,
            items
        });
        res.status(201).json(order);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const getOrders = async (_req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch orders" });
    }
};
//# sourceMappingURL=orderController.js.map