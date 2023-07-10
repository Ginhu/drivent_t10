import paymentsRepository from '../../repositories/payment-repository/payment-repository';

async function getPayments(ticketId: number) {
  const result = await paymentsRepository.getPayments(ticketId);

  return result;
}

async function getTicket(ticketId: number) {
  const result = await paymentsRepository.getTicket(ticketId);

  return result;
}

async function postPayment(ticketId: number, value: number, cardIssuer: string, cardNumber: string) {
  return await paymentsRepository.postPayment(ticketId, value, cardIssuer, cardNumber);
}

async function updateTicketStatus(ticketId: number) {
  return await paymentsRepository.updateTicketStatus(ticketId);
}

async function getPayment(ticketId: number) {
  return await paymentsRepository.getPayment(ticketId);
}

const paymentsService = { getPayments, getTicket, postPayment, updateTicketStatus, getPayment };

export default paymentsService;
