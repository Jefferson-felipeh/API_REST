import { FastifyRequest, FastifyReply } from "fastify";
import { ListService } from "../services/ListCustomerService";

export class ListController{
    handleList = async (request:FastifyRequest,reply:FastifyReply) => {
        //Instanciando e chamando o método do service responsável por retornar um objeto de customers_
        const listService = new ListService();
        const customerList = await listService.executeList();

        //Retornando para o usuário esse objeto retornado pelo service usando o reply_
        reply.send(customerList);
    }
}