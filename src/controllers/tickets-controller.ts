import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Enrollment, User } from '@prisma/client';
import ticketsService from '../services/tickets-service';

export async function getTicketsTypes(req: Request, res: Response) {
  try {
    const ticketsTypes = await ticketsService.getTicketsTypes();
    return res.status(httpStatus.OK).send(ticketsTypes);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function getTickets(req: Request, res: Response) {
  const userId = res.locals.userId;
  try {
    const user: User = await ticketsService.getUser(userId);
    if (!user) return res.sendStatus(httpStatus.NOT_FOUND);

    const enrollment: Enrollment = await ticketsService.getEnrollment(userId);
    if (!enrollment) return res.sendStatus(httpStatus.NOT_FOUND);
    const enrollmentId: number = enrollment.id;

    const tickets = await ticketsService.getTickets(enrollmentId);
    if (!tickets) return res.sendStatus(httpStatus.NOT_FOUND);

    const ticketType = await ticketsService.getTicketType(tickets.ticketTypeId);
    const result = {
      id: tickets.id,
      status: tickets.status,
      ticketTypeId: tickets.ticketTypeId,
      enrollmentId: tickets.enrollmentId,
      TicketType: ticketType,
      createdAt: tickets.createdAt,
      updatedAt: tickets.updatedAt,
    };

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function postTicket(req: Request, res: Response) {
  const userId = res.locals.userId;
  const ticketTypeId: number = req.body.ticketTypeId;

  try {
    if (!ticketTypeId) return res.sendStatus(httpStatus.BAD_REQUEST);

    const enrollment: Enrollment = await ticketsService.getEnrollment(userId);
    if (!enrollment) return res.sendStatus(httpStatus.NOT_FOUND);
    const enrollmentId: number = enrollment.id;

    await ticketsService.postTicket(ticketTypeId, enrollmentId);
    const result = getTickets;

    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
