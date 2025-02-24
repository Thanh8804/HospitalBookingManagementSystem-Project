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
    console.log(data);
    return res.render("displayCRUD.ejs", {
        dataTable: data
    });
}

// khong co nay thi se khong the su dung ben ngoai
module.exports = {
    // key: value
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD
}