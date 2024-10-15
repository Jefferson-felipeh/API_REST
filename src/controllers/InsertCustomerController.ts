import { FastifyRequest, FastifyReply } from "fastify";
import { InsertCustomerService } from "../services/InsertCustomerService";
import { VerifyFieldsService } from '../services/VerifyFieldsService';

export class InsertCustomerController{
    InsertCustomer = async (request:FastifyRequest, reply:FastifyReply) => {
        const {name,age,cpf,phone,cep,email} = request.body as {
            name:string,
            age:string,
            cpf:string,
            phone:string,
            cep:string,
            email:string
        };

        if(!name || !age || !cpf || !phone || !cep || !email) return reply.status(400).send({error: 'Dados inválidos'});
        if(Number(age) < 18 || Number(age) > 100) return reply.status(400).send({error: 'Idade mínima é 18 e máxima é 100!'});

        const formatEmail = email.toLowerCase();//Formatando o email para  minusculo;
        const verifyFields = new VerifyFieldsService();//SERVICE RESPONSÁVEL POR VERIFICAR OS CAMPOS DUPLOS(CPF,EMAIL,PHONE);

        //Verificando os campos, se algum desses campos já estão ou não cadastrados no sistema_
        const serializeCPF = await verifyFields.VerifyCPF(cpf);
        const serializeEmail = await verifyFields.VerifyEmail(email.toLowerCase());//Emitindo para o método do service o email formatado;
        const serializePhone = await verifyFields.VerifiPhone(phone);

        const insertCustomer = new InsertCustomerService();//SERVICE RESPONSÁVEL POR CADASTRAR OS DADOS NO BANCO;
    
        try{
            //Caso algum deles já tiverem no banco, será retornado uma mensagem_
            if(serializeCPF) return reply.status(400).send({error:'CPF já cadastrado no sistema!'});
            if(serializeEmail) return reply.status(400).send({error:'Email já cadastrado no sistema!'});
            if(serializePhone) return reply.status(400).send({error: 'Phone já cadastrado no sistema!'});
            
            //Emtindo os dados para o service a fim de ser cadastrado no banco de dados_
            const executeCustomer = await insertCustomer.InsertExecute({name,age,cpf,phone,cep,email:formatEmail});
            return reply.status(200).send(executeCustomer);
        }
        catch(error){
            return reply.status(500).send('Error ao criar customer!');
        }
    }
}