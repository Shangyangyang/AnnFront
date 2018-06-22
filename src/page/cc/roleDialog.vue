<template>
    <div>
        <el-dialog :title="title" :visible.sync="visible" width="50%" modal class="roleDialog"   @open="open" :before-close="dialogClose">
            <el-form :model="role"  :rules="rules" ref="role"  >
                <div slot style="display:none">
                    <input v-model="role.id" type="hidden">
                </div>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  prop="name">
                            <label>角色名称</label>
                            <el-input v-model="role.name" auto-complete="off" ></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item  prop="roleCode">
                            <label>角色代码</label>
                            <el-input v-model="role.roleCode" auto-complete="off" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item prop="roleType">
                            <label>角色类型</label>
                            <data-dict dictType="role_type"   :dictValue.sync="role.roleType" :dictLabel.sync="role.roleTypeName"></data-dict>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <el-form-item prop="dataScope">
                            <label>作用域</label>
                            <data-dict dictType="data_scope"  :dictValue.sync="role.dataScope" :dictLabel.sync="role.dataScopeName"></data-dict>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item prop="useable">
                            <label>是否可用</label>
                            <data-dict dictType="yes_no" :dictValue.sync="role.useable" :dictLabel.sync="role.useableName"></data-dict>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item  prop="menuList">
                            <label>菜单</label>
                            <el-tree ref="tree" show-checkbox :props="treeProps" :load="loadNode"  node-key="code" lazy
                                     highlight-current   default-expand-all accordion >
                            </el-tree>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item>
                            <label>备注</label>
                            <el-input v-model="role.remarks" auto-complete="off" type="textarea" :rows="2"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogClose()" icon="el-icon-close">取 消</el-button>
                <el-button @click="saveData('role')" type="primary" icon="el-icon-check">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import fetch from '@/util/fetch'
    const getRoleMenus = data => fetch('/cc/role/getRoleMenus', data);
    const treeListMenuData = data => fetch('/cc/menu/treeList', data);
    const insertRoleData = data => fetch('/cc/role/insert', data);
    const updateRoleData = data => fetch('/cc/role/update', data);

    export default {
        data () {
            return {
                visible: this.show,

                treeProps: {
                    label: 'name',
                    children: 'children'
                },
                //用于加载菜单树
                treeData:[],

                role:{},
                rules: {
                    name: [
                        { required: true, message: '请输入角色名称', trigger: 'blur' }
                    ],
                    roleCode: [
                        { required: true, message: '请输入角色代码', trigger: 'blur' }
                    ],
                    roleType: [
                        { required: true, message: '请选择角色类型', trigger: 'change' }
                    ],
                    useable: [
                        { required: true, message: '请选择是否可用', trigger: 'change' }
                    ]
                }
            };
        },
        props: ['show','dialogT','dataShow','checkAction'],
        watch: {
            show () {
                this.visible = this.show;
            }
        },
        computed: {
            title:function () {
                return this.dialogT;
            }
        },
        methods:{
            open(){
                if(this.checkAction==='edit'){
                    this.role=JSON.parse(JSON.stringify(this.dataShow));
                    delete this.role.createDate;
                    delete this.role.updateDate;
                    this.role.oldRoleCode=  this.dataShow.roleCode;
                    this.getRoleMenus(this.dataShow.roleCode);
                }else{
                    this.role={};
                }
            },
            async getRoleMenus(code){
                let retObj = await getRoleMenus({
                    roleCode:code
                });
                if (retObj.status != 1) {
                    this.$message({
                        type: 'error',
                        message: '获取数据失败'
                    });
                    return;
                }
                this.treeData=(retObj.data.menuCodes===null?[]:retObj.data.menuCodes);
                this.$refs.tree.setCheckedKeys((retObj.data.menuCodes===null?[]:retObj.data.menuCodes),false);
            },
            saveData(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.checkAction === 'add'){
                            this.insertData();
                        }
                        if(this.checkAction === 'edit'){
                            this.updateData();
                        }
                    } else {
                        return false;
                    }
                });
            },
            async insertData(){
                this.role.menuList=this.$refs.tree.getCheckedKeys(true);
                let retObj = await insertRoleData(this.role);
                if (retObj.status != 1) {
                    this.$message({
                        type: 'error',
                        message: '增加数据失败'+retObj.message
                    });
                    return;
                }
                this.$message({
                    type: 'success',
                    message: '增加数据完成'
                });
                this.$emit('refreshList');
                this.dialogClose();
            },
            async updateData(){
                this.role.menuList=this.$refs.tree.getCheckedKeys(true);
                let retObj = await updateRoleData(this.role);
                if (retObj.status != 1) {
                    this.$message({
                        type: 'error',
                        message: '更新数据失败'+retObj.message
                    });
                    return;
                }
                this.$message({
                    type: 'success',
                    message: '更新数据完成'
                });
                this.$emit('refreshList');
                this.dialogClose();
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
                this.$refs.tree.setCheckedKeys(this.treeData,false);
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
            //关闭前对dialog进行处理
            dialogClose(){
                //清空校验
                this.$refs['role'].resetFields();
                this.treeData=[];
                //清空树的勾选
                this.$refs.tree.setCheckedKeys([]);
                this.visible=false;
                //将父页面打开dialog控制设置为false关闭
                this.$emit('update:show', false);
            }
        }
    };
</script>
<style lang="less">
    @import '../../assets/css/mixin';
</style>