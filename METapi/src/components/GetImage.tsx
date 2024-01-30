import { useState, useEffect } from "react";
import axios from "axios";
import apiClient from "../services/api-client";
import { Input } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const GetImage = () => {
  const [artworkIds, setArtworkIds] = useState<any[]>([]);
  const [artworkData, setArtworkData] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState('');
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

const callDefault = async () => {

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
  



  // function that retrives the data based on the IDs in the useState
  useEffect(() => {
    const fetchArtworkData = async () => {
      try {
        for (let i = 0; i < artworkIds.length; i++) { // iterate through id's appending them to end of url to recieve JSON data
          const response = await axios.get(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${artworkIds[i]}`
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
    }else{
      
    }
  }, [artworkIds]); // whenever ID state is updated this function is called.

  
// TODO: make calls work with api client
// SEARCH functionality
  async function searchForTerm(search: string) {
    // apiClient
    //   .get<any>(`/search?isOnView=true&q=${search}`)
    //   .then((res) => {
    //     setArtworkIds(res.data);
    //     console.log("here"); // Log the response data
    //   })
    //   .catch((err) => setError(err.message));

    try {
      const response = await axios.get(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&q=${search}`
      );
      console.log(response.data); // console log to see how many items there are
      if(response.data.objectIDs === null){
        setArtworkData([]);
        callDefault();
        return;
      }else{
      setArtworkIds(response.data.objectIDs);
      setArtworkData([]);
      console.log("ids updated")}
    } catch (error) {
      console.log(error);
    }
  }
  
  // console logs for changes to state
  useEffect(() => {
    console.log("artworkIds updated:", artworkIds);
  }, [artworkIds]);
  
  useEffect(() => {
    console.log("artworkData updated:", artworkData);
  }, [artworkData]);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page refresh on form submit
    searchForTerm(inputValue); // Handle form submission
  };


  // TODO: clean up error catching
  
  // if (error) {
  //   return <div>Error: {error}</div>;
  // }


  return (
    <div>
      {/* <button>press</button> */}
      {/* <p>Artist: {artworkData.constituents[0]?.name || "Unknown Artist"}</p>
      <p>Medium: {artworkData.medium}</p> */}
      <div>
      <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
    <ResponsiveMasonry
    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
    className="my-masonry-grid"
  >
    <Masonry gutter="20px">
      
      {artworkData.map((artwork, index) => {
        if (artwork.primaryImage) {
          return (
            <div key={index}>
              <img src={artwork.primaryImage} alt={artwork.title} />
              <p>{artwork.title}</p>
              <p>{artwork.artistDisplayName}</p>
            </div>
          );
        }
        return null;
      })}
    </Masonry>
  </ResponsiveMasonry>
      </div>
    </div>
  );
};

export default GetImage;