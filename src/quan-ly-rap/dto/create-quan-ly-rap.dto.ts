export class CreateQuanLyRapDto {}
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';


@ApiExtraModels()
export class MaHeThongRapQueryDto {
  @ApiProperty({ required: false })
  maHeThongRap: number;
}

@ApiExtraModels()
export class MaPhimQueryDto {
  @ApiProperty({ required: true })
  maPhim: number;
}

