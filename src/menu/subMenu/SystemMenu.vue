<template>
	<div>
		<el-submenu index="100" v-show="totalFlagShow">
			<template slot="title">
				<i class="el-icon-document"></i>
				<span slot="title">系统管理</span>
			</template>
			<el-menu-item index="dictList" v-show="dictListShow">字典管理</el-menu-item>
			<el-menu-item index="userList" v-show="userListShow">用户管理</el-menu-item>
			<el-menu-item index="roleList" v-show="roleListShow">角色管理</el-menu-item>
			<el-menu-item index="menuList" v-show="menuListShow">菜单管理</el-menu-item>
		</el-submenu>
	</div>
</template>

<script>
	import checkPermission from '@/util/checkPermission'
	
	export default {
		computed: {
			dictListShow(){
				return checkPermission('dictList');
			},
			userListShow(){
				return checkPermission('userList');
			},
			roleListShow(){
				return checkPermission('roleList');
			},
			menuListShow(){
				return checkPermission('menuList');
			},
			totalFlagShow: function() {
				return this.dictListShow || this.userListShow || this.roleListShow || this.menuListShow;
			}
		}		
	}
</script>

<style>
</style>