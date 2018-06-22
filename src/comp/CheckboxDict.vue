<template>
    <div>
		<el-checkbox-group v-model="dictValue2" @change="dataChange">
			<el-checkbox v-for="item in dictItems" :key="item.value" :label="item.value">{{item.label}}</el-checkbox>
		</el-checkbox-group>
    </div>
</template>

<script>
	import fetch from '@/util/fetch'
	
    const listDictData = data => fetch('/cc/dict/list', data);

    export default {
    	props:['dictType','dictValue'],

    	data(){
    		return {
				dictItems: [],
				dictValue2: []
    		}
    	},    	
    	
    	created(){
			this.getListDictData();
			if(this.dictValue != undefined && this.dictValue != ''){
				this.dictValue2 = this.dictValue.split(',');
			}
    	},
    	    	
		methods: {
			async getListDictData(){
                let retObj = await listDictData({type: this.dictType, page: 1, size: 0});
                if (retObj.status != 1) {
					this.$message({
	                    type: 'error',
	                    message: '获取数据失败'
	                });
	                return;
				}                
                this.dictItems = [];                
                retObj.data.list.forEach(item=>this.dictItems.push(item));
			},
			
			dataChange(value){
                this.dictValue2 = value;
                this.$emit('update:dictValue', this.dictValue2.join(','));
                this.$emit('change');
			}
		}
		
    }
</script>