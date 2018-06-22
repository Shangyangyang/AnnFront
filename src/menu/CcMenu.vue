<template>
	<el-submenu index="4" v-show="ControlMenu">

		<template slot="title">
			<i class="el-icon-document"></i>
			<span slot="title">系统管理</span>
		</template>

		<el-menu-item index="dictList" v-show="dictList">字典管理</el-menu-item>
		<el-menu-item index="areaList" v-show="areaList">行政区划</el-menu-item>
		<el-menu-item index="officeList" v-show="officeList">组织机构</el-menu-item>
		<el-menu-item index="userList" v-show="userList">用户管理</el-menu-item>
		<el-menu-item index="roleList" v-show="roleList">角色管理</el-menu-item>
		<el-menu-item index="menuList" v-show="menuList">菜单管理</el-menu-item>
        <el-menu-item index="appList" v-show="appList">应用管理</el-menu-item>
        <el-menu-item index="adminSet" v-show="adminSet">个人设置</el-menu-item>

	</el-submenu>
</template>

<script>
	import checkPermission from '@/util/checkPermission'
	
	export default {
		computed: {
			dictList: function() {
				return checkPermission('dictList');
			},
			areaList: function() {
				return checkPermission('areaList');
			},
			officeList: function() {
				return checkPermission('officeList');
			},
			userList: function() {
				return checkPermission('userList');
			},
			roleList: function() {
				return checkPermission('roleList');
			},
			menuList: function() {
				return checkPermission('menuList');
			},
            appList: function() {
                return checkPermission('appList');
            },
            adminSet: function() {
                return checkPermission('adminSet');
            },
			ControlMenu: function() {
				return this.dictList || this.areaList || this.officeList || this.userList || this.roleList || this.menuList || this.appList || this.adminSet;
			}
		}		
	}
</script>

<style>
</style>