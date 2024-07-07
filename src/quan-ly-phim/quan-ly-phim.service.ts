import { JwtService } from '@nestjs/jwt';
import { HttpException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as moment from 'moment'

@Injectable()
export class QuanLyPhimService {
    prisma = new PrismaClient();
    constructor(private jwtService: JwtService) { }

    // lấy ds banner
    async layArrBanner() {
        let items = await this.prisma.banner.findMany()

        let data = {
            "statusCode": 200,
            "message": "Xử lý thành công!",
            "content": items
        }
        return data
    }


    // lấy ds Phim
    async layArrPhim(tenPhim) {
        if (tenPhim) {


            const items = await this.prisma.phim.findMany({
                where: {
                    ten_phim: { contains: tenPhim }
                },
            });
            let data = {
                "statusCode": 200,
                "message": "Xử lý thành công!",
                "content": items
            }
            return data


        } else {
            let items = await this.prisma.phim.findMany()
            let data = {
                "statusCode": 200,
                "message": "Xử lý thành công!",
                "content": items
            }
            return data
        }
    }

    // lấy ds phim phân trang

    async layArrPhimPhanTrang(soTrang, soPhanTuTrenTrang) {
        let index = (soTrang - 1) * soPhanTuTrenTrang
        if (soTrang < 0) { index = ((soTrang * -1) - 1) * soPhanTuTrenTrang }
        const items = await this.prisma.phim.findMany(
            {
                skip: Number(index), // Bắt đầu từ vị trí 0 (bản ghi đầu tiên)
                take: Number(soPhanTuTrenTrang), // Lấy 4 bản ghi
            }
        );
        let totalUser = await this.prisma.phim.count();
        let totalPage = Math.ceil(totalUser / soPhanTuTrenTrang)
        if (soTrang > totalPage) {
            throw new HttpException("Số trang lớn hơn tổng số trang", 404)
        }
        let data = {
            "statusCode": 200,
            "message": "Xử lý thành công!",
            "content": {
                soTrang: soTrang,
                soPhanTuTrenTrang: soPhanTuTrenTrang,
                tongSoTrang: totalPage,
                items: items
            }
        }
        return data

    }

    // lấy arr phim theo ngày
    async layArrPhimTheoNgay(tuNgay, denNgay) {

        const tuNgayNew = moment(tuNgay, "DD/MM/YYYY").format("YYYY-MM-DD");
        const denNgayNew = moment(denNgay, "DD/MM/YYYY").format("YYYY-MM-DD");

        let tuNgayDate = new Date(tuNgayNew)
        let denNgayDate = new Date(denNgayNew)
        if (tuNgayDate > denNgayDate) {
            let data = {
                "statusCode": 404,
                "message": "Không tìm thấy tài nguyên!",
                "content": "Ngày không hợp lệ!",
            }
            throw new HttpException(data, 404)
        } else {
            const results = await this.prisma.phim.findMany({
                where: {
                    ngay_khoi_chieu: {
                        gte: new Date(tuNgayNew),
                        lte: new Date(denNgayNew),
                    },
                },
            });

            let data = {
                "statusCode": 200,
                "message": "Xử lý thành công!",
                "content": results
            }
            return data
        }
    }

    // lấy thông tin phim
    async layThongTinPhim(maPhim) {
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
                    "statusCode": 404,
                    "message": "Không tìm thấy tài nguyên!",
                    "content": "Mã phim không hợp lệ!",
                }
                throw new HttpException(data, 404)
            } else {
                let item = await this.prisma.phim.findUnique({
                    where: {
                        ma_phim: maPhimNum
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
            let data = {
                "statusCode": 404,
                "message": "Không tìm thấy tài nguyên!",
                "content": "Chưa Nhập mã phim!",
            }
            throw new HttpException(data, 404)
        }



    }

    

    // async xoaNguoiDung() {


    // }
}


// let data = {
//     "statusCode": 200,
//     "message": "Xử lý thành công!",
//     "content": item
//   }
//   return data


// let data = {
//     "statusCode": 404,
//     "message": "Không tìm thấy tài nguyên!",
//     "content": "Mật khẩu không đúng!",
//   }
//   throw new HttpException(data, 404)