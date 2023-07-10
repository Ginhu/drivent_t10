import ticketsRepository from '../../repositories/tickets-repository';

async function getTicketsTypes() {
  const result = await ticketsRepository.getTicketsTypes();

  return result;
}

async function getTicketType(id: number) {
  const result = await ticketsRepository.getTicketType(id);

  return result;
}

async function getTickets(enrollmentId: number) {
  const result = ticketsRepository.getTickets(enrollmentId);

  return result;
}

async function getUser(userId: number) {
  const result = await ticketsRepository.getUser(userId);

  return result;
}

async function getEnrollment(userId: number) {
  const result = await ticketsRepository.getEnrollment(userId);

  return result;
}

async function postTicket(ticketTypeId: number, enrollmentId: number) {
  await ticketsRepository.postTicket(ticketTypeId, enrollmentId);

  return 'ok';
}

const ticketsService = { getTicketsTypes, getTickets, getUser, getEnrollment, getTicketType, postTicket };

export default ticketsService;
