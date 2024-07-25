
import React, { useState, useEffect } from 'react';
import { Box, SimpleGrid, Text, Button, Image, VStack, Heading, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import './recipe.css';

interface Recipe {
  id: number;
  name: string;
  instructions: string;
  thumbnail: string;
  postedAt: string;
  postedBy: string;
  ingredients: string;
}

const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} className="recipe-card">
      <Image src = {recipe.thumbnail} alt={recipe.name} className="recipe-image" />
      <VStack align="start" spacing={2} mt={2}>
        <Heading as="h3" size="md">{recipe.name}</Heading>
        <Text>Posted by: {recipe.postedBy}</Text>
        <Text>Date: {new Date(recipe.postedAt).toLocaleDateString()}</Text>
        <Button onClick={onToggle} colorScheme="blue" size="sm">
          {isOpen ? 'Show Less' : 'Read More'}
        </Button>
        {isOpen && (
          <VStack align="start" spacing={2} mt={2}>
            <Text><strong>Instructions:</strong> {recipe.instructions}</Text>
            <Text><strong>Ingredients:</strong> {recipe.ingredients}</Text>
          </VStack>
        )}
      </VStack>
    </Box>
  );
};

const Recipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get<Recipe[]>('http://localhost:3000/recipes');
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <Box p={8} className="recipes-container">
      <Heading as="h1" size="xl" mb={6}>All Recipes</Heading>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={10}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Recipes;