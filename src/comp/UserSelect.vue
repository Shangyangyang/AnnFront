<template>
    <div>
		<el-form-item>
			<el-select v-model="userValue2"  @change="dataChange" clearable filterable :placeholder="holderStr" :disabled="selectD">
				<el-option v-for="item in userItems" :key="item.userCode" :label="item.userName" :value="item.userCode">
					<span style="float: left">{{ item.userName }}</span>
					<span style="float: right; color: #8492a6; font-size: 13px">{{ item.userCode }}</span>
				</el-option>
			</el-select>
		</el-form-item>
    </div>
</template>

<script>
	import fetch from '@/util/fetch'
	
    const listUserData = data => fetch('/cc/user/listForSelect', data);

    export default {
        /*scopeType ‘1’显示全部数据 ‘2’显示所在机构及以下数据 ‘3’显示所在机构数据 */
    	props:['userType','scopeType','userValue','selectDis','userHolder'],

    	data(){
    		return {
				userItems: [],
    		}
    	},
    	
    	computed: {
    		holderStr: function () {
				return (this.userHolder === null || this.userHolder === undefined || this.userHolder === '')?'请选择用户':this.userHolder;
    		},
            userValue2:function () {
				return this.userValue;
            },
            selectD:function () {
                return this.selectDis;
            }
        },
    	created(){
			this.getListUserData();
    	},
    	    	
		methods: {
			async getListUserData(){
                let retObj = await listUserData({userType: this.userType, scopeType:this.scopeType, page: 1, size: 0});
                if (retObj.status != 1) {
					this.$message({
	                    type: 'error',
	                    message: '获取数据失败'
	                });
	                return;
				}                
                this.userItems = [];
                retObj.data.forEach(item=>this.userItems.push(item));
			},
			
			dataChange(value){
				let obj = {};
				obj = this.userItems.find((item)=>{
					return item.userCode === value;
				});
				this.userValue = value;
				this.$emit('update:userValue', value);
				this.$emit('update:userLabel', obj.userName);
			}			
		}
    }
</script>