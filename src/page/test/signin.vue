<template>
	<div class="fillcontain">
		<bread></bread>
		<el-tree
			ref="tree"
			:data="data"
			node-key="areaCode"
			:props="defaultProps"
			style="background: #ddd; width: 80%;"
			:default-expanded-keys="['370102004000']"
			:default-checked-keys="['370102004000']"
			show-checkbox
			@check-change="handleCheckChange"
		></el-tree>
		<el-row>
			<el-col :span="6"><el-input v-model="areaCode"></el-input></el-col>
		</el-row>

		<el-button @click="getCheckedNodes">通过 node 获取</el-button>
		<el-button @click="getCheckedKeys">通过 key 获取</el-button>
		<el-button @click="setCheckedNodes">通过 node 设置</el-button>
		<el-button @click="setCheckedKeys">通过 key 设置</el-button>
		<el-button @click="resetChecked">清空</el-button>
			
	</div>
</template>

<script>
import fetch from '@/util/fetch';

const getListByRecursion = data => fetch('/sys/area/getListByRecursion', data);

export default {
	data() {
		return {
			data: [],
			defaultProps: {
				children: 'childrenList',
				label: 'areaName'
			},

			areaCode: '',
			defaultCode: '370102000000'
		};
	},
	created: function() {
		this.getData();
	},
	methods: {
		getCheckedNodes() {
			console.log(this.$refs.tree.getCheckedNodes());
		},
		getCheckedKeys() {
			console.log(this.$refs.tree.getCheckedKeys());
		},
		setCheckedNodes() {
			this.$refs.tree.setCheckedNodes([
				{
					areaCode: '370102004009',
					areaName: '芙蓉街社区居委会',
					parentCode: '370102004000',
				},
				{
					areaCode: '370102004008',
					areaName: '鞭指巷社区居委会',
					parentCode: '370102004000',
				}
			]);
		},
		setCheckedKeys() {
			this.$refs.tree.setCheckedKeys(['370102001002']);
		},
		resetChecked() {
			this.$refs.tree.setCheckedKeys([]);
		},

		handleCheckChange(data, checked, indeterminate) {
			console.log(data, checked, indeterminate);
		},

		async getData() {
			let retObj = await getListByRecursion({
				areaCode: this.defaultCode
			});

			if (!retObj || retObj.status != 1) {
				this.$message.error('网络错误，请稍候重试');
				return;
			}

			this.data = retObj.data;
		}
	}
};
</script>

<style lang="less">
@import '../../assets/css/mixin';
</style>
