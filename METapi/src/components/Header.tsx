import { Box, Flex, IconButton, Spacer, useColorMode } from "@chakra-ui/react";
import logo from "../assets/logo.jpg";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

interface HeaderProps {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({ inputValue, setInputValue }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Searching for: ", inputValue);
  };

  return (
    <Box width="100%">
      <Flex justifyContent="space-between" alignItems="center">
        <img src={logo} alt="logo" width={"70px"} height={"70px"} />
        <Spacer />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        <Spacer />
        <IconButton
          size="sm"
          onClick={toggleColorMode}
          aria-label={"Color Mode"}
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        />
        {/* npm i @chakra-ui/icons */}
      </Flex>
    </Box>
  );
};

export default Header;
