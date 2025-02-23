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

// khong co nay thi se khong the su dung ben ngoai
module.exports = {
    // key: value
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD
}