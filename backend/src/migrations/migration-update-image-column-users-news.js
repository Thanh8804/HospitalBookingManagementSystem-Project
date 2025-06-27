'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableUser = await queryInterface.describeTable('Users');
    const tableNews = await queryInterface.describeTable('News');

    const promises = [];

    // Nếu chưa có cột image trong Users thì thêm
    if (!tableUser.image) {
      promises.push(
        queryInterface.addColumn('Users', 'image', {
          type: Sequelize.TEXT,
          allowNull: true,
        })
      );
    } else {
      // Nếu đã có thì sửa kiểu thành TEXT
      promises.push(
        queryInterface.changeColumn('Users', 'image', {
          type: Sequelize.TEXT,
          allowNull: true,
        })
      );
    }

    // Nếu chưa có cột image trong News thì thêm
    if (!tableNews.image) {
      promises.push(
        queryInterface.addColumn('News', 'image', {
          type: Sequelize.TEXT,
          allowNull: true,
        })
      );
    } else {
      // Nếu đã có thì sửa kiểu thành TEXT
      promises.push(
        queryInterface.changeColumn('News', 'image', {
          type: Sequelize.TEXT,
          allowNull: true,
        })
      );
    }

    return Promise.all(promises);
  },

  down: async (queryInterface, Sequelize) => {
    const promises = [];

    promises.push(queryInterface.removeColumn('Users', 'image'));
    promises.push(queryInterface.removeColumn('News', 'image'));

    return Promise.all(promises);
  },
};
