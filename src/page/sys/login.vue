<template>
	<div style="margin: 50px;" align="center">
		<div style="width: 40%;">
			<el-form
				:label-position="'right'"
				label-width="80px"
				:model="form"
				:rules="rules"
				ref="form"
			>
				<el-row :gutter="20">
					<el-col :span="24">
						<el-form-item label="用户名" prop="userName" placeholder="请输入用户名">
							<el-input v-model="form.userName"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="24">
						<el-form-item label="密码" prop="password" placeholder="请输入密码">
							<el-input v-model="form.password" type="password"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="验证码" prop="reg" placeholder="请输入验证码">
							<el-input v-model="form.reg"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<div class="el-img"><img @click="editCaptcha" :src="captchaUrl"
						                         title="看不清，单击换一下" style="width: 135px;font-size: 12px;"></div>
					</el-col>
				</el-row>
				<el-button type="primary" @click.prevent="checkForm" native-type="submit">登录</el-button>
				<el-button @click="reset">重置</el-button>
			</el-form>
		</div>
	</div>
</template>

<script>
	import fetch from '@/util/fetch'
	import utils from '@/util/utils'
	
	const loginData = data => fetch('/sys/login', data);
	
	export default {
		data() {
			return {
				form: {
					userName: '',
					password: '',
					reg: ''
				},
				rules: {
					userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
					password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
					reg: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
				},
				
				captchaImg: '',
			};
		},
		created: function()
		{
			this.editCaptcha();
		},	
		computed: {
			captchaUrl: function () {
			    return this.captchaImg;
			}
		},
		methods: {
			editCaptcha() {
			    this.captchaImg = '/captcha?d=' + Math.random();
			},
			checkForm() {
				this.$refs['form'].validate(async valid => {
					if (valid) {
						let retObj = await loginData({
							userName: this.form.userName,
							password: this.form.password,
							reg: this.form.reg,
						});
						
						if(utils.checkResult(retObj, this)){
							this.$message.success('登录成功');
							
							this.storeDataAndGo(retObj)
						}
						
					} else {
						console.log('error submit!!');
						return false;
					}
				}); 
			},
			storeDataAndGo(retObj) {
			    this.$store.commit('saveUserId', retObj.data.id);
			    this.$store.commit('saveUserName', retObj.data.userName);
			    this.$store.commit('saveName', retObj.data.name);
			
			    this.$router.push('/');
			},
			reset(){
				this.editCaptcha();
				this.$refs['form'].resetFields();
			}
		}
	}
</script>

<style></style>
