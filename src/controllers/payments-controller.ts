import { Request, Response } from 'express';
import httpStatus from 'http-status';
import paymentsService from '../services/payment-service/payment-service';
import ticketsService from '../services/tickets-service';

export async function getPayments(req: Request, res: Response) {
  const ticketId = Number(req.query.ticketId);
  const userId = res.locals.userId;
  try {
    if (!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST);

    const result = await paymentsService.getPayments(ticketId);
    if (!result) return res.sendStatus(httpStatus.NOT_FOUND);

    const enrollment = await ticketsService.getEnrollment(userId);
    const enrollmentId = enrollment.id;

    const ticket = await ticketsService.getTickets(enrollmentId);
    const resultTicketId = ticket.id;

    if (resultTicketId != ticketId) return res.sendStatus(httpStatus.UNAUTHORIZED);

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function postPayment(req: Request, res: Response) {
  const userId = res.locals.userId;
  const { ticketId, cardData } = req.body;
  const { issuer, number } = cardData;

  try {
    if (!ticketId || !cardData) return res.sendStatus(httpStatus.BAD_REQUEST);

    const ticket = await paymentsService.getTicket(ticketId);
    if (!ticket) return res.sendStatus(httpStatus.NOT_FOUND);

    const enrollment = await ticketsService.getEnrollment(userId);
    const enrollmentId = enrollment.id;

    if (enrollmentId !== ticket.enrollmentId) return res.sendStatus(httpStatus.UNAUTHORIZED);

    const ticketType = await ticketsService.getTicketType(ticket.ticketTypeId);
    const value = ticketType.price;
    await paymentsService.postPayment(ticketId, value, issuer, number);
    await paymentsService.updateTicketStatus(ticketId);

    const result = await paymentsService.getPayment(ticketId);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
