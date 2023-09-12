import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { AccountStatus } from "../enums/account-status.enum";
import { DB } from "../db";


interface AccountAttributes extends Model<InferAttributes<AccountAttributes>, InferCreationAttributes<AccountAttributes>> {
    id?: number;
    status: AccountStatus;
}


const Account = DB.define<AccountAttributes>('Account', {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    status: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    }
});



export = Account;


