import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards, Query } from '@nestjs/common';
import { QuanLyRapService } from './quan-ly-rap.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { MaHeThongRapQueryDto, MaPhimQueryDto } from './dto/create-quan-ly-rap.dto';

@ApiTags("Quản Lý Rạp")
@Controller('api/QuanLyRap')
export class QuanLyRapController {
  constructor(private readonly quanLyRapService: QuanLyRapService) { }
  // lấy thông tin he thong rap
  @HttpCode(200)
  @Get("/LayThongTinHeThongRap")
  layThongTinHeThongRap(@Query() query: MaHeThongRapQueryDto) {
    return this.quanLyRapService.layThongTinHeThongRap(query.maHeThongRap);
  }

  // lấy thông tin cụm rạp hệ thống
  @HttpCode(200)
  @Get("/LayThongTinCumRapTheoHeThong")
  layThongTinCumRap(@Query() query: MaHeThongRapQueryDto) {
    return this.quanLyRapService.layThongTinCumRap(query.maHeThongRap);
  }

  // lấy lịch chiếu theo hệ thống
  @HttpCode(200)
  @Get("/LayThongTinLichChieuHeThongRap")
  layThongTinLichChieuHeThongRap(@Query() query: MaHeThongRapQueryDto) {
    return this.quanLyRapService.layThongTinLichChieuHeThongRap(query.maHeThongRap);
  }

  // lấy thông tin lịch chiếu phim
  @HttpCode(200)
  @Get("/LayThongTinLichChieuPhim")
  layThongTinLichChieuPhim(@Query() query: MaPhimQueryDto) {
    return this.quanLyRapService.layThongTinLichChieuPhim(query.maPhim);
  }


  // @HttpCode(200)
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard("jwt"))
  // @Post("/XoaNguoiDung")
  // xoaNguoiDung() {
  //   return this.nguoiDungService.xoaNguoiDung();
  // }
}
