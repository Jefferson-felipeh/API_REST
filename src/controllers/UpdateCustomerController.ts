import { FastifyReply, FastifyRequest } from "fastify";
import { UpdateCustomerService } from '../services/UpdateCustomerService';
import { VerifyFieldsService } from "../services/VerifyFieldsService";

export class UpdateCustomerController{
    async UpdateData(request:FastifyRequest, reply:FastifyReply){
        const {id} = request.params as {id:number};
        const {name,age,cpf,phone,cep,email} = request.body as {
            name:string,
            age:string,
            cpf:string,
            phone:string,
            cep:string,
            email:string
        };

        const formatEmail = email.toLowerCase();
        const formatId = Number(id);
        const verifyFields = new VerifyFieldsService();
        const serializeCPF = await verifyFields.VerifyCPF(cpf);
        const serializeEmail = await verifyFields.VerifyEmail(formatEmail);
        const serializePhone = await verifyFields.VerifiPhone(phone);

        try{
            if(serializeCPF) return reply.status(400).send({error:'CPF já cadastrado no sistema!'});
            if(serializeEmail) return reply.status(400).send({error:'Email já cadastrado no sistema!'});
            if(serializePhone) return reply.status(400).send({error: 'Phone já cadastrado no sistema!'});

            const updateCustomer = new UpdateCustomerService();
            const executeUpdate = await updateCustomer.UpdateCustomer({id:formatId, name, age, cpf, phone, cep, email:formatEmail});
            reply.status(200).send(executeUpdate);
        }catch(error){
            return reply.status(400).send({error: 'Error ao Aryalizar dados!'});
        }
    }
}