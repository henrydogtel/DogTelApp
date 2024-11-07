import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    // Aquí deberías asegurar que el payload contiene la información que necesitas
    console.log('Payload:', payload); // Para verificar si contiene role y otras propiedades
    return { userId: payload.sub, username: payload.username, role: payload.role };
  }
}
