<template>
	<div class="heatMapDom"><div :class="className" :id="id" :style="{ height: height, width: width }" /></div>
</template>
<script>
import echarts from 'echarts/lib/echarts';
require('echarts/extension/bmap/bmap');
import option from './option2';

export default {
	props: {
		className: {
			type: String,
			default: 'heatMapCss'
		},
		id: {
			type: String,
			default: 'heatMap'
		},
		width: {
			type: String,
			default: '100%'
		},
		height: {
			type: String,
			default: '600px'
		}
	},
	data() {
		return {
			chart: null
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.chart = echarts.init(document.getElementById(this.id));
			console.log(option, '==数据');
			this.chart.setOption(option);
		}
	}
};
</script>
<style>
.heatMapDom {
	width: 100%;
	height: 600px;
	margin: 20px auto;
}
.BMap_noprint,
.anchorBL {
	display: none;
}
</style>
