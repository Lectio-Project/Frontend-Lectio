import { Schema, z } from 'zod';

export const schemaSignUp = z.object({
    name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
    email: z.string().email({message: 'O endereço de e-mail é inválido'}),
    password: z
        .string()
        .refine(value => {
            const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+}{"':;?/>.<,]).{8,}$/;
            return regex.test(value);
        }, { message: 'A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, um número e um caractere especial' }),
    passwordConfirmation: z.string(),
})

export type signUpFormProps = z.infer<typeof schemaSignUp>;