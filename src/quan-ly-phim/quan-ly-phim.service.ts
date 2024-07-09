import { JwtService } from '@nestjs/jwt';
import { HttpException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as moment from 'moment'
import { v2 as cloudinary } from 'cloudinary'
import * as fs from 'node:fs';
import * as compress_images from "compress-images"



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

    // them phim
    async themPhim(body, file) {

        if (body.tenPhim && body.trailer && body.ngayKhoiChieu && body.dangChieu && body.sapChieu && file) {

            cloudinary.config({
                cloud_name: 'dgqxl6kjl',
                api_key: '235221651969883',
                api_secret: 'biFICi47-VNwBm0O8GGoXEOXyaQ'
            });
            const newName = file.filename;
            // giảm dung lượng file
            let input = `public/img/${file.filename}`
            let output = `public/imgLow/`

            await compress_images(input, output,
                {
                    compress_force: false, statistic: true, autoupdate: true
                }, false,
                { jpg: { engine: "mozjpeg", command: ["-quality", "20"] } },
                { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
                { svg: { engine: "svgo", command: "--multipass" } },
                { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },

                function (err, completed, statistic) {

                    if (completed) {

                        // đã chuyển thành công thì mới xóa file gốc
                        fs.unlink(`public/img/${file.filename}`, (err) => {
                            err && console.log(err)
                        })
                        // Tải file lên Cloudinary
                        cloudinary.uploader
                            .upload(statistic.path_out_new, {
                                asset_folder: 'node 41',
                                resource_type: 'image',
                                public_id: newName, //id trên clound
                                display_name: file.originalname // tên hiển thị trên cloud, k có là nó tự random
                            })
                            .then(async (res) => {
                                // up lên thành công thì xóa file low
                                fs.unlink(`public/imgLow/${file.filename}`, (err) => { })
                                const ngayKhoiChieu1 = moment(body.ngayKhoiChieu, "DD/MM/YYYY").format("YYYY-MM-DD");
                                let ngayKhoiChieu2 = new Date(ngayKhoiChieu1)
                                let prisma = new PrismaClient()
                                await prisma.phim.create({ //k có await là k chạy dc lệnh này
                                    data: {
                                        ten_phim: body.tenPhim,
                                        trailer: body.trailer,
                                        hinh_anh: res.secure_url,
                                        mo_ta: body.moTa,
                                        ngay_khoi_chieu: ngayKhoiChieu2,
                                        danh_gia: Number(body.danhGia),
                                        hot: Boolean(body.hot),
                                        dang_chieu: Boolean(body.dangChieu),
                                        sap_chieu: Boolean(body.sapChieu),

                                    }
                                })

                            })

                    }
                }
            )

            let data = {
                "statusCode": 200,
                "message": "Thêm phim thành công!",
            }
            return data
        } else {
            let data = {
                "statusCode": 400,
                "message": "Yêu cầu không hợp lệ!",
                "content": "Thiếu dữ liệu về phim!",
            }
            throw new HttpException(data, 400)
        }





    }

    // xóa phim
    async xoaPhim(maPhim) {
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
                    "message": "Yêu cầu không hợp lệ!",
                    "content": "Sai mã phim!",
                }
                throw new HttpException(data, 400)
            } else {
                await this.prisma.phim.delete({
                    where: { ma_phim: maPhimNum }
                })
                let data = {
                    "statusCode": 200,
                    "message": "Xóa phim thành công!",
                }
                return data
            }

        } else {
            let data = {
                "statusCode": 400,
                "message": "Yêu cầu không hợp lệ!",
                "content": "Thiếu mã phim!",
            }
            throw new HttpException(data, 400)
        }

    }

    // cap nhat phim
    async capNhatPhim(body, file) {
        if (body.maPhim) {
            let arrMaPhim = await this.prisma.phim.findMany({
                select: { ma_phim: true }
            })
            let index = arrMaPhim.findIndex((item) => {
                return item.ma_phim == Number(body.maPhim)
            })
            // đúng mã phim mới cập nhật
            if (index != -1) {
                const ngayKhoiChieu1 = moment(body.ngayKhoiChieu, "DD/MM/YYYY").format("YYYY-MM-DD");
                let ngayKhoiChieu2 = new Date(ngayKhoiChieu1)
                // có hoặc k update ảnh phim
                if (file) {
                    cloudinary.config({
                        cloud_name: 'dgqxl6kjl',
                        api_key: '235221651969883',
                        api_secret: 'biFICi47-VNwBm0O8GGoXEOXyaQ'
                    });
                    const newName = file.filename;
                    // giảm dung lượng file
                    let input = `public/img/${file.filename}`
                    let output = `public/imgLow/`

                    await compress_images(input, output,
                        {
                            compress_force: false, statistic: true, autoupdate: true
                        }, false,
                        { jpg: { engine: "mozjpeg", command: ["-quality", "20"] } },
                        { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
                        { svg: { engine: "svgo", command: "--multipass" } },
                        { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },

                        function (err, completed, statistic) {
                            if (completed) {
                                // đã chuyển thành công thì mới xóa file gốc
                                fs.unlink(`public/img/${file.filename}`, (err) => {
                                    err && console.log(err)
                                })
                                // Tải file lên Cloudinary
                                cloudinary.uploader
                                    .upload(statistic.path_out_new, {
                                        asset_folder: 'node 41',
                                        resource_type: 'image',
                                        public_id: newName, //id trên clound
                                        display_name: file.originalname // tên hiển thị trên cloud, k có là nó tự random
                                    })
                                    .then(async (res) => {
                                        // up lên thành công thì xóa file low
                                        fs.unlink(`public/imgLow/${file.filename}`, (err) => { })

                                        let prisma = new PrismaClient()
                                        await prisma.phim.update({ //k có await là k chạy dc lệnh này
                                            where: { ma_phim: Number(body.maPhim) },
                                            data: {
                                                ten_phim: body.tenPhim && body.tenPhim,
                                                trailer: body.trailer && body.trailer,
                                                mo_ta: body.moTa && body.moTa,
                                                ngay_khoi_chieu: body.ngayKhoiChieu && ngayKhoiChieu2,
                                                danh_gia: body.danhGia && Number(body.danhGia),
                                                hot: body.hot && Boolean(body.hot),
                                                dang_chieu: body.dangChieu && Boolean(body.dangChieu),
                                                sap_chieu: body.sapChieu && Boolean(body.sapChieu),
                                                hinh_anh: res.secure_url,


                                            }
                                        })

                                    })
                            }
                        }
                    )

                    let data = {
                        "statusCode": 200,
                        "message": "Cập nhật phim thành công!",
                    }
                    return data
                } else {
                    await this.prisma.phim.update({
                        where: { ma_phim: Number(body.maPhim) },
                        data: {
                            ten_phim: body.tenPhim && body.tenPhim,
                            trailer: body.trailer && body.trailer,
                            mo_ta: body.moTa && body.moTa,
                            ngay_khoi_chieu: body.ngayKhoiChieu && ngayKhoiChieu2,
                            danh_gia: body.danhGia && Number(body.danhGia),
                            hot: body.hot && Boolean(body.hot),
                            dang_chieu: body.dangChieu && Boolean(body.dangChieu),
                            sap_chieu: body.sapChieu && Boolean(body.sapChieu),

                        }
                    })
                    let data = {
                        "statusCode": 200,
                        "message": "Cập nhật phim thành công!",
                    }
                    return data
                }

            } else {
                let data = {
                    "statusCode": 400,
                    "message": "Yêu cầu không hợp lệ!",
                    "content": "Sai mã phim!",
                }
                throw new HttpException(data, 400)
            }


        } else {
            let data = {
                "statusCode": 400,
                "message": "Yêu cầu không hợp lệ!",
                "content": "Thiếu mã phim!",
            }
            throw new HttpException(data, 400)
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