import { useState, useEffect } from "react";
import axios from "axios";
import apiClient from "../services/api-client";
import { Box, Input, SimpleGrid, Text, Image } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import Masonry from "react-responsive-masonry";

const GetImage = () => {
  const [artworkIds, setArtworkIds] = useState<any[]>([]);
  const [artworkData, setArtworkData] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // when page loads default is Sunflower search
  useEffect(() => {
    const fetchArtworkIds = async () => {
      try {
        const response = await axios.get(
          "https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&q=sunflower"
        );
        console.log(response.data);
        setArtworkIds(response.data.objectIDs);
        console.log("ids updated");
      } catch (error) {
        setError("Failed to fetch artwork data");
      }
    };

    fetchArtworkIds();
  }, []);

  // function that retrives the data based on the IDs in the useState
  useEffect(() => {
    const fetchArtworkData = async () => {
      try {
        for (let i = 0; i < artworkIds.length; i++) {
          // iterate through id's appending them to end of url to recieve JSON data
          const response = await axios.get(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${artworkIds[i]}`
          );
          setArtworkData((prevState) => [...prevState, response.data]); // Update artworkData with the fetched data using prevState on search its blanked out before.
          console.log("data updated");
          setImagesLoaded(true);
        }
      } catch (error) {
        setError("Failed to fetch artwork data");
      }
    };

    if (artworkIds.length > 0) {
      fetchArtworkData();
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
      setArtworkIds(response.data.objectIDs);
      setArtworkData([]);
      console.log("ids updated");
    } catch (error) {
      setError("Failed to fetch artwork data");
    }
  }

  // console logs for changes to state
  useEffect(() => {
    console.log("artworkIds updated:", artworkIds);
  }, [artworkIds]);

  useEffect(() => {
    console.log("artworkData updated:", artworkData);
  }, [artworkData]);

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault(); // Prevent page refresh on form submit
  //   searchForTerm(inputValue); // Handle form submission
  // }; // Moved search function to header component (Megan)

  // TODO: clean up error catching

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  // if (artworkData.length > 0) {
  //   return (
  //     <div>
  //       {artworkData.map((artwork, index) => (
  //         <img key={index} src={artwork.primaryImage} alt={artwork.title} />
  //       ))}
  //     </div>
  //   );
  // }

  return (
    <Box>
      {imagesLoaded && (
        <Masonry columnsCount={3} gutter="16">
          {artworkData.map((artwork, index) => {
            if (artwork.primaryImage) {
              return (
                <Box key={index} marginBottom="16px">
                  <Image src={artwork.primaryImage} alt={artwork.title} />
                  <Text>{artwork.title}</Text>
                  <Text>{artwork.artistDisplayName}</Text>
                </Box>
              );
            }
            return null;
          })}
        </Masonry>
      )}
    </Box>
  );
};

export default GetImage;
