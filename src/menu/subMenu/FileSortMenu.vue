<template>
	<div>
		<el-submenu index="30" v-show="totalShow">
			<template slot="title">
				<i class="el-icon-document"></i>
				<span slot="title">文件分类管理</span>
			</template>
			<el-menu-item index="FileSortList" v-show="FileSortListShow">文件导入</el-menu-item>
		</el-submenu>
	</div>
</template>

<script>
	import checkPermission from '@/util/checkPermission'
	
	export default {
		computed: {
			FileSortListShow(){
				return checkPermission('FileSortList');
			},
			totalShow: function() {
				return this.FileSortListShow;
			}
		}		
	}
</script>

<style>
</style>