<template>
    <div>
        <el-dialog :title="title" :visible.sync="visible" width="50%" modal class="menuDialog"   @open="open" :before-close="dialogClose">
                <el-form :model="menu" :rules="rules" ref="menu">
                    <div slot style="display:none">
                        <input v-model="menu.id" type="hidden">
                    </div>

                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item prop="parentCode">
                                <label>上级菜单代码</label>
                                <el-input v-model="menu.parentCode" auto-complete="off" readonly></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item prop="parentName">
                                <label>上级菜单名称</label>
                                <el-input v-model="menu.parentName" auto-complete="off" readonly></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item prop="name">
                                <label>菜单名称</label>
                                <el-input v-model="menu.name" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="code">
                                <label>菜单代码</label>
                                <el-input v-model="menu.code" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item prop="resourceName">
                                <label>资源</label>
                                <el-input v-model="menu.resourceName" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item>
                                <label>权限</label>
                                <el-input v-model="menu.permission" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20">
                        <el-col :span="4">
                            <el-form-item prop="sort">
                                <label>排序</label>
                                <el-input-number v-model="menu.sort" size="small" :min="0"></el-input-number>
                            </el-form-item>
                        </el-col>
                        <el-col :span="20">
                            <el-form-item prop="href">
                                <label>路径</label>
                                <el-input v-model="menu.href" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>


                    <el-row :gutter="20">
                        <el-col :span="24">
                            <el-form-item>
                                <label>备注</label>
                                <el-input v-model="menu.remarks" auto-complete="off" type="textarea" :rows="2"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogClose()" icon="el-icon-close">取 消</el-button>
                    <el-button @click="saveData('menu')" type="primary" icon="el-icon-check">保 存</el-button>
                </div>
            </el-dialog>
    </div>
</template>

<script>
    import fetch from '@/util/fetch'
    const insertMenuData = data => fetch('/cc/menu/insert', data);
    const updateMenuData = data => fetch('/cc/menu/update', data);

    export default {
        data () {
            return {
                visible: this.show,

                menu:{},
                rules: {
                    name: [
                        { required: true, message: '请输入菜单名称', trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '请输入菜单代码', trigger: 'blur' }
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
                    this.menu=JSON.parse(JSON.stringify(this.dataShow));
                    delete this.menu.createDate;
                    delete this.menu.updateDate;
                    this.menu.oldCode=  this.dataShow.code;
                }else{
                    this.menu={};
                    this.menu=JSON.parse(JSON.stringify(this.dataShow));
                }
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
                let retObj = await insertMenuData(this.menu);
                if (retObj.status != 1) {
                    this.$message({
                        type: 'error',
                        message: '增加数据失败' + retObj.message
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
                let retObj = await updateMenuData(this.menu);
                if (retObj.status != 1) {
                    this.$message({
                        type: 'error',
                        message: '更新数据失败' + retObj.message
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
            //关闭前对dialog进行处理
            dialogClose(){
                //清空校验
                this.$refs['menu'].resetFields();
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