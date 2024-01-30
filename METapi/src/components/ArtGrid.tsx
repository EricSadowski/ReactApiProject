import GetImage from "./GetImage"
import { useState, useEffect } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";

const artGrid = () => {
  const [inputValue, setInputValue] = useState<string>("");
  return (
    <>

<Grid
        templateAreas={`"header"
                        "main"
                        "footer"`}
        gridTemplateRows={"70px 1fr 30px"}
        gridTemplateColumns={"1fr"}
        gap="1"
        fontWeight="bold"
        width="100%"
        justifyContent="center"
      >
        <GridItem pl="2" area={"header"}>
          <Header inputValue={inputValue} setInputValue={setInputValue} />
        </GridItem>
        <GridItem pl="2" area={"main"}>
        <GetImage />
        </GridItem>
        <GridItem pl="2" area={"footer"}>
          <Footer />
        </GridItem>
      </Grid>
      
    </>
  )
}

export default artGrid