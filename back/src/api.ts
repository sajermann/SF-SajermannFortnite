import axios from 'axios';
import Interceptor from './interceptor';
import env from 'dotenv'
env.config();

const baseURL = process.env.URL_FORTNITEAPI;
const headers = {
	'Access-Control-Origin': '*',
	'Content-Type': 'application/json;charset=utf-8',
	'Access-Control-Allow-Method': 'POST,GET,DELETE',
	'charset': 'utf-8',
	'responseEncoding': 'utf-8'
};

const api = axios.create({
	baseURL,
	headers,
});

Interceptor(api);

export default api;
