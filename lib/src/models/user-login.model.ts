import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { DB } from "../db";

interface UserLoginAttributes extends Model<InferAttributes<UserLoginAttributes>, InferCreationAttributes<UserLoginAttributes>> {
    id: number,
    userId: number;
    otp: number;
    token: string;
    validity: string;
    lastLoginIp: string;
}


const UserLogin = DB.define<UserLoginAttributes>('UserLogin', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    otp: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    validity: {
        type: DataTypes.DATE,
        allowNull: false
    },
    lastLoginIp: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

export = UserLogin;


