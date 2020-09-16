<template>
	<div>
		<el-row>
			<el-col :span="23" style="margin: 10px;">
				<search-files ></search-files>
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	data() {
		return {
			input3: '',
			select: '1'
		};
	},
	methods: {
		searchFile() {
			console.log(this.input3);
			console.log(this.select);
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
