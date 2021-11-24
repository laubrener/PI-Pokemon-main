const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    HP: {
      type:DataTypes.INTEGER,
      allowNull: true,
    },
    attack: {
      type:DataTypes.JSON,
      allowNull: true,
    },
    defense: {
      type:DataTypes.JSON,
      allowNull: true,
    },
    speed: {
      type:DataTypes.JSON,
      allowNull: true,
    },
    height: {
      type:DataTypes.INTEGER,
      allowNull: true,
    },
    weight: {
      type:DataTypes.INTEGER,
      allowNull: true,
    }
  });
};
