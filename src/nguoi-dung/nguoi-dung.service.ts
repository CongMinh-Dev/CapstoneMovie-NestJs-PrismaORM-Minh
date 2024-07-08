import { JwtService } from '@nestjs/jwt';
import { HttpException, Injectable } from '@nestjs/common';
import { PrismaClient, NguoiDung } from '@prisma/client';


@Injectable()
export class NguoiDungService {
  prisma = new PrismaClient();
  constructor(private jwtService: JwtService) { }


  async getAllUser(tuKhoa) {

    if (tuKhoa) {
      // nằm trong ds tài khoản thì tìm tài khoản trước
      let arrTaiKhoan = await this.prisma.nguoiDung.findMany({
        select: { tai_khoan: true }
      })
      let indexTaiKhoan = arrTaiKhoan.findIndex((item) => {
        return item.tai_khoan == tuKhoa
      })

      let tuKhoaNum = Number(tuKhoa)
      if (indexTaiKhoan != -1) {
        let item = await this.prisma.nguoiDung.findUnique({
          where: { tai_khoan: tuKhoaNum }
        })
        let data = {
          "statusCode": 200,
          "message": "Xử lý thành công!",
          "content": item
        }
        return data
      } else {
        const items = await this.prisma.nguoiDung.findMany({
          where: {
            OR: [
              { ho_ten: { contains: tuKhoa } },
              { so_dt: { contains: tuKhoa } },
            ],
          },
        });
        let data = {
          "statusCode": 200,
          "message": "Xử lý thành công!",
          "content": items
        }
        return data
      }

    } else {
      let items: NguoiDung[] = await this.prisma.nguoiDung.findMany()
      let data = {
        "statusCode": 200,
        "message": "Xử lý thành công!",
        "content": items
      }
      return data
    }
  }


  // tìm user
  async findUser(tuKhoa) {
    if (tuKhoa) {
      // nằm trong ds tài khoản thì tìm tài khoản trước
      let arrTaiKhoan = await this.prisma.nguoiDung.findMany({
        select: { tai_khoan: true }
      })
      let indexTaiKhoan = arrTaiKhoan.findIndex((item) => {
        return item.tai_khoan == tuKhoa
      })

      let tuKhoaNum = Number(tuKhoa)
      if (indexTaiKhoan != -1) {
        let item = await this.prisma.nguoiDung.findUnique({
          where: { tai_khoan: tuKhoaNum }
        })
        let data = {
          "statusCode": 200,
          "message": "Xử lý thành công!",
          "content": item
        }
        return data
      } else {
        const items = await this.prisma.nguoiDung.findMany({
          where: {
            OR: [
              { ho_ten: { contains: tuKhoa } },
              { so_dt: { contains: tuKhoa } },
            ],
          },
        });
        let data = {
          "statusCode": 200,
          "message": "Xử lý thành công!",
          "content": items
        }
        return data
      }

    } else {
      let items: NguoiDung[] = await this.prisma.nguoiDung.findMany()
      let data = {
        "statusCode": 200,
        "message": "Xử lý thành công!",
        "content": items
      }
      return data
    }
  }

  // lấy ds loại người dùng
  async getTypeUser() {
    const items = await this.prisma.nguoiDung.findMany({
      distinct: ["loai_nguoi_dung"], // Xác định cột riêng biệt
      select: {
        loai_nguoi_dung: true, // Chỉ chọn cột mong muốn
      },
    });
    let data = {
      "statusCode": 200,
      "message": "Xử lý thành công!",
      "content": items
    }
    return data;
  }

  // phan trang
  async phanTrangNguoiDung(soTrang, soPhanTuTrenTrang) {

    let index = (soTrang - 1) * soPhanTuTrenTrang
    if (soTrang < 0) { index = ((soTrang * -1) - 1) * soPhanTuTrenTrang }
    const items = await this.prisma.nguoiDung.findMany(
      {
        skip: Number(index), // Bắt đầu từ vị trí 0 (bản ghi đầu tiên)
        take: Number(soPhanTuTrenTrang), // Lấy 4 bản ghi
      }
    );
    let totalUser = await this.prisma.nguoiDung.count();
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

  async dangNhap(email, matKhau) {

    let checkEmail = await this.prisma.nguoiDung.findFirst({
      where: {
        email: email
      }
    })
    if (checkEmail) {


      if (matKhau == checkEmail.mat_khau) {
        let token = this.jwtService.sign(
          { email: email, taiKhoan: checkEmail.tai_khoan },
          { expiresIn: "5d", algorithm: "HS256", secret: "bi_mat" })
        let data = {
          "statusCode": 200,
          "message": "Xử lý thành công!",
          "content": {
            tai_khoan: checkEmail.tai_khoan,
            ho_ten: checkEmail.ho_ten,
            email: checkEmail.email,
            so_dt: checkEmail.so_dt,
            loai_nguoi_dung: checkEmail.loai_nguoi_dung,
            "accessToken": token
          }
        }
        return data
      } else {
        let data = {
          "statusCode": 404,
          "message": "Không tìm thấy tài nguyên!",
          "content": "Mật khẩu không đúng!",
        }
        throw new HttpException(data, 404)
      }
    } else {
      let data = {
        "statusCode": 404,
        "message": "Không tìm thấy tài nguyên!",
        "content": "Tài khoản không đúng!",
      }
      throw new HttpException(data, 404)
    }
  }

  // dăng ký 
  async dangKy(model) {
    let checkEmail = await this.prisma.nguoiDung.findFirst({
      where: {
        email: model.email
      }
    })

    if (checkEmail) {
      let data = {
        "statusCode": 400,
        "message": "Không tìm thấy tài nguyên!",
        "content": "Email đã tồn tại!",
      }
      throw new HttpException(data, 400)
    }


    await this.prisma.nguoiDung.create({
      data: {
        email: model.email,
        mat_khau: model.matKhau,
        ho_ten: model.hoTen,
        so_dt: model.soDt,
        loai_nguoi_dung: model.loaiNguoiDung
      }
    });
    let data = {
      "statusCode": 200,
      "message": "Đăng ký thành công!",
      "content": {
        email: model.email,
        matKhau: model.matKhau,
        hoTen: model.hoTen,
        soDt: model.soDt,
        loaiNguoiDung: model.loaiNguoiDung
      }
    }
    return data
  }

  // thong tin tai khoan
  async thongTinTaiKhoan(user) {
    let items = await this.prisma.nguoiDung.findFirst({
      where: { email: user.email },
      include: {
        DatVe: {
          include: {
            LichChieu: {
              include: {
                RapPhim: true,
                Phim: true
              }
            }
          }
        }
      }
    })
    let data = {
      "statusCode": 200,
      "message": "Đăng ký thành công!",
      "content": items
    }
    return data

  }

  // thong tin nguoi dung
  async thongTinNguoiDung(decodeToken, email) {
    // return(`${decodeToken.data} & ${email}`)
    if (decodeToken.email == email) {
      let items = await this.prisma.nguoiDung.findFirst({
        where: { email: decodeToken.email }
      })
      let data = {
        "statusCode": 200,
        "message": "Xử lý thành công!",
        "content": items
      }
      return data
    } else {
      let data = {
        "statusCode": 400,
        "message": "Không tìm thấy tài nguyên!",
        "content": "Email không đúng!",
      }
      throw new HttpException(data, 400)
    }
  }

  // thêm người dùng
  async themNguoiDung(model) {
    let checkEmail = await this.prisma.nguoiDung.findFirst({
      where: {
        email: model.email
      }
    })

    if (checkEmail) {
      let data = {
        "statusCode": 400,
        "message": "Không tìm thấy tài nguyên!",
        "content": "Email đã tồn tại!",
      }
      throw new HttpException(data, 400)
    }
    await this.prisma.nguoiDung.create({
      data: {
        email: model.email,
        mat_khau: model.matKhau,
        ho_ten: model.hoTen,
        so_dt: model.soDt,
        loai_nguoi_dung: model.loaiNguoiDung
      }
    });
    let data = {
      "statusCode": 200,
      "message": "Thêm Người Dùng thành công!",
      "content": {
        email: model.email,
        matKhau: model.matKhau,
        hoTen: model.hoTen,
        soDt: model.soDt,
        loaiNguoiDung: model.loaiNguoiDung
      }
    }
    return data
  }

  // cập nhật người dùng
  async capNhatNguoiDung(user) {

    // tài khoản phải nằm trong ds thì mới được update
    let arrUser = await this.prisma.nguoiDung.findMany({
      select: { tai_khoan: true, email: true }
    })
    let indexUser = arrUser.findIndex((item) => {
      return item.tai_khoan == user.taiKhoan
    })
    if (indexUser != -1) {
      //email chỉ được trùng với chính nó, k đc trùng với các email còn lại
      let arrEmail = await this.prisma.nguoiDung.findMany({
        select: { email: true }
      })
      // lọc ra arrEmail với điệu kiệu không được trùng vs email hiện tại
      let arrEmailFilter = arrEmail.filter((item) => {
        return item.email != arrUser[indexUser].email
      })

      let indexEmail = arrEmailFilter.findIndex((item) => {
        return item.email.toLowerCase() == user.email.toLowerCase()
      })
      if (indexEmail != -1) {
        let data = {
          "statusCode": 400,
          "message": "Không tìm thấy tài nguyên!",
          "content": "Email đã tồn tại!",
        }
        throw new HttpException(data, 400)
      } else {
        await this.prisma.nguoiDung.update({
          where: {
            tai_khoan: user.taiKhoan
          },
          data: {
            email: user.email,
            mat_khau: user.matKhau,
            ho_ten: user.hoTen,
            so_dt: user.soDt,
            loai_nguoi_dung: user.loaiNguoiDung
          }
        });
        let data = {
          "statusCode": 200,
          "message": "Cập nhật Người Dùng thành công!",
          "content": {
            email: user.email,
            matKhau: user.matKhau,
            hoTen: user.hoTen,
            soDt: user.soDt,
            loaiNguoiDung: user.loaiNguoiDung
          }
        }
        return data
      }

    } else {
      let data = {
        "statusCode": 400,
        "message": "Không tìm thấy tài nguyên!",
        "content": "Tài khoản không có trong danh sách!",
      }
      throw new HttpException(data, 400)
    }
  }


  // xóa người dùng
  async xoaNguoiDung(taiKhoan) {
    if (taiKhoan) {
      let taiKhoanNum = Number(taiKhoan)
      let arrTaiKhoan = await this.prisma.nguoiDung.findMany({
          select: { tai_khoan: true }
      })
      let index = arrTaiKhoan.findIndex((item) => {
          return item.tai_khoan == taiKhoanNum
      })
      if (index == -1) {
          let data = {
              "statusCode": 400,
              "message": "Yêu cầu không hợp lệ!",
              "content": "Sai tài khoản!",
          }
          throw new HttpException(data, 400)
      } else {
          await this.prisma.nguoiDung.delete({
              where: { tai_khoan: taiKhoanNum }
          })
          let data = {
              "statusCode": 200,
              "message": "Xóa người dùng thành công!",
          }
          return data
      }

  } else {
      let data = {
          "statusCode": 400,
          "message": "Yêu cầu không hợp lệ!",
          "content": "Thiếu tài khoản!",
      }
      throw new HttpException(data, 400)
  }

    
    
  }





  // async xoaNguoiDung() {

    
  // }


}
