import { Schema, z } from 'zod';

export const schemaSignIn = z.object({
    email: z.string().email({message: 'O endereço de e-mail é inválido'}),
    password: z.string().min(3, 'A senha deve ter no mínimo 3 caracteres'),
})

export type signinFormProps = z.infer<typeof schemaSignIn>;

