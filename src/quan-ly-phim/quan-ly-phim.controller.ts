import { Controller, Get, HttpCode, Post, Query, UseGuards, UseInterceptors, UploadedFile, Body, Delete } from '@nestjs/common';
import { QuanLyPhimService } from './quan-ly-phim.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ImgQueryDto, MaPhimDto, MaPhimQueryDto, PhimParamDto, PhimTheoNgayParamDto, TenPhimQueryDto, UpdatePhimQueryDto } from './dto/create-quan-ly-phim.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

class phimType {

  @ApiProperty()
  tenPhim: string


}


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

  // them phim
  @ApiConsumes("multipart/form-data") //đổi từ cấu trúc json sang data
  @ApiBody({ type: ImgQueryDto })
  @UseInterceptors(FileInterceptor("phimImg", {
    storage: diskStorage({
      destination: 'public/img/',
      filename: (req, file, callBack) => {
        let mSeceond = new Date().getTime()
        callBack(null, mSeceond + "_" + file.originalname)
      }
    })
  }))
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Post("/ThemPhim")
  themPhim(@Body() body: ImgQueryDto, @UploadedFile() file: Express.Multer.File) {
    return this.quanLyPhimService.themPhim(body, file);
  }

  // xóa phim
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Delete("/XoaPhim")
  xoaPhim(@Query() query: MaPhimDto) {
    return this.quanLyPhimService.xoaPhim(query.maPhim);
  }

  // cap nhat phim
  @ApiConsumes("multipart/form-data") //đổi từ cấu trúc json sang data
  @ApiBody({ type: ImgQueryDto })
  @UseInterceptors(FileInterceptor("phimImg", {
    storage: diskStorage({
      destination: 'public/img/',
      filename: (req, file, callBack) => {
        let mSeceond = new Date().getTime()
        callBack(null, mSeceond + "_" + file.originalname)
      }
    })
  }))
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Post("/CapNhatPhim")
  capNhatPhim(@Body() body: UpdatePhimQueryDto, @UploadedFile() file: Express.Multer.File) {
    return this.quanLyPhimService.capNhatPhim(body, file);
  }


 
}
