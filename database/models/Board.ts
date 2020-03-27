
import {Table, Column, Model, HasMany, BelongsTo, DataType} from 'sequelize-typescript';
import { User } from './User';
import { Comment } from './Comment'
@Table
export class Board extends Model<Board> {

  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER
  }) public pk: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  }) public user_pk: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false
  }) public title: string;

  @Column({
    type: DataType.STRING(500),
    allowNull: false
  }) public content: string;

  @BelongsTo(
    () => User,
    {
      foreignKey: "user_pk"
    }
  ) public User: User[]; 
  
  @HasMany(
    () => Comment,
    {
      foreignKey: "board_pk"
    }
  ) public Comment: Comment[];

}

