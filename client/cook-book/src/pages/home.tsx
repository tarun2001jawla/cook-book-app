import React from 'react';
import { Box, Container, VStack } from '@chakra-ui/react';
import NavBar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';

const HomePage: React.FC = () => {
  return (
    <Box className="app">
      <NavBar />
      <Box className="main-content">
        <Container maxW="container.xl" mt={8}>
          <VStack spacing={8} align="center">
           
          </VStack>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePage;
