//Lembrando que esta sendo usando o SOA, que é o processo de execução do servidor e requisições entre camadas(routes > controller > service > controller > cliente);
import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { ListController } from "./controllers/ListCustomerController";
import { InsertCustomerController } from "./controllers/InsertCustomerController";
import { DeleteCustomerController } from './controllers/DeleteCustomerController';
import { UpdateCustomerController } from './controllers/UpdateCustomerController';
import { schema } from './Validation/ValidationCustomer';

export const routes = async (fastify:FastifyInstance, options:FastifyPluginOptions) => {

    //A rota especificada receberá uma requisição para que os dados cadastrados sejam retornados como resposta a essa requisição_
    //Rota responsável por listar os dados do banco_
    fastify.get('/list', async (request:FastifyRequest, reply:FastifyReply) => {
        const listController = new ListController();
        /*Observe que chamando o método do controlador especifico, ele vai me retornar uma primise<>
         logo será um processo assincrono de requisição de dados_*/
        return await listController.handleList(request, reply);
    });
    
    //Rota responsável por emitir dados do corpo da requisição e cadastra-los no banco seguindo uma validação de dados_
    fastify.post('/insert',async (request:FastifyRequest, reply:FastifyReply) => {
        //Instanciando e chamando o modulo do controller que que terá a funcionalidade de emitir os dados para o service_
        const insertCustomers = new InsertCustomerController();

        //Usando try{}catch(){} para tratamento de erros_
        try{
            //A variavel error irá armazenar um objeto, que é o corpo da requisição, e verificar se os dados capturados atendem com a validação do JOI_
            const {error} = schema.validate(request.body);
            //Caso algum campo não atendam a validação, será executado esse bloco_
            if(error) return reply.status(400).send({error: error?.details[0].message});

            //Caso os dados estejam corretos, será emitido para o controller_
            return await insertCustomers.InsertCustomer(request, reply);//Sempre que eu chamar um método de outra camada, ele me retornará uma promise
        }catch(error){
            reply.status(400).send(error)
        }
    });

    //Rota responsável por deletar um dados específico do banco_
    fastify.delete('/api/:id/delete/', async (request:FastifyRequest, reply:FastifyReply) => {
        const DeleteCustomer = new DeleteCustomerController();
        return await DeleteCustomer.DeleteCustomer(request, reply);
    });

    //Rota responsável por atualizar os dados de um usuário específico_
    fastify.put('/api/:id/update/', async (request:FastifyRequest, reply:FastifyReply) => {
        const updateCustomer = new UpdateCustomerController();
        try{
            const {error} = schema.validate(request.body);
            if(error) return reply.status(500).send({error: error.details[0].message});

            return (await updateCustomer.UpdateData(request,reply));
        }catch(error){
            return reply.status(400).send({error:'Error ao atualizar Customer!'});
        }
    });
}