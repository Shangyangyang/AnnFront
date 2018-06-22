import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {

	userInfo: {
		userCode:'',
		userName: '',

		areaCode: '',
		areaName: '',

		officeCode: '',
		officeName: '',

		resourceList: [],
	},
	
	menuList:[	"dictList","areaList","officeList","userList","roleList","menuList",
				"adminSet","appList"],

	currentUser: ''
}

const mutations = {	
	saveUserInfo(state, userInfo){
		state.userInfo = userInfo;
		localStorage.setItem('user_info',state.userInfo);
		
		state.currentUser = userInfo.userCode;
		localStorage.setItem('user_code',state.currentUser);
	}	
}

const actions = {	
	saveUserData({commit}, userInfo){
		commit('saveUserInfo',userInfo);		
	}	
}

const getters = {
	getUserInfo: state =>{
		if(state.userInfo === undefined || state.userInfo === null){
			state.userInfo = localStorage.getItem('user_info');
		}
		return state.userInfo;			
	},

	getResourceList: state => {
		/*
		if(state.userInfo === undefined || state.userInfo === null){
			state.userInfo = localStorage.getItem('user_info');
		}		
		if(state.userInfo.resourceList === undefined || state.userInfo.resourceList == null){
			return [];
		}		
		return state.userInfo.resourceList;
		*/
		
		if(state.currentUser === undefined || state.currentUser === ''){
			state.currentUser = localStorage.getItem('user_code');
		}

		return state.menuList;
	}
}

const store = new Vuex.Store({state,getters,actions,mutations})

export default store