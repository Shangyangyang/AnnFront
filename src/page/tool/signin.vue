<template>
	<div class="fillcontain">
		<bread></bread>
		<div class="table_container areaList">
			<el-container>
				<el-main class="adminSet">
					<el-row type="flex" class="header">
						<el-col style="width:16px;border-bottom: 1px solid #ccc;"></el-col>
						<el-col class="admin_title">雪碧</el-col>
						<el-col style="flex: 1;border-bottom: 1px solid #ccc;"></el-col>
					</el-row>
					<div style="padding:20px 10px; width: 100%;border-bottom: 1px solid #e5e5e5;" class="dicTop">
						<el-form>
							<el-row :gutter="20">
								<el-col :span="4">
									<el-select v-model="queryType" placeholder="消费类型">
									    <el-option v-for="item in types" :key="item.value" :label="item.name" :value="item.value"></el-option>
									</el-select>
								</el-col>
								<el-col :span="4">
									<el-select v-model="queryPerson" placeholder="关联对象">
									    <el-option v-for="item in persons" :key="item.value" :label="item.name" :value="item.value"></el-option>
									</el-select>
								</el-col>
								<el-col :span="8" :push="1">
									<el-button @click="queryData" type="primary" icon="el-icon-search">查&nbsp;询</el-button>
									<el-button @click="resetData" type="primary" icon="el-icon-search">重&nbsp;置</el-button>
									<el-button @click="handleAddClick()" type="primary" icon="el-icon-plus"
                                               style="background:#fff;color:#000;border:1px solid #ccc;">新&nbsp;增
                                   </el-button>
								</el-col>
							</el-row>
						</el-form>
					</div>
					<el-table :data="tableData" stripe border style="width: 98%" v-loading="loading">
						<el-table-column prop="costDate" label="消费日期" width="150"></el-table-column>
						<el-table-column prop="money" label="金额" width="150"></el-table-column>
						<el-table-column prop="typeName" label="类型" width="150"></el-table-column>
						<el-table-column prop="reason" label="说明" width="250"></el-table-column>
						<el-table-column label="操作" width="300">
							<template slot-scope="scope">
								<el-button size="small" @click="handleView(scope.row)" icon="el-icon-edit">查看</el-button>
								<el-button size="small" @click="handleEdit(scope.row)" icon="el-icon-edit">编辑</el-button>
								<el-button size="small" @click="handleDelete(scope.row)" icon="el-icon-edit">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div class="Pagination" style="text-align: right;">
						<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="dataCount" :page-sizes="[10, 20, 30, 40,50]" layout="total, sizes, prev, pager, next">
						</el-pagination>
					</div>

				</el-main>
			</el-container>
		</div>
		
		<el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<span>请填写</span>
			<el-form :model="dog" :rules="rules" ref="dog">
				<div slot  style="display:none">
					<input v-model="dog.id" type="hidden">
				</div>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item prop="money">
							<label>金额</label>
							<el-input v-model="dog.money" auto-complete="off" :disabled="disabledFlag"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item prop="type">
							<label>类型</label>
							<el-select v-model="dog.type" placeholder="请选择" :disabled="disabledFlag">
							    <el-option v-for="item in types" :key="item.value" :label="item.name" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item prop="money">
							<label>关联对象</label>
							<el-select v-model="dog.relatedPerson" placeholder="请选择" :disabled="disabledFlag">
							    <el-option v-for="item in persons" :key="item.value" :label="item.name" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item prop="costDate">
							<label>消费日期</label>
							<el-date-picker v-model="dog.costDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :disabled="disabledFlag"> </el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="22">
						<el-form-item prop="reason">
							<label>说明</label>
							<el-input v-model="dog.reason" auto-complete="off" :disabled="disabledFlag"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="clickCancel" v-show="saveBtn">取 消</el-button>
			    <el-button @click="dialogVisible = false" v-show="viewBtn">返 回</el-button>
			    <el-button type="primary" @click="saveDog(dog)" v-show="saveBtn">保 存</el-button>
		  	</span>
		</el-dialog>
	</div>
</template>

<script>
	import fetch from '@/util/fetch';
    
	const listDogData = data => fetch('/cost/dog/list', data);
	const save = data => fetch('/cost/dog/save', data);
	const deleteDog = data => fetch('/cost/dog/delete', data);
	const findDictByLabel = data => fetch('/sys/dict/list', data);

	export default {
		data() {
			return {
				loading: true,
				queryType: '',
				queryPerson: '',
				tableData: [],
				currentRow: null,
				count: 2,
				currentPage: 1,
				pageSize: 10,
				dataCount: 0,
				dialogVisible: false,
				saveBtn: false,
				viewBtn: false,
				disabledFlag: false,
				types: [],
				persons: [],
		        type:'',
				dog: {},
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
			this.getListDogData();
		},
		methods: {
			//用于初次加载页面展示，以及按条件查询
			async getListDogData() {
				let retObj = await listDogData({
					type: this.queryType,
					relatedPerson: this.queryPerson,
					page: this.currentPage,
					size: this.pageSize
				});
				if(retObj.status != 1) {
					this.$message({
						type: 'error',
						message: '获取数据失败'
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
					this.getDictByLabel();
				}
				if(this.persons.length == 0){
					this.getDictByLabel3();
				}
				this.loading = false;
			},
			// 根据标签获取字典列表
			async getDictByLabel() {
				let retObj = await findDictByLabel({
					label: "cost_dog_type",
				});
				if(retObj.status != 1) {
					this.$message({
						type: 'error',
						message: '获取字典失败'
					});
					return;
				}
				this.types = [];
				retObj.data.forEach(item =>
					this.types.push(item)
				);
			},
			// 关联对象
			async getDictByLabel3() {
				let retObj = await findDictByLabel({
					label: "cost_relatedPerson",
				});
				if(retObj.status != 1) {
					this.$message({
						type: 'error',
						message: '获取字典失败'
					});
					return;
				}
				this.persons = [];
				retObj.data.forEach(item =>
					this.persons.push(item)
				);
			},
            async saveDog(rowObj){
            	this.dialogVisible = false;
            	this.loading = true;
            	
            	delete(rowObj.createUser);
            	delete(rowObj.createDate);
            	delete(rowObj.updateUser);
            	delete(rowObj.updateDate);
            	delete(rowObj.typeName);
            	delete(rowObj.relatedPersonName);
            	delete(rowObj.delFlag);
            	          
            	let retObj = await save(rowObj);
				if(retObj.status != 1) {
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
				
				this.getListDogData();
            },
            async deleteData(rowObj){
            	let retObj = await deleteDog({
            		id: rowObj.id
            	});
				if(retObj.status != 1) {
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
				this.getListDogData();
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
						this.$refs['dog'].resetFields();
						done();
					})
					.catch(_ => {});
			},
			clickCancel(){
				this.dialogVisible = false;
				this.$refs['dog'].resetFields();
			},
			handleSizeChange(val) {
				this.getListDogData();
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getListDogData();
			},
			queryData() {
				this.getListDogData();
			},
			resetData() {
				this.queryType = "";
				this.queryJinpozhi = "";
				this.queryPerson = "";
				this.getListDogData();
			},
			handleView(rowObj){
                this.dog = rowObj;
                
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
                this.dog={};
            },
            handleEdit(rowObj){
            	
            	this.preSave();
                this.dog = rowObj;
                this.dialogTitle = '编辑消费';
                
            },
            preSave(){
            	// 获取下拉框的值
				if(this.types.length == 0){
					this.getDictByLabel();
				}
				if(this.persons.length == 0){
					this.getDictByLabel3();
				}
				
				this.dialogVisible = true;
				this.viewBtn = false;
				this.saveBtn = true;
				this.disabledFlag = false;
            }
            
		},
        components: {
        }
	}
</script>

<style lang="less">
	@import '../../assets/css/mixin';
</style>