import { createParamDecorator, ExecutionContext, SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/roles.guard';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

export const Public = () => SetMetadata('isPublic', true);

export const Auth = () => applyDecorators(
  UseGuards(AuthGuard('jwt')),
);

export const AuthWithRoles = (...roles: string[]) => applyDecorators(
  UseGuards(AuthGuard('jwt'), RolesGuard),
  Roles(...roles),
);
