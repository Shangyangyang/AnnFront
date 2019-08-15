<template>
	<div class="fillcontain content-container-top" style="overflow: auto;">
		<bread></bread>
		<back-top></back-top>
		<el-scrollbar style="height: 100%;">
			<div v-for="(item, index) in timeList" :key="index">
				<timeline :timeline="item"></timeline>
				<div class="div-inline" v-if="item.picList.length >= 3" @click="skepTo(item)" style="color: #999; font-size: 4px;">共{{ item.count }}张，点击查看更多</div>
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
			</div>
		</el-scrollbar>
	</div>
</template>

<script>
import fetch from '@/util/fetch';

const findListByTimeType = data => fetch('/timeline/findListByTimeType', data); // 获取列表

export default {
	data() {
		return {
			timeList: [],
			timeList_y: [],
			timeList_m: [],

			form: {
				timeType: '1',	// 以年查询
				type: '1',	// 雪碧
				shotDateL: ''
			},
		};
	},
	created: function() {
		this.init();
	},
	methods: {
		init() {
			this.fetchList();
		},
		skepTo(timeline) {
			if (timeline.timeType == '1') {
				this.form.timeType = '2';
				this.form.shotDateL = timeline.year;
				this.timeList_y = JSON.parse(JSON.stringify(this.timeList));
			} else if (timeline.timeType == '1') {
				this.form.timeType = '3';
				this.form.shotDateL = timeline.month;
				this.timeList_m = JSON.parse(JSON.stringify(this.timeList));
			}

			this.fetchList();
		},
		async fetchList() {
			let retObj = await findListByTimeType(this.form);

			if (!retObj || retObj.status != 1) {
				this.$message.error('获取数据失败，' + retObj.message);
				return;
			}

			this.timeList = [];
			this.timeList.push(...retObj.data);
		}
	}
};
</script>
<style>
.div-inline {
	display: block;
	float: left;
	width: 50px;
	height: 50px;
	border: rgb(192, 192, 192) 1px solid;
	margin-right: 5px;
	margin-bottom: 10px;
}

.divContent {
	width: 50px;
	height: 50px;
	overflow: hidden;
}
.divContent img {
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
}
</style>
