// src/app.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module'; 
import { RecipesModule } from './recipe/recipe.module';
import { Recipe } from './recipe/recipe.entity';
import { User } from './users/user.entity';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5435,
      username: 'tarunjawla',
      password: 'tarunjawla',
      database: 'cookbook_db',
      models: [Recipe,User],
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    RecipesModule,
  ],
})
export class AppModule {}