import axios from 'axios';

const API_KEY = '8f01f0888e992646b8356fbbdd39fe74';

const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/weather',
  params: {
    appid: API_KEY,
    units: 'metric',
  },
});

export default weatherApi;
