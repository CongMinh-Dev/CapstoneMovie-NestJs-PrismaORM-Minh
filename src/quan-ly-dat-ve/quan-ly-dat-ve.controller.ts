import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query, UseGuards } from '@nestjs/common';
import { QuanLyDatVeService } from './quan-ly-dat-ve.service';
import { ApiBearerAuth, ApiExtraModels, ApiProperty, ApiTags } from '@nestjs/swagger';
import { MaLichChieuQueryDto, TaiKhoanQueryDto, datVeTypeDto, lichChieuTypeDto } from './dto/create-quan-ly-dat-ve.dto';
import { AuthGuard } from '@nestjs/passport';




@ApiTags("Quản Lý Đặt Vé")
@Controller('api/QuanLyDatVe')
export class QuanLyDatVeController {
  constructor(private readonly quanLyDatVeService: QuanLyDatVeService) { }
  // lay danh sach phong ve
  @HttpCode(200)
  @Get("/LayDanhSachPhongVe")
  layDsPhongVe(@Query() query: MaLichChieuQueryDto) {

    return this.quanLyDatVeService.layDsPhongVe(query.maLichChieu);
  }

  // tạo lịch chiếu
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Post("/TaoLichChieu")
  taoLichChieu(@Body() body: lichChieuTypeDto    
   ) {
    return this.quanLyDatVeService.taoLichChieu(body);
  }

  // dat ve
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiExtraModels(TaiKhoanQueryDto)
  @UseGuards(AuthGuard("jwt"))
  @Post("/DatVe")
  datVe(@Body() body: datVeTypeDto    
   ) {
    return this.quanLyDatVeService.datVe(body);
  }

  // @HttpCode(200)
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard("jwt"))
  // @Post("/XoaNguoiDung")
  // xoaNguoiDung() {
  //   return this.nguoiDungService.xoaNguoiDung();
  // }
}
