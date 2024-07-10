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









