import dayjs from 'dayjs';
import { prisma } from '../../config';

async function getPayments(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId: ticketId,
    },
  });
}

async function getTicket(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
  });
}

async function postPayment(ticketId: number, value: number, cardIssuer: string, cardNumber: string) {
  const updatedAt = dayjs().format('DD-MM-YYYY');
  const cardLastDigits = cardNumber.slice(11);
  return prisma.payment.create({
    data: {
      ticketId,
      value,
      cardIssuer,
      cardLastDigits,
      updatedAt,
    },
  });
}

async function updateTicketStatus(ticketId: number) {
  return prisma.ticket.update({
    data: {
      status: 'PAID',
    },
    where: {
      id: ticketId,
    },
  });
}

async function getPayment(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId: ticketId,
    },
  });
}

const paymentsRepository = { getPayments, getTicket, postPayment, updateTicketStatus, getPayment };

export default paymentsRepository;
