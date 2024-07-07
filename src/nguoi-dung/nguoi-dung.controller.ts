import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpException, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { NguoiDungService } from './nguoi-dung.service';
import { InfoUserQueryDto, KindUserType, NguoiDungType, UserParamDto, UserQueryDto } from './dto/create-nguoi-dung.dto';
import { NguoiDung } from '@prisma/client'
import { ApiBearerAuth, ApiProperty, ApiTags } from "@nestjs/swagger"
import { AuthGuard } from '@nestjs/passport';
import { Request } from "express"

class userType {
  @ApiProperty()
  email: string

  @ApiProperty()
  matKhau: string
}
class userRegisType {
  @ApiProperty()
  email: string

  @ApiProperty()
  matKhau: string

  @ApiProperty()
  hoTen: string

  @ApiProperty()
  soDt: string

  @ApiProperty()
  loaiNguoiDung: string
}

@ApiTags("Quản Lý Người Dùng")
@Controller('api/QuanLyNguoiDung')
export class NguoiDungController {
  constructor(private readonly nguoiDungService: NguoiDungService) { }

  @HttpCode(200)
  @Get("/LayDanhSachNguoiDung")
  getAllUser(@Query() query: UserQueryDto) {
    return this.nguoiDungService.getAllUser(query.tuKhoa);
  }

  @HttpCode(200)
  @Get("/TimKiemNguoiDung")
  findUser(@Query() query: UserQueryDto) {
    return this.nguoiDungService.findUser(query.tuKhoa);
  }

  @HttpCode(200)
  @Get("/LayDanhSachLoaiNguoiDung")
  getTypeUser() {
    return this.nguoiDungService.getTypeUser();
  }

  @HttpCode(200)
  @Get("/LayDanhSachNguoiDungPhanTrang")
  phanTrangNguoiDung(@Query() query: UserParamDto) {
    return this.nguoiDungService.phanTrangNguoiDung(query.soTrang, query.soPhanTuTrenTrang);
  }

  @HttpCode(200)
  @Post("/DangNhap")
  dangNhap(@Body() body: userType) {

    return this.nguoiDungService.dangNhap(body.email, body.matKhau);
  }

  @HttpCode(200)
  @Post("/DangKy")
  dangKy(@Body() body: userRegisType) {

    return this.nguoiDungService.dangKy(body);
  }


  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Post("/ThongTinTaiKhoan")
  thongTinTaiKhoan(@Req() req: Request) {
    let data = req.user

    return this.nguoiDungService.thongTinTaiKhoan(data);
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Post("/ThongTinNguoiDung")
  thongTinNguoiDung(@Req() req: Request, @Query() query: InfoUserQueryDto) {
    let data = req.user
    return this.nguoiDungService.thongTinNguoiDung(data, query.email);
  }

  // thêm người dùng
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Post("/ThemNguoiDung")
  themNguoiDung(@Body() body: userRegisType) {
    return this.nguoiDungService.themNguoiDung( body);
  }




  // @Post()
  // create(@Body() createNguoiDungDto: CreateNguoiDungDto) {
  //   return this.nguoiDungService.create(createNguoiDungDto);
  // }



  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.nguoiDungService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateNguoiDungDto: UpdateNguoiDungDto) {
  //   return this.nguoiDungService.update(+id, updateNguoiDungDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.nguoiDungService.remove(+id);
  // }
}
