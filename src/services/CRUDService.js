import bcrypt from "bcryptjs";
import db from "../models";

let salt = bcrypt.genSaltSync(10);
let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
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
            resolve("Create new user success");
        }
        catch (error) {
            reject(error);
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

let getAllUser = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let users = db.User.findAll(
                {
                    raw: true
                }
            );
            resolve(users);
        }
        catch (error) {
            reject(error);
        }
    }
    )
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser
}