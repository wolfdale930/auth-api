import * as jwt from 'jsonwebtoken';
import { Config } from '../config';

export class JwtHelper {
    static signJwt(data: any, expiration: number) {
        return jwt.sign(data, Config.JwtSecret, { expiresIn: expiration });
    }
}