import axios from 'axios'
import qs from 'qs'

import { baseUrl } from '@/config/env'

axios.defaults.baseURL = baseUrl;
axios.defaults.timeout = 300000;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

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

axios.interceptors.response.use(function (response) {
    return response;
}, function (err) {
    if (err && err.response) {
        switch (err.response.status) {
            case 401:
                err.message = '未授权，请登录';
                window.location.href = loginUrl;
                break;
            default:
                err.message = `连接出错(${err.response.status})`;
        }
    } else {
        err.message = '连接服务器失败'
    }
    this.$message.error(err.message);
    return Promise.reject(err);
});

export default fetch