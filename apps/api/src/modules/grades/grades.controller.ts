import { Body, Controller, Get, Post } from '@nestjs/common';
import { Roles } from '../../common/decorators/roles.decorator';
import { ZodValidationPipe } from '../../common/dto/zod-validation.pipe';
import { createGradeSchema, type CreateGradeInput } from '@saranya/shared';
import { GradesService } from './grades.service';

@Controller('grades')
export class GradesController {
  constructor(private readonly grades: GradesService) {}

  @Post()
  @Roles('ADMIN')
  async create(
    @Body(new ZodValidationPipe(createGradeSchema)) body: CreateGradeInput
  ) {
    return this.grades.create(body);
  }

  @Get()
  async list() {
    return this.grades.list();
  }
}
