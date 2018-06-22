import axios from 'axios'
import qs from 'qs'

import { baseUrl } from '@/config/env'

axios.defaults.baseURL = baseUrl;
axios.defaults.timeout = 30000;
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

async function fetch(url, data) {
	var retObj;

	if(data != null && data != undefined){
		await axios.post(url, qs.stringify(data))
					.then(function(response) {
							retObj = response.data;
					})
					.catch(function(error) {					
					});
	} else {
		await axios.post(url)
					.then(function(response) {
							retObj = response.data;
					})
					.catch(function(error) {					
					});		
	}
	return retObj;
}

export default fetch