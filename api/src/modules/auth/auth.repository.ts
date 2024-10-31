import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CredentialsService } from '../credentials/credentials.service';
import { JwtService } from '@nestjs/jwt';
import { Credentials } from '../credentials/entities/credential.entity';


@Injectable()
export class AuthRepository {
    constructor(
        private readonly credentialsService: CredentialsService,
        private readonly jwtServiceRepository: JwtService,
    ) { }

    async findOneByEmail(email: string): Promise<Credentials | null> {
        return await this.credentialsService.findOneByEmail(email);
    }

    async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword);
    }


    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    generateToken(payload: { email: string; sub: string }) {

        try {
            console.log(payload);
            
            const token = this.jwtServiceRepository.sign(payload);
            if(!token) throw new BadRequestException('Hubo un error al generar el token')
            return token
        } catch (error) {            
            throw new BadRequestException(error.message)
        }
       
        
      }

    

}
