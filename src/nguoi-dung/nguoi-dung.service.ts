import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNguoiDungDto, KindUserType, NguoiDungType, PhanTrangNguoiDungType } from './dto/create-nguoi-dung.dto';
import { UpdateNguoiDungDto } from './dto/update-nguoi-dung.dto';
import { PrismaClient, NguoiDung } from '@prisma/client';
import * as bcrypt from 'bcrypt'

@Injectable()
export class NguoiDungService {
  prisma = new PrismaClient();
  constructor(private jwtService: JwtService) { }


  async getAllUser(tuKhoa) {
    if (tuKhoa) {
      let tuKhoaNum = Number(tuKhoa)
      const items = await this.prisma.nguoiDung.findMany({
        where: {
          OR: [
            { tai_khoan: tuKhoaNum },
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

  async findUser(tuKhoa) {
    if (tuKhoa) {
      let tuKhoaNum = Number(tuKhoa)
      const items = await this.prisma.nguoiDung.findMany({
        where: {
          OR: [
            { tai_khoan: tuKhoaNum },
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
      return data;
    } else {
      let items = await this.prisma.nguoiDung.findMany()
      let data = {
        "statusCode": 200,
        "message": "Xử lý thành công!",
        "content": items
      }
      return data;
    }
  }

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
          { data: email },
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
      where: { email: user.data },
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
    if (decodeToken.data == email) {
      let items = await this.prisma.nguoiDung.findFirst({
        where: { email: decodeToken.data }
      })
      let data = {
        "statusCode": 200,
        "message": "Đăng ký thành công!",
        "content": items
      }
      return data
    }else{
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






  // create(createNguoiDungDto: CreateNguoiDungDto) {
  //   return 'This action adds a new nguoiDung';
  // }




  // findOne(id: number) {
  //   return `This action returns a #${id} nguoiDung`;
  // }

  // update(id: number, updateNguoiDungDto: UpdateNguoiDungDto) {
  //   return `This action updates a #${id} nguoiDung`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} nguoiDung`;
  // }
}
