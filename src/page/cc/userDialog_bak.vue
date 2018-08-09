<template>
    <div>
        <el-dialog :title="title" :visible.sync="visible" width="50%" modal class="userDialog"   @open="open" :before-close="dialogClose">
            <el-form :model="user"  :rules="rules" ref="user"  >
                <div slot style="display:none">
                    <input v-model="user.id" type="hidden">
                </div>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  prop="userCode">
                            <label>账号</label>
                            <el-input v-model="user.userCode" auto-complete="off" ></el-input>
                           <!-- <user-select :userValue.sync="user.userCodeNew"  :selectDis=false scopeType="1" ></user-select>-->
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item prop="userType">
                            <label>账号类型</label>
                            <data-dict dictType="user_type" :dictValue.sync="user.userType" :dictLabel.sync="user.userTypeName"></data-dict>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item prop="cardNum">
                            <label>证件号码</label>
                            <el-input v-model="user.cardNum" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="cardType">
                            <label>证件类型</label>
                            <!--     <el-input v-model="user.cardType" auto-complete="off"></el-input>-->
                            <data-dict dictType="card_type" :dictValue.sync="user.cardType" :dictLabel.sync="user.cardTypeName"></data-dict>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item prop="userName">
                            <label>姓名</label>
                            <el-input v-model="user.userName" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="phoneNum">
                            <label>电话</label>
                            <el-input v-model="user.phoneNum" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item prop="userPass">
                            <label>密码</label>
                            <el-input type="password" v-model="user.userPass" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="checkPass">
                            <label>确认密码</label>
                            <el-input type="password" v-model="user.checkPass" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item>
                            <label>角色</label>
                            <br>
                            <el-select v-model="user.roleList" size="large"   multiple placeholder="请选择" clearable  >
                                <el-option v-for="item in roles" :key="item.roleCode" :label="item.name" :value="item.roleCode"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item>
                            <label>行政区划</label>
                            <el-input v-model="user.areaCode" auto-complete="off" readonly></el-input>
                            <el-input v-model="user.areaName" auto-complete="off" readonly style="padding-top:5px"></el-input>
                           <!-- <area-tree  :buttonDis=false  scopeType="2" :areaValue.sync="user.areaCode"  :areaLabel.sync="user.areaName" ></area-tree>-->

                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item>
                            <label>组织机构</label>
                            <el-input v-model="user.officeCode" auto-complete="off" readonly></el-input>
                            <el-input v-model="user.officeName" auto-complete="off" readonly style="padding-top:5px"></el-input>
                          <!--  <office-tree officeCodeForSelect="370102" :buttonDis=false  scopeType="2" :officeValue.sync="user.officeCodeNew"  :officeLabel.sync="user.officeName" ></office-tree>
-->
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item>
                            <label>住址</label>
                            <el-input v-model="user.familyAddr" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item>
                            <label>备注</label>
                            <el-input v-model="user.remarks" auto-complete="off" type="textarea" :rows="2"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogClose()" icon="el-icon-close">取 消</el-button>
                <el-button @click="saveData('user')" type="primary" icon="el-icon-check">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import fetch from '@/util/fetch'
    const insertUserData = data => fetch('/cc/user/insert', data);
    const updateUserData = data => fetch('/cc/user/update', data);
    const getUserRoles = data => fetch('/cc/user/getUserRoles', data);
    const allRoleListData = data => fetch('/cc/role/allRoleList', data);

    export default {
        data () {
            var validatePass = (rule, value, callback) => {
                if(this.checkAction === 'add'){
                    if (value === '') {
                        callback(new Error('请输入密码'));
                    } else {
                        if (this.user.checkPass !== '') {
                            this.$refs.user.validateField('checkPass');
                        }
                        callback();
                    }
                }
                if(this.checkAction === 'edit'){
                    if (this.user.checkPass !== '') {
                        this.$refs.user.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if(this.checkAction === 'add'){
                    if (value === '') {
                        callback(new Error('请再次输入密码'));
                    } else if (value !== this.user.userPass) {
                        callback(new Error('两次输入密码不一致!'));
                    } else {
                        callback();
                    }
                }
                if(this.checkAction === 'edit'){
                    if (value !== ''&&value !== this.user.userPass) {
                        callback(new Error('两次输入密码不一致!'));
                    } else {
                        callback();
                    }
                }
            };
            return {
                visible: this.show,
                roles:[],
                user: {},
                rules: {
                    userCode: [
                        { required: true, message: '请输入账号', trigger: 'blur' }
                    ],
                    userName: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                    phoneNum: '',
                    userType: [
                        { required: true, message: '请输入账户类型', trigger: 'change' }
                    ],
                    cardNum: [
                        { required: true, message: '请输入证件号码', trigger: 'blur' }
                    ],
                    cardType: [
                        { required: true, message: '请输入证件类型', trigger: 'change' }
                    ],
                    userPass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
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
                this.getListRoleData();
                if(this.checkAction==='edit'){
                    this.user.id = this.dataShow.id;
                    this.user.userCode = this.dataShow.userCode;
                    this.user.userName = this.dataShow.userName;
                    this.user.userPass = this.dataShow.userPass;
                    this.user.checkPass = this.dataShow.checkPass;
                    this.user.phoneNum = this.dataShow.phoneNum;
                    this.user.userType =this.dataShow.userType;
                    this.user.userTypeName=this.dataShow.userTypeName;
                    this.user.cardNum = this.dataShow.cardNum;
                    this.user.cardType = this.dataShow.cardType;
                    this.user.cardTypeName=this.dataShow.cardTypeName;
                    this.user.familyAddr =  this.dataShow.familyAddr;
                    this.user.officeCode =this.dataShow.officeCode;
                    this.user.officeName = this.dataShow.officeName;
                    this.user.areaCode = this.dataShow.areaCode;
                    this.user.areaName = this.dataShow.areaName;
                    this.user.remarks = this.dataShow.remarks;
                    this.getUserRoles(this.dataShow.userCode);
                }else{
                    this.user={};
                    this.user=JSON.parse(JSON.stringify(this.dataShow));
                }
            }
            /*获取全部角色*/
            async getListRoleData(){
                let retObj = await allRoleListData();
                if (retObj.status != 1) {
                    this.$message({
                        type: 'error',
                        message: '获取数据失败'
                    });
                    return;
                }
                this.roles = [];
                retObj.data.forEach(item => this.roles.push(item));

            },
            //获取用户拥有的角色
            async getUserRoles(code){
                let retObj = await getUserRoles({userCode:code});
                if (retObj.status != 1) {
                    this.$message({
                        type: 'error',
                        message: '获取数据失败'
                    });
                    return;
                }
                this.user.roleList=(retObj.data.roleCodes===null?[]:retObj.data.roleCodes);
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
                let retObj = await insertUserData(this.user);
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
                let retObj = await updateUserData(this.user);
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
            //关闭前对dialog进行处理
            dialogClose(){
                //清空校验
                this.$refs['user'].resetFields();
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