<template>
	<div>
		<bread-head></bread-head>
		<div class="pageTitle">
			<div class="pageLeftRight tabx">
				<table class="annTable">
					<tr style="background-color: #ddd;">
						<td style="padding: 7px;">序号</td>
						<td style="padding: 7px;">主图</td>
						<td style="padding: 7px;">相似图</td>
						<td style="padding: 7px;">操作</td>
					</tr>
					<tr v-for="(item, index) in list" :key="index">
						<td>{{ index + 1 }}</td>
						<td>
							<img :src="item.pathSrcThumbnail" />
						</td>
						<td>
							<img :src="item2.pathSrcThumbnail" v-for="(item2, index2) in item.otherList" :key="index2"/>
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

const list = data => fetch('/timeline/similar/list', data);
const time = require('time-formater');

export default {
	data() {
		return {
			list: [],
				
			form: {},
		
			visible: false,
			
		};
	},
	created: function() {
		this.fetchData();
	},
	methods: {
		showNativePic(src){
			window.open(src);
		},
		searchBtn() {
			this.fetchData();
		},
		async fetchData() {
			this.form.page = this.currentPage;
			this.form.size = -1;

			let retObj = await list(this.form);
			if (utils.checkResult(retObj, this)) {
				this.list = [];
				
				retObj.data.list.forEach(item => {
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
