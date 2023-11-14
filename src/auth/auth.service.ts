import { BadRequestException, Injectable } from '@nestjs/common';
import { SignupInput } from './dto/inputs';
import { AuthResponse } from './dto/types';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService
    ) {

    }
    async signup(signupInput: SignupInput): Promise<AuthResponse> {

        try {
            // ToDo: Crear usuario
            const user = await this.usersService.create(signupInput)
            //ToDo Generar token

            const token = 'ABC123'
            return {
                token,
                user
            }

        } catch (error) {

            throw new BadRequestException('Algo salio mal', error)
        }

    }

}
