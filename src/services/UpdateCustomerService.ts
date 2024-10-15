import prismaClient from "../prisma";
import { DatasUpdateCustomers } from '../interface/DatasCustomer';

export class UpdateCustomerService{
    async UpdateCustomer({id,name,email,cpf,phone,age,cep}:DatasUpdateCustomers){
        if(!id || typeof(id) !== 'number') return {status: 'Identificador inválido!'};

        const verifyCustomer = prismaClient.customer.findUnique({
            where:{id}
        });

        if(!verifyCustomer) return {status: 'Usuário não enconrado!'};

        const UpdateCustomer = prismaClient.customer.update({
            where: {id},
            data:{name,email,cep,phone,cpf,age}
        });

        return UpdateCustomer;
    }
}