import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

export type RequestUser = {
  id: string;
  email: string;
  role: 'ADMIN' | 'TEACHER' | 'PARENT';
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): RequestUser | undefined => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  }
);
