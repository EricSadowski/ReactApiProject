import { useState } from "react";
import Footer from "./Footer"
import Header from "./Header"
import { useLocation } from "react-router-dom";
import { Box, Text, SimpleGrid, HStack, VStack, Stack } from "@chakra-ui/react";


const details = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const { state } = useLocation();
  console.log(state);

  return (
    <>
      <Header inputValue={inputValue} setInputValue={setInputValue} />
      <SimpleGrid columns={{sm: 1, md: 2}} spacing={10}>
        <Box>          
          <Text fontSize='5xl' as='b'>{state.title}</Text>
          <Stack>
          <HStack>
            <Text as="b" fontSize='xl'>Artist: </Text>
            <Text fontSize='xl'>{state.artistDisplayName}</Text>
          </HStack>
          <HStack>
            <Text as="b" fontSize='xl'>Artist life dates: </Text>
            <Text fontSize='xl'>{state.artistDisplayBio}</Text>
          </HStack>
          <HStack>
            <Text as="b" fontSize='xl'>Artwork Created: </Text>
            <Text fontSize='xl'>{state.objectDate}</Text>
          </HStack>
          <HStack>
            <Text as="b" fontSize='xl'>Medium: </Text>
            <Text fontSize='xl'>{state.medium}</Text>
          </HStack>
          <HStack>
            <Text as="b" fontSize='xl'>Dimensions: </Text>
            <Text fontSize='xl'>{state.dimensions}</Text>
          </HStack>
          <HStack>
            <Text as="b" fontSize='xl'>Classification: </Text>
            <Text fontSize='xl'>{state.classification}</Text>
          </HStack>
          </Stack>
        </Box>
        <Box>
        <img src={state.primaryImage} alt={state.title} />
        </Box>
      </SimpleGrid>        
      <Footer />
    </>
  )
}

export default details