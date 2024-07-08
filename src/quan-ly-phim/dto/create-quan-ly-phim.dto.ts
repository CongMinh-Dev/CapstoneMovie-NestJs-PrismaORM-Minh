export class CreateQuanLyPhimDto { }
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { type } from 'os';

@ApiExtraModels()
export class TenPhimQueryDto {
  @ApiProperty({ required: false })
  tenPhim: string;
}

@ApiExtraModels()
export class MaPhimQueryDto {
  @ApiProperty({ required: false })
  maPhim: number;
}

// up img
@ApiExtraModels()
export class ImgQueryDto {
  @ApiProperty({required: false,  type:"string", format:"binary"})
  phimImg: any;

  @ApiProperty({required: true})
  tenPhim: string

  @ApiProperty({required: true})
  trailer: string

  @ApiProperty({required: false})
  moTa: string

  @ApiProperty({required: true, default:"DD/MM/YYYY"})
  ngayKhoiChieu: string

  @ApiProperty({required: false})
  danhGia: number

  @ApiProperty({required: false})
  hot: boolean

  @ApiProperty({required: true})
  dangChieu: boolean

  @ApiProperty({required: true})
  sapChieu: boolean
}

@ApiExtraModels()
export class PhimParamDto {
  @ApiProperty({ required: true, default: 1 })
  soTrang: number;

  @ApiProperty({ required: true, default: 2 })
  soPhanTuTrenTrang: number;
}

@ApiExtraModels()
export class PhimTheoNgayParamDto {
  @ApiProperty({ required: true, default: "02/06/2024"})
  tuNgay: string;

  @ApiProperty({ required: true, default: "10/06/2024" })
  denNgay: string;
}

@ApiExtraModels()
export class MaPhimDto {
  @ApiProperty({ required: true})
  maPhim: number;

  
}


// @ApiExtraModels()
// export class UserQueryDto {
//   @ApiProperty({ required: false })
//   tuKhoa: string;
// }

// @ApiExtraModels()
// export class TaiKhoanQueryDto {
//   @ApiProperty({ required: true })
//   taiKhoan: number;
// }

// @ApiExtraModels()
// export class UserParamDto {
//   @ApiProperty({ required: true, default: 1 })
//   soTrang: number;

//   @ApiProperty({ required: true, default: 2 })
//   soPhanTuTrenTrang: number;
// }

// // thông tin người dùng
// @ApiExtraModels()
// export class InfoUserQueryDto {
//   @ApiProperty({ required: true })
//   email: string;
// }


// export type KindUserType = {
//   loai_nguoi_dung: string,
// }

// export type PhanTrangNguoiDungType = {
//   currentPage: number,
//   count: number,
//   totalPages: number,
//   totalCount: number,
//   items: [
//     {
//       taiKhoan: string,
//       matKhau: string,
//       email: string,
//       soDt: string,
//       maNhom: null,
//       maLoaiNguoiDung: string,
//       hoTen: string
//     }]
// }

// export type NguoiDungType = {
//   statusCode: string,
//   message: string,
//   content: [
//     {
//       taiKhoan: string,
//       matKhau: string,
//       email: string,
//       soDt: string,
//       maNhom: null,
//       maLoaiNguoiDung: string,
//       hoTen: string
//     }
//   ]

// }