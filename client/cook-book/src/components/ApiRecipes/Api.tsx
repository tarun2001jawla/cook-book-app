import React, { useState } from 'react';
import { Box, SimpleGrid, Text, Image, VStack, Heading, Button, useToast, Link, Spinner } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import axios from 'axios';
import Select from 'react-select';
import './Api.css';

interface Recipe {
  recipe_id: string;
  title: string;
  publisher: string;
  image_url: string;
  source_url: string;
  social_rank: number;
}

const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} boxShadow="lg" _hover={{ transform: 'scale(1.02)', transition: 'transform 0.2s' }} bg="white">
      <Image src={recipe.image_url} alt={recipe.title} className="recipe-image" borderRadius="md" mb={3} />
      <VStack align="start" spacing={2}>
        <Heading as="h3" size="md" color="teal.600">{recipe.title}</Heading>
        <Text color="gray.600">Publisher: {recipe.publisher}</Text>
        <Text color="gray.600">Rank: {recipe.social_rank}</Text>
        <Link href={recipe.source_url} isExternal color="teal.500" fontWeight="bold">
          View Recipe
        </Link>
      </VStack>
    </Box>
  );
};

const searchOptions = [
    'carrot', 'broccoli', 'asparagus', 'cauliflower', 'corn', 'cucumber', 'green pepper', 'lettuce', 'mushrooms',
    'onion', 'potato', 'pumpkin', 'red pepper', 'tomato', 'beetroot', 'brussel sprouts', 'peas', 'zucchini',
    'radish', 'sweet potato', 'artichoke', 'leek', 'cabbage', 'celery', 'chili', 'garlic', 'basil', 'coriander',
    'parsley', 'dill', 'rosemary', 'oregano', 'cinnamon', 'saffron', 'green bean', 'bean', 'chickpea', 'lentil',
    'apple', 'apricot', 'avocado', 'banana', 'blackberry', 'blackcurrant', 'blueberry', 'boysenberry', 'cherry',
    'coconut', 'fig', 'grape', 'grapefruit', 'kiwifruit', 'lemon', 'lime', 'lychee', 'mandarin', 'mango', 'melon',
    'nectarine', 'orange', 'papaya', 'passion fruit', 'peach', 'pear', 'pineapple', 'plum', 'pomegranate', 'quince',
    'raspberry', 'strawberry', 'watermelon', 'salad', 'pizza', 'pasta', 'popcorn', 'lobster', 'steak', 'bbq',
    'pudding', 'hamburger', 'pie', 'cake', 'sausage', 'tacos', 'kebab', 'poutine', 'seafood', 'chips', 'fries',
    'masala', 'paella', 'som tam', 'chicken', 'toast', 'marzipan', 'tofu', 'ketchup', 'hummus', 'chili',
    'maple syrup', 'parma ham', 'fajitas', 'champ', 'lasagna', 'poke', 'chocolate', 'croissant', 'arepas',
    'bunny chow', 'pierogi', 'donuts', 'rendang', 'sushi', 'ice cream', 'duck', 'curry', 'beef', 'goat', 'lamb',
    'turkey', 'pork', 'fish', 'crab', 'bacon', 'ham', 'pepperoni', 'salami', 'ribs'
  ].map(option => ({ value: option, label: option })); 

const RecipesFromAPI: React.FC = () => {
  const [query, setQuery] = useState('');
  const toast = useToast();

  const fetchRecipes = async (query: string) => {
    if (!query) return [];
    const response = await axios.get(`https://forkify-api.herokuapp.com/api/search?q=${query}`);
    return response.data.recipes;
  };

  const { data: recipes = [], refetch, isLoading, isError } = useQuery<Recipe[]>(
    ['recipes', query],
    () => fetchRecipes(query),
    {
      enabled: false,
    }
  );

  const searchRecipes = () => {
    if (!query) {
      toast({
        title: "Error",
        description: "Please enter a search query",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    refetch();
  };

  return (
    <Box className="recipes-from-api-container">
      <Heading as="h1" size="xl" mb={6}>Recipes from API</Heading>
      <Box  mb={6} position="relative" display= 'flex' alignItems='center' justifyContent= 'start' gap={5}>
        <Select
          className='search-box'
          options={searchOptions}
          onChange={(selectedOption) => setQuery(selectedOption ? selectedOption.value : '')}
          placeholder="Enter recipe name (e.g., pizza)"
          isClearable
        />
        <Button onClick={searchRecipes}  colorScheme="teal"  isLoading={isLoading}>
          Search
        </Button>
      </Box>
      {isError && (
        <Text color="red.500" mb={4}>Error fetching recipes. Please try again.</Text>
      )}
      {isLoading ? (
        <Spinner size="xl" color="teal.500" />
      ) : (
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={8}>
          {recipes.map((recipe: Recipe) => (
            <RecipeCard key={recipe.recipe_id} recipe={recipe} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default RecipesFromAPI;
