<template>
	<div class="block">
		<el-dialog title="地区选择" :visible.sync="dialogVisible" width="50%" height="50%" :before-close="handleClose" v-dialogDrag>
			<el-tree 
				:data="data" 
				node-key="areaCode"
				:props="defaultProps" 
				@node-click="handleNodeClick" 
				style="background: #ddd; width: 80%;"
				:default-expanded-keys="['370102004000']"
				:default-checked-keys="['370102004000']"
			></el-tree>
		</el-dialog>
		<el-input :value="areaTreeName"  size="medium" readonly="readonly" @focus="choiceArea">
			<el-button @click="choiceArea" :disabled="buttonD" slot="append" icon="el-icon-search"></el-button>
		</el-input>
	</div>
</template>

<script>
import fetch from '@/util/fetch'; 
const listDogData = data => fetch('/sys/area/getListByRecursion', data);

export default {
	props: [
		'defaultCode'
	],
	data() {
		return {
			data: [],
			
			areaTreeName: '',
			areaTreeCode: '',
			defaultProps: {
				children: 'childrenList',
				label: 'areaName'
			},
			cascaderProps: {
				children: 'childrenList',
				label: 'areaName',
				value: 'areaCode'
			},
			
			selectedOptions: [],
			
			dialogVisible: false,
			buttonD: false
		};
	},
	created: function() {
	},
	computed: {
		ac() {
			console.log(this.areaCode);
			return this.areaCode;
		}
	},
	watch: {
		ac(newValue, oldValue) {
			console.log(this.ac);
		}
	},
	methods: {
		handleClose(done) {
			done();
		},
		handleChange(value) {
		},
		choiceArea() {
			this.dialogVisible = true;
			this.getListData();
		},
		async getListData() {
			let retObj = await listDogData({
				areaCode: this.defaultCode ? this.defaultCode : '370100000000'
			});

			if (!retObj || retObj.status != 1) {
				this.$message.error('操作失败,' + retObj.message);
				return;
			}
			this.data = [];
			this.data.push(...retObj.data);
		},
		handleNodeClick(data) {
			this.areaTreeName = data.areaName;
			this.areaTreeCode = data.areaCode;
			
			// 这里把值传递出组件
			this.outValue();
			
			this.dialogVisible = false;
		},
		outValue(){
			this.$emit('update:areaCode', this.areaTreeCode);
		}
	}
};
</script>
<style>
.el-dialog__body {
	height: 400px;
}
</style>
