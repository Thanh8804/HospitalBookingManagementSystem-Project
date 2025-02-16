import express from "express";

// let dùng cho khai báo local var là global
// các file trong này nó sẽ báo là views nằm ở thư mục nào và giúp controller không cần khai báo đường dẫn nữa
// nếu không có nó thì controller phải khai báo đường dẫn đến thư mục views
let configViewEngine = (app) => {
    app.use(express.static("./src/public"));
    app.set("view engine", "ejs");
    app.set("views", "./src/views");
};

module.exports = configViewEngine;