import { z } from 'zod';

export const createClassSchema = z.object({
  name: z.string().min(1).max(100),
  subjectId: z.string().uuid(),
  gradeId: z.string().uuid(),
  teacherId: z.string().uuid()
});

export type CreateClassInput = z.infer<typeof createClassSchema>;
