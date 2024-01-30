import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import apiClient from "../services/api-client";
import { Input } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'

const Landing = () => {
  const [artworkIds, setArtworkIds] = useState<any[]>([]);
  const [artworkData, setArtworkData] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [randomArtwork, setRandomArtwork] = useState<any>();
  const [error, setError] = useState("");



  // when page loads default is Sunflower search
  useEffect(() => {
    const fetchArtworkIds = async () => {
      try {
        const response = await axios.get(
          "https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&q=sunflower"
        );
        console.log(response.data); 
        setArtworkIds(response.data.objectIDs);
        console.log("ids updated")
      } catch (error) {
        setError("Failed to fetch artwork data");
      }
    };

    fetchArtworkIds();
  }, []);


  // function that retrives the data based on the IDs in the useState
  useEffect(() => {
    const fetchArtworkData = async () => {
        const randomIndex = Math.floor(Math.random() * artworkIds.length);
      try {

          let response = await axios.get(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${artworkIds[randomIndex]}`
           // "https://collectionapi.metmuseum.org/public/collection/v1/objects/436524"
          );
          // TODO: Set default on GET fail
          console.log("response is: " + response.data.primaryImage);
          if(response.data.primaryImage === ""){
            response = await axios.get("https://collectionapi.metmuseum.org/public/collection/v1/objects/436524")
          }
          setRandomArtwork(response.data);
          //setRandomArtwork(response) 
          console.log("data updated")
         // console.log(randomArtwork);
          
        }      
         catch (error) {
        setError("Failed to fetch artwork data");
      }
    };

    if (artworkIds.length > 0) {
      fetchArtworkData();
    }


  }, [artworkIds]); // whenever ID state is updated this function is called.


  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      {/* Render the image of the random artwork as a background */}
      {randomArtwork && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `url(${randomArtwork.primaryImage}) center/cover no-repeat`,
          }}
        >
          {/* Text overlaid on the image */}
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <h1 style={{ color: "white", fontSize: "3em", textAlign: "center" }}>{randomArtwork.title}</h1>
            <p style={{ color: "white", fontSize: "1.5em", textAlign: "center" }}>{randomArtwork.artistDisplayName}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;
