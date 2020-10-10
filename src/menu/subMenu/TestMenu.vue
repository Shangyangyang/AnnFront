<template>
	<div>
		<el-submenu index="110" v-show="totalFlagShow">
			<template slot="title">
				<i class="el-icon-document"></i>
				<span slot="title">测试专区</span>
			</template>
			<el-menu-item index="testWebsocket" v-show="testWebsocketShow">测试websocket</el-menu-item>
			<el-menu-item index="testCalendar">测试日历签到</el-menu-item>
			<el-menu-item index="signin" v-show="signinShow">签到表</el-menu-item>
			<el-menu-item index="testVue" v-show="testVueShow">测试Vue</el-menu-item>
			<el-menu-item index="testEcharts" v-show="testVueShow">测试热力图</el-menu-item>
			<el-menu-item index="testProgress_bak" v-show="testProgress_bakShow">测试进度条</el-menu-item>
		</el-submenu>
	</div>
</template>

<script>
	import checkPermission from '@/util/checkPermission'
	
	export default {
		computed: {
			testProgress_bakShow(){
				return checkPermission('testProgress_bak');
			},
			signinShow(){
				return checkPermission('signin');
			},
			testVueShow(){
				return checkPermission('testVue');
			},
			testEchartsShow(){
				return checkPermission('testEcharts');
			},
			testWebsocketShow(){
				return checkPermission('testWebsocket');
			},
			testCalendarShow(){
				return checkPermission('testCalendar');
			},
			totalFlagShow: function() {
				return this.testWebsocketShow || this.testCalendarShow || this.signinShow || this.testVueShow || this.testEchartsShow || testProgress_bakShow;
			}
		}
	}
</script>

<style>
</style>