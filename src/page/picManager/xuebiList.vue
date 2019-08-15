<template>
	<div>
		<bread-head></bread-head>
		<div>
			<div style="margin-top: 15px; margin-left: 17px; margin-bottom: 20px;">
				<el-button plain type="primary" @click="startShaixuan">开始筛选</el-button>
			</div>
			<div class="pageLeftRight tabx">
				<table class="annTable">
					<tr style="background-color: #ddd;">
						<td style="padding: 7px;">序号</td>
						<td style="padding: 7px;">缩略图</td>
						<td style="padding: 7px;">标签</td>
						<td style="padding: 7px;">评分</td>
						<td style="padding: 7px;">拍摄日期</td>
						<td style="padding: 7px;">操作</td>
					</tr>
					<tr v-for="(item, index) in list" :key="index">
						<td>{{ index + 1 }}</td>
						<td>
							<div style="width: 100px; height: 100px;">
								<div class="divContent">
									<vue-preview :slides="item.picList"></vue-preview>
								</div>
							</div>
						</td>
						<td>{{ item.label }}</td>
						<td><el-rate v-model="item.score / 2" disabled show-score text-color="#999999"></el-rate></td>
						<td>{{ item.pic.shotDate }}</td>
						<td><a href="javascript:;" @click.stop="showNativePic(item.pathSrc)">查看原图</a></td>
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
		showNativePic(src){
			window.open(src);
		},
		async fetchData() {
			this.form.page = this.currentPage;
			this.form.size = this.pageSize;

			let retObj = await list(this.form);
			if (utils.checkResult(retObj, this)) {
				this.list = [];

				retObj.data.list.forEach(item => {
					let picList = [];
					
					let mw = 0;
					let mh = 0;
					
					// 图片地址 后面加时间戳是为了避免缓存
					var img_url = baseUrl + '/' + item.pic.src + '?' + Date.parse(new Date());
					  
					// 创建对象
					var img = new Image();
					  
					// 改变图片的src
					img.src = img_url;
					  
					// 加载完成执行
					img.onload = function(){
						// 打印
						let w = img.width;
						let h = img.height;
						
						if(w > h){
							mw = 700;
							let per = 700 / w;
							mh = h * per;
						}
						if(h > w){
							mh = 700;
							let per = 700 / h;
							mw = w * per;
						}
						
						let vueP = {
							src: baseUrl + '/' + item.pic.src,
							msrc: baseUrl + '/' + item.pic.srcThumbnail,
							title: item.pic.shotDate,
							w: mw,
							h: mh,
						}
						
						picList.push(vueP);
					};
					
					
					item.pathSrcThumbnail = baseUrl + '/' + item.pic.srcThumbnail;
					item.pathSrc = baseUrl + '/' + item.pic.src;
					
					item.picList = picList;
					
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
		},
		startShaixuan(){
			this.$router.push('importXuebi');
		},
	}
};
</script>
<style type="text/css">
.divContent {
	width: 100px;
	height: 100px;
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
