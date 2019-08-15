<template>
	<div>
		<div class="imgDiv" v-show="showAddLabel">
			<!-- <img style="width: 30%;" :src="pic.pathSrc" preview="0" :preview-text="pic.shotDate"/> -->
			<vue-preview :slides="slide1"></vue-preview>
			<br />
			<div>
				拍摄日期：{{pic.shotDate}} </br>
				<a href="javascript:void(0);" @click="picsView('timeline')">【查看相近的】</a></br></br>
			</div>
			<span>
				<el-form ref="timeline" :rules="rules" :model="timeline" label-width="0px">
					<el-row :gutter="20">
						<el-form-item prop="label">
							<el-col :span="16">
								<el-input v-model="timeline.label" size="15" style="color: red;"
								clearable placeholder="请输入标签,逗号隔开" disabled></el-input>
							</el-col>
							<el-col :span="8">
								<select-label 
									:labelIds.sync="timeline.labelId" 
									:labelNames.sync="timeline.label" 
									:removeIds="timeline.labelId"
								>
								</select-label>
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
				<div style="padding: 10px; border: #aaa 1px solid; margin-top: 10px;">
					<el-button type="primary" @click="passPic('timeline')">【通过】</el-button>
					<el-button type="info" @click="deletePic('timeline')">【删除】</el-button>
				</div>
				<div style="padding: 10px; border: #aaa 1px solid; margin-top: 10px; color: #666; font-family: '楷体';">
					{{rateText}}
				</div>
				<div style="padding: 10px;">
					<el-button icon="el-icon-arrow-left" @click="backTo()">返回</el-button>
				</div>
			</span>
			<el-dialog title="查看" :visible.sync="picDialogFlag" width="60%" :before-close="handleClosePicDialog">
				<h3>与当前照片拍摄日期相差一小时的</h3><br />
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
	
	import { fmtDate } from '@/util/dateUtils';
	

	const listData = data => fetch('/timeline/importPic/list', data); // 获取图片库最新状态
	const deletePic = data => fetch('/timeline/importPic/delete', data); // 删除图片包括物理路径

	const save = data => fetch('/timeline/save', data); // 保存通过的照片	
	const saveSkip = data => fetch('/timeline/saveSkip', data); // 保存跳过的照片	
	const getTimelineInfo = data => fetch('/timeline/getTimelineInfo', data);	// 获取时光轴中未筛选已筛选的记录

	const updateSelectNum = data => fetch('/timeline/label/updateSelectNum', data);	// 更新标签选择次数，每张图片保存成功后执行

	const MAX_SIZE = 700;

	export default {
		data() {
			return {
				/*数据定义区*/
				pics: [],
				slide1: [],
				
				timeline: {
					score: 5,
				},
				
				pic: {},
				
				rateText: '暂无信息',

				/* 显示控制区 */
				tableShowFlag: false,
				picDialogFlag: false,
				labelDialogFlag: false,
				showAddLabel: true,

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
			this.getTimelineInfo();
		},
		methods: {
			// 获取相近时间的照片
			async getSimilarList() {
				// 数据处理
				let nowTime = this.pic.shotDate;
				let twoHour = 1000 * 60 * 30;
				
				let beginTime = fmtDate(new Date(Date.parse(new Date(nowTime)) - twoHour), 'yyyy-MM-dd hh:mm:ss');
				let endTime = fmtDate(new Date(Date.parse(new Date(nowTime)) + twoHour), 'yyyy-MM-dd hh:mm:ss');
				
				let retObj = await listData({
					beginShotDate: beginTime,
					endShotDate: endTime,
					preSrc: '雪碧',
					page: 1,
					size: 0,
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
					item.pathSrc = baseUrl + '/' + item.srcThumbnail;
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
			async getTimelineInfo(){
				let retObj = await getTimelineInfo();
				
				if(!retObj || retObj.status != 1){
					this.$message.error('获取时光轴信息失败，' + retObj.message);
					return;
				}
				
				this.rateText = `已筛选: ${retObj.data.yiShaixuan} ,  未筛选: ${retObj.data.weiShaixuan}`;
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
				
				this.slide1 = [];
				let p = this.pic = retObj.data.list[0];
				let vueP = {
					src: baseUrl + '/' + p.src,
					msrc: baseUrl + '/' + p.srcThumbnail,
					title: p.shotDate,
					w: 0,
					h: 0,
				}
				
				this.slide1.push(vueP);
				
				// 图片地址 后面加时间戳是为了避免缓存
				var img_url = baseUrl + '/' + p.src + '?' + Date.parse(new Date());
				  
				// 创建对象
				var img = new Image();
				  
				// 改变图片的src
				img.src = img_url;
				
				// 加载完成执行
				img.onload = function(){
					// 打印
					let w = img.width;
					let h = img.height;
					let mw = 0;
					let mh = 0;
					
					if(w >= h){
						mw = MAX_SIZE;
						let per = MAX_SIZE / w;
						mh = h * per;
					}
					if(h >= w){
						mh = MAX_SIZE;
						let per = MAX_SIZE / h;
						mw = w * per;
					}
					
					// console.log('mw: ' + mw);
					// console.log('mh: ' + mh);
					
					vueP.w = mw;
					vueP.h = mh;
				};
				// this.pic.pathSrc = baseUrl + '/' + this.pic.srcThumbnail;

			},
			async passPic2(formName) {

				if (this.timeline.label != '') {
					this.timeline.label = this.timeline.label.replace(/，/g, ",");
				}
				
				// 保存
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
				this.getTimelineInfo();
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
				
			},
			async deletePic(formName) {
				this.$confirm('确定要删除该图片吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					center: true
				}).then( async () => {
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
					this.timeline = {score: 5};
					this.getList();
				}).catch((e) => {
					return;
				});
			},
			backTo() {
				this.$router.go(-1);
			},
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
	.el-input.is-disabled .el-input__inner{
		color: #000000;
		font-weight: bold;
	}
</style>
