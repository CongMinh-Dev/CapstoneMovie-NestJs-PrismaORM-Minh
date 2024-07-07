import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }
    async dangNhap(taiKhoan, matKhau) {
        let token = this.jwtService.sign(
            { data: "Minh" },
            { expiresIn: "5d", algorithm: "HS256", secret: "bi_mat" }

        )
        return token
    }

}
