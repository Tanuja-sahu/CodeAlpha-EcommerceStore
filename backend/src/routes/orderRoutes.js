import { Router } from 'express';
import { createOrder, getOrder, myOrders } from '../controllers/orderController.js';
import { protect } from '../middleware/auth.js';
const router = Router();
router.use(protect);
router.post('/', createOrder);
router.get('/my', myOrders);
router.get('/:id', getOrder);
export default router;
