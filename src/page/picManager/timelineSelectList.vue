<template>
	<div>
		<bread-head></bread-head>
		<div class="pageTitle">
			<div class="pageTitleSub">
				<el-form :model="form" labelWidth="100px">
					<el-row :gutter="5">
						<el-col :span="8">
							<el-form-item label="标签">
								<el-select v-model="form.labelId" filterable placeholder="请选择">
									<el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<data-dict dictType="yes_no" :dictValue.sync="form.similarIsNotEmpty" dictHolder="是否有相似图"></data-dict>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<div class="pageBtn">
				<el-button type="primary" icon="el-icon-search" @click="searchBtn">查询</el-button>
				<el-button icon="el-icon-refresh" @click="resetForm('form')">重置</el-button>
				<el-button plain type="primary" @click="startShaixuan">开始筛选</el-button>
				<el-button plain type="primary" @click="openSimilar">相似图片列表</el-button>
			</div>
			<div class="pageLeftRight tabx">
				<table class="annTable">
					<tr style="background-color: #ddd;">
						<td style="padding: 7px;">序号</td>
						<td style="padding: 7px;">缩略图</td>
						<td style="padding: 7px;">拍摄日期</td>
						<td style="padding: 7px;">操作</td>
					</tr>
					<tr v-for="(item, index) in list" :key="index">
						<td>{{ index + 1 }}</td>
						<td>
							<div style="width: 100px; height: 100px;">
								<div class="divContent"><vue-preview :slides="item.picList"></vue-preview></div>
							</div>
						</td>
						<td>{{ item.shotDate }}</td>
						<td>
							<a class="aBtn" href="javascript:;" @click.stop="showNativePic(item.pathSrc)">原图</a>
							<a class="aBtn" href="javascript:;" @click.stop="showSimilarity(item)">相似照片</a>
							<a class="aBtn" href="javascript:;" @click.stop="showSimilarity(item.id)">同一天拍摄的</a>
						</td>
					</tr>
				</table>

				<div class="Pagination">
					<el-pagination
						background
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page="currentPage"
						:page-size="pageSize"
						:total="dataCount"
						:page-sizes="[5, 10, 20]"
						layout="total, sizes, prev, pager, next, jumper"
					></el-pagination>
				</div>
			</div>
		</div>
		<el-dialog title="相似照片" :visible.sync="visible" width="60%">
			<!-- <el-image v-for="url in similarList" :key="url" :src="url" lazy></el-image> -->
			<div v-for="url in similarList" :key="url">
				<a :href="url">{{ url }}</a>
				<br />
			</div>
		</el-dialog>
	</div>
</template>
<script>
import fetch from '@/util/fetch';
import utils from '@/util/utils';

import { baseUrl } from '@/config/env';

const list = data => fetch('/timeline/importPic/list', data);
const getSimilarImgList = data => fetch('/timeline/importPic/getSimilarImgList', data);
const labelList = data => fetch('/timeline/label/list2', data);
const time = require('time-formater');

export default {
	data() {
		return {
			list: [],
			options: [],
			similarList: [],

			form: {
				labelId: ''
			},

			visible: false,

			currentPage: 1,
			pageSize: 5,
			dataCount: 0
		};
	},
	created: function() {
		this.resetForm = JSON.stringify(this.form);
		this.fetchData();
		this.fetchLabelData();
	},
	methods: {
		showNativePic(src) {
			window.open(src);
		},
		async showSimilarity(item) {
			// 跳转到similar页面
			this.$router.push({
				name: 'PicSimilar',
				params: {
					item: item
				}
			});

			/* 
			
			let retObj = await getSimilarImgList({
				id: id,
			});
			
			if(!retObj || retObj.status != 1){
				this.$message.error('获取数失败')
			}
			this.similarList = []
			retObj.data.forEach(item => {
				this.similarList.push(baseUrl + '\\' + item.src)
			})
			
			this.visible = true; 
			
			*/
		},
		searchBtn() {
			this.currentPage = 1;
			this.fetchData();
		},
		async fetchLabelData() {
			let retObj = await labelList();

			this.options = [];
			this.options.push(...retObj.data);
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
					var img_url = baseUrl + '/' + item.src + '?' + Date.parse(new Date());

					// 创建对象
					var img = new Image();

					// 改变图片的src
					img.src = img_url;

					// 加载完成执行
					img.onload = function() {
						// 打印
						let w = img.width;
						let h = img.height;

						if (w > h) {
							mw = 700;
							let per = 700 / w;
							mh = h * per;
						}
						if (h > w) {
							mh = 700;
							let per = 700 / h;
							mw = w * per;
						}
						let vueP = {
							src: baseUrl + '/' + item.src,
							msrc: baseUrl + '/' + item.srcThumbnail,
							title: item.shotDate,
							w: mw,
							h: mh
						};

						picList.push(vueP);
					};

					item.pathSrcThumbnail = baseUrl + '/' + item.srcThumbnail;
					item.pathSrc = baseUrl + '/' + item.src;

					item.picList = picList;

					this.list.push(item);
				});

				this.dataCount = retObj.data.total;
			}
		},
		handleSizeChange(val) {
			this.pageSize = val;
			this.fetchData();
		},
		handleCurrentChange(val) {
			this.currentPage = val;
			this.fetchData();
		},
		startShaixuan() {
			this.$router.push('importXuebi');
		},
		openSimilar() {
			this.$router.push('PicSimilar');
		}
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

.aBtn {
	margin-right: 10px;
}
</style>
