import dayjs from 'dayjs';
import { prisma } from '../../config';

async function getTicketsTypes() {
  return prisma.ticketType.findMany();
}

async function getTicketType(id: number) {
  return prisma.ticketType.findFirst({
    where: {
      id: id,
    },
  });
}

async function getTickets(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: { enrollmentId: enrollmentId },
  });
}

async function getUser(userId: number) {
  return prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
}

async function getEnrollment(userId: number) {
  return prisma.enrollment.findFirst({
    where: {
      userId: userId,
    },
  });
}

async function postTicket(ticketTypeId: number, enrollmentId: number) {
  const updatedAt = dayjs().format('DD-MM-YYYY');
  return prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status: 'RESERVED',
      updatedAt,
    },
  });
}

const ticketsRepository = { getTicketsTypes, getTickets, getUser, getEnrollment, getTicketType, postTicket };

export default ticketsRepository;
