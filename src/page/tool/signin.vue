<template>
	<div class="fillcontain">
		<bread></bread>
		<el-row>
			<el-col :span="6">
				<area-tree :defaultCode="defaultCode" :areaCode.sync="areaCode"></area-tree>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="6">
				<el-input v-model="areaCode"></el-input>
			</el-col>
		</el-row>
		
	</div>
</template>

<script>
import fetch from '@/util/fetch';

const testThread = data => fetch('/sys/area/testThread', data);

export default {
	data() {
		return {
			defaultCode: '370102000000',
			areaCode: '',
		};
	},
	methods: {
		
	},
};
</script>

<style lang="less">
@import '../../assets/css/mixin';
</style>
