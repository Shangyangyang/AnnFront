<template>
	<div class="fillcontain">
		<bread></bread>
		<div class="table_container areaList">
			<el-container>
				<el-main class="adminSet">
					<el-row type="flex" class="header">
						<el-col style="width:16px;border-bottom: 1px solid #ccc;"></el-col>
						<el-col class="admin_title">汽车消费管理</el-col>
						<el-col style="flex: 1;border-bottom: 1px solid #ccc;"></el-col>
					</el-row>
					<div style="padding:20px 10px; width: 100%;border-bottom: 1px solid #e5e5e5;" class="dicTop">
						<el-form>
							<el-row :gutter="20">
								<el-col :span="1.1">消费类型：</el-col>
								<el-col :span="4">
									<el-select v-model="queryType" placeholder="请选择" @change="changeType">
									    <el-option v-for="item in types" :key="item.value" :label="item.name" :value="item.value"></el-option>
									</el-select>
								</el-col>
								<el-col :span="8" :push="1">
									<el-button @click="queryData" type="primary" icon="el-icon-search">查&nbsp;询</el-button>
									<el-button @click="resetData" type="primary" icon="el-icon-search">重&nbsp;置</el-button>
									<el-button @click="handleAddClick()" type="primary" icon="el-icon-plus"
                                               style="background:#fff;color:#000;border:1px solid #ccc;">新&nbsp;增
                                    </el-button>
                                    <el-button @click="getYouhao" type="primary" icon="el-icon-search">油&nbsp;耗</el-button>
								</el-col>
							</el-row>
						</el-form>
					</div>
					<div class="pageTitle">
						<div class="pageLeftRight">
							<table class="tbStyle" border="0" cellspacing="1">
								<tr>
									<td>序号</td>
									<td>消费日期</td>
									<td>金额</td>
									<td>类型</td>
									<td>说明</td>
									<td>操作</td>
								</tr>
								<tr v-for="(item, index) in tableData" :key="index">
									<td>{{ index + 1 }}</td>
									<td>{{ item.inputDate }}</td>
									<td>{{ item.money }}</td>
									<td>{{ item.typeName }}</td>
									<td>{{ item.reason }}</td>
									<td>
										<a href="javascript:;" @click="handleView(item)">查看</a>
										<a href="javascript:;" @click="handleEdit(item)">编辑</a>
										<a href="javascript:;" @click="handleDelete(item)">删除</a>
									</td>
								</tr>
							</table>
					
							<div class="Pagination">
								<el-pagination
									background
									@size-change="handleSizeChange"
									@current-change="handleCurrentChange"
									:current-page="currentPage"
									:page-size="pageSize"
									:total="dataCount"
									:page-sizes="[10, 20, 30, 40, 50]"
									layout="total, sizes, prev, pager, next, jumper"
								></el-pagination>
							</div>
						</div>
					</div>
				</el-main>
			</el-container>
		</div>
		
		<el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<span>请填写</span>
			<el-form :model="car" :rules="rules" ref="car">
				<div slot  style="display:none">
					<input v-model="car.id" type="hidden">
				</div>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item prop="money">
							<label>金额</label>
							<el-input v-model="car.money" auto-complete="off" :disabled="disabledFlag"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item prop="money">
							<label>类型</label>
							<el-select v-model="car.type" placeholder="请选择" @change="changeType" :disabled="disabledFlag">
							    <el-option v-for="item in types" :key="item.value" :label="item.name" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20" :style="typeShow">
					<el-col :span="12">
						<el-form-item prop="licheng">
							<label>里程数</label>
							<el-input v-model="car.licheng" auto-complete="off"  :disabled="disabledFlag"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item prop="youjia">
							<label>油价</label>
							<el-input v-model="car.youjia" auto-complete="off" :disabled="disabledFlag"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="20">
						<el-form-item prop="reason">
							<label>说明</label>
							<el-input v-model="car.reason" auto-complete="off" :disabled="disabledFlag"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="28">
						<el-form-item prop="inputDate">
							<label>消费日期</label>
							<el-date-picker v-model="car.inputDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :disabled="disabledFlag"> </el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="clickCancel" v-show="saveBtn">取 消</el-button>
			    <el-button @click="dialogVisible = false" v-show="viewBtn">返 回</el-button>
			    <el-button type="primary" @click="saveCar(car)" v-show="saveBtn">保 存</el-button>
		  	</span>
		</el-dialog>
		
		<el-dialog :title="title" :visible.sync="oilWearDialog" width="30%" :before-close="handleCloseOilWear">
			<h3>油耗详情</h3><br/>
				<div>
					<span style="font-weight: bold;">合计时间段：</span><span>{{carOilWear.startTime}}&nbsp;至&nbsp;{{carOilWear.endTime}}</span><br/>
					<span style="font-weight: bold;">汽油总升数：</span><span>{{carOilWear.shengTotal}}&nbsp;升</span><br/>
					<span style="font-weight: bold;">总里程数&emsp;：</span><span>{{carOilWear.lichengTotal}}&nbsp;公里</span><br/>
					<span style="font-weight: bold;">总油费&emsp;&emsp;：</span><span>{{carOilWear.money}}&nbsp;元</span><br/>
					<span style="font-weight: bold;">百公里油耗：</span><span>{{carOilWear.baigongliyouhao}}&nbsp;升</span><br/>
					<span style="font-weight: bold;">平均油价&emsp;：</span><span>{{carOilWear.averageYoujia}}&nbsp;元</span><br/>
				</div>
		</el-dialog>

	</div>
</template>

<script>
	import fetch from '@/util/fetch';
	import {formatTime} from '@/util/dateUtils';
    
	const listCarData = data => fetch('/cost/car/list', data);
	const save = data => fetch('/cost/car/save', data);
	const deleteCar = data => fetch('/cost/car/delete', data);
	const findDictByLabel = data => fetch('/sys/dict/list', data);
	const getOilWear = data => fetch('/cost/car/getOilWear', data);

	export default {
		data() {
			return {
				queryType: '',
				tableData: [],
				currentRow: null,
				count: 2,
				currentPage: 1,
				pageSize: 10,
				dataCount: 0,
				dialogVisible: false,
				oilWearDialog: false,
				saveBtn: false,
				viewBtn: false,
				disabledFlag: false,
				types: [],
		        type:'',
		        typeShow: "display:none",
				car: {},
				carOilWear: {},
				title: '',
				rowData: {},
				action: '',
				rules: {
					money: [{
						required: true,
						message: '请输入金额',
						trigger: 'blur'
					}]
				}
			}

		},
		created() {
			this.getListCarData();
		},
		methods: {
			//用于初次加载页面展示，以及按条件查询
			async getListCarData(queryType) {
				let retObj = await listCarData({
					type: this.queryType,
					page: this.currentPage,
					size: this.pageSize
				});
				
				if(!retObj) {
					return;
				}
				if(retObj.status != 1) {
					this.$message({
						type: 'error',
						message: '获取数据失败,' + retObj.message,
					});
					return;
				}
				
				this.tableData = [];
				
				retObj.data.list.forEach(item =>
					this.tableData.push(item)
				);
				this.dataCount = retObj.data.total;
				// 查询下拉值获取
				if(this.types.length == 0){
					this.getDictByLabel('car_type');
				}
			},
			// 根据标签获取字典列表
			async getDictByLabel(aaa) {
				let retObj = await findDictByLabel({
					label: aaa,
				});
				if(!retObj || retObj.status != 1) {
					this.$message({
						type: 'error',
						message: '获取字典失败'
					});
					return;
				}
				this.types = [];
				
				retObj.data.list.forEach(item =>
					this.types.push(item)
				);
			},
			async getYouhao(){
            	this.title = '油耗详情'; 
            	
				this.oilWearDialog = true;
				
				let retObj = await getOilWear({});
				if(!retObj || retObj.status != 1) {
					this.$message({
						type: 'error',
						message: '获取数据失败'
					});
					return;
				}
				
				this.carOilWear = retObj.data;
				this.carOilWear.startTime = formatTime(this.carOilWear.startTime);
				this.carOilWear.endTime = formatTime(this.carOilWear.endTime);
            },
            async saveCar(rowObj){
            	this.dialogVisible = false;
            	
            	delete(rowObj.createUser);
            	delete(rowObj.createDate);
            	delete(rowObj.updateUser);
            	delete(rowObj.updateDate);
          
          
            	let retObj = await save(rowObj);
				if(!retObj || retObj.status != 1) {
					this.$message({
						type: 'error',
						message: '保存数据失败' + retObj.message
					});
					return;
				}
				this.$message({
					type: 'success',
					message: '保存数据完成'
				});
				
				this.getListCarData();
            },
            async deleteData(rowObj){
            	let retObj = await deleteCar({
            		id: rowObj.id
            	});
				if(!retObj || retObj.status != 1) {
					this.$message({
						type: 'error',
						message: '删除失败' + retObj.message
					});
					return;
				}
				this.$message({
					type: 'success',
					message: '删除成功'
				});
				this.getListCarData();
      },
			handleDelete(rowObj){
				this.$confirm('确定要删除吗？', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning',
							center: true
					}).then(() => {
							this.deleteData(rowObj);
					}).catch(() => {
					});
			},
			handleCloseOilWear(done) {
					this.oilWearDialog = false;
					done();
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						this.$refs['car'].resetFields();
						this.typeShow = "display:none";
						done();
					})
					.catch(_ => {});
			},
			changeType(val){
				if(val == 1){
					this.typeShow = "display:block";
				} else {
					this.typeShow = "display:none";
					this.car.licheng = this.car.youjia = "";
				}
			},
			clickCancel(){
				this.dialogVisible = false;
				this.$refs['car'].resetFields();
			},
			handleSizeChange(val) {
				this.getListCarData(this.queryType);
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getListCarData(this.queryType);
			},
			queryData() {
				this.getListCarData(this.queryType);
			},
			resetData() {
				this.queryType = "";
				this.getListCarData();
			},
			handleView(rowObj){
				this.car = rowObj;
				if(this.types.length == 0){
					this.getDictByLabel('car_type');
				}
				this.changeType(this.car.type);
				this.title = '消费详情';
				this.dialogVisible = true;
				this.viewBtn = true;
				this.saveBtn = false;
				this.disabledFlag = true;
			},
			handleAddClick(){
				this.preSave();
				
                this.action = 'add';
                this.title = '添加消费';
                this.car={};
            },
            handleEdit(rowObj){
            	
            	this.preSave();
            	if(rowObj.type == '1'){
            		this.typeShow = "display:block";
            	} else {
            		this.typeShow = "display:none";
            	}
                this.car = rowObj;
                this.dialogTitle = '编辑消费';
                
            },
            preSave(){
            	// 获取下拉框的值
				if(this.types.length == 0){
					this.getDictByLabel('car_type');
				}
				this.dialogVisible = true;
				this.viewBtn = false;
				this.saveBtn = true;
				this.disabledFlag = false;
            },
		},
        components: {
        }
	}
</script>

<style lang="less">
	@import '../../assets/css/mixin';
</style>