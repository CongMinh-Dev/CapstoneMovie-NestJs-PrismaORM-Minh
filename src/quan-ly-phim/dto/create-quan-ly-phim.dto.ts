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

// add phim
@ApiExtraModels()
export class ImgQueryDto {
  @ApiProperty({required: false})
  maPhim: number;

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

// update phim
@ApiExtraModels()
export class UpdatePhimQueryDto {
  @ApiProperty({required: true})
  maPhim: number;

  @ApiProperty({required: false,  type:"string", format:"binary"})
  phimImg: any;

  @ApiProperty({required: false})
  tenPhim: string

  @ApiProperty({required: false})
  trailer: string

  @ApiProperty({required: false})
  moTa: string

  @ApiProperty({required: false, default:"DD/MM/YYYY"})
  ngayKhoiChieu: string

  @ApiProperty({required: false})
  danhGia: number

  @ApiProperty({required: false})
  hot: boolean

  @ApiProperty({required: false})
  dangChieu: boolean

  @ApiProperty({required: false})
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


