import { Module } from '@nestjs/common';
import { QuanLyDatVeService } from './quan-ly-dat-ve.service';
import { QuanLyDatVeController } from './quan-ly-dat-ve.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[JwtModule.register({})],   
  controllers: [QuanLyDatVeController],
  providers: [QuanLyDatVeService],
})
export class QuanLyDatVeModule {}
