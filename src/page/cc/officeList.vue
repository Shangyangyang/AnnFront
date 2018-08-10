<template>
    <div class="fillcontain">

		<bread></bread>
		
        <div class="table_container officeList">
        	<el-container>
        		<el-aside style="width:16%;">
        			<el-tabs v-model="activeName" type="card" @tab-click="handleTabClick">
        				<el-tab-pane label="按行政区划" name="areaTab">
	        				<el-tree :props="treeProps" :load="loadNode1" @node-click="handleNodeClick1" node-key="code" lazy highlight-current :default-expand-all="false" accordion>
		        			</el-tree>
	        			</el-tab-pane>
	        			<el-tab-pane label="按层级结构" name="levelTab">
		        			<el-tree :props="treeProps" :load="loadNode2" @node-click="handleNodeClick2" node-key="code" lazy highlight-current :default-expand-all="false" accordion>
		        			</el-tree>
	        			</el-tab-pane>
        			</el-tabs>        			
        		</el-aside>
        		<el-main>

					<div style="padding-top: 10px; width: 100%;border-bottom: 1px solid #e5e5e5;">
						<el-form>
							<el-row>
								<el-col :span="12">
									<data-dict class="selectType" dictType="office_type" :dictValue.sync="queryOfficeTypeCode" :dictLabel.sync="queryOfficeTypeName" dictHolder='组织机构类型'></data-dict>
									<el-input class="officeName" v-model="queryOfficeName" auto-complete="off" placeholder="机构名称"></el-input>
								</el-col>
								<el-col :span="8" :push="1">
									<el-button @click="queryData" type="primary" icon="el-icon-search">查 询</el-button>
									<el-button @click="handleAdd()" type="primary" v-show='showAddBtn' icon="el-icon-plus">新 增</el-button>
								</el-col>
							</el-row>
						</el-form>
					</div>

		            <el-table :data="tableData" stripe border style="width: 98%">
		                <el-table-column label="机构编码" prop="code" width="100"></el-table-column>
		                <el-table-column label="机构名称" prop="name" width="180"></el-table-column>
		                <el-table-column label="机构类型" prop="typeName" width="100"></el-table-column>
		                <el-table-column label="层级" prop="officeLevel" width="50"></el-table-column>
		                <el-table-column label="行政区划" prop="areaName" width="100"></el-table-column>
		                <el-table-column label="地址" prop="address"></el-table-column>
		                <el-table-column label="联系电话" prop="phone" width="100"></el-table-column>
		                <el-table-column label="传真" prop="fax" width="100"></el-table-column>
		                <el-table-column label="排序" prop="sort" width="50"></el-table-column>
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
        
		<el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="50%" modal class="officeDialog">
			<el-form :model="office">
				<div slot style="display:none">
					<input v-model="office.id" type="hidden">
				</div>
				
				<el-row>
					<el-col :span="12">
						<el-form-item>
							<label>机构编码</label>
				  			<el-input v-model="office.code" auto-complete="off" :readonly="codeReadOnly"></el-input>
						</el-form-item>
					</el-col>
				
					<el-col :span="12">
						<el-form-item>
							<label>机构名称</label>
				  			<el-input v-model="office.name" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				
				<el-row>
					<el-col :span="12">
						<el-form-item>
							<label>组织机构类型</label>
							<data-dict dictType="office_type" :dictValue.sync="office.type" :dictLabel.sync="office.typeName"></data-dict>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item>
							<label>机构地址</label>
				  			<el-input v-model="office.address" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				
				<el-row>
					<el-col :span="12">
						<el-form-item>
							<label>电话</label>
				  			<el-input v-model="office.phone" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item>
							<label>传真</label>
				  			<el-input v-model="office.fax" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				
				<el-row>
					<el-col :span="12">
						<el-form-item>
							<label>排序</label>
				  			<el-input v-model="office.sort" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item>
							<label>层级</label>
				  			<el-input v-model="office.officeLevel" auto-complete="off" readonly></el-input>
						</el-form-item>
					</el-col>
				</el-row>				
				
				<el-row>
					<el-col :span="12">
						<el-form-item>
							<label>行政区划</label>
				  			<el-input v-model="office.areaCode" auto-complete="off" readonly></el-input>
				  			<el-input v-model="office.areaName" auto-complete="off" readonly style="padding-top:5px"></el-input>
						</el-form-item>						
					</el-col>
					<el-col :span="12">
						<el-form-item>
							<label>上级机构</label>
				  			<el-input v-model="office.parentCode" auto-complete="off" readonly></el-input>
				  			<el-input v-model="office.parentName" auto-complete="off" readonly style="padding-top:5px"></el-input>
						</el-form-item>						
					</el-col>
				</el-row>
				
				<el-row>
					<el-col :span="24">				
						<el-form-item>
							<label>备注</label>
				  			<el-input v-model="office.remarks" auto-complete="off" type="textarea" :rows="2"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				
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
    
    const listAreaData = data => fetch('/cc/area/list', data);
    const lazyListAreaData = data => fetch('/cc/area/listForLazy', data);
	const getOfficeData = data => fetch('/cc/office/get', data);
    const lazyListOfficeData = data => fetch('/cc/office/listForLazy', data);
	const listOfficeData = data => fetch('/cc/office/list', data);
		
	const insertOfficeData = data => fetch('/cc/office/insert', data);
	const updateOfficeData = data => fetch('/cc/office/update', data);
	const deleteOfficeData = data => fetch('/cc/office/delete', data);

    export default {
        data(){
            return {
				activeName: 'areaTab',
				showAddBtn: false,
				
				queryOfficeTypeCode: '',
				queryOfficeTypeName: '',
				
				queryOfficeName: '',
				
            	treeProps: {
					label: 'name',
					children: 'children'
				},			
												
				currentPage: 1,
				pageSize: 10,                                
                dataCount: 0,				
            	
            	clickData1: {},
            	clickNode1: {},
            	
            	clickData2: {},
            	clickNode2: {},            	
            	
                tableData: [], 
                				
				dialogVisible: false,
				dialogTitle: '',
				
				labelWidth: '120px',
				
				codeReadOnly: false,
								
				action: '',
				office: {
					id: '',
					code: '',
					name: '',
					
					type: '',
					typeName: '',
					
					officeLevel: '',
					
					parentCode: '',
					parentName: '',
					
					areaCode: '',
					areaName: '',
					
					address: '',
					phone: '',
					fax: '',
					
					sort: '10',
					remarks: ''
				}
            }
        },
        
        methods: {
        	handleTabClick(){
        		this.showAddBtn = this.activeName === 'levelTab';	
        	},
        	
            handleSizeChange(val) {
                this.pageSize = val;                
                this.qryListOfficeData();
            },
            
            handleCurrentChange(val) {
                this.currentPage = val;                
                this.qryListOfficeData();
            },
            
			queryData(){			
				this.queryListOfficeData();			
			},           
            
            handleAdd(rowObj){            	
            	this.action = 'add';
            	this.dialogTitle = '机构增加';
            	this.codeReadOnly = false;
            	
            	this.office.id = '';
            	this.office.code = '';
            	this.office.name = '';
            	
            	this.office.address = '';
            	this.office.phone = '';
            	this.office.fax = '';
            	this.office.sort = '10';
            	this.office.remarks = '';
            	
            	this.office.type = '';
            	this.office.typeName = '';
            	
            	this.office.officeLevel = '';
            	
            	this.office.parentCode = '';
            	this.office.parentName = '';
            	
            	this.office.areaCode = '';
            	this.office.areaName = '';            	
            	
            	if(rowObj != null && rowObj != undefined){
	            	this.office.officeLevel = (parseInt(rowObj.officeLevel)+1).toString();
	            	
	            	this.office.parentCode = rowObj.code;
	            	this.office.parentName = rowObj.name;
	            	
	            	this.office.areaCode = rowObj.areaCode;
	            	this.office.areaName = rowObj.areaName;
	            	
	            	this.dialogVisible = true;
            	}
            	else{
            		if(this.activeName === 'levelTab'){
            			if(this.clickData2.officeLevel != null && this.clickData2.officeLevel != undefined){
			            	this.office.officeLevel = (parseInt(this.clickData2.officeLevel)+1).toString();
			            	
			            	this.office.parentCode = this.clickData2.code;
			            	this.office.parentName = this.clickData2.name;
			            	
			            	this.office.areaCode = this.clickData2.areaCode;
			            	this.office.areaName = this.clickData2.areaName;
			            	
			            	this.dialogVisible = true;
		            	}
            			else{
            				this.$message({
			                    type: 'error',
			                    message: '请先选择组织机构'
	                		});
            			}
            		}            		
            	}
            },
           
            handleEdit(rowObj){
            	this.action = 'edit';            	            	
            	this.dialogVisible = true;
            	this.dialogTitle = '机构修改';
            	this.codeReadOnly = true;
            	
            	this.office.id = rowObj.id;
            	this.office.code = rowObj.code;
            	this.office.name = rowObj.name;
            	
            	this.office.address = rowObj.address;
            	this.office.phone = rowObj.phone;
            	this.office.fax = rowObj.fax;
            	this.office.sort = rowObj.sort;
            	this.office.remarks = rowObj.remarks;
            	
            	this.office.type = rowObj.type;
            	this.office.typeName = rowObj.typeName;
            	
            	this.office.officeLevel = rowObj.officeLevel; 
            	
            	this.office.parentCode = rowObj.parentCode;
            	this.office.parentName = rowObj.parentName;
            	
            	this.office.areaCode = rowObj.areaCode;
            	this.office.areaName = rowObj.areaName;
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
			
			handleNodeClick1(data,node) {				
				this.clickNode1 = node;
				this.clickData1 = data;
				this.currentPage = 1;
				this.getListOfficeData1();
			},
			
			handleNodeClick2(data,node) {				
				this.clickNode2 = node;
				this.clickData2 = data;
				this.currentPage = 1;
				this.getListOfficeData2();
			},			
            
            //加载树
            async loadNode1(node, resolve) {
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
            //加载树
            async loadNode2(node, resolve) {
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
                let dataObj = await this.getLazyListOfficeData(keyCode,isInit, 1, 0);
                return resolve(dataObj.list);
            },
            async getLazyListOfficeData(code, isInit,page, size){
                let retObj = await lazyListOfficeData({parentCode: code,scopeType:'2',isInit:isInit, page: 1, size: 0});
                if (retObj.status != 1) {
                    this.$message({
                        type: 'error',
                        message: '获取数据失败'
                    });
                    return;
                }
                return retObj.data;
            },
			async queryListOfficeData(){
                let retObj = await listOfficeData({type: this.queryOfficeTypeCode, name: this.queryOfficeName, page: this.currentPage, size: this.pageSize});
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
			
			qryListOfficeData(){
				if(this.activeName==='areaTab'){
					this.getListOfficeData1();					
				}
				if(this.activeName==='levelTab'){
					this.getListOfficeData2();					
				}				
			},          
          	
			async getListOfficeData1(){
                let retObj = await listOfficeData({areaCode: this.clickData1.code, page: this.currentPage, size: this.pageSize});
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
            
			async getListOfficeData2(){
                let retObj = await listOfficeData({parentCode: this.clickData2.code, officeLevel: parseInt(this.clickData2.officeLevel)+1, page: this.currentPage, size: this.pageSize});
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
				let retObj = await insertOfficeData(this.office);
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
				this.qryListOfficeData();
				this.clickNode2.loaded = false;
            },
                        
            async updateData(){
				let retObj = await updateOfficeData(this.office);
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
				this.qryListOfficeData();
				this.clickNode2.loaded = false;
            },            
			
            async deleteData(rowObj){
				let retObj = await deleteOfficeData({id: rowObj.id});
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
				this.qryListOfficeData();
				this.clickNode2.loaded = false;
            }		
          
        },
    }
</script>

<style lang="less">
	@import '../../assets/css/mixin';
</style>