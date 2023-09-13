import Account from "./models/account.model";
import UserLogin from "./models/user-login.model";
import User from "./models/user.model";

export function setupAssociations() {
    Account.hasMany(User, {
        sourceKey: 'id',
        foreignKey: 'accountId',
        as: 'users'
    });
    User.belongsTo(Account, {
        foreignKey: 'accountId',
        as: 'author'
    });
    User.hasMany(UserLogin, {
        sourceKey: 'id',
        foreignKey: 'userId',
        as: 'logins'
    });
}

export function syncModels() {
    Account.sync({ alter: true });
    User.sync({ alter: true });
    UserLogin.sync({ alter: true });
}
