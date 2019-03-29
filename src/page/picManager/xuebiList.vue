<template>
	<div>
		<bread-head></bread-head>
		<div>
			<div style="margin-top: 15px; margin-left: 17px; margin-bottom: 20px;">
				<el-button plain type="primary">新增</el-button>
			</div>
			<div class="pageLeftRight tabx">
				<table class="annTable">
					<tr style="background-color: #ddd;">
						<td style="padding: 7px;">序号</td>
						<td style="padding: 7px;">缩略图</td>
						<td style="padding: 7px;">标签</td>
						<td style="padding: 7px;">评分</td>
						<td style="padding: 7px;">拍摄日期</td>
					</tr>
					<tr v-for="(item, index) in list" :key="index">
						<td>{{ index + 1 }}</td>
						<td><img :src="item.pathSrc" height="90px" @click="$imageViewer" /></td>
						<td>{{ item.label }}</td>
						<td>
							<el-rate
								v-model="item.score / 2"
								disabled
								show-score
								text-color="#999999"
							></el-rate>
						</td>
						<td>{{ item.pic.shotDate }}</td>
					</tr>
				</table>
			</div>
			<div class="Pagination" style="text-align: right;">
				<el-pagination
					background
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="currentPage"
					:page-size="pageSize"
					:total="dataCount"
					:page-sizes="[5, 10, 20]"
					layout="total, sizes, prev, pager, next"
				></el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
import fetch from '@/util/fetch';
import utils from '@/util/utils';

import { baseUrl } from '@/config/env';

const list = data => fetch('/timeline/list', data);
const time = require('time-formater');

export default {
	data() {
		return {
			list: [],

			form: {},

			currentPage: 1,
			pageSize: 5,
			dataCount: 0
		};
	},
	created: function() {
		
		console.log(this.$route.meta);
		
		this.resetForm = JSON.stringify(this.form);
		this.fetchData();
	},
	methods: {
		async fetchData() {
			this.form.page = this.currentPage;
			this.form.size = this.pageSize;

			let retObj = await list(this.form);
			if (utils.checkResult(retObj, this)) {
				this.list = [];

				retObj.data.list.forEach(item => {
					item.pathSrc = baseUrl + '/' + item.pic.src;
					this.list.push(item);
				});

				this.dataCount = retObj.data.total;
			}
		},
		handleSizeChange(val) {
			this.fetchData();
		},
		handleCurrentChange(val) {
			this.currentPage = val;
			this.fetchData();
		}
	}
};
</script>
