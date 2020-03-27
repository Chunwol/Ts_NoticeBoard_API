import {Sequelize} from 'sequelize-typescript';
const env = process.env.NODE_ENV || 'development';
const config = require("../config/config")[env];

class Database {
  private _sequelize: Sequelize;
  private _models = ({} as any);
  constructor() {
    this._sequelize = new Sequelize(config.database, config.username, config.password, config);
    
    this._sequelize.addModels([__dirname + '/models']);
    this._models.sequelize = this._sequelize;
    this._models.Sequelize = Sequelize;
  }
  getModels() {
    return this._models;
  }

  getSequelize() {
    return this._sequelize;
  }
}
const database = new Database();
export const models = database.getModels();
export const sequelize = database.getSequelize();