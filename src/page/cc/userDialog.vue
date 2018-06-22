<template>
	<div>
		<el-dialog :title="title" :visible.sync="visible" width="50%" modal class="userDialog" @open="open" :before-close="dialogClose">
			<el-form :model="user" :rules="rules" ref="user">
				<div slot  style="display:none">
					<input v-model="user.id" type="hidden">
				</div>

				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item prop="userName">
							<label>账号</label>
							<el-input v-model="user.userName" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item prop="name">
							<label>姓名</label>
							<el-input v-model="user.name" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item prop="userPass">
							<label>密码</label>
							<el-input type="password" v-model="user.password" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item prop="checkPass">
							<label>确认密码</label>
							<el-input type="password2" v-model="user.password2" auto-complete="off"></el-input>
						</el-form-item> 
					</el-col>
				</el-row>

				<!--<el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item>
                            <label>角色</label>
                            <br>
                            <el-select v-model="user.roleList" size="large"   multiple placeholder="请选择" clearable  >
                                <el-option v-for="item in roles" :key="item.roleCode" :label="item.name" :value="item.roleCode"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>-->
			</el-form>
			<div slot="footer" class="dialog-footer" :show="saveBtnFlag">
				<el-button @click="dialogClose()" icon="el-icon-close">取 消</el-button>
				<el-button @click="saveData('user')" type="primary" v-show="saveBtnFlag" icon="el-icon-check">保 存</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import fetch from '@/util/fetch'
	var _ = require('lodash');
	const insertUserData = data => fetch('/sys/user/add', data);
	const updateUserData = data => fetch('/sys/user/update', data);
	const checkUserName = data => fetch('/sys/user/checkUserName', data);

	export default {
		data() {
			var validatePass = (rule, value, callback) => {
				if(this.checkAction === 'add') {
					if(value === '') {
						callback(new Error('请输入密码'));
					} else {
						if(this.user.password !== '') {
							this.$refs.user.validateField('password');
						}
						callback();
					}
				}
				if(this.checkAction === 'edit') {
					if(this.user.checkPass !== '') {
						this.$refs.user.validateField('password');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if(this.checkAction === 'add') {
					if(value === '') {
						callback(new Error('请再次输入密码'));
					} else if(value !== this.user.password) {
						callback(new Error('两次输入密码不一致!'));
					} else {
						callback();
					}
				}
				if(this.checkAction === 'edit') {
					if(value !== '' && value !== this.user.password) {
						callback(new Error('两次输入密码不一致!'));
					} else {
						callback();
					}
				}
			};
			return {
				visible: this.show,
				roles: [],
				user: {},
				saveBtnFlag: true,
				rules: {
					userName: [{
						required: true,
						message: '请输入账号',
						trigger: 'blur'
					}],
					name: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}],
					password: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					password2: [{
						validator: validatePass2,
						trigger: 'blur'
					}]
				}
			};
		},
		created: function(){
			 this.debouncedCheckUserName = _.debounce(this.checkUserName, 800);
		},
		props: ['show', 'dialogT', 'checkAction'],
		watch: {
			show() {
				this.visible = this.show;
			},
			'user.userName': function(newName, oldName){
				this.debouncedCheckUserName();
			}
		},
		computed: {
			title: function() {
				return this.dialogT;
			}
		},
		methods: {
			open() {
//				this.getListRoleData();
				if(this.checkAction === 'edit') {
					this.user.id = this.dataShow.id;
					this.user.userName = this.dataShow.userName;
					this.user.name = this.dataShow.name;
					this.user.userPass = this.dataShow.password;
					this.user.checkPass = this.dataShow.password;
				} else {
					this.user = {};
				}
			},
			saveData(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						if(this.checkAction === 'add') {
							this.insertData();
						}
						if(this.checkAction === 'edit') {
							this.updateData();
						}
					} else {
						return false;
					}
				});
			},
			async insertData() {
				let retObj = await insertUserData(this.user);
				if(retObj.status != 1) {
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
			async updateData() {
				let retObj = await updateUserData(this.user);
				if(retObj.status != 1) {
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
			dialogClose() {
				//清空校验
				this.$refs['user'].resetFields();
				this.visible = false;
				//将父页面打开dialog控制设置为false关闭
				this.$emit('update:show', false);
			},
			async checkUserName(){
				if(this.user.userName == ''){
					console.log("为空");
					return;
				}
				let aa = await checkUserName(this.user);
				if(aa.status != 1){
					this.$message({
						type: 'error',
						message: aa.message
					});
					this.saveBtnFlag = false;
				} else {
					this.saveBtnFlag = true;
				}
				
			}
		}
	};
</script>
<style lang="less">
	@import '../../assets/css/mixin';
</style>