import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import apiClient from "../services/api-client";
import { Input } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'

const Landing = () => {
  const [artworkIds, setArtworkIds] = useState<any[]>([]);
  const [artworkData, setArtworkData] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [randomArtwork, setRandomArtwork] = useState<any>(null);
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
        for (let i = 0; i < artworkIds.length; i++) { // iterate through id's appending them to end of url to recieve JSON data
          const response = await axios.get(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${artworkIds[randomIndex]}`
          );
          setArtworkData(prevState => [...prevState, response.data]); // Update artworkData with the fetched data using prevState on search its blanked out before.
          console.log("data updated")
        }
      } catch (error) {
        setError("Failed to fetch artwork data");
      }
    };

    if (artworkIds.length > 0) {
      fetchArtworkData();
    }


  }, [artworkIds]); // whenever ID state is updated this function is called.


  useEffect(() => {
    const fetchRandomArtwork = () => {
    if (artworkData.length > 0) {
        const randomIndex = Math.floor(Math.random() * artworkData.length);
        setRandomArtwork(artworkData[randomIndex]);}
    };

    fetchRandomArtwork();
  }, [artworkData])

  
  
  // console logs for changes to state
  useEffect(() => {
    console.log("artworkIds updated:", artworkIds);
  }, [artworkIds]);
  
  useEffect(() => {
    console.log("artworkData updated:", artworkData);
  }, [artworkData]);





  return (

    <div>
    {/* Render the image of the random artwork */}
    {randomArtwork && (
      <div>
        <img src={randomArtwork.primaryImage} alt={randomArtwork.title} />
        <p>{randomArtwork.title}</p>
        <p>{randomArtwork.artistDisplayName}</p>
      </div>
    )}
  </div>

  );
};

export default Landing;
