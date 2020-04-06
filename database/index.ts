import {Sequelize} from 'sequelize';
import {initUser, associateUser} from './models/User';
import {initBoard, associateBoard} from './models/Board';
import {initComment, associateComment} from './models/Comment';
const env = process.env.NODE_ENV || 'development';
const config = require("../config/config")[env];

const sequelize : Sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

initUser(sequelize);
initBoard(sequelize);
initComment(sequelize);

associateUser();
associateBoard();
associateComment();

export default sequelize;