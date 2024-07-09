import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NguoiDungModule } from './nguoi-dung/nguoi-dung.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { QuanLyPhimModule } from './quan-ly-phim/quan-ly-phim.module';
import { QuanLyRapModule } from './quan-ly-rap/quan-ly-rap.module';
import { QuanLyDatVeModule } from './quan-ly-dat-ve/quan-ly-dat-ve.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }), // Configure environment variables
    JwtModule.register({ // Configure JWT options if using
        secret: "bi_mat", // Replace with your secret
        // ... other JWT options
    }),
    NguoiDungModule, AuthModule, QuanLyPhimModule, QuanLyRapModule, QuanLyDatVeModule],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
