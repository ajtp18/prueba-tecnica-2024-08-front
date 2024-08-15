import axios from "axios";

export const httpClient = axios.create({
    baseURL: 'https://wompi-backend-l9py.onrender.com/'
});