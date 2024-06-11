const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false, //permitir nulo ? true or false
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true, //unico
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer',
  },
  recoveyToken: {
    field: 'recovery_token',
    allowNull: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    //variable JS
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at', //nombre en sequelize
    defaultValue: Sequelize.NOW, //valor por defecto (como se registo en sequelize)
  },
};
class User extends Model {
  //gracias a MODEL ya tiene los metodos find findAll ....
  static associate(models) {
    //associate
    // para que quede associado de forma bidireccional
    this.hasOne(models.Customer, {
      // alias
      as: 'customer',
      //  referencia para encontrar
      foreignKey: 'userId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false,
    };
  }
}
module.exports = { USER_TABLE, UserSchema, User };
