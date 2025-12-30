import { Body, Controller, Get, Post } from '@nestjs/common';
import { Roles } from '../../common/decorators/roles.decorator';
import { ZodValidationPipe } from '../../common/dto/zod-validation.pipe';
import { createClassSchema, type CreateClassInput } from '@saranya/shared';
import { ClassesService } from './classes.service';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classes: ClassesService) {}

  @Post()
  @Roles('ADMIN')
  async create(@Body(new ZodValidationPipe(createClassSchema)) body: CreateClassInput) {
    return this.classes.create(body);
  }

  @Get()
  async list() {
    return this.classes.list();
  }
}
