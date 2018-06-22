<template>
	<div class="fillcontain">
		<bread></bread>

		<div class="pageTitle">

			<div class="pageLeftRight">

				<el-table :data="tableAppData" stripe border highlight-current-row @current-change="handleAppCurrentChange">
					<el-table-column type="index" label="序号" width="50"></el-table-column>
					<el-table-column property="appCode" label="应用编码" width="150"></el-table-column>
                    <el-table-column property="appName" label="应用名称" width="150"></el-table-column>
                    <el-table-column property="appDesc" label="应用描述"></el-table-column>
                    <el-table-column property="enterUrl" label="应用入口" width="200"></el-table-column>
				</el-table>

                <div style="padding:20px 10px; width: 100%;border-bottom: 1px solid #e5e5e5;" class="dicTop">
                    <el-form>
                        <el-row :gutter="20">
                            <el-col :span="4">
                                <el-input v-model="queryUserCode" auto-complete="off" placeholder="账号"></el-input>
                            </el-col>
                            <el-col :span="4">
                                <el-input v-model="queryUserName" auto-complete="off" placeholder="姓名"></el-input>
                            </el-col>

                            <el-col :span="8" :push="1">
                                <el-button @click="queryData" type="primary" icon="el-icon-search">查 询</el-button>
                                <el-button @click="handleAddClick()" type="primary" icon="el-icon-plus" style="background:#fff;color:#000;border:1px solid #ccc;">新增关联</el-button>
                            </el-col>

                        </el-row>
                    </el-form>
                </div>

                <el-table :data="tableUserData" stripe border style="width: 98%">

                    <el-table-column prop="userCode" label="账号" width="150"></el-table-column>
                    <el-table-column prop="userName" label="姓名" width="150"></el-table-column>

                    <el-table-column prop="officeName" label="所属机构" ></el-table-column>
                    <el-table-column prop="areaName" label="行政区划"></el-table-column>
                    <el-table-column prop="phoneNum" label="联系电话" width="150"></el-table-column>
                    <el-table-column prop="appState" label="关联系统状态" width="150"></el-table-column>
                    <el-table-column label="操作" width="150">
                        <template slot-scope="scope">
                            <el-button size="small" @click="handleDelete(scope.row)" icon="el-icon-delete">删除关联</el-button>
                        </template>
                    </el-table-column>

                </el-table>

                <div class="Pagination" style="text-align: right;">
                    <el-pagination background
                                   @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                   :current-page="currentPage" :page-size="pageSize" :total="dataCount"
                                   :page-sizes="[10, 20, 30, 40,50]" layout="total, sizes, prev, pager, next">
                    </el-pagination>
                </div>

            </div>

		</div>

        <select-user-list :dialogTitle='dialogTitle' :dialogShow.sync="selectUserShow" :selUserVal.sync="userSelVal" :useFlag.sync="appState"></select-user-list>
	</div>
</template>

<script>
    import SelectUserList from './selectUserList'
    import fetch from '@/util/fetch'

	const listAppData = data => fetch('/cc/app/list', data);

	const listUserData = data => fetch('/cc/app/listUserBySysApp',data);

    const deleteUserData = data => fetch('/cc/app/deleteUserApp', data);

    const insertUserData = data => fetch('/cc/app/insertUserApp',data);

    export default {
        components: {
            SelectUserList
        },
		data() {
			return {
                selectUserShow: false,

                userSelVal: [],
                appState: true,

				tableAppData: [],

                curAppCode: '',
                curAppName: '',

                tableUserData: [],

                currentPage: 1,
                pageSize: 10,

                dataCount: 0,

                queryUserCode:'',
                queryUserName:''
			}
		},

        computed:{
            dialogTitle: function () {
                return '用户选择（' + this.curAppName + ')';
            }
        },

        /*
        watch:{
            userSelVal:function (newVal,oldVal) {
                console.log(newVal);
                console.log(oldVal);
            }
        },
        */
		
		created(){
            this.getListAppData();
        },
        
		methods: {

            handleAppCurrentChange(val) {
                this.curAppCode = val.appCode;
                this.curAppName = val.appName;
                this.getListUserData();
      		},

            handleSizeChange(val) {
                this.pageSize = val;
                this.getListUserData();
            },

            handleCurrentChange(val) {
                this.currentPage = val;
                this.getListUserData();
            },

            queryData(){
                this.getListUserData();
            },

            handleAddClick(){
                if(this.curAppCode == ''){
                    this.$message({
                        type: 'error',
                        message: '请选择应用'
                    });
                    return;
                }
                this.selectUserShow = true;
            },

            handleInsert(){
               this.insertData();
            },

            handleDelete(rowObj){
                if(this.curAppCode == ''){
                    this.$message({
                        type: 'error',
                        message: '请选择应用'
                    });
                    return;
                }

                this.$confirm('确定删除该用户访问应用 '+this.curAppName+' 的权限?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.deleteData(rowObj);
                }).catch(() => {
                });
            },

            insertData(){
                this.userSelVal.forEach(item => {
                    this.insertSingleData(item.userCode);
                });

                this.getListUserData();

                //this.userSelVal = [];
                this.appState = true;
            },

            async insertSingleData(userCode){
                let appFlag = '0';
                if(this.appState){
                    appFlag = '1';
                }

                let retObj = await insertUserData({userCode: userCode, appCode: this.curAppCode, appState: appFlag});
                if (retObj.status != 1) {
                    this.$message({
                        type: 'error',
                        message: '保存数据失败'
                    });
                    return;
                }
                this.$message({
                    type: 'success',
                    message: '保存数据完成'
                });
            },

            async deleteData(rowObj){
                let retObj = await deleteUserData({userCode: rowObj.userCode, appCode: this.curAppCode});
                if (retObj.status != 1) {
                    this.$message({
                        type: 'error',
                        message: '删除数据失败'
                    });
                    return;
                }
                this.$message({
                    type: 'success',
                    message: '删除数据完成'
                });

                this.getListUserData();
            },

			async getListAppData(){
                let retObj = await listAppData({});

                if (retObj.status != 1) {
					this.$message({
	                    type: 'error',
	                    message: '获取数据失败'
	                });
	                return;
				}
                
                this.tableAppData = [];
                retObj.data.forEach(item=>this.tableAppData.push(item));
           	},

            async getListUserData(){
                let retObj = await listUserData({appCode: this.curAppCode, userCode: this.queryUserCode, userName: this.queryUserName, page: this.currentPage, size: this.pageSize});

                if (retObj.status != 1) {
                    this.$message({
                        type: 'error',
                        message: '获取数据失败'
                    });
                    return;
                }

                this.tableUserData = [];
                retObj.data.list.forEach(item=>this.tableUserData.push(item));
                this.dataCount = retObj.data.total;
            }
        }

	}
</script>

<style lang="less">
	@import '../../assets/css/mixin';
</style>