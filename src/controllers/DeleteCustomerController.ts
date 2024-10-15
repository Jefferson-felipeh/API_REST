import { FastifyRequest,FastifyReply } from "fastify";
import { DeleteCustomerService } from '../services/DeleteCustomerService';

export class DeleteCustomerController{
    DeleteCustomer = async (request:FastifyRequest,reply:FastifyReply) => {
        const {id} = request.params as {id:number};
        const formatId = Number(id);//Emitindo para o service o id formatado;
        const deleteCustomer = new DeleteCustomerService();
        const customer = await deleteCustomer.ExecuteDelete({id:formatId});

        reply.send(customer);
    }
}