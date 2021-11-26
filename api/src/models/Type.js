const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('type', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, // me genera automaticamente un UUIDV4
    },
    name: {
      type:DataTypes.STRING,
      // type: DataTypes.ENUM(
      //   "normal","fighting", "flying", "poison", "ground", 
      //   "rock", "bug", "ghost", "steel", "fire", "water", 
      //   "grass", "electric", "psychic", "ice", "dragon", 
      //   "dark", "fairy", "unknown", "shadow"
      //   ),
      allowNull: false,
    },
  });
};