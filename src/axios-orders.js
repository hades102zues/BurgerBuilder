import axios from 'axios';

const instance = axios.create({
	baseURL : 'https://burgerbuilder-5fb15.firebaseio.com/'
});

export default instance;