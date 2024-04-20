import axios from 'axios';

const apiRoot = import.meta.env.VITE_API_ROOT;
const apiKey = import.meta.env.VITE_API_KEY;

const axiosInstance = axios.create({
  baseURL: apiRoot,
  headers: {
    'Accept': 'application/json, text/html',
    'api-key': apiKey,
    'Access-Control-Allow-Origin':'*'
  },
});

export default axiosInstance;