import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../../modules/auth/types/jwt-payload.type';

type RequestWithUser = Request & {
  user: JwtPayload;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): JwtPayload => {
    const request = context.switchToHttp().getRequest<RequestWithUser>();

    return request.user;
  },
);
