
import { Model, Association, DataTypes } from 'sequelize';

import sequelize from '../index';
import Board from './Board';
import Comment from './Comment'

class User extends Model {
  public pk!: string;
  public id!: string;
  public password!: string;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
    boards: Association<User, Board>;
    comments: Association<User, Comment>;
  };

  public readonly boards?: Board[];
  public readonly comments?: Comment[];
}

User.init({
  pk: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  id: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(10),
    allowNull: false
  }
}, {
  tableName: 'users',
  sequelize: sequelize,
  timestamps : true
});

User.hasMany(Board, {
  foreignKey: "user_pk",
  sourceKey: "pk",
  as: 'boards'
});
User.hasMany(Comment, {
  foreignKey: "user_pk",
  sourceKey: "pk",
  as: 'comments'
});

export default User;