<template>
	<div>
		<li style="padding: 10px;">{{timeline.timeName}}</li>
		<div style="margin:10px">
			<div class='div-inline' v-for="(item, index) in timeline.picList" :key="index">
				<div class="divContent">
					<img :src="item.pathSrc" :title="item.shotDate"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import fetch from '@/util/fetch';
import { baseUrl } from '@/config/env';

const findListByTimeType = data => fetch('/timeline/findListByTimeType', data); // 获取列表

export default {
	props:['timeline'],
	data() {
		return {
			
		};
	},
	created: function(){
		this.init();
	},
	computed: {
		timeline2() {
			return this.timeline;
		}
	},
	watch: {
		timeline(newValue, oldValue) {
			this.init();
		}
	},
	methods: {
		init(){
			if(this.timeline){
				console.log(this.timeline.timeType);
				if(this.timeline.timeType == '1'){
					this.timeline.timeName = `${this.timeline.year}年`;
				} else if(this.timeline.timeType == '2'){
					let arr = this.timeline.month.split('-');
					this.timeline.timeName = `${arr[0]}年 ${arr[1]}月`;
				} else {
					this.timeline.timeName = '空';
				}
				this.timeline.picList.forEach(item => {
					item.pathSrc = baseUrl + '/' + item.srcThumbnail;
				});
			}
		},
	},
};
</script>

<style>
.div-inline {
	display:block;
	float:left;
	width: 50px;
	height: 50px;
	border: rgb(192,192,192) 1px solid;
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
