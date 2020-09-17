<template>
	<span>
		<el-input placeholder="请输入内容" v-model="filePath" class="input-with-select">
			<el-select v-model="fileType" slot="prepend" placeholder="请选择">
				<el-option label="音乐" value="1"></el-option>
				<el-option label="PDF电子书" value="2"></el-option>
			</el-select>
			<el-button slot="append" icon="el-icon-search" @click="getFileList()"></el-button>
		</el-input>
		<loading v-show="loadingFlag"></loading>
	</span>
</template>

<script>
import fetch from '@/util/fetch';

const listDictData = data => fetch('/fileSort/fileSort/findFlieList', data);

export default {
	props: [],

	data() {
		return {
			fileList: [],
			suffixList: [
				{key: '1', value: 'mp3,wav,w4a'},
				{key: '2', value: 'pdf'},
			],
			
			filePath: '',
			fileType: '1',
			
			loadingFlag: false,
		};
	},
	methods: {
		async getFileList() {
			if(!this.filePath || this.filePath.trim() == ''){
				this.$message.error('不能为空')
				return false
			}
			this.loadingFlag = true
			let retObj = await listDictData({
				filePath: this.filePath,
				suffixs: this.suffixList.find(k => this.fileType == k.key).value,
				type: this.fileType,
				
			});
			this.loadingFlag = false
			if (retObj.status != 1) {
				this.$message({
					type: 'error',
					message: '获取数据失败, ' + retObj.message
				});
				return;
			}
			
			this.fileList = [];
			retObj.data.forEach(item => this.fileList.push(item));
			this.dataChange(this.fileList)
			console.log(retObj.data);
		},
		dataChange(value) {
			this.$emit('update:fileList', value);
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
