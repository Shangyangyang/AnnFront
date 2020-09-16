import Vue from 'vue'
import Router from 'vue-router'

import CcRoute from '@/routes/cc'


Vue.use(Router)

const main = r => require.ensure([], () => r(require('@/page/main')), 'main');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');


const routes = [{
	path: '/',
	component: main,
	children: [{
			path: '',
			component: home
		}, {
			path: '/home',
			component: home,
		},
		...CcRoute
	]
}]

export default new Router({
	routes
})
