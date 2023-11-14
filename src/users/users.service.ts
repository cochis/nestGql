import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import *  as bcrypt from 'bcrypt'

import { CreateUserInput, UpdateUserInput } from './dto/inputs';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignupInput } from 'src/auth/dto/inputs';

@Injectable()
export class UsersService {

  private logger = new Logger('UsersService')
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {

  }
  async create(signupInput: SignupInput): Promise<User> {
    try {
      const newUser = this.usersRepository.create({
        ...signupInput,
        password: bcrypt.hashSync(signupInput.password, 10)
      })
      return await this.usersRepository.save(newUser)
    } catch (error) {
      this.habdleDBErrors(error)
    }
  }
  async findAll(): Promise<User[]> {
    return [];
  }

  async findOne(id: string): Promise<User> {
    throw new Error(`FindOne not implemented`)
  }



  async block(id: string): Promise<User> {
    throw new Error(`block not implemented`)

  }


  private habdleDBErrors(error: any): never {
    this.logger.error(error)
    if (error === '23505') {
      throw new BadRequestException(error.detail.replace('Key', ''))
    }
    throw new InternalServerErrorException('Please check server logs')

  }

}
