<template>
    <div>
        <el-dialog  width="80%"  modal  class="userDialog" :visible.sync="dialogShow" :title="dialogTitle" :before-close="dialogClose">

            <div class="table_container areaList">

                <el-container>

                    <el-aside style="width: 16%;">
                        <div style="height: 40px;line-height: 40px;padding-left: 20px;background: #fbfbfb;">组织机构</div>
                        <el-tree :props="treeProps" :load="loadNode" @node-click="handleNodeClick" node-key="code" lazy
                                 highlight-current default-expand-all accordion>
                        </el-tree>
                    </el-aside>

                    <el-main class="adminSet">

                        <el-row type="flex" class="header">
                            <el-col style="width:16px;border-bottom: 1px solid #ccc;"></el-col>
                            <el-col class="admin_title">用户选择列表</el-col>
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
                                        <el-button @click="queryData" type="primary" icon="el-icon-search">查 询</el-button>
                                    </el-col>
                                    <el-col :span="4" :push="5">
                                        <el-checkbox v-model="appState">应用对关联人员是否可用</el-checkbox>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </div>

                        <el-table :data="tableData" stripe border style="width: 98%" @selection-change="selChange">
                            <el-table-column type="selection" width="55"></el-table-column>
                            <el-table-column prop="userCode" label="账号" width="150"></el-table-column>
                            <el-table-column prop="userName" label="姓名" width="150"></el-table-column>
                            <el-table-column prop="officeName" label="所属机构"></el-table-column>
                            <el-table-column prop="areaName" label="行政区划" width="150"></el-table-column>
                            <el-table-column prop="phoneNum" label="联系电话" width="150"></el-table-column>
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

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogClose()" icon="el-icon-close">取 消</el-button>
                <el-button @click="saveUserData()" type="primary" icon="el-icon-check">确 定</el-button>
            </div>

        </el-dialog>

    </div>
</template>

<script>
    import fetch from '@/util/fetch'

    const listOfficeData = data => fetch('/cc/office/list', data);
    const listUserData = data => fetch('/cc/user/list', data);

    export default {
        props: ['dialogTitle', 'dialogShow', 'selUserVal', 'useFlag'],

        data(){
            return {
                queryUserCode: '',
                queryUserName: '',

                clickData: {},

                tableData: [],

                currentPage: 1,
                pageSize: 10,
                dataCount: 0,

                treeProps: {
                    label: 'name',
                    children: 'children'
                },

                selVal: [],

                appState: this.useFlag
            }
        },

        created(){
            this.getListUserData();
        },

        methods: {
            queryData(){
                this.getListUserData();
            },

            handleSizeChange(val) {
                this.pageSize = val;

                if(this.clickData.officeLevel != null && this.clickData.officeLevel != undefined) {
                    this.getListOfficeUserData();
                }else{
                    this.getListUserData();
                }
            },

            handleCurrentChange(val) {
                this.currentPage = val;

                if(this.clickData.officeLevel != null && this.clickData.officeLevel != undefined) {
                    this.getListOfficeUserData();
                }else{
                    this.getListUserData();
                }
            },

            async getListUserData(){
                let retObj = await listUserData({
                    userCode: this.queryUserCode,
                    userName: this.queryUserName,
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
                retObj.data.list.forEach(item =>this.tableData.push(item));
                this.dataCount = retObj.data.total;
            },

            handleNodeClick(data, node) {
                this.clickData = data;
                this.currentPage = 1;
                this.getListOfficeUserData();
            },

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

            async loadNode(node, resolve) {
                let keyCode = '';
                if (node.key != null && node.key != undefined) {
                    keyCode = node.key;
                }
                let dataObj = await this.getListOfficeData(keyCode, node.level + 2, 1, 0);
                return resolve(dataObj.list);
            },

            async getListOfficeData(code, level, page, size){
                let retObj = await listOfficeData({parentCode: code, officeLevel: level, page: page, size: size});
                if (retObj.status != 1) {
                    this.$message({
                        type: 'error',
                        message: '获取数据失败'
                    });
                    return;
                }
                return retObj.data;
            },

            selChange(val) {
                this.selVal = val;
            },

            dialogClose(){
                this.$emit('update:dialogShow', false);
            },

            saveUserData(){
                this.$emit('update:dialogShow', false);
                this.$emit('update:selUserVal', this.selVal);
                this.$emit('update:useFlag', this.appState);
                this.$parent.handleInsert();
            }

        }

    }
</script>

<style lang="less">
    @import '../../assets/css/mixin';
</style>