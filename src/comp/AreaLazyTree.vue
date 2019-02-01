<template>
	<div class="block">
		<el-tree 
			:data="data" 
			:props="defaultProps" 
			@node-click="handleNodeClick" 
			style="background: #ddd; width: 30%;"
		></el-tree>
	</div>
</template>

<script>
import fetch from '@/util/fetch';
const listDogData = data => fetch('/sys/area/getListByRecursion', data);

export default {
	data() {
		return {
			data: [],
			defaultProps: {
				children: 'childrenList',
				label: 'areaName'
			}
		};
	},
	created: function() {
		this.getListData();
	},
	methods: {
		async getListData() {
			let retObj = await listDogData({
				areaCode: '370102000000'
			});

			if (!retObj || retObj.status != 1) {
				this.$message.error('操作失败,' + retObj.message);
				return;
			}
			this.data = [];
			this.data.push(...retObj.data);
		},
		handleNodeClick(data) {
			// console.log(data);
		},		
	}
};
</script>