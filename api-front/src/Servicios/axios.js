import axios from 'axios';

export const API = axios.create({
    baseURL: 'http://127.0.0.1:3333'
    //baseURL:`http://127.0.0.1:8000/api/`
    // baseURL:`https://mexicoretos.herokuapp.com/api/`
});