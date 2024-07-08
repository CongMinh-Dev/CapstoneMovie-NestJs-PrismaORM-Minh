import { Module } from '@nestjs/common';
import { QuanLyPhimService } from './quan-ly-phim.service';
import { QuanLyPhimController } from './quan-ly-phim.controller';
import {JwtModule} from "@nestjs/jwt"

let cloudinaryConfig = {
  cloud_name: 'dgqxl6kjl',
  api_key: '235221651969883',
  api_secret: 'biFICi47-VNwBm0O8GGoXEOXyaQ',
  // ...tùy chọn khác (tùy chọn)
};

@Module({
  imports:[JwtModule.register({})],
  controllers: [QuanLyPhimController],
  providers: [QuanLyPhimService],
})
export class QuanLyPhimModule {}
