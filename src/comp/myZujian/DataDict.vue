<template>
	<div>
		<el-form>
			<el-form-item :label="dictDesc" :label-width="labelWidth" ref="dataDict">
				<el-select v-model="dictValue2"  @change="dataChange" clearable filterable :multiple="multi" :placeholder="holderStr" :disabled="selectD">
					<el-option v-for="item in dictItemsAble" :key="item.value" :label="item.name" :value="item.value"></el-option>
				</el-select>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import fetch from '@/util/fetch';
	import utils from '@/util/utils';

    const listDictData = data => fetch('sys/dict/list', data);

    export default {
        props:['dictType','dictDesc','dictLabel','dictValue','selectDis','labelWidth','dictHolder','isMulti','dictAble'],

        data(){
            return {
                dictItems: [],
                dictItemsAble:[],
                dictKeyValue:{}
            }
        },
        watch:{
            showData(){
                if(this.dictAble!=null && this.dictAble!=undefined&&this.dictItems!=undefined&&this.dictItems!=[]){
                    this.dictItemsAble=[];
                    this.dictItems.forEach(item=>{
                        if(this.dictAble.indexOf(item.value)!=-1){
                            this.dictItemsAble.push(item);
                        }
                    });
                }
            }
        },
        computed: {
            holderStr: function () {
                return (this.dictHolder === null || this.dictHolder === undefined || this.dictHolder === '')?'请选择':this.dictHolder;
            },
            dictValue2:{
                set:function(){

                },
                get:function(){
                    return this.dictValue;
                }

            },
            selectD:function () {
                if("true"==this.selectDis || this.selectDis){
                    return true
                }else{
                    return false
                }
            },
            multi:function () {
                if("true"==this.isMulti || this.isMulti){
                    return true
                }else{
                    return false
                }
            },
            showData:function () {
                return JSON.stringify(this.dictAble);
            }
        },

        mounted(){
            if( this.dictType!=null&& this.dictType!=''){
                this.getListDictData();
            }
        },

        methods: {
            async getListDictData(){
                let retObj = await listDictData({label: this.dictType, description: this.dictDesc, page: 1, size: 0});
                if (retObj.status != 1) {
                    this.$message({
                        type: 'error',
                        message: '获取数据失败'
                    });
                    return;
                }
                this.dictItems = [];
                retObj.data.list.forEach(item=>{
                    this.dictItems.push(item)
                    this.dictKeyValue[item.value]=(item.label==undefined?'未知:'+item.value:item.label);
                    if(this.dictAble!=null && this.dictAble!=undefined){
                        if(this.dictAble.indexOf(item.value)!=-1){
                            this.dictItemsAble.push(item)
                        }
                    }else{
                        this.dictItemsAble.push(item)
                    }
                });

            },

            dataChange(value){
                this.dictValue2 = value;
                this.$emit('update:dictValue', value);
                this.$emit('onChange');
                if('true'==this.isMulti){
                    let returnStr=[];
                    value.forEach(item=>{
                        returnStr.push(this.dictKeyValue[item]);
                    });
                    this.$emit('update:dictLabel', returnStr.join(','));
                    this.$emit('onChange');
                }else{
                    let returnStr='';
                    returnStr=this.dictKeyValue[value];
                    this.$emit('update:dictLabel', returnStr);
                    this.$emit('onChange');
                }

            }
        }
    }
</script>