import { Request } from "express";
import { Config } from "../config";
import DB from "../db";
import { AccountStatus } from "../enums/account-status.enum";
import { LoginType } from "../enums/login-type.enum";
import { UserStatus } from "../enums/user-status.enum";
import { LoginRequest } from "../interfaces/login-request.interface";
import { RegisterRequest } from "../interfaces/register-request.interface";
import { Response } from "../interfaces/response.interface";
import { Messages } from "../utilities/common";
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export class AuthService {

    static async registerUser(user: RegisterRequest): Promise<Response<any>> {
        const exist = await DB.user.findFirst({ where: { email: user.email } });
        if (exist)
            return { status: 400, message: 'User already exists' };
        try {
            const nameSplit = user.name.split(' ');
            const salt = bcrypt.genSaltSync(Config.BcryptSaltRounds);
            const hashPassword = bcrypt.hashSync(user.password, salt);
            const newUser = await DB.user.create({
                data: {
                    Account: {
                        create: {
                            status: AccountStatus.ACTIVE
                        }
                    },
                    firstName: nameSplit[0],
                    lastName: nameSplit[1] || '',
                    email: user.email,
                    password: hashPassword,
                    salt: salt,
                    loginType: LoginType.EMAIL,
                    status: UserStatus.ACTIVE
                }
            });
            const res = newUser as any;
            delete res.password;
            delete res.salt;
            return { status: 200, data: res };
        }
        catch (exception) {
            console.log(`Exception while creating user: `, user, exception);
            return { status: 500, message: Messages.INTERNAL_SERVER_ERROR };
        }
    }

    static async loginUser(user: LoginRequest, req: Request): Promise<Response<any>> {
        const exist = await DB.user.findFirst({ where: { email: user.email } });
        if (!exist)
            return { status: 400, message: 'User not exists' };

        if (!bcrypt.compareSync(user.password, exist.password))
            return { status: 400, message: 'Invalid credentials' };

        let tokenValidity = new Date();
        tokenValidity = new Date(tokenValidity.setHours(tokenValidity.getHours() + 24));
        const token = jwt.sign(exist, Config.JwtSecret, { expiresIn: tokenValidity.getTime() });
        try {
            await DB.userLogin.create({
                data: {
                    userId: exist.id,
                    otp: 0,
                    token: token,
                    validity: tokenValidity,
                    lastLoginIp: req.header('x-forwarded-for') || req.socket.remoteAddress || ''
                }
            });
        }
        catch (exception) {
            console.log(`Exception while creating user login: `, user, exception);
            return { status: 500, message: Messages.INTERNAL_SERVER_ERROR };
        }
        const res = exist as any;
        delete res.password;
        delete res.salt;
        res['token'] = token;
        return { status: 200, data: res };
    }

}