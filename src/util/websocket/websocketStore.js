import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		websock: null,
		eventlist: []
	},
	getters: {
		onEvent(state) {
			return function(name) {
				if (state.eventlist.length > 0) return state.eventlist.find(item => item.name == name)
				return null;
			}
		}
	},
	mutations: {
		WEBSOCKET_INIT(state, url) {
			state.websock = new WebSocket(url);
			state.websock.onopen = function() {
				console.log("连接成功！");
			}
			state.websock.onmessage = function(callBack) {
				console.log("ws接收！");
				console.log(callBack.data);
				if (callBack.data.length <= 0 ||
					callBack.data == '连接成功！' ||
					callBack.data == '测试bigData'
				) {
					console.log("ws未包含数据！");
					return;
				}

				if (callBack.data == 'heart beat') {
					console.log("收到服务器心跳包！")
					return;
				}

				let obj = JSON.parse(callBack.data)

				let index = getArrayIndex(state.eventlist, obj);

				if (index > -1) {
					state.eventlist.splice(index, 1, {
						name: obj.name,
						data: obj.data
					})
				} else {
					state.eventlist.push({
						name: obj.name,
						data: obj.data
					})
				}

			}
			state.websock.οnerrοr = function(e) { //错误
				console.log("ws错误!");
				console.log(e);
			}
			state.websock.onclose = function(e) { //关闭
				console.log("ws关闭！");
				console.log(e);
			}
			state.websock.binaryType = "arraybuffer";
			//发送心跳包
			setInterval(function() {
				console.log("ws发送心跳！");
				state.websock.send('heart beat');
			}, 2 * 60 * 1000)
		},
		WEBSOCKET_SEND(state, p) {
			console.log("ws发送！");
			state.websock.send(p);
		}
	},
	actions: {
		WEBSOCKET_INIT({
			commit
		}, url) {
			commit('WEBSOCKET_INIT', url)
		},
		WEBSOCKET_SEND({
			commit
		}, p) {
			p.type = 3;
			commit('WEBSOCKET_SEND', p)
		}
	}
})

function getArrayIndex(arr, obj) {
	var i = arr.length;
	while (i--) {
		if (arr[i].name === obj.name) {
			return i;
		}
	}
	return -1;
}
