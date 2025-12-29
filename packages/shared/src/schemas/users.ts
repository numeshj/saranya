import { z } from 'zod';

export const roleSchema = z.enum(['ADMIN', 'TEACHER', 'PARENT']);
export type Role = z.infer<typeof roleSchema>;

export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: roleSchema
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
