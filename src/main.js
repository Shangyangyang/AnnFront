import Vue from 'vue'

import App from './App'

import router from './router'
import store from './store'

import ElementUI from 'element-ui'

//import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/index.css'
import './assets/css/style.css'
import './assets/css/commonStyle.css'

import bread from './comp/bread'
import HeadTop from './comp/HeadTop'

import AreaTree from './comp/AreaTree'
import AreaLazyTree from './comp/AreaLazyTree'

// 引入自定义指令
import './util/directives.js';

// 图片卡片显示组件
import ImgShow from './comp/myZujian/imgShow'
Vue.component('img-show', ImgShow);

// 字典公共组件
import DataDict from './comp/myZujian/DataDict'
Vue.component('data-dict', DataDict);

// 选择标签
import SelectLabel from './comp/myZujian/SelectLabel'
Vue.component('select-label', SelectLabel);

// 图片懒加载
import VueLazyLoad from 'vue-lazyload'
// 图片懒加载配置，error是错误图片，loading是加载中图片，attempt是一次加载的张图。
Vue.use(VueLazyLoad, {
	error: require('./assets/img/error.png'),
	loading: require('./assets/img/loading.gif'),
	attempt: 1
})

Vue.config.productionTip = false;

Vue.use(ElementUI);

Vue.component('head-top', HeadTop);
Vue.component('bread', bread);
// 字典公共组件
Vue.component('area-tree', AreaTree);
Vue.component('area-lazy-tree', AreaLazyTree);


var app = new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: {
		App
	}
})
