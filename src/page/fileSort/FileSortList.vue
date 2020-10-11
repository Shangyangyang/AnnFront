<template>
	<div>
		<bread-head></bread-head>
		<div align="center">
			<h3 style="margin-bottom: 20px;">已导入文件概况</h3>
			<div>
				现存的文件数量：{{infoForm.n1}}个，已分类的有{{infoForm.n4}}个，占比：{{getZhanbi(infoForm)}}
				<br />
				音乐文件数量：{{infoForm.n2}}个，占比：{{infoForm.s1}}
				<br />
				PDF文件数量：{{infoForm.n3}}个，占比：{{infoForm.s2}}
				<br />
				最近一次导入时间是：{{infoForm.d1}}
				<br />
				现存文件的总占用空间是{{getSizeStr(infoForm.l1)}}
			</div>
		</div>
		<div style="padding: 15px;">
			<el-collapse v-model="activeName" accordion @change="test2">
				<el-collapse-item title="按路径导入" name="1">
					<el-row>
						<el-col :span="23" style="margin: 10px;"><search-files :fileList="fileList" @onChange="test"></search-files></el-col>
					</el-row>
				</el-collapse-item>
				<el-collapse-item title="按文件名初筛" name="2"></el-collapse-item>
			</el-collapse>
		</div>
	</div>
</template>

<script>
import fetch from '@/util/fetch';
const getFileInfo = data => fetch('/fileSort/fileSort/getFileInfo', data); // 获取概况信息
export default {
	data() {
		return {
			fileList: [],
			activeName: 1,
			infoForm: {}
		};
	},
	created() {
		this.init();
	},
	methods: {
		init() {
			this.getFileInfo();
		},
		async getFileInfo() {
			let retObj = await getFileInfo();
			if (!retObj || retObj.status != 1) {
				this.$message.error('获取数据失败，' + retObj.message);
				return false;
			}
			
			this.infoForm = retObj.data
		},
		test2(str) {
			console.log('test2');
			console.log(str);
		},
		test() {
			console.log('musicSortList', this.fileList);
		},
		getSizeStr(n){
			let c = 0
			while(n > 1024){
				n = n / 1024
				c++
			}
			
			n = parseInt(n)
			
			let u = ''
			switch (c){
				case 1:
					u = 'KB'
					break;
				case 2:
					u = 'MB'
					break;
				case 3:
					u = 'GB'
					break;
				default:
					u = 'B'
					break;
			}
			return `${n}${u}`
		},
		getZhanbi(info){
			if(info.n4 == 0) return '0%'
			let t = info.n1 + info.n4
			console.log(20 / 6);
			let s = t / info.n4
			return `${s}%`
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
