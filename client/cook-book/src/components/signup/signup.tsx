import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, useToast, Heading } from '@chakra-ui/react';
import axios from 'axios';
import './signup.css'; 

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const toast = useToast();

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
      await axios.post('http://localhost:3000/users', formData, {withCredentials:true});
      toast({
        title: "Registration successful.",
        description: "You have successfully registered!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: (error as any).response?.data?.message || "Unable to register.",
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
        maxW="md"
        w="full"
        p={8}
        bg="white"
        borderWidth={1}
        borderRadius="md"
        boxShadow="lg"
        className="register-form"
      >
        <Heading as="h2" size="lg" mb={6} textAlign="center">
          Create an Account
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="name" isRequired>
              <FormLabel className="form-label">Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="form-input"
              />
            </FormControl>

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

            <FormControl id="phoneNumber">
              <FormLabel className="form-label">Phone Number</FormLabel>
              <Input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="form-input"
              />
            </FormControl>

            <Button type="submit" colorScheme="blue" width="full" className="submit-button">
              Register
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default SignupPage;
