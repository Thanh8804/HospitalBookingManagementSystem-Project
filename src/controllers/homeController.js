import db from "../models/index";
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll()
        return res.render("homePage.ejs", {
            data: JSON.stringify(data)
        });
    } catch (error) {
        console.log(error);
    };
}

let getCRUD = (req, res) => {
    return res.render("crud.ejs");
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);

}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    return res.render("displayCRUD.ejs", {
        dataTable: data
    });
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    console.log(userId);
    if (!userId) {
        return res.send("User is not found");
    }
    let userData = await CRUDService.getUserInfoById(userId);
    return res.render("editCRUD.ejs", {
        user: userData
    }
    );
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    return res.render("displayCRUD.ejs", {
        dataTable: allUsers
    });
}

let deleteCRUD = async (req, res) =>{
    let userId = req.query.id;
    if(!userId){
        return res.send("User is not found");
    }
    await CRUDService.deleteUserById(userId);
    return res.send("Delete user successfully");
}

// khong co nay thi se khong the su dung ben ngoai
module.exports = {
    // key: value
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
}