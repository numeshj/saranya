import { BadRequestException, Injectable } from '@nestjs/common';
import type { CreateClassInput } from '@saranya/shared';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ClassesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateClassInput) {
    const [subject, grade, teacher] = await Promise.all([
      this.prisma.subject.findUnique({ where: { id: input.subjectId } }),
      this.prisma.grade.findUnique({ where: { id: input.gradeId } }),
      this.prisma.user.findUnique({ where: { id: input.teacherId } })
    ]);

    if (!subject) throw new BadRequestException('Subject not found');
    if (!grade) throw new BadRequestException('Grade not found');
    if (!teacher) throw new BadRequestException('Teacher not found');
    if (teacher.role !== 'TEACHER') {
      throw new BadRequestException('teacherId must be a TEACHER');
    }

    const created = await this.prisma.class.create({
      data: {
        name: input.name,
        subjectId: input.subjectId,
        gradeId: input.gradeId,
        teacherId: input.teacherId
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        subject: { select: { id: true, name: true } },
        grade: { select: { id: true, name: true } },
        teacher: { select: { id: true, email: true, role: true } }
      }
    });

    return created;
  }

  async list() {
    return this.prisma.class.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        subject: { select: { id: true, name: true } },
        grade: { select: { id: true, name: true } },
        teacher: { select: { id: true, email: true, role: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}
