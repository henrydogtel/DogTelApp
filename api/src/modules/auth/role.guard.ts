import { Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from 'src/enums/user-role.enum';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
  canActivate(context: any) {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;

    if (user && user.role === UserRole.ADMIN) {
      return true; 
    }

    return false; 
  }
}
