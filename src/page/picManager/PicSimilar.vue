<template>
	<div>
		<bread-head></bread-head>
		<div class="pageTitle">
			<div class="pageLeftRight tabx">
				<table class="annTable">
					<tr>
						<td colspan="4" style="padding: 5px;" v-if="list.length == 0">没有相似的图片</td>
						<td colspan="4" style="padding: 5px;" v-if="list.length > 0">相似图片共有 {{list.length}} 张。</td>
					</tr>
					<tr style="background-color: #ddd;">
						<td style="padding: 7px;">序号</td>
						<td style="padding: 7px;">主图</td>
						<td style="padding: 7px;">相似图</td>
						<td style="padding: 7px;">操作</td>
					</tr>
					<tr v-for="(item, index) in list" :key="index" v-if="list.length > 0">
						<td>{{ index + 1 }}</td>
						<td>
							<img :src="formC.pathSrcThumbnail" />
						</td>
						<td>
							<img :src="item.pathSrcThumbnail" />
						</td>
						<td>
							<a class="aBtn" href="javascript:;" @click.stop="showNativePic(item.pathSrc)">原图</a>
						</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>
<script>
import fetch from '@/util/fetch';
import utils from '@/util/utils';

import { baseUrl } from '@/config/env';

const list = data => fetch('/timeline/findSimilarImgList', data);
const time = require('time-formater');

export default {
	data() {
		return {
			list: [],
				
			form: {
				id: '',
				shortId: '',
				similarType: 1,
			},
		
			visible: false,
			
		};
	},
	computed: {
		formC() {
			return this.$route.params.item
		}
	},
	watch: {
		formC(newValue, oldValue) {
			this.init()
		}
	},
	created: function() {
		this.init()
	},
	methods: {
		init(){
			if(this.formC) {
				this.form.id = this.formC.id
				this.form.shortId = this.formC.shortId
				this.fetchData();
			}
		},
		showNativePic(src){
			window.open(src);
		},
		searchBtn() {
			this.fetchData();
		},
		async fetchData() {
			this.form.page = this.currentPage;
			this.form.size = -1;
			this.form.similarType = 1
			
			let retObj = await list(this.form);
			
			console.log(retObj.data);
			
			if (utils.checkResult(retObj, this)) {
				this.list = [];
				
				retObj.data.forEach(item => {
					item.pathSrcThumbnail = baseUrl + '/' + item.srcThumbnail;
					this.list.push(item)
				})
			}
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

	.aBtn {
		margin-right: 10px;
	}
</style>
