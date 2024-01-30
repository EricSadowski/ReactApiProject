import { useState } from "react";
import "./App.css";
import { Grid, GridItem } from "@chakra-ui/react";
import ArtGrid from "./components/ArtGrid";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RootLayout from './layouts/RootLayout'
import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider 
} from 'react-router-dom'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<ArtGrid />} />
      {/* <Route path="landing" element={<Landing />}  /> */}
      
    </Route>
  )
)


function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>
  );
}

export default App;
