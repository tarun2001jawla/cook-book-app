// recipes/recipes.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RecipesController } from '../recipe/recipe.controller';
import { RecipesService } from '../recipe/recipe.service';
import { Recipe } from './recipe.entity';

@Module({
  imports: [SequelizeModule.forFeature([Recipe])],
  controllers: [RecipesController],
  providers: [RecipesService],
  exports: [RecipesService],
})
export class RecipesModule {}