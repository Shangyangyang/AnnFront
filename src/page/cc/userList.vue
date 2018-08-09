<template>
	<div class="fillcontain">
		<bread></bread>
		<div class="table_container areaList">
			<el-container>
				<el-main class="adminSet">
					<el-row type="flex" class="header">
						<el-col style="width:16px;border-bottom: 1px solid #ccc;"></el-col>
						<el-col class="admin_title">用户管理列表</el-col>
						<el-col style="flex: 1;border-bottom: 1px solid #ccc;"></el-col>
					</el-row>
					<div style="padding:20px 10px; width: 100%;border-bottom: 1px solid #e5e5e5;" class="dicTop">
						<el-form>
							<el-row :gutter="20">
								<el-col :span="4">
									<el-input v-model="queryUserName" auto-complete="off" placeholder="账号"></el-input>
								</el-col>
								<el-col :span="4">
									<el-input v-model="queryName" auto-complete="off" placeholder="姓名"></el-input>
								</el-col>
								<el-col :span="8" :push="1">
									<el-button @click="queryData" type="primary" icon="el-icon-search">查&nbsp;询</el-button>
									<el-button @click="resetData" type="primary" icon="el-icon-search">重&nbsp;置</el-button>
									<el-button @click="handleAddClick()" type="primary" icon="el-icon-plus"
                                               style="background:#fff;color:#000;border:1px solid #ccc;">新 增
                                    </el-button>
								</el-col>
							</el-row>
						</el-form>
					</div>
					<el-table :data="tableData" stripe border style="width: 98%">
						<el-table-column prop="userName" label="账号" width="150"></el-table-column>
						<el-table-column prop="name" label="姓名" width="150"></el-table-column>
						<el-table-column prop="stateName" label="状态" width="150"></el-table-column>
						<el-table-column label="操作" width="300">
							<template slot-scope="scope">
								<el-button size="small" @click="handleEdit(scope.row)" icon="el-icon-edit">编辑</el-button>
                                <el-button size="small" @click="handleFreeze(scope.row)" icon="el-icon-edit" v-if="scope.row.state == 1">冻结</el-button>
                                <el-button size="small" @click="handleOpen(scope.row)" icon="el-icon-edit" v-if="scope.row.state == 2">启用</el-button>
                                <el-button size="small" @click="handleCancel(scope.row)" icon="el-icon-delete" v-if="scope.row.state != 3">注销</el-button>
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
		<u-dialog :show.sync="show" :dialogT="dialogTitle" :dataShow.sync="rowData" @refreshList="doRefreshList" :checkAction="action"></u-dialog>
	</div>
</template>

<script>
	import fetch from '@/util/fetch';
    import UDialog from './userDialog';
    
	const listUserData = data => fetch('/sys/user/list', data);
	const updateState = data => fetch('/sys/user/updateState', data);

	export default {
		data() {
			return {
				queryUserName: '',
				queryName: '',
				tableData: [],
				currentRow: null,
				count: 2,
				currentPage: 1,
				pageSize: 10,
				dataCount: 0,

				dialogTitle: '',
				show: false,
				rowData: {},
				action: ''
			}

		},
		created() {
			this.getListUserData();
		},
		methods: {
			//用于初次加载页面展示，以及按条件查询
			async getListUserData(queryUserName, queryName) {
				let retObj = await listUserData({
					name: this.queryName,
					userName: this.queryUserName,
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
			},
			handleSizeChange(val) {
				this.pageSize = val;
				if(this.clickData.officeLevel != null && this.clickData.officeLevel != undefined) {
					this.getListOfficeUserData();
				} else {
					this.getListUserData(this.name, this.queryUserName);
				}
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				if(this.clickData.officeLevel != null && this.clickData.officeLevel != undefined) {
					this.getListOfficeUserData();
				} else {
					this.getListUserData(this.queryName, this.queryUserName);
				}
			},
			queryData() {
				this.getListUserData(this.queryName, this.queryUserName);
			},
			resetData() {
				this.queryName = this.queryUserName = "";
				this.getListUserData();
			},
			handleAddClick(){
                this.action = 'add';
                this.dialogTitle = '添加用户';
                this.rowData={};
				this.show = true;
            },
            handleEdit(rowObj){
                this.rowData=rowObj;
                this.show = true;
                this.action = 'edit';
                this.dialogTitle = '编辑用户';
            },
            doRefreshList(){
                this.getListUserData();
            },
            handleFreeze(rowObj){
                this.$confirm('确定冻结该用户吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                	rowObj.state = '2';
                    this.updateState(rowObj);
                }).catch(() => {
                });
            },
            handleOpen(rowObj){
                this.$confirm('确定启用该用户吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                	rowObj.state = '1';
                    this.updateState(rowObj);
                }).catch(() => {
                });
            },
            handleCancel(rowObj){
                this.$confirm('确定注销该用户吗?注销后将不能恢复！', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                	rowObj.state = '3';
                    this.updateState(rowObj);
                }).catch(() => {
                });
            },
            async updateState(rowObj){
            	if (rowObj.state == '') {
                    this.$message({
                        type: 'error',
                        message: '缺少关键参数'
                    });
                    return;
                }
            	let retObj = await updateState({
            		id: rowObj.id,
            		state: rowObj.state
            	});
                if (retObj.status != 1) {
                    this.$message({
                        type: 'error',
                        message: '操作失败：' + retObj.message
                    });
                    return;
                }
                this.$message({
                    type: 'success',
                    message: '操作成功'
                });
                this.getListUserData();
            }
		},
        components: {
            UDialog
        }
	}
</script>

<style lang="less">
	@import '../../assets/css/mixin';
</style>