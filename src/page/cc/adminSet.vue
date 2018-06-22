<template>
    <div>
        <bread></bread>

		<div class="pageTitle">
			<el-row class="header">
				<el-col :span="1" style="border-bottom: 1px solid #ccc;height: 52px;"></el-col>
				<el-col :span="4" class="titleText">管理员信息</el-col>
				<el-col :span="19" style="border-bottom: 1px solid #ccc;height: 52px;"></el-col>
			</el-row>
            
            <div class="admin_set">
            	<el-form :model="userObj" :rules="rules" ref="userForm" label-position="left" label-width="80px">

					<el-form-item label="姓名" prop="userName">
						<el-input placeholder="请输入姓名" v-model="userObj.userName"></el-input>
					</el-form-item>

					<el-form-item label="邮编" prop="postCode" style="display: none">
						<el-input placeholder="请输入邮编" v-model="userObj.postCode"></el-input>
					</el-form-item>

					<el-form-item label="颜色" style="display: none">
						<radio-dict dictType='color' :dictValue.sync='userColor1' @change="colorChange1"></radio-dict>
					</el-form-item>

					<el-form-item label="颜色" style="display: none">
						<checkbox-dict dictType='color' :dictValue.sync='userColor2' @change="colorChange2"></checkbox-dict>
					</el-form-item>

					<el-form-item label="颜色" style="display: none">
						<select-dict dictType='color' :dictValue.sync='userColor3' @change="colorChange3"></select-dict>
					</el-form-item>

				</el-form>
            </div>
	    </div>
        
        <el-row class="pageSetBtn">
            <el-col :span="24">
                <el-button type="primary" icon="el-icon-check" @click="saveData">保存</el-button>
            </el-col>
        </el-row>
        
    </div>
</template>

<script>
	
	import initValidator from '@/util/validator'
	
    export default {
        data() {
        	
        	initValidator();		
        	
			return {
				userObj: {
					userName: '',
					postCode: ''
				},
				
				userColor1: '',
				userColor2: '',
				userColor3: '',
				
		        rules: {
		        	userName: [
		        		{ required: true, message: '请输入姓名', trigger: 'blur' },
		        		{ min: 3, max: 10, message: '长度在 3 到 10个字符', trigger: 'blur' },
		        		//{type: 'email2', required: true, message: '请填写邮箱', trigger: 'blur' }
		        	],
		        	postCode:[
		        		//{type:'phone', message: '请输入电话', trigger: 'blur'}
		        		{ len: 6, message: '长度应为6个字符', trigger: 'blur' },
		        		{type:'number', message: '请输入数字', trigger: 'blur'}
		        		//{ min: 6, max: 6, message: '长度应为6个字符', trigger: 'blur' }//,
		        		//{ type: 'integer', message: '应为数字', trigger: 'blur' }
		        		//{ validator: checkNum, trigger: 'blur' }
		        	]
		        },
			};
			
			
        },
        
        methods: {
        	colorChange1(value){
				//console.log(this.userColor1)
			},
        	colorChange2(value){
				//console.log(this.userColor2)
			},
        	colorChange3(value){
				//console.log(this.userColor3)
			},
			saveData(){
				//console.log(this.userObj)
			}
        }
    }
    
</script>

<style lang="less">
	@import '../../assets/css/mixin';
</style>
