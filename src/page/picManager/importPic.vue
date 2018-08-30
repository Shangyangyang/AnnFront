<template>
	<el-tabs v-model="activeName2" type="card" closable @tab-remove="removeTab">
		<!-- 菜单标签页 -->
		<el-tab-pane label="图片基表管理" name="first">
			<div style="text-align: center;">
				<div style="padding-left: 20px;">
					<a @click="addPicFront" href="#">新增照片</a>&emsp;&emsp;
					<a @click="repeatPic" href="#">排重</a>&emsp;&emsp;
				</div>
				<br/><span>--------------------------------------------------------------------------------</span><br/>
				<div>
					图片库最近状态<br/><br/>
					<label>总数：</label>{{lastPic.lastTotal}}<br/>
					<label>最近拍摄日期：</label>{{lastPic.lastShotDate}}<br/>
					<label>最近导入时间：</label>{{lastPic.lastImportDate}}<br/>
				</div>
			</div>
		</el-tab-pane>
		<!-- 新增图片库功能页 -->
		<el-tab-pane name="addPic" v-if="addPicFlag">
			<span slot="label"><i class="el-icon-picture"></i> 新增照片</span>
			<div style="text-align: center;">
				<a @click="addPicBegin" href="#" v-show="!progressFlag" style="padding-left: 20px;">新增照片</a>
				<a @click="deletePicBegin" href="#" v-show="!progressFlag" style="padding-left: 20px;">删除数据库中已不存在的照片</a>
				
				<!-- 进度条 -->
				<div style="width: 50%;" v-show="progressFlag">
					<el-progress :text-inside="true" :stroke-width="18" :percentage="percentage"></el-progress>
				</div>
			</div>			
		</el-tab-pane>
		<!-- 排重功能页 -->
		<el-tab-pane name="repeat" v-if="repeatFlag">
			<span slot="label"><i class="el-icon-refresh"></i> 排重</span>
			<div style="width: 50%;">
				<el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
			</div>
		</el-tab-pane>
	</el-tabs>
</template>
<script>
	
	import fetch from '@/util/fetch';
	
	const getLastStatus = data => fetch('/timeline/importPic/getLastStatus', data);	// 获取图片库最新状态
	const addPic = data => fetch('/timeline/importPic/addPic', data); 				// 启动新增照片
	const cleanDatabase = data => fetch('/timeline/importPic/cleanDatabase', data); // 删除数据库不存在的照片
	const getPercent = data => fetch('/timeline/importPic/getPercent', data);	// 获取新增照片进度
	const clearAddPercent = data => fetch('/timeline/importPic/clearAddPercent', data); 		// 清空后台进度值
	
	
	export default {
		data() {
			return {
				/*数据定义区*/
				lastPic: {},				
				activeName2: 'first',
				percentage: 0,	
				loop: null,		// 定时器
				
				/*视图控制变量区*/
				addPicFlag: false,
				repeatFlag: false,
				
				progressFlag: false,		// 进度控制
			};
		},
		created:function(){
			this.getLastStatus();
		},
		/* 进入页面时 */
		mounted() {
			
		},
		methods: {
			async getLastStatus(){
				let retObj = await getLastStatus();
				if(retObj.status != 1){
					this.$message({
						type: 'error',
						message: '获取数据失败'
					});
					return;
				}
				this.lastPic = retObj.data;
			},
			/*启动后端的图片添加任务*/
			async addPic(){
				let retObj = await addPic();
								
				if(retObj.status != 1){
					this.$message({
						type: 'error',
						message: '获取数据失败'
					});
					return;
				}
				
				this.percentage = 100;	// 进度条变成100%
				
				this.$message({
					type: 'success',
					message: retObj.data				
				});
				// 关闭任务获取
				this.closeLoop();
			},
			/*启动删除数据库中不存在的照片*/
			async deletePic(){
				let retObj = await cleanDatabase();
								
				if(retObj.status != 1){
					this.$message({
						type: 'error',
						message: '获取数据失败'
					});
					return;
				}
				
				this.percentage = 100;	// 进度条变成100%
				
				this.$message({
					type: 'success',
					message: retObj.data				
				});
				// 关闭任务获取
				this.closeLoop();
			},
			addPicFront(event){
				this.addPicFlag = true;
				this.activeName2 = "addPic";
			},
			// 启动新增照片
			addPicBegin(){
				// 控制进度条显示
				this.progressFlag = true;
				this.addPic();	// 启动后台新增照片任务
				this.beginLoop(1);	// 启动循环调取进度值	
			},
			// 启动删除数据库中已不存在的照片
			deletePicBegin(){
				// 控制进度条显示
				this.progressFlag = true;
				this.deletePic();	// 启动后台删除照片任务
				this.beginLoop(2);	// 启动循环调取进度值
			},
			repeatPic(event){
				this.repeatFlag = true;
				this.activeName2 = "repeat";
			},
			removeTab(event){
				if('addPic' == event)this.addPicFlag = false;
				if('repeat' == event)this.repeatFlag = false;
				this.activeName2 = "first";
			},
			/* 定时任务 */
			async getPercentage(index){
				// 已经等于100了，则不要去后台掉用数据了
				if(this.percentage == 100)return;
				
				let retObj = await getPercent();
				
				if(retObj.status != 1){
					this.$message({
						type: 'error',
						message: '获取进度失败'
					});
					return;
				}
				
				this.percentage = retObj.data;
				
			},
			// 开始定时任务1为add，2为delete
			beginLoop(index){
	　			this.loop = setInterval(() => {
					this.getPercentage(index);
				}, 2500);
			},
			closeLoop(){
				this.getLastStatus();	// 刷新数值
				clearInterval(this.loop);
				this.progressFlag = false;
				this.percentage = 0;
			},
		}
	};
</script>
