import { Config } from "../config";
import { AccountStatus } from "../enums/account-status.enum";
import { LoginType } from "../enums/login-type.enum";
import { UserStatus } from "../enums/user-status.enum";
import { RegisterRequest } from "../interfaces/register-request.interface";
import { Response } from "../interfaces/response.interface";
import Account from "../models/account.model";
import User from "../models/user.model";
import { Messages } from "../utilities/common";
import * as bcrypt from 'bcrypt';

export class AuthService {

    static async registerUser(user: RegisterRequest): Promise<Response<any>> {
        const exist = await User.findOne({ where: { email: user.email } });
        if (exist)
            return { status: 400, message: 'User already exists' };
        try {
            const newAccount = await Account.create({
                status: AccountStatus.ACTIVE
            });
            if (!newAccount?.id)
                return { status: 500, message: Messages.INTERNAL_SERVER_ERROR };
            const nameSplit = user.name.split(' ');
            const salt = bcrypt.genSaltSync(Config.BcryptSaltRounds);
            const hashPassword = bcrypt.hashSync(user.password, salt);
            const newUser = await User.create({
                accountId: newAccount.id,
                firstName: nameSplit[0],
                lastName: nameSplit[1] || '',
                email: user.email,
                password: hashPassword,
                salt: salt,
                loginType: LoginType.EMAIL,
                status: UserStatus.ACTIVE
            });
            return { status: 200, data: newUser };
        }
        catch (exception) {
            console.log(`Exception while creating user: `, user, exception);
            return { status: 500, message: Messages.INTERNAL_SERVER_ERROR };
        }
    }

}