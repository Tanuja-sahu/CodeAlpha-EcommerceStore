import Product from '../models/Product.js';

export async function getProducts(req, res) {
  try {
    const { search, category } = req.query;
    const filter = {};
    if (search) filter.$or = [{ name: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }];
    if (category && category !== 'All') filter.category = category;
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (e) { res.status(500).json({ message: e.message }); }
}

export async function getProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch { res.status(400).json({ message: 'Invalid product id' }); }
}

export async function createProduct(req, res) { try { res.status(201).json(await Product.create(req.body)); } catch (e) { res.status(400).json({ message: e.message }); } }
export async function updateProduct(req, res) { try { const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); res.json(p); } catch (e) { res.status(400).json({ message: e.message }); } }
export async function deleteProduct(req, res) { try { await Product.findByIdAndDelete(req.params.id); res.json({ message: 'Product deleted' }); } catch (e) { res.status(400).json({ message: e.message }); } }
