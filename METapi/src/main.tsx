import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')!).render(
   // had to turn off strictmode because it renders twice for some reason
 // <React.StrictMode>
    <ChakraProvider>
    <App />
    </ChakraProvider>
  // {/* </React.StrictMode> */}
)
