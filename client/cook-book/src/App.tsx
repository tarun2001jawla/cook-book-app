import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home';
import RegisterForm from './components/signup/signup'; // Import your Signup page
import SignInPage from './components/login/login';
import { AuthProvider } from './components/context/AuthContext';4
import RecipeForm from './components/Recipeform/recipeform';
import './App.css';
import RecipesFromAPI from './components/ApiRecipes/Api';
import { QueryClient, QueryClientProvider } from 'react-query';
// Create a client
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <ChakraProvider>
      <AuthProvider>
      <Router>
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<RegisterForm />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/add-recipe" element={<RecipeForm />} />
          <Route path="/api-recipes" element={<RecipesFromAPI />} />
        </Routes>
      </Router>
      </AuthProvider>
    </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
