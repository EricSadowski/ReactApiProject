import { useState } from 'react'
import './App.css'
import { Grid, GridItem } from '@chakra-ui/react'
import ArtGrid from './components/ArtGrid'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Grid
        templateAreas={`"header"
                        "main"
                        "footer"`}
        gridTemplateRows={'70px 1fr 30px'}
        gridTemplateColumns={'1fr'}
        gap='1'
        fontWeight='bold'
      >
        <GridItem pl='2' area={'header'}>
          <Header />
        </GridItem>
        <GridItem pl='2' area={'main'}>
          <ArtGrid />
        </GridItem>
        <GridItem pl='2' area={'footer'}>
          <Footer />
        </GridItem>
      </Grid>     
    </>
  )
}

export default App
