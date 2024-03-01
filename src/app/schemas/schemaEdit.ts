import { Schema, z } from 'zod';

export const schemaEdit = z.object({
    name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres').optional(),
    userName: z.string().min(3, 'O user deve ter no mínimo 3 caracteres').optional(),
    bio: z.string().max(180, 'A biografia deve ter no máxiomo 180 caracteres').optional()
})

export const schemaNewPassword = z.object({
    password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
    confirmPassword: z.string().min(8)
}).refine((fields)=>/[A-Z]/.test(fields.password) && /[^A-Za-z0-9]/.test(fields.password), {
    path: ['passwod'],
    message: 'A senha precisa ter uma letra maiuscula e um caracter especial'
})
.refine((fields)=> fields.confirmPassword === fields.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas precisam ser iguais'
})

export type editFormProps = z.infer<typeof schemaEdit>;

export type newPassProps = z.infer<typeof schemaNewPassword>

