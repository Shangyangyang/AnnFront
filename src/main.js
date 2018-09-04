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
// 字典公共组件
import DataDict from './comp/DataDict'
import DictExt from './comp/DictExt'

import RadioDict from './comp/RadioDict'
import CheckboxDict from './comp/CheckboxDict'
import SelectDict from './comp/SelectDict'

import UserSelect from './comp/UserSelect'

import OfficeLazyTree from './comp/OfficeLazyTree'
import OfficeSelectTree from './comp/OfficeSelectTree'

import AreaLazyTree from './comp/AreaLazyTree'
import AreaSelectTree from './comp/AreaSelectTree'
import ImportExcel from './comp/ImportExcel'


// 图片懒加载
import VueLazyLoad from 'vue-lazyload'
// 图片懒加载配置，error是错误图片，loading是加载中图片，attempt是一次加载的张图。
Vue.use(VueLazyLoad,{
    error:require('./assets/img/error.png'),
    loading:require('./assets/img/loading.gif'),
	attempt: 1
})

Vue.config.productionTip = false;

Vue.use(ElementUI);

Vue.component('head-top',HeadTop);
Vue.component('bread',bread);
// 字典公共组件
Vue.component('data-dict',DataDict);
Vue.component('dict-ext',DictExt);

Vue.component('radio-dict',RadioDict);
Vue.component('checkbox-dict',CheckboxDict);
Vue.component('select-dict',SelectDict);

Vue.component('user-select',UserSelect);

Vue.component('office-lazy-tree',OfficeLazyTree);
Vue.component('office-select-tree',OfficeSelectTree);

Vue.component('area-lazy-tree',AreaLazyTree);
Vue.component('area-select-tree',AreaSelectTree);
Vue.component('import-excel',ImportExcel);

var app = new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
