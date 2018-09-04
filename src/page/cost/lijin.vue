<template>
	<div class="fillcontain">
		<bread></bread>
		<div class="table_container areaList">
			<el-container>
				<el-main class="adminSet">
					<el-row type="flex" class="header">
						<el-col style="width:16px;border-bottom: 1px solid #ccc;"></el-col>
						<el-col class="admin_title">礼金管理</el-col>
						<el-col style="flex: 1;border-bottom: 1px solid #ccc;"></el-col>
					</el-row>
					<div style="padding:20px 10px; width: 100%;border-bottom: 1px solid #e5e5e5;" class="dicTop">
						<el-form>
							<el-row :gutter="20">
								<el-col :span="1.1">类型：</el-col>
								<el-col :span="4">
									<data-dict dictLabel="lijin_type" :dictValue.sync="queryType" :dictName.sync="lijin.typeName"></data-dict>
								</el-col>
								<el-col :span="1.1">是否已还：</el-col>
								<el-col :span="4">
									<data-dict dictLabel="lijin_isyihuan" :dictValue.sync="queryIsyihuan" :dictName.sync="lijin.isyihuanName"></data-dict>
								</el-col>
								<el-col :span="8" :push="1">
									<el-button @click="queryData" type="primary" icon="el-icon-search">查&nbsp;询</el-button>
									<el-button @click="resetData" type="primary" icon="el-icon-search">重&nbsp;置</el-button>
									<el-button @click="executeExportExcel" type="primary" icon="el-icon-download">导出为Excel</el-button>
									<el-button @click="handleAddClick()" type="primary" icon="el-icon-plus" style="background:#fff;color:#000;border:1px solid #ccc;">新&nbsp;增</el-button>
								</el-col>
							</el-row>
						</el-form>
					</div>
					<el-table :data="tableData" stripe border style="width: 98%">
						<el-table-column prop="inputDate" label="时间" width="150"></el-table-column>
						<el-table-column prop="money" label="金额" width="150"></el-table-column>
						<el-table-column prop="name" label="姓名" width="150"></el-table-column>
						<el-table-column prop="typeName" label="类型" width="150"></el-table-column>
						<el-table-column prop="isyihuanName" label="是否已还" width="150"></el-table-column>
						<el-table-column prop="guishurenName" label="关联人" width="150"></el-table-column>
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
						<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
						    :page-size="pageSize" :total="dataCount" :page-sizes="[10, 20, 30, 40,50]" layout="total, sizes, prev, pager, next">
						</el-pagination>
					</div>

				</el-main>
			</el-container>
		</div>

		<el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<span>请填写</span>
			<el-form :model="lijin" :rules="rules" ref="lijin">
				<div slot style="display:none">
					<input v-model="lijin.id" type="hidden">
				</div>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item prop="name">
							<label>姓名</label>
							<el-input v-model="lijin.name" auto-complete="off" :disabled="disabledFlag"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item prop="money">
							<label>金额</label>
							<el-input v-model="lijin.money" auto-complete="off" :disabled="disabledFlag"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item prop="money">
							<label>类型</label>
							<data-dict dictLabel="lijin_type" :dictValue.sync="lijin.type" :dictName.sync="lijin.typeName" :selectDis="disabledFlag"></data-dict>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item prop="isyihuan">
							<label>是否已还</label>
							<data-dict dictLabel="lijin_isyihuan" :dictValue.sync="lijin.isyihuan" :dictName.sync="lijin.isyihuanName" 
								@onChange="isyihuanChange" :selectDis="disabledFlag"></data-dict>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20" v-if="isyihuanShow">
					<el-col :span="12">
						<el-form-item prop="yihuanMoney">
							<label>已还金额</label>
							<el-input v-model="lijin.yihuanMoney" auto-complete="off" :disabled="disabledFlag"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item prop="youjia">
							<label>已还日期</label>
							<el-date-picker v-model="lijin.yihuanDate" type="date" placeholder="选择日期"
								format="yyyy-MM-dd"  value-format="yyyy-MM-dd" :disabled="disabledFlag">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item prop="guishuren">
							<label>关联人</label>
							<data-dict dictLabel="lijin_guishuren" :dictValue.sync="lijin.guishuren" :dictName.sync="lijin.guishurenName" :selectDis="disabledFlag"></data-dict>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item prop="inputDate">
							<label>消费日期</label>
							<el-date-picker v-model="lijin.inputDate" type="date" placeholder="选择日期" 
								format="yyyy-MM-dd"  value-format="yyyy-MM-dd" :disabled="disabledFlag">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="20">
						<el-form-item prop="reason">
							<label>说明</label>
							<el-input v-model="lijin.reason" auto-complete="off" :disabled="disabledFlag"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="clickCancel" v-show="saveBtn">取 消</el-button>
				<el-button @click="dialogVisible = false" v-show="viewBtn">返 回</el-button>
				<el-button type="primary" @click="saveLijin(lijin)" v-show="saveBtn">保 存</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import fetch from '@/util/fetch';
	import { formatTime } from '@/util/dateUtils';
	import { baseUrl } from '@/config/env';

	const listLijinData = data => fetch('/cost/lijin/list', data);
	const save = data => fetch('/cost/lijin/save', data);
	const deleteLijin = data => fetch('/cost/lijin/delete', data);
	const findDictByLabel = data => fetch('/sys/dict/list', data);
	const exportExcel = data => fetch('/cost/lijin/exportExcel', data);


	export default {
		data() {
			return {
				queryType: '',
				queryIsyihuan: '',
				tableData: [],
				currentRow: null,
				count: 2,
				currentPage: 1,
				pageSize: 10,
				dataCount: 0,
				
				// 显示控制区
				isyihuanShow: false,	// 是否已还显示控制
				dialogVisible: false,
				saveBtn: false,
				viewBtn: false,
				disabledFlag: false,
								
				lijin: {},
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
			this.getListLijinData();
		},
		methods: {
			//用于初次加载页面展示，以及按条件查询
			async getListLijinData(queryType) {
				let retObj = await listLijinData({
					type: this.queryType,
					isyihuan: this.queryIsyihuan,
					page: this.currentPage,
					size: this.pageSize
				});
				if (retObj.status != 1) {
					this.$message({
						type: 'error',
						message: '获取数据失败'
					});
					return;
				}
				this.tableData = [];

				retObj.data.list.forEach(item => {
						item.inputDate = formatTime(item.inputDate);
						this.tableData.push(item);
					}

				);
				this.dataCount = retObj.data.total;
			},
			// 导出为excel
			async executeExportExcel(){
				let retObj = await exportExcel({
					type: this.queryType,
					isyihuan: this.queryIsyihuan
				});
				
				if (retObj.status != 1) {
					this.$message({
						type: 'error',
						message: '导出失败'
					});
					return;
				}
				
				window.open(baseUrl + '\\' + retObj.data);
				// window.open(baseUrl + retObj.data, '_blank', 'toolbar=yes, width=1300, height=900');
				
			},
			async saveLijin(rowObj) {
				this.dialogVisible = false;
				let retObj = await save(rowObj);
				if (retObj.status != 1) {
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

				this.getListLijinData();
			},
			async deleteData(rowObj) {
				let retObj = await deleteLijin({
					id: rowObj.id
				});
				if (retObj.status != 1) {
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
				this.getListLijinData();
			},
			handleDelete(rowObj) {
				this.$confirm('确定要删除吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					center: true
				}).then(() => {
					this.deleteData(rowObj);
				}).catch(() => {});
			},
			handleCloseOilWear(done) {
				this.oilWearDialog = false;
				done();
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						this.$refs['lijin'].resetFields();
						done();
					})
					.catch(_ => {});
			},
			clickCancel() {
				this.dialogVisible = false;
				this.$refs['lijin'].resetFields();
			},
			handleSizeChange(val) {
				this.getListLijinData(this.queryType);
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getListLijinData(this.queryType);
			},
			queryData() {
				this.getListLijinData(this.queryType);
			},
			resetData() {
				this.queryType = "";
				this.queryIsyihuan = "";
				this.getListLijinData();
			},
			handleView(rowObj) {
				this.lijin = rowObj;
				
				this.title = '消费详情';
				this.dialogVisible = true;
				this.viewBtn = true;
				this.saveBtn = false;
				this.disabledFlag = true;
				
				this.isyihuanChange(rowObj.isyihuan);
				
			},
			handleAddClick() {
				this.preSave();
				this.action = 'add';
				this.title = '添加消费';
				this.lijin = {};
				this.lijin.isyihuan = '0';
			}, 
			handleEdit(rowObj) {

				this.preSave();
				
				this.lijin = rowObj;
				this.dialogTitle = '编辑消费';
				this.isyihuanChange(rowObj.isyihuan);
			},
			preSave() {
				this.dialogVisible = true;
				this.viewBtn = false;
				this.saveBtn = true;
				this.disabledFlag = false;
			},
			// 是否已还值变换
			isyihuanChange(val){
				let a = val == null ? this.lijin.isyihuan : val;
			
				if(a == '1'){
					this.isyihuanShow = true;	
				} else {
					console.log(a);
					if(val == null){
						this.lijin.yihuanMoney =  '';
						this.lijin.yihuanDate =  '';
					}
					this.isyihuanShow = false;
				}
			}
		},
		components: {

		}
	}
</script>

<style lang="less">
	@import '../../assets/css/mixin';
</style>
