import { useState, useEffect } from "react";
import axios from "axios";

const GetImage = () => {
  const [artworkData, setArtworkData] = useState<any>(null); // Use `any` type for flexibility
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArtworkData = async () => {
      try {
        const response = await axios.get(
          "https://collectionapi.metmuseum.org/public/collection/v1/objects/436524"
        );
        setArtworkData(response.data);
      } catch (error) {
        setError("Failed to fetch artwork data");
      }
    };

    fetchArtworkData();
  }, []); // Empty dependency array to run the effect only once

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!artworkData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{artworkData.title}</h2>
      <img src={artworkData.primaryImage} alt={artworkData.title} />
      {/* Additional data access and display */}
      <p>Artist: {artworkData.constituents[0]?.name || "Unknown Artist"}</p>
      <p>Medium: {artworkData.medium}</p>
      {/* Add more data as needed */}
    </div>
  );
};

export default GetImage;

// Meegun wuz here
