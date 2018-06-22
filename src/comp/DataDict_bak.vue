<template>
    <div>
		<el-form-item :label="dictDesc" :label-width="labelWidth">
			<el-select v-model="dictValue2"  @change="dataChange" clearable filterable :multiple="multi" :placeholder="holderStr" :disabled="selectD">
				<el-option v-for="item in dictItems" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
		</el-form-item>		
    </div>
</template>

<script>
	import fetch from '@/util/fetch'
	
    const listDictData = data => fetch('/cc/dict/list', data);

    export default {
    	props:['dictType','dictDesc','dictValue','selectDis','labelWidth','dictHolder','isMulti'],

    	data(){
    		return {
				dictItems: [],
    		}
    	},
    	
    	computed: {
    		holderStr: function () {
				return (this.dictHolder === null || this.dictHolder === undefined || this.dictHolder === '')?'请选择':this.dictHolder;
    		},
            dictValue2:function () {
				return this.dictValue;
            },
            selectD:function () {
                return this.selectDis;
            },
            multi:function () {
                return this.isMulti;
            }
		},
    	
    	created(){
			this.getListDictData();
    	},
    	    	
		methods: {
			async getListDictData(){
                let retObj = await listDictData({type: this.dictType, description: this.dictDesc, page: 1, size: 0});
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
                this.dictValue = value;
                this.$emit('update:dictValue', value);
                this.$emit('onChange');
			}
		}
    }
</script>