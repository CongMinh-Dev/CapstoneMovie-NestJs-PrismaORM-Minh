import { Module } from '@nestjs/common';
import { QuanLyRapService } from './quan-ly-rap.service';
import { QuanLyRapController } from './quan-ly-rap.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[JwtModule.register({})],   //thêm dòng này
  controllers: [QuanLyRapController],
  providers: [QuanLyRapService],
})
export class QuanLyRapModule {}
