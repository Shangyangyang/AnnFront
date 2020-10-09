<template>
	<div>
		<el-submenu index="10" v-show="totalShow">
			<template slot="title">
				<i class="el-icon-document"></i>
				<span slot="title">记账本</span>
			</template>
			<el-menu-item index="car" v-show="carShow">汽车花费</el-menu-item>
			<el-menu-item index="large" v-show="largeShow">大额支出</el-menu-item>
			<el-menu-item index="xuebi" v-show="xuebiShow">雪碧</el-menu-item>
			<el-menu-item index="lijin" v-show="lijinShow">礼金管理</el-menu-item>
		</el-submenu>
	</div>
</template>

<script>
	import checkPermission from '@/util/checkPermission'
	
	export default {
		computed: {
			carShow(){
				console.log("checkPermission('car'):", checkPermission('car'));
				return checkPermission('car');
			},
			largeShow(){
				return checkPermission('large');
			},
			xuebiShow(){
				return checkPermission('xuebi');
			},
			lijinShow(){
				return checkPermission('lijin');
			},
			totalShow: function() {
				return true
				// this.carShow
				// || this.largeShow
				// || this.xuebiShow
				// || this.lijinShow
				// || true
				// ;
			}
		}		
	}
</script>

<style>
</style>