import { z } from 'zod';

export const createEnrollmentSchema = z.object({
  studentId: z.string().min(1).max(50),
  classId: z.string().uuid()
});

export type CreateEnrollmentInput = z.infer<typeof createEnrollmentSchema>;
