// module.exports = {
//     up: (queryInterface, Sequelize) => {
//         return Promise.all([
//             queryInterface.changeColumn('Users', 'image', {
//                 type: Sequelize.TEXT,
//                 allowNull: true,
//             }),
//         ]);
//     },

//     down: (queryInterface, Sequelize) => {
//         return Promise.all([
//             queryInterface.changeColumn('Users', 'image', {
//                 type: Sequelize.STRING,
//                 allowNull: true,
//             }),
//         ]);
//     },
// };
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const table = await queryInterface.describeTable('Users');

        if (table.image) {
            await queryInterface.changeColumn('Users', 'image', {
                type: Sequelize.TEXT,
                allowNull: true,
            });
        } else {
            // Nếu chưa có, thêm cột image mới
            await queryInterface.addColumn('Users', 'image', {
                type: Sequelize.TEXT,
                allowNull: true,
            });
        }
    },

    down: async (queryInterface, Sequelize) => {
        const table = await queryInterface.describeTable('Users');

        if (table.image) {
            await queryInterface.changeColumn('Users', 'image', {
                type: Sequelize.STRING,
                allowNull: true,
            });
        }
    },
};
