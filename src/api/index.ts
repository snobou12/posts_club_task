
import axios from "axios";
export const API_URL = `https://jsonplaceholder.typicode.com`;

const $api = axios.create({
	withCredentials: true,
	baseURL: API_URL,
});

//interceptors

export default $api;
