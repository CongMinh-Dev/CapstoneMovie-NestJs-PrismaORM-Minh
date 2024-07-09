import { HttpException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment'

@Injectable()
export class QuanLyDatVeService {

  prisma = new PrismaClient();
  constructor(private jwtService: JwtService) { }

  // lay danh sach phong ve
  async layDsPhongVe(maLichChieu) {
    if (maLichChieu) {
      let maLichChieuNum = Number(maLichChieu)
      let arrMaLichChieu = await this.prisma.lichChieu.findMany({
        select: { ma_lich_chieu: true }
      })
      let index = arrMaLichChieu.findIndex((item) => {
        return item.ma_lich_chieu == maLichChieuNum
      })

      if (index == -1) {
        let data = {
          "statusCode": 400,
          "message": "Không tìm thấy tài nguyên!",
          "content": "Mã lịch chiếu không hợp lệ!",
        }
        throw new HttpException(data, 400)
      } else {
        let items = await this.prisma.lichChieu.findMany({
          where: { ma_lich_chieu: maLichChieuNum },
          include: {
            Phim: true,
            RapPhim: {
              include: {
                Ghe: true
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
        "content": "Thiếu mã lịch chiếu!",
      }
      throw new HttpException(data, 400)
    }
  }

  // tạo lịch chiếu
  async taoLichChieu(model) {
    if (model.maRap && model.maPhim && model.ngayGioChieu && model.giaVe) {
      // ngày lớn hơn ngày hiện tại mới được
      const ngayChieuFormat = moment(model.ngayGioChieu, "DD/MM/YYYY").format("YYYY-MM-DD");
      let ngayGioChieuSql = new Date(ngayChieuFormat)
      let todayDate = new Date
      if (ngayGioChieuSql < todayDate) {
        let data = {
          "statusCode": 400,
          "message": "Không tìm thấy tài nguyên!",
          "content": "Ngày khởi chiểu không được nhỏ hơn ngày hiện tại!",
        }
        throw new HttpException(data, 400)
      } else {
        // mã rạp tồn tại mới được
        let arrMaRap = await this.prisma.rapPhim.findMany({ select: { ma_rap: true } })
        let indexRap = arrMaRap.findIndex((item) => {
          return item.ma_rap == Number(model.maRap)
        })
        if (indexRap == -1) {
          let data = {
            "statusCode": 400,
            "message": "Không tìm thấy tài nguyên!",
            "content": "Mã rạp không tồn tại!",
          }
          throw new HttpException(data, 400)
        } else {
          await this.prisma.lichChieu.create({
            data: {
              ma_rap: Number(model.maRap),
              ma_phim: Number(model.maPhim),
              ngay_gio_chieu: ngayGioChieuSql,
              gia_ve: Number(model.giaVe),
            }
          });
          let data = {
            "statusCode": 200,
            "message": "Xử lý thành công!",
            "content": {}
          }
          return data
        }
      }

    } else {
      let data = {
        "statusCode": 400,
        "message": "Không tìm thấy tài nguyên!",
        "content": "Thiếu trường dữ liệu!",
      }
      throw new HttpException(data, 400)
    }
  }

  // dat dat ve 
  async datVe(model) {
    // if (model.taiKhoan && model.maLichChieu && model.maGhe) {
    //   let arrMaGhe = await this.prisma.ghe.findMany({ select: { ma_ghe: true } })
    //   let indexGhe = arrMaGhe.findIndex((item) => {
    //     return item.ma_ghe == Number(model.maGhe)
    //   })

    //   if (indexGhe == -1) {
    //     let data = {
    //       "statusCode": 400,
    //       "message": "Không tìm thấy tài nguyên!",
    //       "content": "Mã ghế không tồn tại!",
    //     }
    //     throw new HttpException(data, 400)
    //   } else {
    //     await this.prisma.datVe.create({
    //       data: {
    //         tai_khoan: Number(model.taiKhoan),
    //         ma_lich_chieu: Number(model.maLichChieu),
    //         ma_ghe: Number(model.maGhe),
    //       }
    //     });

    //     await this.prisma.ghe.update({
    //       where: {
    //         ma_ghe: Number(model.maGhe)
    //       },
    //       data: {
    //         da_dat: true,
    //         tai_khoan_nguoi_dat: Number(model.taiKhoan)
    //       }
    //     });

    //     let data = {
    //       "statusCode": 200,
    //       "message": "Xử lý thành công!",
    //       "content": {}
    //     }
    //     return data


    //   }

    // } else {
    //   let data = {
    //     "statusCode": 400,
    //     "message": "Không tìm thấy tài nguyên!",
    //     "content": "Thiếu trường dữ liệu!",
    //   }
    //   throw new HttpException(data, 400)
    // }
  }


  // async xoaNguoiDung() {

  // }

  // let data = {
  //     "statusCode": 200,
  //     "message": "Xử lý thành công!",
  //     "content": item
  //   }
  //   return data

  // let data = {
  //     "statusCode": 400,
  //     "message": "Không tìm thấy tài nguyên!",
  //     "content": "Mật khẩu không đúng!",
  //   }
  //   throw new HttpException(data, 400)

}
