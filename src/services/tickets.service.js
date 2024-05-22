import { ticketsManagerMongo } from "../DAL/dao/MongoDao/tickets.dao.js";

class TicketsService {
  constructor() {}

  async createTicket(ticketData) {
    const newTicket = await ticketsManagerMongo.createTicket(ticketData);
    return newTicket;
  }
}

export const ticketsService = new TicketsService();
