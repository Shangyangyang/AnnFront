<template>
    <div>
		<el-input :value="officeTreeCode" size="medium" readonly="readonly">
			<el-button @click="choiceOffice" :disabled="buttonD" slot="append" icon="el-icon-search"></el-button>
		</el-input>
		<el-input :value="officeTreeName" size="medium" readonly="readonly"></el-input>

		<el-dialog title="组织机构" :visible.sync="dialogVisible" width="30%"  append-to-body>
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

    const listOfficeData = data => fetch('/cc/office/listForLazy', data);

    export default {
        /*officeCodeForSelect 设置打开机构，不设置打开当前用户所在机构
         scopeType="1"显示全部数据 "2"显示所在机构及以下数据
          :expandAll=true 打开全部，false 打开一级
          :buttonDis=false 按钮不可选*/
    	props:['officeCodeForSelect','scopeType','expandAll','officeValue','officeLabel','buttonDis'],

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
            officeTreeName:function () {
                return this.officeLabel;
            },
            officeTreeCode:function () {
                return this.officeValue;
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
                        keyCode = this.officeCodeForSelect;
					}else{
                        keyCode = '0';
                    }
                    isInit='1';
                }
                let dataObj = await this.getListOfficeData(keyCode,isInit, 1, 0);
                return resolve(dataObj.list);
            },
            async getListOfficeData(code, isInit,page, size){
                let retObj = await listOfficeData({parentCode: code,scopeType:this.scopeType,isInit:isInit, page: 1, size: 0});
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
                this.officeLabel=data.name;
				this.officeValue=data.code;
                this.$emit('update:officeValue', data.code);
                this.$emit('update:officeLabel', data.name);
                this.dialogVisible=false;
            },
            choiceOffice(){
              this.dialogVisible=true;
			}
		}
    }
</script>