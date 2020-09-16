import store from '@/store'

function checkPermission(resourceName) {
	let resourceList = store.getters.getResourceList;

	return resourceList.find((item) => {
		return item === resourceName;
	});
}

export default checkPermission
