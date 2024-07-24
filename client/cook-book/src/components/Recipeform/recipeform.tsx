import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, VStack, useToast, Heading } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './recipeform.css';

const RecipeForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    instructions: '',
    thumbnail: '',
    postedAt: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
    postedBy: '', // Initialize as an empty string
    ingredients: '',
  });

  const { user } = useAuth(); // Get the logged-in user's info
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData(prevData => ({
        ...prevData,
        postedBy: user.name ?? '', // Ensure `postedBy` is a string
      }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/recipes', formData);
      toast({
        title: "Recipe added.",
        description: "Your recipe has been successfully added!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate('/home');
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: (error as any).response?.data?.message || "Unable to add recipe.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bg="gray.50"
      p={4}
    >
      <Box
        maxW="lg"
        w="full"
        p={8}
        bg="white"
        borderWidth={1}
        borderRadius="md"
        boxShadow="lg"
        className="recipe-form"
      >
        <Heading as="h2" size="lg" mb={6} textAlign="center">
          Add a Recipe
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="name" isRequired>
              <FormLabel className="form-label">Recipe Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter the recipe name"
                className="form-input"
              />
            </FormControl>

            <FormControl id="instructions" isRequired>
              <FormLabel className="form-label">Instructions</FormLabel>
              <Textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                placeholder="Enter the recipe instructions"
                className="form-input"
              />
            </FormControl>

            <FormControl id="thumbnail" isRequired>
              <FormLabel className="form-label">Thumbnail Image URL</FormLabel>
              <Input
                type="text"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                placeholder="Enter the URL of the thumbnail image"
                className="form-input"
              />
            </FormControl>

            <FormControl id="postedAt">
              <FormLabel className="form-label">Posted At</FormLabel>
              <Input
                type="date"
                name="postedAt"
                value={formData.postedAt}
                onChange={handleChange}
                className="form-input"
              />
            </FormControl>

            <FormControl id="postedBy">
              <FormLabel className="form-label">Posted By</FormLabel>
              <Input
                type="text"
                name="postedBy"
                value={formData.postedBy}
                readOnly
                className="form-input"
              />
            </FormControl>

            <FormControl id="ingredients" isRequired>
              <FormLabel className="form-label">Ingredients</FormLabel>
              <Textarea
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                placeholder="Enter the ingredients"
                className="form-input"
              />
            </FormControl>

            <Button type="submit" colorScheme="blue" width="full" className="submit-button">
              Add Recipe
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default RecipeForm;
