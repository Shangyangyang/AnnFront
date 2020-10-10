<template>
	<div>
		<el-submenu index="20" v-show="totalShow">
			<template slot="title">
				<i class="el-icon-document"></i>
				<span slot="title">图片管理</span>
			</template>
			<el-menu-item index="importPic" v-show="importPicShow">导入图片</el-menu-item>
			<el-menu-item index="timelineSelectList" v-show="timelineSelectListShow">相册筛选</el-menu-item>
			<el-menu-item index="xuebiList" v-show="xuebiListShow">雪碧列表</el-menu-item>
			<el-menu-item index="TimelineLabelList" v-show="TimelineLabelListShow">标签管理</el-menu-item>
		</el-submenu>
	</div>
</template>

<script>
	import checkPermission from '@/util/checkPermission'
	
	export default {
		computed: {
			importPicShow(){
				return checkPermission('importPic');
			},
			timelineSelectListShow(){
				return checkPermission('timelineSelectList');
			},
			xuebiListShow(){
				return checkPermission('xuebiList');
			},
			TimelineLabelListShow(){
				return checkPermission('TimelineLabelList');
			},
			totalShow: function() {
				return this.importPicShow || this.timelineSelectListShow || this.xuebiListShow || this.TimelineLabelListShow;
			}
		}		
	}
</script>

<style>
</style>