import { z } from 'zod';

export const createGradeSchema = z.object({
  name: z.string().min(1).max(100)
});

export type CreateGradeInput = z.infer<typeof createGradeSchema>;
