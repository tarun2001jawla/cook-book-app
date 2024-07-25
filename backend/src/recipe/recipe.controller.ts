// recipes/recipes.controller.ts
import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { RecipesService } from '../recipe/recipe.service';
import { Recipe } from './recipe.entity';
//import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

//   @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() recipeData: Partial<Recipe>, @Request() req): Promise<Recipe> {

    return this.recipesService.create(recipeData);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Recipe> {
    return this.recipesService.findOne(+id);
  }

  @Get()
  async findAll(): Promise<Recipe[]> {
    return this.recipesService.findAll();
  }
}