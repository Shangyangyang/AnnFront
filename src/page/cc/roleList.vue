<template>
    <div>
        <bread></bread>
        <div class="pageTitle">
            <div class="pageTitleSub">
                <el-form>
                    <el-row :gutter="5">
                        <el-col :span="5">
                            <el-input v-model="queryRoleName" auto-complete="off" placeholder="角色名称"></el-input>
                        </el-col>
                        <el-col :span="5">
                            <data-dict dictType="yes_no" :dictValue.sync="queryUseable" :dictLabel.sync="queryUseableName"  dictHolder="是否可用"></data-dict>
                        </el-col>
                        <el-col :span="8">
                            <el-button @click="queryData" type="primary" icon="el-icon-search">查 询</el-button>
                            <el-button @click="handleAddClick()" type="primary" icon="el-icon-plus" style="background:#fff;color:#000;border:1px solid #ccc;">新 增</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class="pageLeftRight">
                <el-table :data="tableData" stripe border>
                    <el-table-column type="index" width="100" label="序号"></el-table-column>
                    <el-table-column property="name" label="角色名称" width="220"></el-table-column>
                    <el-table-column property="roleTypeName" label="角色类型" width="220"></el-table-column>
                    <el-table-column property="dataScopeName" label="作用域"></el-table-column>
                    <el-table-column property="useableName" label="是否可用" width="220"></el-table-column>
                    <el-table-column label="操作" width="240">
                        <template slot-scope="scope">
                            <el-button size="small" @click="handleEdit(scope.row)" icon="el-icon-edit">编辑
                            </el-button>
                            <el-button size="small" @click="handleDelete(scope.row)" icon="el-icon-delete">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="Pagination">
                    <el-pagination background
                                   @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                   :current-page="currentPage" :page-size="pageSize" :total="dataCount"
                                   :page-sizes="[10, 20, 30, 40,50]" layout="total, sizes, prev, pager, next">
                    </el-pagination>
                </div>
            </div>
        </div>

        <z-dialog :show.sync="show" :dialogT="dialogTitle" :dataShow.sync="rowData"  @refreshList="getListRoleData" :checkAction="action"></z-dialog>
    </div>
</template>

<script>
    import fetch from '@/util/fetch'
    import ZDialog from './roleDialog';

    const listRoleData = data => fetch('/cc/role/list', data);
    const deleteRoleData = data => fetch('/cc/role/delete', data);
    export default {
        data(){
            return {
                queryRoleName:'',
                queryUseable:'',
                queryUseableName:'',
                tableData: [],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 2,
                currentPage: 1,
                pageSize: 10,
                dataCount: 0,

                labelWidth: '120px',
                codeReadOnly: false,

                dialogTitle: '',
                show: false,
                rowData:{},
                action: '',
            }
        },
        created(){
            this.getListRoleData();
        },
        methods: {
            handleSizeChange(val) {
                this.pageSize = val;
                this.queryData();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.queryData();
            },
            queryData(){
                this.getListRoleData(this.queryRoleName,this.queryUseable);
            },
            //用于初次加载页面展示，以及按条件查询
            async getListRoleData(queryRoleName,queryUseable){
                let retObj = await listRoleData({
                    name:queryRoleName,
                    useable:queryUseable,
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

            handleAddClick(){
                this.action = 'add';
                this.dialogTitle = '角色增加';
                this.open ();
            },
            handleEdit(rowObj){
                this.rowData=rowObj;
                this.open ();
                this.action = 'edit';
                this.dialogTitle = '角色修改';
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
            async deleteData(rowObj){
                let retObj = await deleteRoleData({roleCode: rowObj.roleCode});
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
                this.getListRoleData();
            },
            open () {
                this.show = true;
            }
        },
        components: {
            ZDialog
        }
    }
</script>

<style lang="less">
	@import '../../assets/css/mixin';
</style>
