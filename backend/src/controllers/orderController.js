import Order from '../models/Order.js';
import Product from '../models/Product.js';

export async function createOrder(req, res) {
  try {
    const { items, shippingAddress } = req.body;
    if (!Array.isArray(items) || !items.length) return res.status(400).json({ message: 'Cart is empty' });
    let totalAmount = 0;
    const finalItems = [];
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(404).json({ message: `Product ${item.product} not found` });
      const quantity = Number(item.quantity);
      if (!Number.isInteger(quantity) || quantity < 1 || quantity > product.stock) return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      totalAmount += product.price * quantity;
      finalItems.push({ product: product._id, name: product.name, price: product.price, image: product.image, quantity });
      product.stock -= quantity;
      await product.save();
    }
    const order = await Order.create({ user: req.user._id, items: finalItems, shippingAddress, totalAmount });
    res.status(201).json(order);
  } catch (e) { res.status(500).json({ message: e.message }); }
}

export async function myOrders(req, res) { res.json(await Order.find({ user: req.user._id }).sort({ createdAt: -1 })); }
export async function getOrder(req, res) {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (!order) return res.status(404).json({ message: 'Order not found' });
  if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') return res.status(403).json({ message: 'Not allowed' });
  res.json(order);
}
