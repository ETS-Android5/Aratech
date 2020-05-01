import axios from "axios";

export default axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://lecture-monitor.herokuapp.com/api/"
      : "https://lecture-monitor.herokuapp.com/api/",
});
