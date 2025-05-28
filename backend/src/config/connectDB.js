const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('hospital_db', 'root', "9n1qeahfdvystkeencbrnjj4t61kxrli", {
    host: 'dacn-phpmyadmin-ibkspz-212694-143-198-88-121.traefik.me',
    dialect: 'mysql',
    logging: false
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
module.exports = connectDB;