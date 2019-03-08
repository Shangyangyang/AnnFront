<template>
	<div>
		<div class="imgDiv" v-show="showList">
			列表
		</div>
		<div class="imgDiv" v-show="showAddLabel">
			<img style="width: 50%;" :src="pic.pathSrc" /><br />
			<div>
				拍摄日期：{{pic.shotDate}} </br>
				<a href="javascript:void(0);" @click="picsView('timeline')">【查看相近的】</a></br></br>
			</div>
			<span>
				<el-form ref="timeline" :rules="rules" :model="timeline" label-width="0px">
					<el-row :gutter="20">
						<el-form-item prop="label">
							<el-col :span="16">
								<el-input v-model="timeline.label" size="15" clearable placeholder="请输入标签,逗号隔开" disabled></el-input>
							</el-col>
							<el-col :span="8">
								<select-label 
									:labelIds.sync="timeline.labelId" 
									:labelNames.sync="timeline.label" 
									:removeIds="timeline.labelId"
								></select-label>
							</el-col>
						</el-form-item>
					</el-row>
					<el-row :gutter="20">
							<el-col :span="4">
								评分：{{timeline.score}}
							</el-col>
							<el-col :span="20" style="margin-top: -8px;">
								<el-slider v-model="timeline.score" :step="1" :max="10" show-stops></el-slider>
							</el-col>
					</el-row>
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
					<img v-for="(item, index) in pics" :src="item.pathSrc" :key="index" style="height: 220px;"/>
				</div>
			</el-dialog>
			<el-dialog title="查看" :visible.sync="labelDialogFlag" width="30%" :before-close="handleCloseLabelDialog">
				<h3>浏览所有的标签</h3><br />
				<div>
					<img v-for="(item, index) in pics" :src="item.pathSrc" :key="index" style="height: 220px;"/>
				</div>
			</el-dialog>
		</div>
	</div>
</template>
<script>
	import fetch from '@/util/fetch';
	import utils from '@/util/utils';
	import {
		baseUrl
	} from '@/config/env';

	const listData = data => fetch('/timeline/importPic/list', data); // 获取图片库最新状态
	const deletePic = data => fetch('/timeline/importPic/delete', data); // 删除图片包括物理路径

	const save = data => fetch('/timeline/save', data); // 保存通过的照片	
	const saveSkip = data => fetch('/timeline/saveSkip', data); // 保存跳过的照片	

	const updateSelectNum = data => fetch('/timeline/label/updateSelectNum', data);	// 更新标签选择次数，每张图片保存成功后执行

	export default {
		data() {
			return {
				/*数据定义区*/
				pic: {},
				pics: [],
				timeline: {
					score: 5,
				},

				/* 显示控制区 */
				tableShowFlag: false,
				picDialogFlag: false,
				labelDialogFlag: false,
				showList: true,
				showAddLabel: false,

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
			handleCloseLabelDialog(done) {
				this.labelDialogFlag = false;
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
					labelId: this.timeline.labelId,
					score: this.timeline.score,
					reason: this.timeline.reason
				});
				
				// 更新标签选择次数
				
				let retObjL = await updateSelectNum({
					idstr: this.timeline.labelId,
				});
				
				if(!utils.checkResult(retObjL, this)) return false;
				
				this.$refs[formName].resetFields();
				this.timeline = {
					score: 5,
				};
				
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
		width: 450px;
		border: 3px solid #666666;
		padding: 10px;
		text-align: center;
	}

	.el-form-item__content {
		margin-left: 0px;
	}
</style>
