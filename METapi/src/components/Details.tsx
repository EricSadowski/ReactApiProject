import Footer from "./Footer";
import Header from "./Header";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Text,
  SimpleGrid,
  VStack,
  Button,
  Center,
} from "@chakra-ui/react";
import { useEffect } from "react";

const details = () => {
  const { state } = useLocation();
  console.log(state);

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <SimpleGrid
        columns={{ sm: 1, md: 2 }}
        spacing={10}
        ml={5}
        justifyItems="start"
      >
        <Center h="50vh">
          <VStack align="start" textAlign="start">
            <Text fontSize="5xl" fontWeight="bold" align="start">
              {state.title}
            </Text>
            <Text fontSize="xl">
              <b>Artist:</b> {state.artistDisplayName}
            </Text>
            <Text fontSize="lg">{state.artistDisplayBio}</Text>
            <Text fontSize="xl">
              <b>Date Created:</b> {state.objectDate}
            </Text>
            <Text fontSize="xl">
              <b>Medium:</b> {state.medium}
            </Text>
            <Text fontSize="xl">
              <b>Dimensions:</b> {state.dimensions}
            </Text>
            <Text fontSize="xl">
              <b>Classification:</b> {state.classification}
            </Text>
            <Box>
          <Button className="backButton" size="md" mt={6}>
            <Link to="/main">Go Back</Link>
          </Button>
        </Box>
          </VStack>
        </Center>
        <Box>
          <img src={state.primaryImage} alt={state.title} />
        </Box>
      </SimpleGrid>
      <Footer />
    </>
  );
};

export default details;
