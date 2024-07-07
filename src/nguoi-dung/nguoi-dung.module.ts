import { Module } from '@nestjs/common';
import { NguoiDungService } from './nguoi-dung.service';
import { NguoiDungController } from './nguoi-dung.controller';
import {JwtModule} from "@nestjs/jwt"
@Module({
  imports:[JwtModule.register({})],
  controllers: [NguoiDungController],
  providers: [NguoiDungService],
})
export class NguoiDungModule {}
