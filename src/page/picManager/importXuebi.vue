<template>
	<div class="imgDiv">
		<img style="width: 100%;" :src="pic.pathSrc" /><br />
		<div>
			拍摄日期：{{pic.shotDate}} </br></br>
			<a href="javascript:void(0);" @click="picsView('timeline')">【查看相近的】</a></br></br>
		</div>
		<span>
			<el-form ref="timeline" :rules="rules" :model="timeline" label-width="0px">
				<el-form-item prop="label">
					<el-input v-model="timeline.label" size="15" clearable placeholder="请输入标签,逗号隔开"></el-input>
				</el-form-item>
				<el-form-item prop="score">
					<el-input v-model="timeline.score" size="15" clearable placeholder="请输入评分,10分制"></el-input>
				</el-form-item>
				<el-form-item prop="reason">
					<el-input v-model="timeline.reason" clearable placeholder="请输入备注"></el-input>
				</el-form-item>
			</el-form>

			<br />
			<a href="javascript:void(0);" @click="passPic('timeline')">【通过】</a>&emsp;
			<a href="javascript:void(0);" @click="skipPic('timeline')">【跳过】</a>&emsp;
			<a href="javascript:void(0);" @click="deletePic('timeline')">【删除】</a>&emsp;
			<br />
		</span>
		<el-dialog title="查看" :visible.sync="picDialogFlag" width="30%" :before-close="handleClosePicDialog">
			<h3>与当前照片拍摄日期相差两小时的</h3><br />
			<div>
				<img v-for="item in pics" :src="item.pathSrc" style="height: 220px;"/>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import fetch from '@/util/fetch';
	import {
		baseUrl
	} from '@/config/env';

	const listData = data => fetch('/timeline/importPic/list', data); // 获取图片库最新状态
	const deletePic = data => fetch('/timeline/importPic/delete', data); // 删除图片包括物理路径

	const save = data => fetch('/timeline/save', data); // 保存通过的照片	
	const saveSkip = data => fetch('/timeline/saveSkip', data); // 保存跳过的照片	

	export default {
		data() {
			return {
				/*数据定义区*/
				pic: {},
				pics: [],
				timeline: {},

				/* 显示控制区 */
				tableShowFlag: false,
				picDialogFlag: false,

				/* 验证区 */
				rules: {
					label: {
						required: true,
						message: '请输入标签',
						trigger: 'blur'
					},
					score: [{
						required: true,
						message: '请输入评分',
						trigger: 'blur'
					}],
				},
			};
		},
		created: function() {
			this.getList();
		},
		methods: {

			// 获取相近时间的照片
			async getSimilarList() {
				// 数据处理
				let nowTime = this.pic.shotDate;
				let twoHour = 1000 * 60 * 120;

				let beginTime = this.fmtDate(new Date(Date.parse(new Date(nowTime)) - twoHour), 'yyyy-MM-dd hh:mm:ss');
				let endTime = this.fmtDate(new Date(Date.parse(new Date(nowTime)) + twoHour), 'yyyy-MM-dd hh:mm:ss');

				let retObj = await listData({
					beginShotDate: beginTime,
					endShotDate: endTime,
					preSrc: '雪碧',
				});

				if (retObj.status != 1) {
					this.$message({
						type: 'error',
						message: '获取数据失败'
					});
					return;
				}
				
				this.pics = [];

				retObj.data.list.forEach(item => {
					item.pathSrc = baseUrl + '/' + item.src;
					this.pics.push(item);
				});
			},
			picsView() {
				this.picDialogFlag = true;
				this.getSimilarList();
			},
			// 关闭
			handleClosePicDialog(done) {
				this.picDialogFlag = false;
				done();
			},
			async getList() {
				let retObj = await listData({
					preSrc: '雪碧',
					timelineFlag: '1',
					size: 1,
				});

				if (retObj.status != 1) {
					if (retObj.code == '400') {
						this.$message({
							type: 'error',
							message: '已没有可选择的了。'
						});
						return;
					}
					this.$message({
						type: 'error',
						message: '获取数据失败'
					});
					return;
				}

				if (retObj.data.list.length == 0) {
					this.$message({
						type: 'error',
						message: '已没有可选择的了。'
					});
					return;
				}

				this.pic = retObj.data.list[0];
				this.pic.pathSrc = baseUrl + '/' + this.pic.src;

			},
			async passPic2(formName) {

				if (this.timeline.label != '') {
					this.timeline.label = this.timeline.label.replace(/，/g, ",");
				}

				let retObj = await save({
					'pic.id': this.pic.id,
					type: '1',
					label: this.timeline.label,
					score: this.timeline.score,
					reason: this.timeline.reason
				});

				this.$refs[formName].resetFields();
				this.timeline = {};
				this.getList();
			},
			passPic(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$confirm('确定要通过该图片吗?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning',
							center: true
						}).then(() => {
							this.passPic2(formName);
						}).catch(() => {
							return;
						});
					} else {
						return false;
					}
				});
			},
			async skipPic2(formName) {
				let retObj = await saveSkip({
					'pic.id': this.pic.id,
					type: '1'
				});

				this.$refs[formName].resetFields();
				this.timeline = {};
				this.getList();
			},
			skipPic(formName) {
				this.$confirm('确定要跳过该图片吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					center: true
				}).then(() => {
					this.skipPic2(formName);
				}).catch(() => {
					return;
				});
			},
			async deletePic2(formName) {
				debugger;
				if (this.pic.id == null || this.pic.id == '' || this.pic.id == undefined) return;

				let retObj = await deletePic({
					id: this.pic.id,
					path: this.pic.path + this.pic.filename,
				});

				if (retObj.status != 1) {
					this.$message({
						type: 'error',
						message: '删除失败'
					});
					return;
				}

				this.$refs[formName].resetFields();
				this.timeline = {};
				this.getList();
			},
			deletePic(formName) {
				this.$confirm('确定要删除该图片吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					center: true
				}).then(() => {
					this.deletePic2(formName);
				}).catch((e) => {
					return;
				});
			},
			fmtDate(date, fmt) { //author: meizz 
				var o = {
					"M+": date.getMonth() + 1, //月份 
					"d+": date.getDate(), //日 
					"h+": date.getHours(), //小时 
					"m+": date.getMinutes(), //分 
					"s+": date.getSeconds(), //秒 
					"q+": Math.floor((date.getMonth() + 3) / 3), //季度 
					"S": date.getMilliseconds() //毫秒 
				};
				if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
				for (var k in o)
					if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" +
						o[k]).substr(("" + o[k]).length)));
				return fmt;
			}
		}
	};
</script>
<style>
	.imgDiv {
		margin: 0 auto;
		width: 250px;
		border: 3px solid #666666;
		padding: 10px;
		text-align: center;
	}

	.el-form-item__content {
		margin-left: 0px;
	}
</style>
