import axios from "axios";

export default axios.create({
  baseURL: "https://lecture-monitor.herokuapp.com/api/",
});
