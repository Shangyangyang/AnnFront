<template>
	<div>
		<my-progress :showFlag="progressShowFlag" :msgType="'jindutiao'" @updateShowFlag="updateShowFlag2"></my-progress>
		<el-button type="primary" @click="test2()">开始</el-button>
	</div>
</template>

<script>
import fetch from '@/util/fetch';
const list = data => fetch('/sys/websocket-test/imitate', data);
export default {
	data() {
		return {
			progressShowFlag: false
		};
	},
	created() {},
	methods: {
		updateShowFlag2() {
			this.progressShowFlag = false
			this.$message.success('加载成功')
		},
		async test2() {
			this.progressShowFlag = true;
			let retObj = await list({
				uuid: this.$store.getters.getUserName
			});
		}
	}
};
</script>

<style></style>
