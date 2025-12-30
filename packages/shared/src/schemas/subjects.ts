import { z } from 'zod';

export const createSubjectSchema = z.object({
  name: z.string().min(1).max(100)
});

export type CreateSubjectInput = z.infer<typeof createSubjectSchema>;
