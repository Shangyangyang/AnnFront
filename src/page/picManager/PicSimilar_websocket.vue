<template>
	<div>
		<div>
			<img style="width: 500px;" :src="item" v-for="(item, index) in imgList" :key="index" />
		</div>
		<a href="javascript:void(0)" @click="backTo">返回</a>&emsp;&emsp;
		<a href="javascript:void(0)" @click="test">加载</a>
	</div>
</template>

<script>
	import fetch from '@/util/fetch';

	import {
		baseUrl
	} from '@/config/env';

	const getTest = data => fetch('/timeline/importPic/getTest', data); // 获取用户列表

	export default {
		data() {
			return {
				websock: null,

				form: {
					name: '测试'
				},

				imgList: [],
			};
		},
		computed: {
			pData: function() {
				return this.$route.params.item;
			}
		},
		watch: {
			pData() {
				this.init();
			}
		},
		created() {
			this.init()
		},
		destroyed: function() {
			//页面销毁时关闭长连接
			this.websocketclose();
		},
		methods: {
			init() {
				if (this.pData && this.pData.src) {
					this.imgList.push(baseUrl + '/' + this.pData.src)
					this.initWebSocket();
				}
			},
			initWebSocket() {

				//初始化weosocket
				const wsuri = 'ws://localhost:8080/picSimilar/' + this.$store.getters.getUserName; //ws地址
				this.websock = new WebSocket(wsuri);

				this.websock.onopen = this.websocketonopen;

				this.websock.onerror = this.websocketonerror;

				this.websock.onmessage = this.websocketonmessage;
				this.websock.onclose = this.websocketclose;
				let _that = this;
				setTimeout(function(){
					_that.websocketsend(JSON.stringify(_that.pData.shortId))
				}, 1000)
			},

			websocketonopen() {
				console.log('WebSocket连接成功');
			},
			websocketonerror(e) {
				//错误
				console.log('WebSocket连接发生错误');
			},
			websocketonmessage(e) {
				//数据接收
				// console.log('e.data:');
				// console.log(e);
				// console.log(e.data);
				
				
				if(e.data){
					JSON.parse(e.data).forEach(item => {
						console.log(item)
						this.imgList.push(baseUrl + '/' + item.srcThumbnail);
						console.log(baseUrl + '/' + item.srcThumbnail)
					})
				}
				
				//注意：长连接我们是后台直接1秒推送一条数据，

				//但是点击某个列表时，会发送给后台一个标识，后台根据此标识返回相对应的数据，
				//这个时候数据就只能从一个出口出，所以让后台加了一个键，例如键为1时，是每隔1秒推送的数据，为2时是发送标识后再推送的数据，以作区分
			},

			websocketsend(agentData) {
				if (this.websock.readyState === 1) {
					this.websock.send(agentData);
				}
			},

			async test() {
				let retObj = await getTest({
					id: '6b7f64ebaf904c9d9b3d9d912004b413'
				})
				
				console.log(retObj.data);
				/* this.websocketsend('picSimilar');*/
			}, 
			websocketclose(e) {
				console.log('connection closed (' + e + ')');
				// 以下为原代码，报错。
				// console.log('connection closed (' + e.code + ')');
			},
			backTo() {
				this.imgList = []
				this.$router.go(-1);
			}
		}
	};
</script>
