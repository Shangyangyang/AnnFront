import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	id: '',
	userName: '',
	name: '',
}

const mutations = {

	saveUserId(state, id) {
		state.id = id;
		localStorage.setItem('id', state.id);
	},
	saveUserName(state, userName) {
		state.userName = userName;
		localStorage.setItem('user_name', state.userName);
	},
	saveName(state, name) {
		state.name = name;
		localStorage.setItem('name', state.name);
	},
	clearAllData(state) {
		state.id = '';
		state.userName = '';
		state.name = '';
		localStorage.clear();
	}
}

const actions = {
	setUserId({
		commit
	}, id) {
		commit('saveUserId', id);
	},
	setUserName({
		commit
	}, userName) {
		commit('saveUserName', userName);
	},
	setName({
		commit
	}, name) {
		commit('saveName', name);
	},
}

const getters = {
	getUserId: state => {
		if (state.id === undefined || state.id === null || state.id === '') {
			state.id = localStorage.getItem('id');
		}
		return state.id;
	},
	getUserName: state => {
		if (state.userName === undefined || state.userName === null || state.userName === '') {
			state.userName = localStorage.getItem('user_name');
		}
		return state.userName;
	},
	getName: state => {
		if (state.name === undefined || state.name === null || state.name === '') {
			state.name = localStorage.getItem('name');
		}
		return state.name;
	},
}

const store = new Vuex.Store({
	state,
	getters,
	actions,
	mutations
})

export default store
