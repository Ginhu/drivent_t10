import { Router } from 'express';
import { getTickets, getTicketsTypes, postTicket } from '../controllers/tickets-controller';
import { authenticateToken } from '../middlewares';

const ticketsRouter = Router();

ticketsRouter
  .get('/', authenticateToken, getTickets)
  .get('/types', authenticateToken, getTicketsTypes)
  .post('/', authenticateToken, postTicket);

export { ticketsRouter };
