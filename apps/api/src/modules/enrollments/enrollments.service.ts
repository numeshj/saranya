import { BadRequestException, Injectable } from '@nestjs/common';
import type { CreateEnrollmentInput } from '@saranya/shared';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class EnrollmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateEnrollmentInput) {
    const existingClass = await this.prisma.class.findUnique({
      where: { id: input.classId },
      select: { id: true }
    });

    if (!existingClass) throw new BadRequestException('Class not found');

    const existingEnrollment = await this.prisma.enrollment.findUnique({
      where: {
        studentId_classId: {
          studentId: input.studentId,
          classId: input.classId
        }
      },
      select: { id: true }
    });

    if (existingEnrollment) {
      throw new BadRequestException('Student already enrolled in this class');
    }

    const enrollment = await this.prisma.enrollment.create({
      data: {
        studentId: input.studentId,
        classId: input.classId
      },
      select: {
        id: true,
        studentId: true,
        createdAt: true,
        class: {
          select: {
            id: true,
            name: true,
            subject: { select: { id: true, name: true } },
            grade: { select: { id: true, name: true } }
          }
        }
      }
    });

    return enrollment;
  }

  async list() {
    return this.prisma.enrollment.findMany({
      select: {
        id: true,
        studentId: true,
        createdAt: true,
        class: {
          select: {
            id: true,
            name: true,
            subject: { select: { id: true, name: true } },
            grade: { select: { id: true, name: true } }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}
