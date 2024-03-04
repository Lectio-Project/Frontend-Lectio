import { z } from 'zod';

export const schemaEdit = z.object({
    name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres').optional(),
    userName: z.string().min(3, 'O user deve ter no mínimo 3 caracteres').optional(),
    bio: z.string().max(180, 'A biografia deve ter no máxiomo 180 caracteres').optional()
})

export const schemaNewPassword = z.object({
    password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres').refine(password => /[A-Z]/.test(password) && /[^A-Za-z0-9]/.test(password), {
        message: 'A senha precisa ter uma letra maiúscula e um caractere especial'
    }),
    confirmPassword: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres')
}).refine(fields => fields.password === fields.confirmPassword, {
    message: 'As senhas precisam ser iguais',
    path: ['confirmPassword']
});

export type editFormProps = z.infer<typeof schemaEdit>;

export type newPassProps = z.infer<typeof schemaNewPassword>

