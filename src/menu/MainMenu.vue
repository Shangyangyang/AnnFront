<template>
	<div>
		<el-submenu index="3" v-show="ControlMenu">
			<template slot="title">
				<i class="el-icon-document"></i>
				<span slot="title">记账本</span>
			</template>
			<el-menu-item index="car" v-show="car">汽车花费</el-menu-item>
			<el-menu-item index="large" v-show="large">大额支出</el-menu-item>
			<el-menu-item index="xuebi" v-show="xuebi">雪碧</el-menu-item>
			<el-menu-item index="lijin" v-show="lijin">礼金管理</el-menu-item>
		</el-submenu>
		<el-submenu index="4" v-show="ControlMenu">
			<template slot="title">
				<i class="el-icon-document"></i>
				<span slot="title">雪碧时光轴</span>
			</template>
			<el-menu-item index="xuebiTimeline" v-show="xuebiTimeline">雪碧时光轴</el-menu-item>
		</el-submenu>
		<el-submenu index="5" v-show="ControlMenu">
			<template slot="title">
				<i class="el-icon-document"></i>
				<span slot="title">图片管理</span>
			</template>
			<el-menu-item index="timelineSelectList" v-show="timelineSelectList">相册筛选</el-menu-item>
			<el-menu-item index="xuebiList" v-show="xuebiList">雪碧列表</el-menu-item>
			<el-menu-item index="importPic" v-show="importPic">时间线导入基表</el-menu-item>
			<el-menu-item index="TimelineLabelList" v-show="TimelineLabelList">标签管理</el-menu-item>
		</el-submenu>
		<el-submenu index="6" v-show="ControlMenu">
			<template slot="title">
				<i class="el-icon-document"></i>
				<span slot="title">小工具</span>
			</template>
			<el-menu-item index="signin" v-show="signin">签到表</el-menu-item>
		</el-submenu>
		<el-submenu index="7" v-show="ControlMenu">
			<template slot="title">
				<i class="el-icon-document"></i>
				<span slot="title">系统管理</span>
			</template>
			<el-menu-item index="dictList" v-show="dictList">字典管理</el-menu-item>
			<el-menu-item index="userList" v-show="userList">用户管理</el-menu-item>
			<el-menu-item index="roleList" v-show="roleList">角色管理</el-menu-item>
			<el-menu-item index="menuList" v-show="menuList">菜单管理</el-menu-item>
	        <el-menu-item index="test" v-show="test">测试websocket</el-menu-item>
	        <el-menu-item index="testCalendar">测试日历签到</el-menu-item>
	
		</el-submenu>
	</div>
</template>

<script>
	import checkPermission from '@/util/checkPermission'
	
	export default {
		computed: {
			dictList: function() {
				return true;
			},
			userList: function() {
				return true;
			},
			roleList: function() {
				return true;
			},
			menuList: function() {
				return true;
			},
            test: function() {
                return true;
            },
            car: function() {
                return true;
            },
            large: function() {
                return true;
            },
            xuebi: function() {
                return true;
            },
            lijin: function() {
                return true;
            },
            xuebiTimeline: function() {
                return true;
            },
            importPic: function() {
                return true;
            },
            timelineSelectList: function() {
                return true;
            },
            xuebiList: function() {
                return true;
            },
            TimelineLabelList: function() {
                return true;
            },
            signin: function() {
                return true;
            },
			ControlMenu: function() {
				return true;
			}
		}		
	}
</script>

<style>
</style>