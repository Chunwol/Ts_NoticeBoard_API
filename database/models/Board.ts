import { Model, DataTypes } from 'sequelize';
import sequelize from '../index';
import Comment from './Comment'

class Board extends Model {
  public pk!: number;
  public user_pk!: string;
  public title!: string;
  public content!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly comments?: Comment[];
}
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

Board.hasMany(Comment, {
  foreignKey: 'board_pk',
  sourceKey: 'pk'
});

Comment.belongsTo(Board, {
  foreignKey: 'board_pk',
  targetKey: 'pk'
});
export default Board;