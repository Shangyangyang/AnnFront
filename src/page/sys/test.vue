<template>
	<div style="margin: 15px;">
		<span slot="label"
				v-for="(label, index) in list" :key="index">
			<el-badge :value="label.val" class="item" style="margin-top: 20px; margin-left: 15px; border: 1px solid #aaa;">{{label.name}}&emsp;</el-badge>
			<br v-if="index % 5 == 0"/>
		</span>
	</div>
</template>
<script>
	import fetch from '@/util/fetch';

	const getData = data => fetch('/timeline/getAllLabel', data);

	export default {
		data() {
			return {
				title: 'test',
				list:[],
			}
		},
		created: function() {
			this.getData2();
		},
		methods: {
			async getData2() {
				let retObj = await getData();
				let map = retObj.data;
				this.list = [];
				for (var key in map) {
					let l = {
						name: key, 
						val: map[key],
					};
					this.list.push(l);
				}
			}
		},
	}
</script>
