import axios from "axios";

export default axios.create({
    baseURL: "https://backend-lectio-r3do.onrender.com",
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
});