
let getHomePage = (req, res) => {
    return res.render("homePage.ejs");
}

// khong co nay thi se khong the su dung ben ngoai
module.exports = {
    // key: value
    getHomePage: getHomePage
}