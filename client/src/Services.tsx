import axios from "axios";

const Instance = axios.create({
    baseURL: "https://151f-14-99-102-226.ngrok-free.app",
});

const getToken = () => Instance({ method: "POST", url: "/token" });

export { getToken };