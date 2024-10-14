import prismaClient from "../prisma";

export class VerifyFieldsService{
    //Verificar se no banco já não exista o email e o cpf cadastrado_
    VerifyCPF =  async (cpf:string) =>{
        if(!cpf) throw new Error('CPF inválido!');

        const verifycpf = await prismaClient.customer.findUnique({
            where: {
                cpf: cpf
            },
        });

        if(verifycpf) return true;
        return verifycpf;
    }

    VerifyEmail = async (email: string) => {
        if(!email) throw new Error('Email iválido!');

        const verifyEmail = await prismaClient.customer.findUnique({
            where: {
                email: email
            }
        });

        if(verifyEmail) return true;
        return verifyEmail;
    }

    VerifiPhone = async (phone:string) => {
        const verifyPhone = await prismaClient.customer.findUnique({
            where: {
                phone: phone
            }
        })

        if(verifyPhone) return true;
        return verifyPhone;
    }

}