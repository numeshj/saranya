import { BadRequestException, Injectable } from '@nestjs/common';
import type { CreateGradeInput } from '@saranya/shared';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class GradesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateGradeInput) {
    const grade = await this.prisma.grade.create({
      data: {
        name: input.name
      },
      select: {
        id: true,
        name: true,
        createdAt: true
      }
    });

    return grade;
  }

  async list() {
    return this.prisma.grade.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  // used by other services
  async ensureExists(id: string) {
    const grade = await this.prisma.grade.findUnique({ where: { id } });
    if (!grade) throw new BadRequestException('Grade not found');
    return grade;
  }
}
