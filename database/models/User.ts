
import {Table, Column, Model, HasMany, DataType} from 'sequelize-typescript'
import { Board } from './Board';
import { Comment } from './Comment'
@Table
export class User extends Model<User> {

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    unique: true,
    primaryKey: true
  }) public pk: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    unique: true
  }) public id: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false
  }) public password: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: false
  }) public name: string;

  @HasMany(
    () => Board,
    {
      foreignKey: "user_pk"
    }
  ) public Board: Board[];

  @HasMany(
    () => Comment,
    {
      foreignKey: "user_pk"
    }
  ) public Comment: Comment[];
}

