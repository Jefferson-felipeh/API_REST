import fastify from "fastify";
import cors from '@fastify/cors';
import { routes } from "./routes";

const app = fastify({logger: true});

const start = async () => {
    await app.register(cors);
    await app.register(routes);

    try{
        await app.listen({port: 8081}); //app.listen() retorna uma promise, logo precisa ser assincrono usando o async/await;
        console.log('Servidor rodando com sucesso!');
    }catch(error){
        app.log.error(error);//Exibe o log de erro;
        process.exit(1);//Saída em caso de erro, saida do processo;
    }
}

start();