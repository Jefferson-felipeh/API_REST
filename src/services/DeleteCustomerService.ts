import prismaClient from "../prisma";
interface IdProps{id:number};

export class DeleteCustomerService{
    async ExecuteDelete({id}:IdProps){
        //Fazendo uma verificação de dados com o id obtido na requisição_
        if(!id || typeof(id) !== 'number' || id < 0) return {status: 'Identificador Inválido!'};

        //Verificando se há algum usuário com o id especificado_
        const verifyCustomer = await prismaClient.customer.findUnique({
            where: {id: id}
        });

        //Se o id obtido não especificar nenhum usuário no banco, será retornado essa mensagem_
        if(!verifyCustomer) return {status: 'Usuário não existe!'};

        //Porém se o usuário existir apartir do id especificado, ele será deletado_
        const deleteCustomer = await prismaClient.customer.delete({
            where:{id: id}
        });

        //Por fim retorno o objeto do usuário deletado_
        return deleteCustomer;
    }
}