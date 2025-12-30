import { Body, Controller, Get, Post } from '@nestjs/common';
import { Roles } from '../../common/decorators/roles.decorator';
import { ZodValidationPipe } from '../../common/dto/zod-validation.pipe';
import { createSubjectSchema, type CreateSubjectInput } from '@saranya/shared';
import { SubjectsService } from './subjects.service';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjects: SubjectsService) {}

  @Post()
  @Roles('ADMIN')
  async create(
    @Body(new ZodValidationPipe(createSubjectSchema)) body: CreateSubjectInput
  ) {
    return this.subjects.create(body);
  }

  @Get()
  async list() {
    return this.subjects.list();
  }
}
