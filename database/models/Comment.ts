import { Model, DataTypes, Sequelize } from 'sequelize';
import Board from './Board';
import User from './User';

class Comment extends Model {
  public pk!: number;
  public board_pk!: string;
  public user_pk!: string;
  public content!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initComment = (sequelize: Sequelize) => {
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
      allowNull: false
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
}

export function associateComment(): void {
  Comment.belongsTo(Board, {
    foreignKey: 'board_pk',
    targetKey: 'pk'
  });
  Comment.belongsTo(User, {
    foreignKey: 'user_pk',
    targetKey: 'pk'
  });
}

export default Comment;