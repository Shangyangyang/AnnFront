<template>
	<div>
		<el-submenu index="3" v-show="ControlMenu">
			<template slot="title">
				<i class="el-icon-document"></i>
				<span slot="title">记账本</span>
			</template>
			<el-menu-item index="car" v-show="car">汽车花费</el-menu-item>
			<el-menu-item index="large" v-show="large">大额支出</el-menu-item>
		</el-submenu>
		<el-submenu index="4" v-show="ControlMenu">
			<template slot="title">
				<i class="el-icon-document"></i>
				<span slot="title">系统管理</span>
			</template>
			<el-menu-item index="dictList" v-show="dictList">字典管理</el-menu-item>
			<el-menu-item index="userList" v-show="userList">用户管理</el-menu-item>
			<el-menu-item index="roleList" v-show="roleList">角色管理</el-menu-item>
			<el-menu-item index="menuList" v-show="menuList">菜单管理</el-menu-item>
	        <el-menu-item index="test" v-show="test">测试</el-menu-item>
	
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
			ControlMenu: function() {
				return true;
			}
		}		
	}
</script>

<style>
</style>