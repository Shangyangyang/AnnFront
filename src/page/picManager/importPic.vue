<template>
	<el-tabs v-model="activeName2" type="card" closable @tab-remove="removeTab">
		<!-- 菜单标签页 -->
		<el-tab-pane label="图片基表管理" name="first">
			<div style="text-align: center;">
				<div style="padding-left: 20px;">
					<a @click="addPicFront" href="#">新增照片</a>&emsp;&emsp;
					<a @click="repeatPic" href="#">排重</a>&emsp;&emsp;
					<a @click="shotTime" href="#">修改拍摄时间</a>&emsp;&emsp;
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
			<div style="text-align: center;">
				<a @click="repeatMd5Begin" href="#" style="padding-left: 20px;">Md5排重</a>
				<a @click="repeatFingerPrintBegin" href="#" style="padding-left: 20px;">文件指纹排重</a>
				<br/>
				<br/>
				<div v-if="fingerPrintShowFlag">
					<a href="#" @click="skipPic()" style="padding-left: 20px;">跳过该组照片</a>
				</div>
				<br/>
				<br/>
				<br/>
				<div v-show="imgDivFlag">
					<img-show :imgSrc.sync="item" :imgId.sync="imgId" v-for="item in imgs" @onClick="deleteThisPic"
						:deleteFlag.sync="deleteFlag"></img-show>
				</div>
			</div>
		</el-tab-pane>
		<el-tab-pane name="shotTime" v-if="shotTimeFlag">
			<span slot="label"><i class="el-icon-time"></i> 修改拍摄时间</span>
			<div style="text-align: center;">
				<a @click="shotTimeStart" href="#" style="padding-left: 20px;">>> 开始 <<</a>
			</div>			
		</el-tab-pane>
		
	</el-tabs>
</template>
<script>
	
	import fetch from '@/util/fetch';
	
	const getLastStatus = data => fetch('/timeline/importPic/getLastStatus', data);	// 获取图片库最新状态
	const addPic = data => fetch('/timeline/importPic/addPic', data); 				// 启动新增照片
	const cleanDatabase = data => fetch('/timeline/importPic/cleanDatabase', data); // 删除数据库不存在的照片
	const getPercent = data => fetch('/timeline/importPic/getPercent', data);		// 获取新增照片进度
	const clearAddPercent = data => fetch('/timeline/importPic/clearAddPercent', data); // 清空后台进度值
	
	const skipByTpList = data => fetch('/timeline/importPic/skipByTpList', data); // 跳过该组照片并获取新的
	
	const getEqualMd5 = data => fetch('/timeline/importPic/getEqualMd5', data); // 获取MD5重复的图片List
	const getEqualFingerPrint = data => fetch('/timeline/importPic/getEqualFingerPrint', data); // 获取文件指纹重复的图片List
	const deletePic = data => fetch('/timeline/importPic/delete', data); // 获取MD5重复的图片List
	
	
	export default {
		data() {
			return {
				/*数据定义区*/
				lastPic: {},				
				activeName2: 'first',
				percentage: 0,	
				loop: null,		// 定时器
				imgs: [],		// 图片集合
				imgId: '',		// 临时图片ID
				
				/*视图控制变量区*/
				addPicFlag: false,
				repeatFlag: false,
				shotTimeFlag: false,
				fingerPrintShowFlag: false,	// 文件指纹控制区显示
				progressFlag: false,		// 进度控制
				imgDivFlag: false,			// 去重图片展示
				deleteFlag: '',
				deleteMethodFlag: false		// false为MD5，true为fingerPrint
			};
		},
		created:function(){
			this.getLastStatus();
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
			// 获取MD5重复的图片list
			async getMd5Pic(){
				let retObj = await getEqualMd5();
				console.log(retObj);
				if(retObj.status != 1){
					if(retObj.code == '400'){
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
			async getFingerPrint(){
				let retObj = await getEqualFingerPrint();
				
				if(retObj.status != 1){
					if(retObj.code == '400'){
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
			async deleteByImg(op){
				if(this.imgId == null || this.imgId == '' || this.imgId == undefined) return;
				let path = '';
				// 同时把物理路径传过去
				this.imgs.forEach(item => {
					if(item.id == this.imgId){
						path = item.path + item.filename;
					}
				});
				
				let retObj = await deletePic({
					id: this.imgId,
					path: path,
				}); 
				
				if(retObj.status != 1){
					this.$message({
						type: 'error',
						message: '删除失败'
					});
					return;
				}
				
				if(this.deleteMethodFlag){
					this.getFingerPrint();
				}else {
					this.getMd5Pic();
				}
				
				this.deleteFlag = false;
			},
			// 跳过该组照片
			async skipPic(){
				let arr = "";
				
				let str = "";
				this.imgs.forEach((item, index) => {
					str = "";
					str = str + item.id + "," + item.shortId  + "," + item.similarId;
					arr = arr + str + ";" ;
				});
				
				console.log(arr);
				
				let retObj = await skipByTpList({
					tpList: arr,
				});
				
				if(retObj.status != 1){
					if(retObj.code == '400'){
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
			
			// 根据ID删除图片
			deleteThisPic(op){
				this.$confirm('确定要删除该图片吗?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning',
						center: true
				}).then(() => {
					this.deleteByImg(op);
				}).catch(() => {
				});
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
			// 打开去重标签
			repeatPic(event){
                this.repeatFlag = true;
                this.activeName2 = "repeat";
            },
			// 打开修改拍摄时间标签
			shotTime(event){
                this.shotTimeFlag = true;
                this.activeName2 = "shotTime";
            },

			// 启动Md5照片去重
			repeatMd5Begin(){
				this.getMd5Pic();	// 启动后台获取MD5重复的图片
				this.imgDivFlag = true;
				this.deleteMethodFlag = false;
			},
			// 启动fingerprint照片去重
			repeatFingerPrintBegin(){
				this.fingerPrintShowFlag = true;
				this.getFingerPrint();	// 启动后台获取MD5重复的图片
				this.imgDivFlag = true;
				this.deleteMethodFlag = true;
			},
			removeTab(event){
				if('addPic' == event)this.addPicFlag = false;
				if('repeat' == event)this.repeatFlag = false;
				if('shotTime' == event)this.shotTimeFlag = false;
				this.activeName2 = "first";
			},
			// 开始拍摄时间修改，调取拍摄时间为空的图片数据
			shotTimeStart(){
				
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
