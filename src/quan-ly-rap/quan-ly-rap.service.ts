import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class QuanLyRapService {
  prisma = new PrismaClient();
  constructor(private jwtService: JwtService) { }

  // lấy thông tin he thong rap
  async layThongTinHeThongRap(maHeThongRap) {
    if (maHeThongRap) {
      let maHeThongRapNum = Number(maHeThongRap)
      let arrMaHeThongRap = await this.prisma.heThongRap.findMany({
        select: { ma_he_thong_rap: true }
      })
      let index = arrMaHeThongRap.findIndex((item) => {
        return item.ma_he_thong_rap == maHeThongRapNum
      })

      if (index == -1) {
        let data = {
          "statusCode": 400,
          "message": "Không tìm thấy tài nguyên!",
          "content": "Mã hệ thống rạp không hợp lệ!",
        }
        throw new HttpException(data, 400)
      } else {
        let item = await this.prisma.heThongRap.findUnique({
          where: {
            ma_he_thong_rap: maHeThongRapNum
          }
        })
        let data = {
          "statusCode": 200,
          "message": "Xử lý thành công!",
          "content": item
        }
        return data

      }


    } else {
      let item = await this.prisma.heThongRap.findMany()
      let data = {
        "statusCode": 200,
        "message": "Xử lý thành công!",
        "content": item
      }
      return data
    }

  }

  // lấy thông tin cụm rạp hệ thống
  async layThongTinCumRap(maHeThongRap) {
    if (maHeThongRap) {
      let maHeThongRapNum = Number(maHeThongRap)
      let arrMaHeThongRap = await this.prisma.heThongRap.findMany({
        select: { ma_he_thong_rap: true }
      })
      let index = arrMaHeThongRap.findIndex((item) => {
        return item.ma_he_thong_rap == maHeThongRapNum
      })

      if (index == -1) {
        let data = {
          "statusCode": 400,
          "message": "Không tìm thấy tài nguyên!",
          "content": "Mã hệ thống rạp không hợp lệ!",
        }
        throw new HttpException(data, 400)
      } else {
        let items = await this.prisma.heThongRap.findFirst({
          where: { ma_he_thong_rap: maHeThongRapNum },
          include: {
            CumRap: true
          }
        })

        let data = {
          "statusCode": 200,
          "message": "Xử lý thành công!",
          "content": items
        }
        return data

      }


    } else {
      let data = {
        "statusCode": 400,
        "message": "Không tìm thấy tài nguyên!",
        "content": "Chưa nhập mã hệ thống rạp!",
      }
      throw new HttpException(data, 400)
    }

  }

  // lấy lịch chiếu theo hệ thống
  async layThongTinLichChieuHeThongRap(maHeThongRap) {
    if (maHeThongRap) {
      let maHeThongRapNum = Number(maHeThongRap)
      let arrMaHeThongRap = await this.prisma.heThongRap.findMany({
        select: { ma_he_thong_rap: true }
      })
      let index = arrMaHeThongRap.findIndex((item) => {
        return item.ma_he_thong_rap == maHeThongRapNum
      })

      if (index == -1) {
        let data = {
          "statusCode": 400,
          "message": "Không tìm thấy tài nguyên!",
          "content": "Mã hệ thống rạp không hợp lệ!",
        }
        throw new HttpException(data, 400)
      } else {
        let items = await this.prisma.heThongRap.findFirst({
          where: { ma_he_thong_rap: maHeThongRapNum },
          include: {
            CumRap: {
              include: {
                RapPhim: {
                  include: {
                    LichChieu: {
                      include: {
                        Phim: true
                      }
                    }
                  }
                }
              }

            }
          }
        })

        let data = {
          "statusCode": 200,
          "message": "Xử lý thành công!",
          "content": items
        }
        return data

      }


    } else {
      let items = await this.prisma.heThongRap.findMany({
        include: {
          CumRap: {
            include: {
              RapPhim: {
                include: {
                  LichChieu: {
                    include: {
                      Phim: true
                    }
                  }
                }
              }
            }

          }
        }
      })
      let data = {
        "statusCode": 200,
        "message": "Xử lý thành công!",
        "content": items
      }
      return data
    }


  }

  // lấy thông tin lịch chiếu phim
  async layThongTinLichChieuPhim(maPhim) {
    if (maPhim) {
      let maPhimNum = Number(maPhim)
      let arrMaPhim = await this.prisma.phim.findMany({
        select: { ma_phim: true }
      })
      let index = arrMaPhim.findIndex((item) => {
        return item.ma_phim == maPhimNum
      })

      if (index == -1) {
        let data = {
          "statusCode": 400,
          "message": "Không tìm thấy tài nguyên!",
          "content": "Mã phim không hợp lệ!",
        }
        throw new HttpException(data, 400)
      } else {
        let items = await this.prisma.phim.findMany({
          where: { ma_phim: maPhimNum },
          include: {
            LichChieu:{
              include:{
                RapPhim:{
                  include:{
                    CumRap:{
                      include:{
                        HeThongRap:true
                      }
                    }
                  }
                }
              }
            }
          }
        })

        let data = {
          "statusCode": 200,
          "message": "Xử lý thành công!",
          "content": items
        }
        return data

      }


    } else {
      let data = {
        "statusCode": 400,
        "message": "Không tìm thấy tài nguyên!",
        "content": "Chưa nhập mã phim!",
      }
      throw new HttpException(data, 400)
    }

  }


  
}
