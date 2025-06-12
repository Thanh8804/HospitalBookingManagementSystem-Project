'use strict';
const {
  Model
} = require('sequelize');
//const { ROWLOCK } = require('sequelize/types/lib/table-hints');
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Allcode.hasMany(models.User, { foreignKey: 'positionId', as: 'positionData' });
      Allcode.hasMany(models.User, { foreignKey: 'gender', as: 'genderData' });
    } 
  };
  Allcode.init({
    keyMap: DataTypes.STRING,
    type: DataTypes.STRING,
    valueEn: DataTypes.STRING,
    valueVi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Allcode',
    tableName: 'allcodes',         // 👈 Tên bảng thực tế trong MySQL
    freezeTableName: true   
  });
  return Allcode;
};