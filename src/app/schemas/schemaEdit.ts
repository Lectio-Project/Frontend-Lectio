import { Schema, z } from 'zod';

export const schemaEdit = z.object({
    name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres').optional(),
    userName: z.string().min(3, 'O user deve ter no mínimo 3 caracteres').optional(),
    bio: z.string().max(180, 'A biografia deve ter no máxiomo 180 caracteres').optional()
})

export type editFormProps = z.infer<typeof schemaEdit>;

