import { BadRequestException, Injectable } from '@nestjs/common';
import type { CreateSubjectInput } from '@saranya/shared';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SubjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateSubjectInput) {
    const subject = await this.prisma.subject.create({
      data: {
        name: input.name
      },
      select: {
        id: true,
        name: true,
        createdAt: true
      }
    });

    return subject;
  }

  async list() {
    return this.prisma.subject.findMany({
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
    const subject = await this.prisma.subject.findUnique({ where: { id } });
    if (!subject) throw new BadRequestException('Subject not found');
    return subject;
  }
}
