import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, useToast, Heading, Link, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css'; 

const SignInPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', formData, {
        withCredentials: true
      });
      console.log('Login response:', response.data);
      if (response.data.user) {
        console.log('Login successful, user:', response.data.user);
        toast({
          title: "Login successful.",
          description: "You have successfully logged in!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate('/');
        window.location.reload();
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    
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
        maxW="md"
        w="full"
        p={8}
        bg="white"
        borderWidth={1}
        borderRadius="md"
        boxShadow="lg"
        className="signin-form"
      >
        <Heading as="h2" size="lg" mb={6} textAlign="center">
          Sign In
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel className="form-label">Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="form-input"
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel className="form-label">Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="form-input"
              />
            </FormControl>

            <Button type="submit" colorScheme="blue" width="full" className="submit-button">
              Sign In
            </Button>
          </VStack>
        </form>
        <Box mt={4} textAlign="center">
          <Text fontSize="sm">
            Don't have an account? <Link color="blue.500" href="/signup">Sign Up</Link>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default SignInPage;
