import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query, UseGuards, Req } from '@nestjs/common';
import { QuanLyDatVeService } from './quan-ly-dat-ve.service';
import { ApiBearerAuth, ApiBody, ApiExtraModels, ApiProperty, ApiTags } from '@nestjs/swagger';
import { MaLichChieuQueryDto, lichChieuTypeDto } from './dto/create-quan-ly-dat-ve.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from "express"



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
  @UseGuards(AuthGuard("jwt"))
  @Post("/DatVe")
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        maLichChieu: { type: 'number' },
        danhSachVe: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              maGhe: { type: 'string' },
              giaVe: { type: "number" }
            },
          },
        },
      },
    }
  })
  datVe(@Body() datVeObj, @Req() req: Request) {
    // console.log(datVeObj)
    // console.log(req)
    return this.quanLyDatVeService.datVe(datVeObj,req.user);
  }

  // @HttpCode(200)
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard("jwt"))
  // @Post("/XoaNguoiDung")
  // xoaNguoiDung() {
  //   return this.nguoiDungService.xoaNguoiDung();
  // }
}
