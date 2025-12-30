import { Body, Controller, Get, Post } from '@nestjs/common';
import { Roles } from '../../common/decorators/roles.decorator';
import { ZodValidationPipe } from '../../common/dto/zod-validation.pipe';
import { createEnrollmentSchema, type CreateEnrollmentInput } from '@saranya/shared';
import { EnrollmentsService } from './enrollments.service';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollments: EnrollmentsService) {}

  @Post()
  @Roles('ADMIN')
  async create(
    @Body(new ZodValidationPipe(createEnrollmentSchema)) body: CreateEnrollmentInput
  ) {
    return this.enrollments.create(body);
  }

  @Get()
  async list() {
    return this.enrollments.list();
  }
}
