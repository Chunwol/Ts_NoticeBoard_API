
import {Table, Column, Model, BelongsTo, DataType} from 'sequelize-typescript';
import { User } from './User';
import { Board } from './Board';
@Table
export class Comment extends Model<Comment> {

  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER
  }) public pk: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  }) public board_pk: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  }) public user_pk: string;

  @Column({
    type: DataType.STRING(300),
    allowNull: false
  }) public content: string;

  @BelongsTo(
    () => Board,
    {
      foreignKey: "board_pk"
    }
  ) public Board: Board[]; 
  
  @BelongsTo(
    () => User,
    {
      foreignKey: "user_pk"
    }
  ) public User: User[]; 
}

