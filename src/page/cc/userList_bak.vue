<template>
    <div class="fillcontain">
        <bread></bread>
        <div class="table_container areaList">
            <el-container>
                <el-aside style="width: 16%;">
                    <div style="height: 40px;line-height: 40px;padding-left: 20px;background: #fbfbfb;">组织机构</div>
                    <el-tree :props="treeProps" :load="loadNode" @node-click="handleNodeClick" node-key="code" lazy
                             highlight-current :default-expand-all="false" accordion>
                    </el-tree>
                </el-aside>
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
                                    <el-input v-model="queryUserCode" auto-complete="off" placeholder="账号"></el-input>
                                </el-col>
                                <el-col :span="4">
                                    <el-input v-model="queryUserName" auto-complete="off" placeholder="姓名"></el-input>
                                </el-col>
                                <el-col :span="4">
                                    <el-input v-model="queryCardNum" auto-complete="off" placeholder="证件号码"></el-input>
                                </el-col>
                                <el-col :span="8" :push="1">
                                    <el-button @click="queryData" type="primary" icon="el-icon-search">查 询</el-button>
                                    <el-button @click="handleAddClick()" type="primary" icon="el-icon-plus"
                                               style="background:#fff;color:#000;border:1px solid #ccc;">新 增
                                    </el-button>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>

                    <el-table :data="tableData" stripe border style="width: 98%">
                        <el-table-column prop="userCode" label="账号" width="150"></el-table-column>
                        <el-table-column prop="userName" label="姓名" width="150"></el-table-column>
                        <el-table-column prop="cardNum" label="证件号码" width="200"></el-table-column>
                        <el-table-column prop="cardTypeName" label="证件类型" width="100"></el-table-column>
                        <el-table-column prop="officeName" label="所属机构" width="150"></el-table-column>
                        <el-table-column prop="areaName" label="行政区划" width="150"></el-table-column>
                        <el-table-column prop="phoneNum" label="联系电话" width="150"></el-table-column>
                        <el-table-column prop="familyAddr" label="家庭住址" width="200"></el-table-column>
                        <el-table-column label="操作" width="300">
                            <template slot-scope="scope">
                                <el-button size="small" @click="handleEdit(scope.row)" icon="el-icon-edit">编辑
                                </el-button>
                                <el-button size="small" @click="handleDelete(scope.row)" icon="el-icon-delete">删除
                                </el-button>
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

                </el-main>
            </el-container>
        </div>

        <u-dialog :show.sync="show" :dialogT="dialogTitle" :dataShow.sync="rowData"  @refreshList="doRefreshList" :checkAction="action"></u-dialog>

    </div>
</template>

<script>
    import fetch from '@/util/fetch'
    import UDialog from './userDialog';
    const getUserData = data => fetch('/cc/user/get', data);
    const getByUserCode = data => fetch('/cc/user/getUserByUserCode', data);
    const listOfficeData = data => fetch('/cc/office/list', data);
    const lazyListOfficeData = data => fetch('/cc/office/listForLazy', data);
    const listUserData = data => fetch('/cc/user/list', data);
    const deleteUserData = data => fetch('/cc/user/delete', data);

    export default {
        data(){
            return {
                checkUserCode:'',
                queryUserCode: '',
                queryUserName: '',
                queryCardNum: '',
                clickData: {},
                clickNode: {},
                tableData: [],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 2,
                currentPage: 1,
                pageSize: 10,
                dataCount: 0,

                treeProps: {
                    label: 'name',
                    children: 'children'
                },


                dialogTitle: '',
                show: false,
                rowData:{},
                action: '',
            }

        },
        created(){
            this.getListUserData();
        },
        methods: {
         /*   async initData(){
                try {
                    const countData = await adminCount();
                    if (countData.status == 1) {
                        this.count = countData.count;
                    } else {
                        throw new Error('获取数据失败');
                    }
                    this.getAdmin();
                } catch (err) {
                    console.log('获取数据失败', err);
                }
                this.getListUserData(this.userCode, this.userName);
                this.getListOfficeData();
            },*/
            handleSizeChange(val) {
                this.pageSize = val;
                if(this.clickData.officeLevel != null && this.clickData.officeLevel != undefined) {
                    this.getListOfficeUserData();
                }else{
                    this.getListUserData(this.queryUserCode, this.queryUserName, this.queryCardNum);
                }
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                if(this.clickData.officeLevel != null && this.clickData.officeLevel != undefined) {
                    this.getListOfficeUserData();
                }else{
                    this.getListUserData(this.queryUserCode, this.queryUserName, this.queryCardNum);
                }
            },
            async getAdmin(){
                try {
                    const res = await adminList({offset: this.offset, limit: this.limit});
                    if (res.status == 1) {
                        this.tableData = [];
                        res.data.forEach(item => {
                            const tableItem = {
                                create_time: item.create_time,
                                user_name: item.user_name,
                                admin: item.admin,
                                city: item.city,
                            }
                            this.tableData.push(tableItem)
                        })
                    } else {
                        throw new Error(res.message)
                    }
                } catch (err) {
                    console.log('获取数据失败', err);
                }
            },
            //用于初次加载页面展示，以及按条件查询
            async getListUserData(queryUserCode, queryUserName, queryCardNum){
                let retObj = await listUserData({
                    userCode: this.queryUserCode,
                    userName: this.queryUserName,
                    cardNum: this.queryCardNum,
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
                retObj.data.list.forEach(item =>
                   /* {
                        if(item.userCode!='admin'&&item.userCode!=state.currentUser){
                            this.tableData.push(item)
                        }
                    }*/
                        this.tableData.push(item)
                    );
                this.dataCount = retObj.data.total;
            },
            queryData(){
                    // alert(state.currentUser);
                     alert(localStorage.getItem('user_name'));
                    this.getListUserData(this.queryUserCode, this.queryUserName, this.queryCardNum);
            },
            handleNodeClick(data, node) {
                this.clickNode = node;
                this.clickData = data;
                this.currentPage = 1;
                this.getListOfficeUserData();
            },
            /*async getByUserCode(userCode){
                let retObj = await getByUserCode({userCode:this.user.userCode});
                if (retObj.status != 1) {
                    this.$message({
                        type: 'error',
                        message: '获取数据失败'
                    });
                    return;
                }
                if(retObj.data===null){
                    return this.checkUserCode=true;
                }

                if(this.user.id!==''&&this.user.id!==null&&retObj.data!==null&&this.user.id===retObj.data.id){
                    return   this.checkUserCode=true;
                }
                return this.checkUserCode=false;
            },*/
            //用于点击左侧机构树查询
            async getListOfficeUserData(){
                let retObj = await listUserData({
                    officeCode: this.clickData.code,
                    officeLevel: parseInt(this.clickData.officeLevel),
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
                retObj.data.list.forEach(item => this.tableData.push(item));

                this.dataCount = retObj.data.total;
            },
            //加载树
            async loadNode(node, resolve) {
                let keyCode = '';
                //用于区分是否是初次加载
                let isInit='0';
                if (node.key != null && node.key != undefined) {
                    keyCode = node.key;
                    isInit='0';
                } else {
                    keyCode = '';
                    isInit='1';
                }
                let dataObj = await this.getLazyListOfficeData(keyCode,isInit, 1, 0);
                return resolve(dataObj.list);
            },
            async getLazyListOfficeData(code, isInit,page, size){
                let retObj = await lazyListOfficeData({parentCode: code,scopeType:'2',isInit:isInit, page: 1, size: 0});
                if (retObj.status != 1) {
                    this.$message({
                        type: 'error',
                        message: '获取数据失败'
                    });
                    return;
                }
                return retObj.data;
            },

            handleAddClick(){
                this.action = 'add';
                this.dialogTitle = '用户增加';
                this.rowData={};
                this.rowData.roleList =[];

                if(this.clickData.officeLevel != null && this.clickData.officeLevel != undefined){

                    this.rowData.officeCode = this.clickData.code;
                    this.rowData.officeName = this.clickData.name;
                    this.rowData.areaCode = this.clickData.areaCode;
                    this.rowData.areaName = this.clickData.areaName;

                    this.show = true;
                }
                else {
                    this.$message({
                        type: 'error',
                        message: '请先选择组织机构'
                    });
                }
            },

            handleEdit(rowObj){
                this.rowData=rowObj;
                this.show = true;
                this.action = 'edit';
                this.dialogTitle = '用户修改';
            },
            handleDelete(rowObj){
                this.$confirm('确定删除该键值记录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.deleteData(rowObj);
                }).catch(() => {
                });
            },
            doRefreshList(){
                this.getListUserData();
                this.clickData={};
                this.clickNode.loaded = false;
            },
            async deleteData(rowObj){
                let retObj = await deleteUserData({userCode: rowObj.userCode});
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
                this.clickData={};
                this.clickNode.loaded = false;
            },
        },
        components: {
            UDialog
        }
    }
</script>

<style lang="less">
    @import '../../assets/css/mixin';
</style>