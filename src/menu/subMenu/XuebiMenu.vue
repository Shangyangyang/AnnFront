<template>
	<div>
		<el-submenu index="40" v-show="testShow">
			<template slot="title">
				<i class="el-icon-document"></i>
				<span slot="title">雪碧</span>
			</template>
			<el-menu-item index="xuebiTimeline" v-show="xuebiTimelineShow">时光轴</el-menu-item>
			<el-menu-item index="xuebiCost" v-show="xuebiCostShow">记账本</el-menu-item>
		</el-submenu>
	</div>
</template>

<script>
	import checkPermission from '@/util/checkPermission'
	
	export default {
		computed: {
			xuebiCostShow(){
				return checkPermission('xuebiCost');
			},
			xuebiTimelineShow(){
				return checkPermission('xuebiTimeline');
			},
			testShow: function() {
				return this.xuebiCostShow || this.xuebiTimelineShow;
			}
		}		
	}
</script>

<style>
</style>