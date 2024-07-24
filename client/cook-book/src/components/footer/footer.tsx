import React from 'react';
import { Box, Flex, Text, Link, VStack, Icon, Input, Button, HStack } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import './footer.css';

const Footer: React.FC = () => {
  return (
    <Box as="footer" className="footer">
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        align="center"
        wrap="wrap"
        padding="2rem"
        maxWidth="1200px"
        margin="0 auto"
      >
       
        <VStack align="start" spacing={2} className="footer-section">
          <Text fontSize="xl" fontWeight="bold" className="footer-heading">
            About Us
          </Text>
          <Text className="footer-text">
            CookBook is your go-to source for the best recipes from all around the world. Whether you're a beginner or a seasoned chef, we have something for everyone.
          </Text>
        </VStack>

        <VStack align="start" spacing={2} className="footer-section">
          <Text fontSize="xl" fontWeight="bold" className="footer-heading">
            Follow Us
          </Text>
          <HStack spacing={4}>
            <Link href="https://facebook.com" isExternal className="footer-icon-link">
              <Icon as={FaFacebook} className="footer-icon" />
            </Link>
            <Link href="https://twitter.com" isExternal className="footer-icon-link">
              <Icon as={FaTwitter} className="footer-icon" />
            </Link>
            <Link href="https://instagram.com" isExternal className="footer-icon-link">
              <Icon as={FaInstagram} className="footer-icon" />
            </Link>
            <Link href="https://linkedin.com" isExternal className="footer-icon-link">
              <Icon as={FaLinkedin} className="footer-icon" />
            </Link>
          </HStack>
        </VStack>

        <VStack align="start" spacing={2} className="footer-section">
          <Text fontSize="xl" fontWeight="bold" className="footer-heading">
            Contact Us
          </Text>
          <Text className="footer-text">
            Have any questions? Reach out to us!
          </Text>
          <Input placeholder="Your Email" className="footer-input" />
          <Button className="footer-button">Subscribe</Button>
        </VStack>
      </Flex>
    </Box>
  );
};

export default Footer;
