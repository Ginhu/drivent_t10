import { Router } from 'express';
import { authenticateToken } from '../middlewares';
import { getPayments, postPayment } from '../controllers/payments-controller';

const paymentsRouter = Router();

paymentsRouter.get('/', authenticateToken, getPayments);
paymentsRouter.post('/process', authenticateToken, postPayment);

export { paymentsRouter };
