import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignupInput } from './dto/inputs';
import { AuthResponse } from './dto/types';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation( ()=> AuthResponse , { name: 'signup' })
  async signup(
    @Args('signupInput') signupinput: SignupInput
  ): Promise<AuthResponse> {
    return this.authService.signup(signupinput)
  }
  // @Mutation( , { name: 'login' })
  // async login(

  // ): Promise<> {
  //   return this.authService.login
  // }

  // @Query( , { name: 'revalidate' })
  // async revalidateToken() {
  //   return this.authService.revalidateToken
  // }
}
