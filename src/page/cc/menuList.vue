<template>
    <div>
        <bread></bread>
        <div class="pageTitle">
            <div class="pageLeftRight">
                <el-container>
                    <el-aside style="width: 16%">
                        <div style="height: 40px;line-height: 40px;padding-left: 20px;background: #fbfbfb;">菜单结构树</div>
                        <el-tree :props="treeProps" :load="loadNode" @node-click="handleNodeClick" node-key="code" lazy
                                 highlight-current default-expand-all accordion>
                        </el-tree>
                    </el-aside>
                    <el-main>
                        <div class="pageTitleSub">
                            <el-form>
                                <el-row :gutter="5">
                                    <el-col :span="5">
                                        <el-input v-model="queryMenuName" auto-complete="off" placeholder="菜单名称"></el-input>
                                    </el-col>
                                    <el-col :span="5">
                                        <el-input v-model="queryHref" auto-complete="off" placeholder="路径"></el-input>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-button @click="queryData" type="primary" icon="el-icon-search">查 询</el-button>
                                        <el-button @click="handleAddClick()" type="primary" icon="el-icon-plus" style="background:#fff;color:#000;border:1px solid #ccc;">新 增</el-button>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </div>
                        <el-table :data="tableData" stripe border>
                            <el-table-column type="index" width="60" label="序号"></el-table-column>
                            <el-table-column property="name" label="菜单名称" width="150"></el-table-column>
                            <el-table-column property="code" label="菜单代码" width="150"></el-table-column>
                            <el-table-column property="href" label="路径"></el-table-column>
                            <el-table-column property="resourceName" label="资源" width="160"></el-table-column>
                            <el-table-column property="permission" label="权限" width="160"></el-table-column>
                            <el-table-column property="sort" label="排序" width="60"></el-table-column>
                            <el-table-column label="操作" width="200">
                                <template slot-scope="scope">
                                    <el-button size="small" @click="handleEdit(scope.row)" icon="el-icon-edit">编辑</el-button>
                                    <el-button size="small" @click="handleDelete(scope.row)" icon="el-icon-delete">删除</el-button>
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
                    </el-main>
                </el-container>
            </div>
        </div>
        <m-dialog :show.sync="show" :dialogT="dialogTitle" :dataShow.sync="rowData"  @refreshList="doRefreshList" :checkAction="action"></m-dialog>
    </div>
</template>

<script>
    import fetch from '@/util/fetch'
    import MDialog from './menuDialog';
    const listMenuData = data => fetch('/cc/menu/list', data);
    const treeListMenuData = data => fetch('/cc/menu/treeList', data);
    const deleteMenuData = data => fetch('/cc/menu/delete', data);


    export default {
        data(){
            return {
                queryMenuName: '',
                queryHref: '',
                tableData: [],
                currentPage: 1,
                pageSize: 10,
                dataCount: 0,
                clickData: {},
                clickNode: {},

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
             this.getListMenuData();
        },
        methods: {
            //用于初次加载页面展示，以及按条件查询
            async getListMenuData(){
                let retObj = await listMenuData({
                    name: this.queryMenuName,
                    href: this.queryHref,
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
            handleSizeChange(val) {
                this.pageSize = val;
                if (this.clickData.code != null && this.clickData.code != undefined) {
                    this.getListMenuDataByNode();
                } else {
                    this.getListMenuData(this.queryMenuName, this.queryHref);
                }
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                if (this.clickData.code != null && this.clickData.code != undefined) {
                    this.getListMenuDataByNode();
                } else {
                    this.getListMenuData(this.queryMenuName, this.queryHref);
                }
            },
            queryData(){
                this.getListMenuData(this.queryMenuName, this.queryHref);
            },

            //节点点击事件
            handleNodeClick(data, node) {
                this.clickNode = node;
                this.clickData = data;
                this.currentPage = 1;
                this.getListMenuDataByNode();
            },

            //用于点击左侧机构树查询
            async getListMenuDataByNode(){
                let retObj = await listMenuData({
                    parentCode: this.clickData.code,
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
                if (node.key != null && node.key != undefined) {
                    keyCode = node.key;
                } else {
                    keyCode = '0';
                }
                let dataObj = await this.getListMenuTreeData(keyCode, 1, 0);
                return resolve(dataObj.list);
            },
            async getListMenuTreeData(code, page, size){
                let retObj = await treeListMenuData({parentCode: code, page: page, size: size});
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
                this.dialogTitle = '菜单增加';
                this.rowData={};
                this.rowData.sort = '10';

                if (this.clickData.code != null && this.clickData.code != undefined) {

                    this.rowData.parentCode = this.clickData.code;
                    this.rowData.parentName = this.clickData.name;
                    this.show = true;
                }
                else {
                    this.$message({
                        type: 'error',
                        message: '请先选择上级菜单'
                    });
                }
            },

            handleEdit(rowObj){
                this.rowData=rowObj;
                this.show = true;
                this.action = 'edit';
                this.dialogTitle = '菜单修改';
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
                this.getListMenuData();
                this.clickNode.loaded = false;
                this.clickData={};
            },
            async deleteData(rowObj){
                let retObj = await deleteMenuData({code: rowObj.code});
                if (retObj.status != 1) {
                    this.$message({
                        type: 'error',
                        message: '删除数据失败' + retObj.message
                    });
                    return;
                }
                this.$message({
                    type: 'success',
                    message: '删除数据完成'
                });
                this.getListMenuData();
                this.clickNode.loaded = false;
                this.clickData={};
            },
        },
        components: {
            MDialog
        }
    }
</script>

<style lang="less">
	@import '../../assets/css/mixin';
</style>
