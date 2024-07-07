export class CreateNguoiDungDto { }
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { type } from 'os';

@ApiExtraModels()
export class UserQueryDto {
  @ApiProperty({ required: false })
  tuKhoa: string;
}

@ApiExtraModels()
export class TaiKhoanQueryDto {
  @ApiProperty({ required: true })
  taiKhoan: number;
}

@ApiExtraModels()
export class UserParamDto {
  @ApiProperty({ required: true, default: 1 })
  soTrang: number;

  @ApiProperty({ required: true, default: 2 })
  soPhanTuTrenTrang: number;
}

// thông tin người dùng
@ApiExtraModels()
export class InfoUserQueryDto {
  @ApiProperty({ required: true })
  email: string;
}


export type KindUserType = {
  loai_nguoi_dung: string,
}

export type PhanTrangNguoiDungType = {
  currentPage: number,
  count: number,
  totalPages: number,
  totalCount: number,
  items: [
    {
      taiKhoan: string,
      matKhau: string,
      email: string,
      soDt: string,
      maNhom: null,
      maLoaiNguoiDung: string,
      hoTen: string
    }]
}

export type NguoiDungType = {
  statusCode: string,
  message: string,
  content: [
    {
      taiKhoan: string,
      matKhau: string,
      email: string,
      soDt: string,
      maNhom: null,
      maLoaiNguoiDung: string,
      hoTen: string
    }
  ]

}