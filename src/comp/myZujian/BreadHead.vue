<template>
	<div style="margin: 20px 0px 10px; padding: 10px 17px 10px; background-color: #eee;">
		<el-breadcrumb separator=">>">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>

<script>
    export default {
        data(){
            return {};
        }
	}
</script>