import React from 'react';
import { Box, Flex, Button, InputGroup, Input, InputRightElement, Image, Text } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import { useAuth } from '../context/AuthContext'; 

const NavBar: React.FC = () => {
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    navigate('/');
    window.location.reload();
  };

  console.log('Is authenticated:', isAuthenticated);
  console.log('User:', user);

  return (
    <Box as="nav" className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <Flex align="center" justify="space-between" wrap="wrap" padding="1rem 2rem" maxWidth="1200px" margin="0 auto">
        {/* Logo and Brand Name */}
        <Flex align="center" className="logo-container">
          <Image src="../../../public/logo.png" alt="Cook-Book Logo" height="50px" mr={3} />
          <Text fontSize="2xl" fontWeight="bold" className="logo-text">
            CookBook
          </Text>
        </Flex>


        <Box className="search-container">
          <InputGroup size="md">
            <Input
              type="text"
              placeholder="Search recipes..."
              className="search-input"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            <InputRightElement>
              <SearchIcon className={`search-icon ${isSearchFocused ? 'focused' : ''}`} />
            </InputRightElement>
          </InputGroup>
        </Box>


        <Flex align="center" className="button-container">
          {isAuthenticated ? (
            <>
              <Text mr={4}>Welcome, {user?.name || 'User'}</Text>
              <Link to="/add-recipe">
                <Button className="nav-button add-recipe-button">Add Recipe</Button>
              </Link>
              <Button className="nav-button logout-button" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button className="nav-button login-button">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="nav-button signup-button">Signup</Button>
              </Link>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavBar;
