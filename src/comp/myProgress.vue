<template>
	<el-progress v-show="showFlag" :text-inside="true" :stroke-width="16" :percentage="num"></el-progress>
</template>

<script>
import fetch from '@/util/fetch';

export default {
	props: ['showFlag', 'msgType'],
	data() {
		return {
			num: 0,
			userName: this.$store.getters.getUserName,
			userId: this.$store.getters.getUserId,
			
		};
	},
	created() {
		this.$websocket.dispatch('WEBSOCKET_INIT', 'ws://localhost:8001/websocket/' + this.userName);
	},
	computed: {
		alertCont() {
			return this.$websocket.getters.onEvent(this.msgType);
		},
	},
	watch: {
		alertCont: function(a, b) {
			if (a !== b && a) {
				this.num = a.data;
				if (this.num >= 100) {
					this.$emit('updateShowFlag')
				}
			}
		},
	},
	methods: {}
};
</script>
