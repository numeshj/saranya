import { Body, Controller, Post } from '@nestjs/common';
import { ZodValidationPipe } from '../../common/dto/zod-validation.pipe';
import { Roles } from '../../common/decorators/roles.decorator';
import { UsersService } from './users.service';
import { createUserSchema, type CreateUserInput } from '@saranya/shared';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Post()
  @Roles('ADMIN')
  async create(
    @Body(new ZodValidationPipe(createUserSchema)) body: CreateUserInput
  ) {
    return this.users.create(body);
  }
}
