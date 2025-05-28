import { where } from 'sequelize';
import db from '../models/index.js';
import bcrypt from "bcryptjs";


let salt = bcrypt.genSaltSync(10);


let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);

            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ["email", "roleId", "password", "firstName", "lastName"],
                    where: { email: email },
                    raw: true
                });
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = "OK";
                        delete user.password;
                        userData.user = user;
                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = "Wrong password!";
                    }
                }
                else {
                    userData.errCode = 2;
                    userData.errMessage = "Your account has been deleted!";
                }

            }
            else {
                userData.errCode = 1;
                userData.errMessage = "Your email isn't exist in system. Please try other email!";
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        }
        catch (e) {
            reject(e);
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        }
        catch (error) {
            reject(error);
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ["password"]
                    },
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ["password"]
                    },
                })
            }
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: "Your email is already in use, please try another email!"
                })
            }
            else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    gender: data.gender === "1" ? true : false,
                    roleId: data.roleId,
                    phonenumber: data.phonenumber,
                })
                resolve({
                    errCode: 0,
                    message: "Ok"
                })
            }
        } catch (e) {
            reject(e);
        }

    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {

            let foundUser = await db.User.findOne({
                where: { id: userId }
            })
            if (!foundUser) {
                resolve({
                    errCode: 2,
                    errMessage: "The user isn't exist!"
                })
            }
            await db.User.destroy({
                where: { id: userId }
            })
            resolve({
                errCode: 0,
                message: "The user is deleted!"
            })
        } catch (e) {
            reject(e);
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    message: "Missing required parameter!"
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id }
            });
            if (user) {
                db.User.update(
                    {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        address: data.address,
                    },
                    { where: { id: data.id } }
                )
                resolve({
                    errCode: 0,
                    message: "Update the user succeed!"
                });
            }
            else {
                resolve({
                    errCode: 1,
                    message: "User's not found!"
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    message: "Missing required parameter!"
                })
            }
            else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput }
                })
                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllCodeService: getAllCodeService,
    updateUserData: updateUserData,
}