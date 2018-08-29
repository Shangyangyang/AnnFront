<template>  
	<div>
		<button @click = "get">get请求</button>
		<p>{{message}}</p>
	</div>
</template>  
<script>  
	import { baseUrl } from '@/config/env';
	
  export default {  
    data(){
			return {
				message:""
			}
    },
    mounted:function(){
    	this.$http.interceptors.push(function(request,next){
    		console.log("正在请求");
    		next(function(response){
    			console.log(response.data);
    			console.log("响应完成")
    		})
    	})
    },
    methods:{
    	get: function(){
				console.log(baseUrl);
    		this.$http.get(baseUrl + "\\" + "雪碧/微信图片_20170804090121.jpg",{
    			params:{
    			},
    			headers:{
    			}
    		}).then(function(res){
    			this.message = res.data;
    		},function(err){
    			this.message = err;
    		});
				console.log(this.message);
    	}
    }
  }  
</script> 