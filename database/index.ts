import {Sequelize} from 'sequelize';

const env = process.env.NODE_ENV || 'development';
const config = require("../config/config")[env];

const sequelize : Sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

export default sequelize;