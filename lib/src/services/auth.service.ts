import User from "../models/user.model";

export class AuthService {

    static async registerUser(user: any) {
        const exist = await User.findOne({ where: { email: user.email } });
        if (exist)
            return { status: 400, message: 'User already exists' };
        const newUser = await User.create(user);


    }

}