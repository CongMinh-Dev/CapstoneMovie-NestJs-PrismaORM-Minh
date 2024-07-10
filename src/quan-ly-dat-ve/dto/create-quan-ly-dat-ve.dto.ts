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


// ss trong 1 mảng xem các item có trùng không
export function hasDuplicates(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (array[i] === array[j]) {
                return true;
            }
        }
    }
    return false;
}

// ss 2 mảng xem item của mảng này có trùng với mảng khác không
export function daDatGhe(array1,aray2) {
    for (let i in array1) {
        for (let j in aray2) {
            if (array1[i] == aray2[j]) {
                return true;
            }
        }
    }
    return false;
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