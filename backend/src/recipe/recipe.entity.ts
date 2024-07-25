// recipes/recipe.entity.ts
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Recipe extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  instructions: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  thumbnail: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  postedAt: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  postedBy: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  ingredients: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;
}