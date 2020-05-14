// Connect backend API to reach from here.
import axios from "axios";

export default () => {
  return axios.create({
    baseURL: "http://localhost:8081/",
  });
};
