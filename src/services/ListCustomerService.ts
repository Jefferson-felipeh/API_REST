import prismaClient from "../prisma"

export class ListService{
    executeList = async () => {
        const listCustomer = prismaClient.customer.findMany();
        return listCustomer;
    }
}