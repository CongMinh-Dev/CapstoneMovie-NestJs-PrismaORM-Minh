import { Controller, Get, HttpCode, Query, UseGuards } from '@nestjs/common';
import { QuanLyPhimService } from './quan-ly-phim.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { MaPhimQueryDto, PhimParamDto, PhimTheoNgayParamDto, TenPhimQueryDto } from './dto/create-quan-ly-phim.dto';

@ApiTags("Quản Lý Phim")
@Controller('api/QuanLyPhim')
export class QuanLyPhimController {
  constructor(private readonly quanLyPhimService: QuanLyPhimService) { }

  @HttpCode(200)
  @Get("/LayDanhSachBanner")
  layArrBanner() {
    return this.quanLyPhimService.layArrBanner();
  }

  // lấy ds phim
  @HttpCode(200)
  @Get("/LayDanhSachPhim")
  layArrPhim(@Query() query: TenPhimQueryDto) {

    return this.quanLyPhimService.layArrPhim(query.tenPhim);
  }

  // lấy ds phim phân trang
  @HttpCode(200)
  @Get("/LayDanhSachPhimPhanTrang")
  layArrPhimPhanTrang(@Query() query: PhimParamDto) {

    return this.quanLyPhimService.layArrPhimPhanTrang(query.soTrang, query.soPhanTuTrenTrang);
  }

  // lấy ds phim theo ngày
  @HttpCode(200)
  @Get("/LayDanhSachPhimTheoNgay")
  layArrPhimTheoNgay(@Query() query: PhimTheoNgayParamDto) {

    return this.quanLyPhimService.layArrPhimTheoNgay(query.tuNgay, query.denNgay);
  }

  // lấy thông tin phim
  @HttpCode(200)
  @Get("/LayThongTinPhim")
  layThongTinPhim(@Query() query: MaPhimQueryDto) {
    return this.quanLyPhimService.layThongTinPhim(query.maPhim);
  }

  // @HttpCode(200)
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard("jwt"))
  // @Post("/XoaNguoiDung")
  // xoaNguoiDung() {
  //   return this.nguoiDungService.xoaNguoiDung();
  // }
}
