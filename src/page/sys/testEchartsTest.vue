<template>
	<div :class="className" :id="id" :style="{ height: height, width: width }"></div>
</template>

<script>
import echarts from 'echarts';

export default {
	props: {
		className: {
			type: String,
			default: 'chart'
		},
		id: {
			type: String,
			default: 'rkkdjChart'
		},
		width: {
			type: String,
			default: '100%'
		},
		height: {
			type: String,
			default: '100%'
		}
	},
	data() {
		return {
			chart: null,
			points: [
				{
					coord: [37.35402222222223, 116.23322222222222],
					elevation: 21
				},
				{
					coord: [37.35380555555556, 116.23300833333333],
					elevation: 31
				},
				{
					coord: [37.35308888888889, 116.23116944444445],
					elevation: 41
				},
				{
					coord: [37.35078333333333, 116.23091111111111],
					elevation: 41
				},
				{
					coord: [37.35036388888889, 116.2309638888889],
					elevation: 41
				}
			],
		};
	},
	mounted() {
		this.getData();
	},
	beforeDestroy() {
		if (!this.chart) {
			return;
		}
		this.chart.dispose();
		this.chart = null;
	},
	methods: {
		getData() {
			this.initChart();
			this.chart = null;
		},
		initChart() {
			this.chart = echarts.init(document.getElementById(this.id));
			this.chart.setOption({
				animation: false,
				bmap: {
					center: [120.13066322374, 30.240018034923],
					zoom: 14,
					roam: true
				},
				visualMap: {
					show: false,
					top: 'top',
					min: 0,
					max: 5,
					seriesIndex: 0,
					calculable: true,
					inRange: {
						color: ['blue', 'blue', 'green', 'yellow', 'red']
					}
				},
				series: [
					{
						type: 'heatmap',
						coordinateSystem: 'bmap',
						data: this.points,
						pointSize: 5,
						blurSize: 6
					}
				]
			});
		}
	}
};
</script>
