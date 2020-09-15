<template>
	<div style="text-align: center;">
		<div>
			<h1>图片库最近状态</h1>
			<br />
			<br />
			<label>总数：</label>
			{{ lastPic.lastTotal }}
			<br />
			<label>最近拍摄日期：</label>
			{{ lastPic.lastShotDate }}
			<br />
			<label>最近导入时间：</label>
			{{ lastPic.lastImportDate }}
			<br />
		</div>
		<br />
		<br />
		<div style="width: 50%;margin-left: 20%;">
			<el-tabs v-model="activeName" @tab-click="handleClick" style="min-width: 1000px;">
				<el-tab-pane label="新增照片" name="addPic">
					<span slot="label">
						<i class="el-icon-picture"></i>
						新增照片
					</span>
					<div style="text-align: center;">
						<a @click="addPicBegin" href="javascript:void(0);" v-show="!progressFlag" style="padding-left: 20px;">新增照片</a>
						<a @click="deletePicBegin" href="javascript:void(0);" v-show="!progressFlag" style="padding-left: 20px;">删除数据库中已不存在的照片</a>
					
						<div style="width: 50%;" v-show="progressFlag"><el-progress :text-inside="true" :stroke-width="18" :percentage="percentage"></el-progress></div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="排重" name="repeat">
					<span slot="label">
						<i class="el-icon-refresh"></i>
						排重
					</span>
					<div style="text-align: center;">
						<a @click="repeatMd5Begin" href="javascript:void(0);" style="padding-left: 20px;">Md5排重</a>
						<a @click="repeatFingerPrintBegin" href="javascript:void(0);" style="padding-left: 20px;">文件指纹排重</a>
						<br />
						<br />
						<div v-if="fingerPrintShowFlag"><a href="javascript:void(0);" @click="skipPic()" style="padding-left: 20px;">跳过该组照片</a></div>
						<br />
						<br />
						<br />
						<div v-show="imgDivFlag">
							<img-show :imgSrc.sync="item" :imgId.sync="imgId" v-for="(item, index) in imgs" :key="index" @onClick="deleteThisPic" :deleteFlag.sync="deleteFlag"></img-show>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="修改拍摄时间" name="shotTime">
					<span slot="label">
						<i class="el-icon-time"></i>
						修改拍摄时间
					</span>
					<div style="text-align: center;">
						<a @click="shotTimeStart" href="javascript:void(0);" style="padding-left: 20px;" v-if="shotTimeStartFlag">&nbsp;&nbsp;&nbsp;开始&nbsp;&nbsp;&nbsp;</a>
						<a @click="executeShotDateByBack" href="javascript:void(0);" style="padding-left: 20px;">[&nbsp;后台执行&nbsp;]</a>
						<br />
						<br />
						<div v-if="shotTimeBeginFlag">
							<img :src="pic.newSrc" style="height: 120px; padding: 10px; border: 1px solid #aaa;" />
							<br />
							<br />
							<span>{{ pic.src }}</span>
							&emsp;&emsp;
							<a href="javascript:void(0);" @click="guessTimeBySrc">猜日期</a>
							<br />
							<br />
							<span>{{ guessTime }}</span>
							&emsp;&emsp;
							<a href="javascript:void(0);" @click="deleteById(pic)">删除该图片</a>
							<br />
							<br />
							<el-date-picker v-model="guessShotDate" type="date" placeholder="选择日期" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
							<br />
							<br />
							<a href="javascript:void(0);" @click="saveShotDate">&emsp;[&nbsp;保&nbsp;&nbsp;存&nbsp;]&emsp;</a>
						</div>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>
<script>
import fetch from '@/util/fetch';
import { baseUrl } from '@/config/env';

const getLastStatus = data => fetch('/timeline/importPic/getLastStatus', data); // 获取图片库最新状态
const addPic = data => fetch('/timeline/importPic/addPic', data); // 启动新增照片
const cleanDatabase = data => fetch('/timeline/importPic/cleanDatabase', data); // 删除数据库不存在的照片
const getPercent = data => fetch('/timeline/importPic/getPercent', data); // 获取新增照片进度
const clearAddPercent = data => fetch('/timeline/importPic/clearAddPercent', data); // 清空后台进度值

const skipByTpList = data => fetch('/timeline/importPic/skipByTpList', data); // 跳过该组照片并获取新的

const getEqualMd5 = data => fetch('/timeline/importPic/getEqualMd5', data); // 获取MD5重复的图片List
const getEqualFingerPrint = data => fetch('/timeline/importPic/getEqualFingerPrint', data); // 获取文件指纹重复的图片List
const deletePic = data => fetch('/timeline/importPic/delete', data); // 删除图片包括物理路径

const getShotDateIsnull = data => fetch('/timeline/importPic/getShotDateIsnull', data); // 获取拍摄日期为空的图片记录
const executeShotDate = data => fetch('/timeline/importPic/executeShotDate', data); // 后台计算并填充拍摄日期为空的记录

const save = data => fetch('/timeline/importPic/save', data); // 保存图片，有ID为修改，没有ID为新增。
const genThumbnail = data => fetch('/timeline/importPic/genThumbnail', data); // 生成缩略图

const getShotUUID = data => fetch('/sys/util/getShotUUID', data); // 获取短UUID

export default {
	data() {
		return {
			/*数据定义区*/
			imgs: [], // 图片集合

			pic: {}, // 临时对象
			lastPic: {},

			activeName: 'addPic',
			percentage: 0,
			imgId: '', // 临时图片ID
			guessTime: '', // 猜时间存放属性
			guessShotDate: '', // 猜时间结果
			uuid: '',
			deleteFlag: '',

			loop: null, // 定时器
			websock: null,

			/*视图控制变量区*/
			addPicFlag: false,
			repeatFlag: false,
			shotTimeFlag: false,
			shotTimeBeginFlag: false,
			shotTimeStartFlag: true, // 拍摄时间修改的开始按钮控制。
			fingerPrintShowFlag: false, // 文件指纹控制区显示
			progressFlag: false, // 进度控制
			imgDivFlag: false, // 去重图片展示
			deleteMethodFlag: false // false为MD5，true为fingerPrint
		};
	},
	created: function() {
		this.getLastStatus();
	},
	methods: {
		handleClick(tab, event) {
			console.log(tab, event);
		},
		async genThumbnail() {
			let retObj = await genThumbnail();
		},
		async getLastStatus() {
			let retObj = await getLastStatus();
			if (retObj.status != 1) {
				this.$message({
					type: 'error',
					message: '获取数据失败'
				});
				return;
			}
			this.lastPic = retObj.data;
		},
		/*启动后端的图片添加任务*/
		async addPic() {
			let retObj = await addPic();

			if (retObj.status != 1) {
				this.$message({
					type: 'error',
					message: '获取数据失败'
				});
				return;
			}

			this.percentage = 100; // 进度条变成100%

			this.$message({
				type: 'success',
				message: retObj.data,
				duration: 0,
				showClose: true
			});
			// 关闭任务获取
			this.closeLoop();
		},
		/*启动删除数据库中不存在的照片*/
		async deletePic() {
			let retObj = await cleanDatabase();

			if (retObj.status != 1) {
				this.$message({
					type: 'error',
					message: '获取数据失败'
				});
				return;
			}

			this.percentage = 100; // 进度条变成100%

			this.$message({
				type: 'success',
				duration: 0,
				showClose: true,
				message: retObj.data
			});
			// 关闭任务获取
			this.closeLoop();
		},
		// 获取MD5重复的图片list
		async getMd5Pic() {
			let retObj = await getEqualMd5();
			if (retObj.status != 1) {
				if (retObj.code == '400') {
					this.$message({
						type: 'error',
						message: '已没有可排重的了。'
					});
					this.imgs = [];
					return;
				}
				this.$message({
					type: 'error',
					message: '获取数据失败'
				});
				return;
			}

			this.imgs = [];

			retObj.data.forEach(item => this.imgs.push(item));
		},
		// 获取文件指纹重复的图片
		async getFingerPrint() {
			let retObj = await getEqualFingerPrint();

			if (retObj.status != 1) {
				if (retObj.code == '400') {
					this.$message({
						type: 'error',
						message: '已没有可排重的了。'
					});
					this.imgs = [];
					return false;
				}
				this.$message({
					type: 'error',
					message: '获取数据失败'
				});
				return false;
			}

			this.imgs = [];

			retObj.data.forEach(item => this.imgs.push(item));
			return true;
		},
		async deleteByImg(op) {
			if (this.imgId == null || this.imgId == '' || this.imgId == undefined) return;
			let path = '';
			// 同时把物理路径传过去
			this.imgs.forEach(item => {
				if (item.id == this.imgId) {
					path = item.path + item.filename;
				}
			});

			let retObj = await deletePic({
				id: this.imgId,
				path: path
			});

			if (retObj.status != 1) {
				this.$message({
					type: 'error',
					message: '删除失败'
				});
				return;
			}

			if (this.deleteMethodFlag) {
				this.getFingerPrint();
			} else {
				this.getMd5Pic();
			}

			this.deleteFlag = false;
		},
		async deleteById(op) {
			if (op.id == null || op.id == '' || op.id == undefined) return;

			let retObj = await deletePic({
				id: op.id,
				path: op.path + op.filename
			});

			if (retObj.status != 1) {
				this.$message({
					type: 'error',
					message: '删除失败'
				});
				return;
			}

			this.shotTimeStart();
		},
		// 跳过该组照片
		async skipPic() {
			let arr = '';

			let str = '';
			this.imgs.forEach((item, index) => {
				str = '';
				str = str + item.id + ',' + item.shortId + ',' + item.similarId;
				arr = arr + str + ';';
			});

			let retObj = await skipByTpList({
				tpList: arr
			});

			if (retObj.status != 1) {
				if (retObj.code == '400') {
					this.$message({
						type: 'error',
						message: '已没有可排重的了。'
					});
					this.imgs = [];
					return;
				}
				this.$message({
					type: 'error',
					message: '获取数据失败'
				});
				return;
			}

			this.imgs = [];

			retObj.data.forEach(item => this.imgs.push(item));
		},
		// 开始拍摄时间修改，调取拍摄时间为空的图片数据
		async shotTimeStart() {
			let retObj = await getShotDateIsnull();

			if (retObj.status != 1) {
				if (retObj.code == '400') {
					this.$message({
						type: 'error',
						message: '已没有可修改拍摄时间的了。'
					});
					this.pic = {};
					return;
				}
				this.$message({
					type: 'error',
					message: '获取数据失败'
				});
				return;
			}

			this.pic = {};
			this.pic = retObj.data;
			this.pic.newSrc = baseUrl + '/' + this.pic.src;

			// 先试着解析一下文件名获取拍摄时间
			this.guessTimeBySrc();

			this.shotTimeBeginFlag = true;
			this.shotTimeStartFlag = false;
		},

		// 保存拍摄时间，并调取下一组
		async saveShotDate() {
			if (this.guessShotDate == null || this.guessShotDate == undefined || this.guessShotDate == '') {
				this.$message({
					type: 'error',
					message: '拍摄时间不能为空'
				});
				return;
			}

			let retObj = await save({
				id: this.pic.id,
				shotDate: this.guessShotDate
			});

			if (retObj.status != 1) {
				this.$message({
					type: 'error',
					message: '修改失败'
				});
			}

			this.guessShotDate = '';
			this.guessTime = '';
			this.shotTimeStart();
		},
		async executeShotDateByBack() {
			let retObj = await executeShotDate();

			if (retObj.status != 1) {
				this.$message({
					type: 'error',
					message: '执行失败'
				});
			}

			this.$message({
				type: 'success',
				message: retObj.data
			});
		},

		// 拍摄日期那里用的删除图片
		deleteByPic(op) {
			this.deleteById(op);
			this.shotTimeStart();
		},

		// 根据ID删除图片
		deleteThisPic(op) {
			this.$confirm('确定要删除该图片吗?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
				center: true
			})
				.then(() => {
					this.deleteByImg(op);
				})
				.catch(() => {});
		},
		addPicFront(event) {
			this.addPicFlag = true;
			this.activeName = 'addPic';
		},
		// 启动新增照片
		addPicBegin() {
			// 控制进度条显示
			this.progressFlag = true;
			this.addPic(); // 启动后台新增照片任务
			this.beginLoop(1); // 启动循环调取进度值
		},
		// 启动删除数据库中已不存在的照片
		deletePicBegin() {
			// 控制进度条显示
			this.progressFlag = true;
			this.deletePic(); // 启动后台删除照片任务
			this.beginLoop(2); // 启动循环调取进度值
		},
		// 打开去重标签
		repeatPic(event) {
			this.repeatFlag = true;
			this.activeName = 'repeat';
		},
		// 打开修改拍摄时间标签
		shotTime(event) {
			this.shotTimeFlag = true;
			this.activeName = 'shotTime';
		},

		// 启动Md5照片去重
		repeatMd5Begin() {
			this.getMd5Pic(); // 启动后台获取MD5重复的图片
			this.imgDivFlag = true;
			this.deleteMethodFlag = false;
		},
		// 启动fingerprint照片去重
		async repeatFingerPrintBegin() {
			let flag = await this.getFingerPrint(); // 启动后台获取MD5重复的图片
			
			if(flag){
				this.fingerPrintShowFlag = true;
				this.imgDivFlag = true;
				this.deleteMethodFlag = true;
			}
		},
		removeTab(event) {
			if ('addPic' == event) this.addPicFlag = false;
			if ('repeat' == event) this.repeatFlag = false;
			if ('shotTime' == event) this.shotTimeFlag = false;
			this.activeName2 = 'first';
		},
		guessTimeBySrc() {
			let str = this.pic.filename;

			if (str.indexOf('faceu_') == 0) {
				let subStr = str.substr(6, 14);

				this.guessTime =
					subStr.substr(0, 4) +
					'-' +
					subStr.substr(4, 2) +
					'-' +
					subStr.substr(6, 2) +
					' ' +
					subStr.substr(8, 2) +
					':' +
					subStr.substr(10, 2) +
					':' +
					subStr.substr(12, 2);
			}

			// MYXJ_20190112193410_fast.jpg
			if (str.indexOf('MYXJ_') == 0) {
				let subStr = str.substr(5, 14);

				this.guessTime =
					subStr.substr(0, 4) +
					'-' +
					subStr.substr(4, 2) +
					'-' +
					subStr.substr(6, 2) +
					' ' +
					subStr.substr(8, 2) +
					':' +
					subStr.substr(10, 2) +
					':' +
					subStr.substr(12, 2);
			}

			// WuTa_2018-10-15_20-31-50
			if (str.indexOf('WuTa_') == 0) {
				let subStrO = str.substr(5, 19);

				let arr = subStrO.split('_');
				let date = arr[0];
				let time = arr[1].replace(/-/g, ':');

				this.guessTime = `${date} ${time}`;
			}

			if (str.indexOf('微信图片_') == 0) {
				let subStr = str.substr(5, 14);

				this.guessTime =
					subStr.substr(0, 4) +
					'-' +
					subStr.substr(4, 2) +
					'-' +
					subStr.substr(6, 2) +
					' ' +
					subStr.substr(8, 2) +
					':' +
					subStr.substr(10, 2) +
					':' +
					subStr.substr(12, 2);
			}

			if (str.indexOf('QQ图片') == 0) {
				let subStr = str.substr(4, 14);

				this.guessTime =
					subStr.substr(0, 4) +
					'-' +
					subStr.substr(4, 2) +
					'-' +
					subStr.substr(6, 2) +
					' ' +
					subStr.substr(8, 2) +
					':' +
					subStr.substr(10, 2) +
					':' +
					subStr.substr(12, 2);
			}

			if (str.indexOf('IMG_') == 0 && str.length > 19) {
				let subStr = str.substr(4, 15);
				let arr = subStr.split('_');

				let dateStr = arr[0].substr(0, 4) + '-' + arr[0].substr(4, 2) + '-' + arr[0].substr(6, 2);
				let timeStr = arr[1].substr(0, 2) + ':' + arr[1].substr(2, 2) + ':' + arr[1].substr(4, 2);

				this.guessTime = dateStr + ' ' + timeStr;
			}

			if (str.indexOf('B612Kaji_') == 0) {
				// B612Kaji_20180603_231306_600.jpg
				let subStr = str.substr(9, 15);
				let arr = subStr.split('_');

				let dateStr = arr[0].substr(0, 4) + '-' + arr[0].substr(4, 2) + '-' + arr[0].substr(6, 2);
				let timeStr = arr[1].substr(0, 2) + ':' + arr[1].substr(2, 2) + ':' + arr[1].substr(4, 2);

				this.guessTime = dateStr + ' ' + timeStr;
			}

			if (str.indexOf('mmexport') == 0) {
				// mmexport1500993758999.jpg
				let subStr = str.substr(8, 13);

				this.guessTime = this.format(parseInt(subStr));
			}

			if (str.indexOf('wx_camera_') == 0) {
				// wx_camera_1500028140900.jpg
				let subStr = str.substr(10, 13);

				this.guessTime = this.format(parseInt(subStr));
			}

			if (str.indexOf('P') == 0) {
				// 2016\P61006-110001-001.jpg

				let dateStr = '201' + str.substr(1, 1) + '-' + str.substr(2, 2) + '-' + str.substr(4, 2);

				let timeStr = str.substr(7, 2) + ':' + str.substr(9, 2) + ':' + str.substr(11, 2);

				this.guessTime = dateStr + ' ' + timeStr;
			}

			if (str.indexOf('B612咔叽_') == 0) {
				let subStr = str.substr(7, 15);

				let arr = subStr.split('_');

				let dateStr = arr[0].substr(0, 4) + '-' + arr[0].substr(4, 2) + '-' + arr[0].substr(6, 2);
				let timeStr = arr[1].substr(0, 2) + ':' + arr[1].substr(2, 2) + ':' + arr[1].substr(4, 2);

				this.guessTime = dateStr + ' ' + timeStr;
			}

			this.guessShotDate = this.guessTime;
		},
		format(shijianchuo) {
			//shijianchuo是整数，否则要parseInt转换
			var time = new Date(shijianchuo);
			var y = time.getFullYear();
			var m = time.getMonth() + 1;
			var d = time.getDate();
			var h = time.getHours();
			var mm = time.getMinutes();
			var s = time.getSeconds();
			return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
		},
		add0(m) {
			return m < 10 ? '0' + m : m;
		},

		/* 定时任务 */
		async getPercentage(index) {
			// 已经等于100了，则不要去后台掉用数据了
			if (this.percentage == 100) return;

			let retObj = await getPercent();

			if (retObj.status != 1) {
				this.$message({
					type: 'error',
					message: '获取进度失败'
				});
				return;
			}

			this.percentage = retObj.data;
		},
		// 开始定时任务1为add，2为delete
		beginLoop(index) {
			this.loop = setInterval(() => {
				this.getPercentage(index);
			}, 2500);
		},
		closeLoop() {
			this.getLastStatus(); // 刷新数值
			clearInterval(this.loop);
			this.progressFlag = false;
			this.percentage = 0;
		}
	}
};
</script>
