import { Model, DataTypes } from 'sequelize';

import sequelize from '../index';

class Comment extends Model {
  public pk!: number;
  public board_pk!: string;
  public user_pk!: string;
  public content!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Comment.init({
  pk: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  board_pk: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_pk: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING(300),
    allowNull: false
  }
}, {
  tableName: 'comments',
  sequelize: sequelize,
  timestamps : true
});

export default Comment;