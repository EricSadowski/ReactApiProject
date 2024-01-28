import { useState, useEffect } from "react";
import axios from "axios";

const GetImage = () => {
  const [artworkIds, setArtworkIds] = useState<any[]>([]); 
  const [artworkData, setArtworkData] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArtworkIds = async () => {
      try {
        const response = await axios.get(
          "https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&q=sunflower"
        );
        console.log(response.data); // Log the response to see its structure
        setArtworkIds(response.data.objectIDs);
      } catch (error) {
        setError("Failed to fetch artwork data");
      }
    };

    fetchArtworkIds();
  }, []);

  
  useEffect(() => {
    const fetchArtworkData = async () => {
      try {
        for (let i = 0; i < artworkIds.length; i++) { // iterate through id's appending them to end of url to recieve JSON data
          const response = await axios.get(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${artworkIds[i]}`
          );
          setArtworkData(prevState => [...prevState, response.data]); // Update artworkData with the fetched data using prevState
        }
      } catch (error) {
        setError("Failed to fetch artwork data");
      }
    };

    if (artworkIds.length > 0) {
      fetchArtworkData();
    }
  }, [artworkIds]);


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
    <div>

      {/* <button>press</button> */}
      {/* <h2>{artworkData2.title}</h2>
      <img src={artworkData2.primaryImage} alt={artworkData.title} /> */}
      {/* Additional data access and display */}
      {/* <p>Artist: {artworkData.constituents[0]?.name || "Unknown Artist"}</p>
      <p>Medium: {artworkData.medium}</p> */}
      {/* Add more data as needed */}
      <div>
          {artworkData.map((artwork, index) => (
            <img key={index} src={artwork.primaryImage} alt={artwork.title} />
          ))}
        </div>
    </div>
  );
};

export default GetImage;

// Meegun wuz here
