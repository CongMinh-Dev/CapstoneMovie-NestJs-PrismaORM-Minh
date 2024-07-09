import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { type } from "os";

export class CreateQuanLyDatVeDto { }



@ApiExtraModels()
export class MaLichChieuQueryDto {
    @ApiProperty({ required: true })
    maLichChieu: number;
}


export class lichChieuTypeDto {
    @ApiProperty({ required: true })
    maRap: number

    @ApiProperty({ required: true })
    maPhim: number

    @ApiProperty({ required: true, default: "02/02/2024" })
    ngayGioChieu: Date

    @ApiProperty({ required: true })
    giaVe: number
}


export type aTypeDto = {
    
            maGhe:Number,
            giaVe:Number,
   
    
}



@ApiExtraModels()
export class TaiKhoanQueryDto {
  @ApiProperty({ required: true })
  taiKhoan: number;
}

export class datVeTypeDto {
    @ApiProperty({ required: true })
    maLichChieu: number

    @ApiProperty({ required: true })
    danhSachVe: TaiKhoanQueryDto[]

}
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