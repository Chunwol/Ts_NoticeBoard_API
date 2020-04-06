import { Model, DataTypes, Sequelize } from 'sequelize';
import Comment from './Comment'
import User from './User';

class Board extends Model {
  public pk!: number;
  public user_pk!: string;
  public title!: string;
  public content!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly comments?: Comment[];
}

export const initBoard = (sequelize: Sequelize) => {
  Board.init({
    pk: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_pk: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    content: {
      type: DataTypes.STRING(500),
      allowNull: false
    }
  }, {
    tableName: 'boards',
    sequelize: sequelize,
    timestamps : true
  });
}

export function associateBoard(): void {
  Board.hasMany(Comment, {
    foreignKey: 'board_pk',
    sourceKey: 'pk'
  });
  Board.belongsTo(User, {
    foreignKey: 'user_pk',
    targetKey: 'pk'
  });
}

export default Board;