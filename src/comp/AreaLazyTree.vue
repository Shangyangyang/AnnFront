<template>
    <div>
		<el-input :value="areaTreeCode" size="medium" readonly="readonly">
			<el-button @click="choiceArea" :disabled="buttonD" slot="append" icon="el-icon-search"></el-button>
		</el-input>
		<el-input :value="areaTreeName" size="medium" readonly="readonly"></el-input>

		<el-dialog title="行政区划" :visible.sync="dialogVisible" width="30%"  append-to-body>
			<el-form-item>
				<el-tree ref="tree" :props="treeProps" :load="loadNode"  @node-click="handleNodeClick"   node-key="code"   lazy
						 highlight-current :default-expand-all="expand" accordion >
				</el-tree>
			</el-form-item>
		</el-dialog>
    </div>
</template>

<script>
	import fetch from '@/util/fetch'

    const listAreaData = data => fetch('/cc/area/listForLazy', data);

    export default {
        /*areaCodeForSelect 设置打开区划，不设置打开当前用户的区划
         scopeType="1"显示全部数据 "2"显示所在区划及以下数据
          :expandAll=true 打开全部，false 打开一级
          :buttonDis=false 按钮不可选*/
    	props:['areaCodeForSelect','scopeType','expandAll','areaValue','areaLabel','buttonDis'],

    	data(){
    		return {
                dialogVisible:false,
                treeProps: {
                    label: 'name',
                    children: 'children'
                },
    		}
    	},
    	
    	computed: {
            expand:function () {
				return this.expandAll;
            },
            areaTreeName:function () {
                return this.areaLabel;
            },
            areaTreeCode:function () {
                return this.areaValue;
            },
            buttonD:function () {
                return this.buttonDis;
            },
        },
    	created(){
    	},
		methods: {
            //加载树
            async loadNode(node, resolve) {
                let keyCode = '';
                //用于区分是否是初次加载
                let isInit='0';
                if (node.key != null && node.key != undefined) {
                    keyCode = node.key;
                    isInit='0';
                } else {
                    if(this.scopeType!=undefined&&this.scopeType==='2'){
                        keyCode = this.areaCodeForSelect;
					}else{
                        keyCode = '0';
                    }
                    isInit='1';
                }
                let dataObj = await this.getListAreaData(keyCode,isInit, 1, 0);
                return resolve(dataObj.list);
            },
            async getListAreaData(code, isInit,page, size){
                let retObj = await listAreaData({parentCode: code,scopeType:this.scopeType,isInit:isInit, page: 1, size: 0});
                if (retObj.status != 1) {
                    this.$message({
                        type: 'error',
                        message: '获取数据失败'
                    });
                    return;
                }
                return retObj.data;
            },
            handleNodeClick(data, node) {
                this.$emit('update:areaValue', data.code);
                this.$emit('update:areaLabel', data.name);
                this.areaValue=data.code;
                this.areaLabel=data.name;
                this.dialogVisible=false;

            },
            choiceArea(){
              this.dialogVisible=true;
			}
		}
    }
</script>