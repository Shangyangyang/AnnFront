<template>
	<li>
		<img :class="{'thisImg' : true, 'gray' : grayFlag}" :src="imgSrc2" :title="title" @click="dataClick(imgSrc.id)"/>
		<span>{{title}}</span><br/>
		
	</li>
</template>

<script>
	import { baseUrl } from '@/config/env';
	
	export default {
		props:['imgSrc', 'deleteFlag'],

		data(){
			return{
				id:'',
			}
		},
		computed: {
			imgSrc2:function () {
				let s = baseUrl + '/' + this.imgSrc.src;
				return s;
			},
			title:function () {
				let s = this.imgSrc.src + "--" + this.imgSrc.size  + "--" + this.imgSrc.shotDate;
				return s;
			},
			grayFlag: function(){
				return this.deleteFlag;
			}
		},
		methods: {
			dataClick(id){
				this.deleteFlag = true;
				this.$emit('update:imgId', id);
				this.$emit('onClick');
			}
		},
	}
</script>

<style>
	.thisImg{
		width: 180px;
		padding: 10px;
		border: 1px solid #aaa;
	}
	.gray { 
    -webkit-filter: grayscale(100%); -moz-filter: grayscale(100%); -ms-filter: grayscale(100%); -o-filter: grayscale(100%); filter:
grayscale(100%); filter: gray; }

</style>
