import prismaClient from "../prisma";
import { DatasCustomer } from "../interface/DatasCustomer";

export class InsertCustomerService{
    InsertExecute = async ({name,age,cpf,phone,cep,email}:DatasCustomer) => {

        const insertCustomer = prismaClient.customer.create({
            data: {
                name: name,
                age: age,
                cpf: cpf,
                phone: phone,
                cep: cep,
                email: email
            }
        });

        return insertCustomer;
    }
}