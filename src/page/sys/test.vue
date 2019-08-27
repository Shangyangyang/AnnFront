<template>
    <div>
		<el-row>
			<el-col :span="4">
				<el-input v-model="form.name" auto-complete="off" placeholder=""></el-input>
			</el-col>
			<el-col :span="4">
				<el-button type="primary" icon="el-icon-search" @click="test">查询</el-button>
				<el-button type="primary" icon="el-icon-search" @click="test2">获取当前用户</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="8">
				<div v-for="(msg, index) in msgList" :key="index">{{msg}}</div>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="8">
				<div v-for="(user, index) in userList" :key="index">{{user}}</div>
			</el-col>
		</el-row>
    </div>
</template>

<script>
	import fetch from '@/util/fetch';
	
	const getShotUUID = data => fetch('/sys/util/getShotUUID', data);	// 获取短UUID
	const getFuseridList = data => fetch('/sys/websocket/getFuseridList', data);	// 获取用户列表
	
	export default {
		data() {
			return {
				websock: null,
				
				uuid: '',
				
				form: {
					name: '测试'
				},
				msgList: [],
				userList: [],
			};
		},
		created() {
			//页面刚进入时开启长连接
			// this.getShotUUID2();
		},
		destroyed: function() {
			//页面销毁时关闭长连接
			this.websocketclose();
		},
		methods: {
			async getShotUUID2(){
				let retObj = await getShotUUID();
				
				if(!retObj){
					this.$message.error("返回对象为空");
					return;
				}
				if(retObj.status != 1){
					this.$message.error("获取失败");
					return;
				}
				
				this.uuid = retObj.data;
				
				this.initWebSocket();
			},
			async test2() {
				let retObj = await getFuseridList();
				
				if(!retObj){
					this.$message.error("返回对象为空");
					return;
				}
				if(retObj.status != 1){
					this.$message.error("获取失败");
					return;
				}
				
				this.userList = [];
				
				retObj.data.forEach(item => this.userList.push(item));
			},
			test() {
				this.websocketsend(this.form.name);
			},
			initWebSocket() {

				//初始化weosocket
				const wsuri = 'ws://localhost:8080/websocket/' + this.uuid; //ws地址
				this.websock = new WebSocket(wsuri);

				this.websock.onopen = this.websocketonopen;

				this.websock.onerror = this.websocketonerror;

				this.websock.onmessage = this.websocketonmessage;
				this.websock.onclose = this.websocketclose;
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
				console.log('e.data:');
				console.log(e);
				console.log(e.data);

				this.msgList.push(e.data);
				//注意：长连接我们是后台直接1秒推送一条数据，
				
				//但是点击某个列表时，会发送给后台一个标识，后台根据此标识返回相对应的数据，
				//这个时候数据就只能从一个出口出，所以让后台加了一个键，例如键为1时，是每隔1秒推送的数据，为2时是发送标识后再推送的数据，以作区分
			},

			websocketsend(agentData) {
				//数据发送
				this.websock.send(agentData);
			},

			websocketclose(e) {
				console.log('connection closed (' + e + ')');
				// 以下为原代码，报错。
				// console.log('connection closed (' + e.code + ')');
			}
		}
	};
</script>
