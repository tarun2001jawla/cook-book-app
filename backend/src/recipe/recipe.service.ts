// recipes/recipes.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Recipe } from './recipe.entity';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(Recipe)
    private recipeModel: typeof Recipe,
  ) {}

  async create(recipeData: Partial<Recipe>): Promise<Recipe> {
    return this.recipeModel.create(recipeData);
  }

  async findOne(id: number): Promise<Recipe> {
    return this.recipeModel.findByPk(id);
  }

  async findAll(): Promise<Recipe[]> {
    return this.recipeModel.findAll();
  }

  async findByUser(userName: string): Promise<Recipe[]> {
    return this.recipeModel.findAll({ where: { postedBy: userName } });
  }
}