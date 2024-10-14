import Joi from "joi";

//validação dos campos usando a biblioteca externa JOI, especificando cada campo_
export const schema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
        'string.empty': 'O nome é obrigatório',
        'string.min': 'O nome deve ter no mínimo {#limit} caracteres',
        'string.max': 'O nome deve ter no máximo {#limit} caracteres'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'O e-mail deve ser válido',
        'string.empty': 'O e-mail é obrigatório'
    }),
    age: Joi.string().min(2).max(3).required().messages({
        'number.min': 'A idade mínima é {#limit}',
        'number.max': 'A idade máxima é {#limit}',
        'any.required': 'A idade é obrigatória'
    }),
    cpf: Joi.string().pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/).required().messages({
        'string.pattern.base': 'O CPF deve estar no formato 000.000.000-00',
        'string.empty': 'O CPF é obrigatório'
    }),
    phone: Joi.string().pattern(/^\(\d{2}\)\s\d{5}-\d{4}$/).required().messages({
        'string.pattern.base': 'O telefone deve estar no formato (00) 00000-0000',
        'string.empty': 'O telefone é obrigatório'
    }),
    cep: Joi.string().pattern(/^\d{5}-\d{3}$/).required().messages({
        'string.pattern.base': 'O CEP deve estar no formato 00000-000',
        'string.empty': 'O CEP é obrigatório'
    })
});
