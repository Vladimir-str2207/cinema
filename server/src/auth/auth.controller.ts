import {
  Body,
  Controller,
  Post,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Public } from '../decorators/public.decorator';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserDocument } from 'src/user/user.schema';
import { AccessGuard } from './guards/access.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Public()
  // @Post('login')
  // @ApiBody({ type: [CreateAuthDto] })
  // async signIn(@Body() createAuthDto: CreateAuthDto) {
  //   const user = await this.authService.signIn(createAuthDto);
  //   const token = this.authService.generateToken(
  //     user.id,
  //     user.email,
  //     user.roles,
  //   );
  //   return token;
  // }

  @Public()
  @Post('login')
  @ApiBody({ type: [CreateAuthDto] })
  async signIn(@Body() createAuthDto: CreateAuthDto) {
    const user = await this.authService.signIn(createAuthDto);
    const token = this.authService.generateToken(
      user.id,
      user.email,
      user.roles,
    );
    
    return { token, user }; // Возвращаем токен и данные пользователя
  }

  @Get('user') // Новый маршрут для проверки токена
  @UseGuards(AccessGuard) // Защита маршрута с помощью guard
  async getUser(@Req() req: Request & { user: UserDocument }) {
    return req.user; // Возвращаем данные пользователя из токена
  }

  @Public()
  @Post('link')
  async sendMagicLink(@Body('email') email: string) {
    return this.authService.sendMagicLink(email);
  }
}
