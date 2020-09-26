<template>
	<span>
		<my-progress :showFlag="progressShowFlag" :msgType="'jindutiao2'" @updateShowFlag="updateShowFlag2"></my-progress>
		<el-input placeholder="请输入内容" v-model="filePath" class="input-with-select" @focus="selectText($event)">
			<el-select v-model="fileType" slot="prepend" placeholder="请选择">
				<el-option label="音乐" value="1"></el-option>
				<el-option label="PDF电子书" value="2"></el-option>
			</el-select>
			<el-button slot="append" icon="el-icon-search" :loading="loadingFlagBtn" @click="getFileList()"></el-button>
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
			suffixList: [{ key: '1', value: 'mp3,wav,w4a,flac,ape' }, { key: '2', value: 'pdf' }],

			filePath: 'F:\\123',
			fileType: '1',

			loadingFlag: false,
			loadingFlagBtn: false,
			progressShowFlag: false
		};
	},
	computed: {
		fileSortSyncMsg() {
			return this.$websocket.getters.onEvent('fileSortSyncMsg');
		},
	},
	watch: {
		fileSortSyncMsg: function(n, o) {
			if (n !== o && n) {
				this.$message({
					type: 'success',
					message: `${n.data}`,
					duration: 0,
					showClose: true
				});
			}
		},
	},
	methods: {
		updateShowFlag2() {
			this.progressShowFlag = false;
			// this.$message.success('执行完毕');
		},

		openProgress() {
			this.progressShowFlag = true;
		},
		selectText(e){
			e.currentTarget.select()
		},
		async getFileList() {
			if (!this.filePath || this.filePath.trim() == '') {
				this.$message.error('不能为空');
				return false;
			}
			this.loadingFlagBtn = true;
			let retObj = await listDictData({
				filePath: this.filePath,
				suffixs: this.suffixList.find(k => this.fileType == k.key).value,
				type: this.fileType
			});
			this.loadingFlagBtn = false;
			if (retObj.status != 1) {
				this.$message({
					type: 'error',
					message: '获取数据失败, ' + retObj.message
				});
				return;
			}

			this.$message.success(retObj.data);
			this.openProgress();

			// this.dataChange(this.fileList)
		},
		dataChange(value) {
			this.$emit('update:fileList', value);
			this.$emit('onChange');
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
