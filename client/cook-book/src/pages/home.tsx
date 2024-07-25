import React from 'react';
import { Box, Container, VStack } from '@chakra-ui/react';
import NavBar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';
import Recipes from '../components/Recipes/recipes';


const HomePage: React.FC = () => {
  return (
    <Box className="app">
      <NavBar />
      <Box className="main-content">
        <Container maxW="container.xl" mt={12}> {/* Adjusted margin-top */}
          <VStack spacing={8} align="center">
            <Recipes />
          
          </VStack>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePage;
