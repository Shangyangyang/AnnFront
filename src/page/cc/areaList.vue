<template>
    <div>

		<bread></bread>
        
        <div class="pageTitle">
			<div class="pageLeftRight">
				<el-container>
					<el-aside style="width: 16%;">
						<div style="height: 40px;line-height: 40px;padding-left: 20px;background: #fbfbfb;">行政区划</div>
						<el-tree :props="treeProps" :load="loadNode" @node-click="handleNodeClick" node-key="code" lazy highlight-current :default-expand-all="false" accordion>
						</el-tree>
					</el-aside>
					<el-main>
						<el-table :data="tableData" stripe border>
							<el-table-column label="行政区划编码" prop="code" width="200"></el-table-column>
							<el-table-column label="行政区划名称" prop="name"></el-table-column>
							<el-table-column label="层级" prop="areaLevel" width="150"></el-table-column>
							<el-table-column label="操作" width="300">
							  <template slot-scope="scope">
								<el-button size="small" @click="handleEdit(scope.row)" icon="el-icon-edit">编辑</el-button>
								<el-button size="small" @click="handleDelete(scope.row)" icon="el-icon-delete">删除</el-button>
								<el-button size="small" @click="handleAdd(scope.row)" icon="el-icon-plus">添加下级</el-button>
							  </template>
							</el-table-column>
						</el-table>
						<div class="Pagination" style="text-align: right;">
							<el-pagination background
								@size-change="handleSizeChange" @current-change="handleCurrentChange"
								:current-page="currentPage" :page-size="pageSize" :total="dataCount"
								:page-sizes="[10, 20, 30, 40,50]" layout="total, sizes, prev, pager, next">
							</el-pagination>
						</div>
					</el-main>
				</el-container>
			</div>
		</div>
		<el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="40%" modal>
			<el-form :model="area">
				<div slot style="display:none">
					<input v-model="area.id" type="hidden">
				</div>
				<el-form-item label="行政区划编码" :label-width="labelWidth">
		  			<el-input v-model="area.code" auto-complete="off" :readonly="codeReadOnly"></el-input>
				</el-form-item>
				<el-form-item label="行政区划名称" :label-width="labelWidth">
		  			<el-input v-model="area.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="行政区划类型" :label-width="labelWidth">		  			
		  			<el-select v-model="area.areaLevel" disabled>
				    	<el-option v-for="item in areaLevels" :key="item.value" :label="item.label" :value="item.value">
				    	</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="上级行政区划" :label-width="labelWidth">
		  			<el-input v-model="area.parentCode" auto-complete="off" readonly></el-input>
		  			<el-input v-model="area.parentName" auto-complete="off" readonly style="padding-top:5px"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false" icon="el-icon-close">取 消</el-button>
				<el-button @click="saveData" type="primary" icon="el-icon-check">保 存</el-button>
			</div>
		</el-dialog>			
        
    </div>
</template>

<script>
	import fetch from '@/util/fetch'
    
	const getAreaData = data => fetch('/cc/area/get', data);

	const listAreaData = data => fetch('/cc/area/list', data);
    const lazyListAreaData = data => fetch('/cc/area/listForLazy', data);
	const insertAreaData = data => fetch('/cc/area/insert', data);
	const updateAreaData = data => fetch('/cc/area/update', data);
	const deleteAreaData = data => fetch('/cc/area/delete', data);
	
    export default {
        data(){
            return {
            	treeProps: {
					label: 'name',
					children: 'children'
				},			
												
				currentPage: 1,
				pageSize: 10,                                
                dataCount: 0,				
            	
            	clickData: {},
            	clickNode: {},
            	
            	areaLevels: [{
					value: '1',
					label: '省'
				},{
					value: '2',
					label: '市'
				},{
					value: '3',
					label: '县（区）'
				},{
					value: '4',
					label: '镇（乡、街道）'
				},{
					value: '5',
					label: '村（社区）'
				}],
            	
                tableData: [], 
                				
				dialogVisible: false,
				dialogTitle: '',
				
				labelWidth: '120px',
				
				codeReadOnly: false,
								
				action: '',
				area: {
					id: '',
					code: '',
					name: '',
					areaLevel: '',					
					parentCode: '',
					parentName: ''					
				}
            }
        },        
        
        methods: {
            handleSizeChange(val) {
                this.pageSize = val;                
                this.getListAreaData2();
            },
            
            handleCurrentChange(val) {
                this.currentPage = val;                
                this.getListAreaData2();
            },
            
            handleAdd(rowObj){            	
            	this.action = 'add';            	
            	this.dialogVisible = true;
            	this.dialogTitle = '行政区划增加';
            	this.codeReadOnly = false;
            	
            	this.area.id = '';
            	this.area.code = rowObj.code;
            	this.area.name = '';
            	this.area.areaLevel = (parseInt(rowObj.areaLevel)+1).toString();
            	this.area.parentCode = rowObj.code;
            	this.area.parentName = rowObj.name;
            },
           
            handleEdit(rowObj){
            	this.action = 'edit';            	            	
            	this.dialogVisible = true;
            	this.dialogTitle = '行政区划修改';
            	this.codeReadOnly = true;
            	
            	this.area.id = rowObj.id;
            	this.area.code = rowObj.code;
            	this.area.name = rowObj.name;
            	this.area.areaLevel = rowObj.areaLevel;            	
            	this.area.parentCode = this.clickData.code;
            	this.area.parentName = this.clickData.name;
            },
            
            handleDelete(rowObj){
        		this.$confirm('确定删除该键值记录?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					center: true
				}).then(() => {
					this.deleteData(rowObj);					
				}).catch(() => {
				});				
			},
            			
			saveData(){
				if(this.action === 'add'){
					this.insertData();					
				}
				if(this.action === 'edit'){
					this.updateData();					
				}			
			},
			
 			handleNodeClick(data,node) {				
				this.clickNode = node;
				this.clickData = data;
				this.currentPage = 1;
				this.getListAreaData2();
			},

            //加载树
            async loadNode(node, resolve) {
                let keyCode = '';
                //用于区分是否是初次加载
                let isInit='0';
                if (node.key != null && node.key != undefined) {
                    keyCode = node.key;
                    isInit='0';
                } else {
                    keyCode = '';
                    isInit='1';
                }
                let dataObj = await this.getLazyListAreaData(keyCode,isInit, 1, 0);
                return resolve(dataObj.list);
            },
            async getLazyListAreaData(code, isInit,page, size){
                let retObj = await lazyListAreaData({parentCode: code,scopeType:'2',isInit:isInit, page: 1, size: 0});
                if (retObj.status != 1) {
                    this.$message({
                        type: 'error',
                        message: '获取数据失败'
                    });
                    return;
                }
                return retObj.data;
            },

			async getListAreaData2(){
                let retObj = await listAreaData({parentCode: this.clickData.code, areaLevel: parseInt(this.clickData.areaLevel)+1, page: this.currentPage, size: this.pageSize});
                if (retObj.status != 1) {
					this.$message({
	                    type: 'error',
	                    message: '获取数据失败'
	                });
	                return;
				}
                
                this.tableData = [];                
                retObj.data.list.forEach(item=>this.tableData.push(item));
                
                this.dataCount = retObj.data.total;
            },
			
            async insertData(){
				let retObj = await insertAreaData(this.area);
				if (retObj.status != 1) {
					this.$message({
				        type: 'error',
						message: '增加数据失败'
				    });
				    return;
				}
				this.$message({
				    type: 'success',
					message: '增加数据完成'
				});
				this.dialogVisible = false;				
				this.getListAreaData2();
				this.clickNode.loaded = false;
            },
                        
            async updateData(){
				let retObj = await updateAreaData(this.area);
				if (retObj.status != 1) {
					this.$message({
				        type: 'error',
						message: '更新数据失败'
				    });
				    return;
				}
				this.$message({
				    type: 'success',
					message: '更新数据完成'
				});
				this.dialogVisible = false;
				this.getListAreaData2();
				this.clickNode.loaded = false;
            },            
			
            async deleteData(rowObj){
				let retObj = await deleteAreaData({id: rowObj.id});
				if (retObj.status != 1) {
					this.$message({
				        type: 'error',
						message: '删除数据失败'
				    });
				    return;
				}
				this.$message({
				    type: 'success',
					message: '删除数据完成'
				});
				this.getListAreaData2();
				this.clickNode.loaded = false;
            }		
          
        },
    }
</script>

<style lang="less">
	@import '../../assets/css/mixin';
</style>