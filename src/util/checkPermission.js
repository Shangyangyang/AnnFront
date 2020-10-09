import store from '@/store'

function checkPermission(resourceName) {
	let resourceList = store.getters.getResourceList;
	console.log('resourceList:');
	console.log(resourceList);
	
	// 临时放行
	if(!resourceList) return true;
	
	return resourceList.find((item) => {
		return item === resourceName;
	});
}

export default checkPermission
