import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { connectDB } from './config/db.js';
import User from './models/User.js';
import Product from './models/Product.js';

const products = [
 {name:'Minimal Watch',description:'Classic everyday watch with a clean stainless-steel design.',price:2499,category:'Fashion',stock:15,image:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900'},
 {name:'Wireless Headphones',description:'Comfortable over-ear headphones for music, calls and study sessions.',price:3299,category:'Electronics',stock:12,image:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900'},
 {name:'Urban Backpack',description:'Water-resistant backpack with a laptop compartment and daily storage.',price:1799,category:'Bags',stock:20,image:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900'},
 {name:'Running Shoes',description:'Lightweight trainers designed for comfortable everyday movement.',price:2899,category:'Footwear',stock:18,image:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900'},
 {name:'Smart Speaker',description:'Compact wireless speaker for your desk, room or kitchen.',price:3999,category:'Electronics',stock:9,image:'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=900'},
 {name:'Ceramic Mug',description:'Simple ceramic coffee mug for work and study breaks.',price:499,category:'Home',stock:30,image:'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=900'}
];
await connectDB();
await Product.deleteMany({}); await Product.insertMany(products);
const email='admin@shopnest.local'; if(!await User.findOne({email})) await User.create({name:'ShopNest Admin',email,password:await bcrypt.hash('Admin@123',10),role:'admin'});
console.log('Seed complete. Admin: admin@shopnest.local / Admin@123'); process.exit(0);
