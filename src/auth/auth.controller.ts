import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiProperty } from '@nestjs/swagger';

class userType{
  @ApiProperty()
  taiKhoan:string

  @ApiProperty()
  matKhau:string

}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {  }

  // @Post("/DangNhap")
  //  dangNhap(@Body() body: userType) {
    
  //     return  this.authService.dangNhap(body.taiKhoan, body.matKhau );
  // }
}
