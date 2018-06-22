<template>
    <div class="bread_container">

		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>

    </div>
</template>

<script>
	import fetch from '@/util/fetch'
	
	import checkPermission from '@/util/checkPermission'

    export default {
    	
	    	data(){
	    	    return {};
	    	}
	}

</script>

<style lang="less">
	@import '../assets/css/mixin';
	.bread_container{
		background-color: #f5f5f5;
		height: 40px;
		line-height: 40px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
		.el-breadcrumb{
			height: 40px;
			line-height: 40px;
		}
	}
</style>
