<template>
    <div>
		<el-select v-model="dictValue2"  @change="dataChange" :placeholder="placeholder" clearable>
			<el-option v-for="item in dictItems" :key="item.value" :label="item.label" :value="item.value"></el-option>
		</el-select>
    </div>
</template>

<script>
	import fetch from '@/util/fetch'
	
    const listDictData = data => fetch('/cc/dict/list', data);

    export default {
    	props:['placeholder','dictType','dictValue'],

    	data(){
    		return {
				dictItems: [],
				dictValue2: this.dictValue
    		}
    	},
    	    	
    	created(){
			this.getListDictData();
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
                this.$emit('update:dictValue', value);
                this.$emit('change');
			}
		}
    }
</script>