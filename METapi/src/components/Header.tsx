import { Flex, IconButton, Spacer, useColorMode } from "@chakra-ui/react";
import logo from "../assets/logo.jpg";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex justifyContent="space-between" alignItems="center">
     <Link to="/"> <img src={logo} alt="logo" width={"70px"} height={"70px"}/></Link>
      <Spacer />
      <IconButton
        size="sm"
        onClick={toggleColorMode}
        aria-label={"Color Mode"}
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      />{" "}
      {/* npm i @chakra-ui/icons */}
    </Flex>
  );
};

export default Header;
