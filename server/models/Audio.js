module.exports = (sequelize, DataTypes) => {
  let ApiUser = sequelize.define('audio', {
    id: {
      type: DataTypes.UUID, 
      primaryKey: true, 
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      unique: true
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true
    }
  });
  return ApiUser;
};
