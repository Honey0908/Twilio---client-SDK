import axios from "axios";

const Instance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
});

const getToken = () => Instance({ method: "POST", url: "/token" });

export { getToken };