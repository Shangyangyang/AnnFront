<template>
	<div>
		<el-row>
			<el-col :span="23" style="margin: 10px;"><search-files :fileList="fileList" @onChange="test"></search-files></el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	data() {
		return {
			fileList: [],

			input3: '',
			select: '1',

			
		};
	},
	methods: {
		test() {
			console.log('musicSortList', this.fileList);
		}
	}
};
</script>

<style>
.el-select .el-input {
	width: 130px;
}
.input-with-select .el-input-group__prepend {
	background-color: #fff;
}
</style>
