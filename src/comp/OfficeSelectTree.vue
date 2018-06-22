<template>
    <div>
        <el-input :value="officeTreeCode" size="medium" readonly="readonly">
            <el-button @click="choiceOffice" :disabled="buttonD" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-input :value="officeTreeName" size="medium" readonly="readonly"></el-input>

        <el-dialog title="组织机构" :visible.sync="dialogVisible" width="30%"  append-to-body>
            <el-input
                    placeholder="输入关键字进行过滤"
                    v-model="filterText">
            </el-input>
            <el-form-item>
                <el-tree ref="tree" :props="treeProps" :data="data"  @node-click="handleNodeClick"   node-key="code"  :filter-node-method="filterNode"
                         highlight-current :default-expand-all="expand" accordion >
                </el-tree>
            </el-form-item>
        </el-dialog>
    </div>
</template>

<script>
    import fetch from '@/util/fetch'

    const listOfficeData = data => fetch('/cc/office/listForSelect', data);

    export default {
        /*officeCodeForSelect 设置打开机构，不设置打开当前用户所在机构
         scopeType="1"显示全部数据 "2"显示所在机构及以下数据
         :expandAll=true 打开全部，false 打开一级
         :buttonDis=false 按钮不可选*/
        props:['officeCodeForSelect','scopeType','expandAll','officeValue','officeLabel','buttonDis'],

        data(){
            return {
                filterText: '',
                data:[],
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
            if(this.scopeType!=undefined&&this.scopeType==='2'){
                this.getListOfficeData(this.officeCodeForSelect,1,0);
            }else{
                this.getListOfficeData('0',1,0);
            }
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        methods: {
            async getListOfficeData(code,page, size){
                let retObj ;
                if(this.scopeType!=undefined&&this.scopeType==='2'){
                    retObj= await listOfficeData({code: code,scopeType:this.scopeType,page: 1, size: 0});
                }else{
                    retObj= await listOfficeData({parentCode: code,scopeType:this.scopeType,page: 1, size: 0});
                }
                if (retObj.status != 1) {
                    this.$message({
                        type: 'error',
                        message: '获取数据失败'
                    });
                    return;
                }
                return this.data=retObj.data.list;
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
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