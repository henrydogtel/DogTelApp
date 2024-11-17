import { ExecutionContext } from '@nestjs/common';
declare const AuthGuardJwt_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class AuthGuardJwt extends AuthGuardJwt_base {
    getRequest(context: ExecutionContext): any;
}
export {};
