import axios from "axios";

// https://metmuseum.github.io/
export default axios.create({
  baseURL: "https://collectionapi.metmuseum.org/public/collection/v1/objects",
});