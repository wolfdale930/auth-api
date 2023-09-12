import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { DB } from "../db";
import { LoginType } from "../enums/login-type.enum";
import { UserStatus } from "../enums/user-status.enum";

interface UserAttributes extends Model<InferAttributes<UserAttributes>, InferCreationAttributes<UserAttributes>> {
    id?: number;
    accountId: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    salt: string
    loginType: LoginType;
    status: UserStatus;
}


const User = DB.define<UserAttributes>('User', {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    accountId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salt: {
        type: DataTypes.STRING,
        allowNull: false
    },
    loginType: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
});

export = User;


