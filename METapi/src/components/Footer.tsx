import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Input,
  Link,
  ListItem,
  SimpleGrid,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import React from "react";
import logo from "../assets/logo.jpg";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <Box height={300} w="100%">
      <Divider />
      <Flex align="center" justify="space-around" margin={10}>
        <SimpleGrid columns={4} gap={2} w="100%">
          <Flex direction="column" align="center" position="relative">
            <img src={logo} alt="logo" width={"120px"} height={"120px"} />

            <Flex
              justify="center"
              position="absolute"
              bottom={0}
              width="100%"
              // mt={10}
            >
              <Icon boxSize={5} as={FaTwitter} mx={2} />
              <Icon boxSize={5} as={FaFacebook} mx={2} />
              <Icon boxSize={5} as={FaInstagram} mx={2} />
            </Flex>
          </Flex>
          <UnorderedList listStyleType="none" spacing={4}>
            <ListItem fontSize="large">Useful Links</ListItem>
            <ListItem>
              <Link>Link 1</Link>
            </ListItem>
            <ListItem>
              <Link>Link 2</Link>
            </ListItem>
            <ListItem>
              <Link>Link 3</Link>
            </ListItem>
          </UnorderedList>
          <UnorderedList listStyleType="none" spacing={4}>
            <ListItem fontSize="large">About Us</ListItem>
            <ListItem>
              <Link>Link 4</Link>
            </ListItem>
            <ListItem>
              <Link>Link 5</Link>
            </ListItem>
            <ListItem>
              <Link>Link 6</Link>
            </ListItem>
          </UnorderedList>
          <Flex direction="column" align="center">
            <Text fontSize="large">
              Enter your email to receive news about the Met:
            </Text>
            <Input
              type="email"
              placeholder="your.name@example.com"
              m={2}
              focusBorderColor="crimson"
            />
            <Button>Submit</Button>
          </Flex>
        </SimpleGrid>
      </Flex>
    </Box>
  );
};

export default Footer;
