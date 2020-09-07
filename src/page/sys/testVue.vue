<template>
	<div>
		<button @click="miniFlag = !miniFlag">切换</button>
		<aplayer
			:mini="miniFlag"
			autoplay
			:float="true"
			:music="list[0]"
			:list="list"
		/>
		
	</div>
</template>

<script>
	import fetch from '@/util/fetch';
	import { baseUrl } from '@/config/env';
	
	const getShotUUID = data => fetch('/sys/util/getShotUUID', data); // 获取短UUID
export default {
	data() {
		return {
			list: [
				{
					title: '布拉格广场',
					artist: '蔡依林',
					pic: 'http://localhost:8001/test/1.jpg',
					src: 'http://localhost:8001/test/蔡依林 - 布拉格广场.flac',
				},
				{
					title: '闹鬼的房间',
					artist: '爱给音乐',
					pic: 'http://localhost:8001/test/1.jpg',
					src: 'http://localhost:8001/test/闹鬼的房间.mp3',
				}
			],
			test: {
				title: '测试',
				artist: '老八',
				pic: 'http://localhost:8001/test/1.jpg',
				src: 'http://localhost:8001/test/蔡依林 - 布拉格广场.flac',
				
			},
			
			miniFlag: false
		};
	},
	created() {
		this.init()
	},
	methods: {
		init(){
			this.fetchData()
		},
		async fetchData(){
			
		}
	}
};
</script>

<style></style>
