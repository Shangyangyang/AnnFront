<template>
	<div>
		<bread></bread>

		<div class="pageTitle">
			<div class="pageTitleSub">
				<el-form>
					<el-row :gutter="5">
						<el-col :span="5">
							<el-input v-model="queryType" auto-complete="off" placeholder="类型"></el-input>
						</el-col>
						<el-col :span="5">
							<el-input v-model="queryDescription" auto-complete="off" placeholder="描述"></el-input>
						</el-col>
						<el-col :span="8">
							<el-button @click="queryData" type="primary" icon="el-icon-search">查 询</el-button>
							<el-button @click="handleAddClick()" type="primary" icon="el-icon-plus" style="background:#fff;color:#000;border:1px solid #ccc;">新 增</el-button>
						</el-col>
					</el-row>
				</el-form>
			</div>

			<div class="pageLeftRight">
				<el-table :data="tableData1" stripe border highlight-current-row @current-change="handleCurrentChange">
					<el-table-column type="index" label="序号" width="80"></el-table-column>
					<el-table-column property="type" label="类型" width="200"></el-table-column>
					<el-table-column property="description" label="描述"></el-table-column>
					<el-table-column label="操作" width="350">
						<template slot-scope="scope">
							<el-button size="mini" @click="handleEditClick1(scope.row)" icon="el-icon-edit">修改</el-button>
							<el-button size="mini" @click="handleDelClick1(scope.row)" icon="el-icon-delete">删除</el-button>
							<el-button size="mini" @click="handleAddClick(scope.row)" icon="el-icon-plus">添加键值</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="Pagination">
					<el-pagination background
						@size-change="handleSizeChange1" @current-change="handleCurrentChange1"
						:current-page="currentPage1" :page-size="pageSize1" :total="dataCount1"
						:page-sizes="[5, 10, 15, 20,50]" layout="total, sizes, prev, pager, next">
					</el-pagination>
				</div>
				<el-table :data="tableData2" stripe border>
					<el-table-column type="index" label="序号" width="80"></el-table-column>
					<el-table-column property="value" label="键值" width="100"></el-table-column>
					<el-table-column property="label" label="标签" width="200"></el-table-column>
					<el-table-column property="remarks" label="备注"></el-table-column>
					<el-table-column property="sort" label="排序" width="80"></el-table-column>
					<el-table-column label="操作" width="350">
						<template slot-scope="scope">
							<el-button size="mini" @click="handleEditClick2(scope.row)" icon="el-icon-edit">修改</el-button>
							<el-button size="mini" @click="handleDelClick2(scope.row)" icon="el-icon-delete">删除</el-button>
							<el-button size="mini" @click="handleAddChild(scope.row)" icon="el-icon-plus">添加下级</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="Pagination" style="text-align: right; margin: 5px 0;">
					<el-pagination background
						@size-change="handleSizeChange2" @current-change="handleCurrentChange2"
						:current-page="currentPage2" :page-size="pageSize2" :total="dataCount2"
						:page-sizes="[10, 20, 30, 40,50]" layout="total, sizes, prev, pager, next">
					</el-pagination>
				</div>
			</div>

			<el-dialog :title="dialogTitle1" :visible.sync="dialogVisible1" width="40%" modal class="officeDialog">
				<el-form :model="dict">
					<!--<el-form-item label="类型" :label-width="labelWidth">-->
						<!--<el-input v-model="dict.type" auto-complete="off" readonly placeholder="类型"></el-input>-->
					<!--</el-form-item>-->
					<!--<el-form-item label="描述" :label-width="labelWidth">-->
						<!--<el-input v-model="dict.description" auto-complete="off"></el-input>-->
					<!--</el-form-item>-->

					<el-row>
						<el-col :span="12">
							<el-form-item>
								<label>类型</label>
								<el-input v-model="dict.type" auto-complete="off" readonly placeholder="类型"></el-input>
							</el-form-item>
						</el-col>

						<el-col :span="12">
							<el-form-item>
								<label>描述</label>
								<el-input v-model="dict.description" auto-complete="off"></el-input>
							</el-form-item>
						</el-col>
					</el-row>


				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible1 = false" icon="el-icon-close">取 消</el-button>
					<el-button @click="updateTypeData" type="primary" icon="el-icon-check">保 存</el-button>
				</div>
			</el-dialog>

			<el-dialog :title="dialogTitle2" :visible.sync="dialogVisible2" width="40%" modal>
				<el-form :model="dict">
					<div slot style="display:none">
						<input v-model="dict.id" type="hidden">
					</div>
					<el-form-item class="addFloat">
						<el-input v-model="dict.value" auto-complete="off" placeholder="键值"></el-input>
						<el-input v-model="dict.label" auto-complete="off" placeholder="标签"></el-input>
						<el-input v-model="dict.type" auto-complete="off" :readonly="typeReadOnly" placeholder="类型"></el-input>
						<el-input v-model="dict.description" auto-complete="off" :readonly="descReadOnly" placeholder="描述"></el-input>
					</el-form-item>
					<el-form-item label="排序" :label-width="labelWidth" class="paiX">
						<el-input-number v-model="dict.sort" size="small" :min="0"></el-input-number>
					</el-form-item>
					<el-row>
						<el-col :span="24">
							<el-form-item>
								<label>备注</label>
								<el-input v-model="dict.remarks" type="textarea" :rows="3"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible2 = false" icon="el-icon-close">取 消</el-button>
					<el-button @click="saveData" type="primary" icon="el-icon-check">保 存</el-button>
				</div>
			</el-dialog>

			<el-dialog :title="dialogTitle3" :visible.sync="dialogVisible3" width="20%" modal>
				<el-form :model="dict1">
					<div slot style="display:none">
						<input v-model="dict1.id" type="hidden">
						<input v-model="dict1.type" type="hidden">
					</div>
					<el-input v-model="dictTypeForChild"  auto-complete="off" placeholder="字典类型"></el-input>

						<el-button @click="chooseChild" type="primary" icon="el-icon-check">确 定</el-button>

				</el-form>
			</el-dialog>

			<el-dialog :title="dialogTitle4" :visible.sync="dialogVisible4" width="20%" modal>
				<el-form :model="dict2">
					<div slot style="display:none">
						<input v-model="dict2.id" type="hidden">
						<input v-model="dict2.parentType" type="hidden">
					</div>
					<data-dict :dictType.sync="dictTypeForChild" :dictValue.sync="dict2.children"  :isMulti=true></data-dict>
					<el-button @click="saveChild" type="primary" icon="el-icon-check">保 存</el-button>
				</el-form>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	import fetch from '@/util/fetch'
	
	const getDictData = data => fetch('/cc/dict/get', data);
	
	const insertDictData = data => fetch('/cc/dict/insert', data);
	
	const listDictTypeData = data => fetch('/cc/dict/listType', data);
	const updateDictTypeData = data => fetch('/cc/dict/updateType', data);
	const deleteDictTypeData = data => fetch('/cc/dict/deleteType', data);
	
	const listDictData = data => fetch('/cc/dict/list', data);
	const updateDictData = data => fetch('/cc/dict/update', data);
	const deleteDictData = data => fetch('/cc/dict/delete', data);
    const addChild = data => fetch('/cc/dict/addChild', data);
    const getDictChild = data => fetch('/cc/dict/getDictChild', data);


    export default {
		data() {
			return {				
				queryType: '',
				queryDescription: '',
				
				clickType: '',
				clickDescription: '',
				
				currentPage1: 1,
				pageSize1: 5,
                dataCount1: 0,				
				tableData1: [],
				
				currentPage2: 1,
				pageSize2: 10,                                
                dataCount2: 0,				
				tableData2: [],
				
				dialogVisible1: false,
				dialogTitle1: '',
				
				dialogVisible2: false,
				dialogTitle2: '',


                dialogVisible3: false,
                dialogTitle3: '添加子字典',

                dialogVisible4: false,
                dialogTitle4: '选择子字典',
				
				labelWidth: '60px',
				
				typeReadOnly: false,
				descReadOnly: false,
				
				action: '',
				dict: {
					id: '',
					value: '',
					label: '',
					type: '',
					description: '',
					sort: '10',
					remarks: ''
				},
				dict1:{},
				dict2:{},
                dictTypeForChild:''
			}
		},
		
		created(){
            this.getListTypeData();
        },
        
		methods: {
            handleSizeChange1(val) {
                this.pageSize1 = val;                
                this.getListTypeData(this.queryType,this.queryDescription);
            },
            
            handleCurrentChange1(val) {
                this.currentPage1 = val;                
                this.getListTypeData(this.queryType,this.queryDescription);
            },
            
            handleSizeChange2(val) {
                this.pageSize2 = val;                
                this.getListData(this.clickType,this.clickDescription);
            },
            
            handleCurrentChange2(val) {
                this.currentPage2 = val;                
                this.getListData(this.clickType,this.clickDescription);
            },
            
			handleCurrentChange(val) {
				if(val != null && val != undefined){
					if(val.type != null && val.type != undefined){
						this.clickType = val.type;
					}
					if(val.description != null && val.description != undefined){
						this.clickDescription = val.description;
					}
				}
        		this.getListData(this.clickType,this.clickDescription);
      		},
      		
			queryData(){
				this.getListTypeData(this.queryType,this.queryDescription);			
			},           
            
            handleAddClick(rowObj){            	
            	this.action = 'add';            	
            	this.dialogVisible2 = true;            	
            	this.dict.sort = 10;
            	this.dict.value = '';
            	this.dict.label = '';
            	this.dict.remarks = '';
            	if(rowObj != null && rowObj != undefined){ 
            		this.dict.type = rowObj.type;
            		this.dict.description = rowObj.description;            		
            		this.dialogTitle2 = '添加键值';
            		this.typeReadOnly = true;
            		this.descReadOnly = true;
            	} else {
            		this.dict.type = '';
            		this.dict.description = '';            		
            		this.dialogTitle2 = '添加类型及键值';
            		this.typeReadOnly = false;
            		this.descReadOnly = false;
            	}
            },
            
            handleEditClick1(rowObj){
            	this.dialogTitle1 = '类型修改';
            	this.dialogVisible1 = true;            	
            	this.dict.type = rowObj.type;
            	this.dict.description = rowObj.description;
            },
           
            handleEditClick2(rowObj){
            	this.action = 'edit';
            	this.dialogTitle2 = '键值修改';
            	this.dialogVisible2 = true;

            	this.dict.id = rowObj.id;
            	this.dict.value = rowObj.value;
            	this.dict.label = rowObj.label;
            	this.dict.type = rowObj.type;
            	this.dict.description = rowObj.description;
            	this.dict.sort = rowObj.sort;
            	this.dict.remarks = rowObj.remarks;
        		this.typeReadOnly = true;
        		this.descReadOnly = true;
            },
            
            handleDelClick1(rowObj){
        		this.$confirm('该类型下的键值数据都会被删除,确定删除该类型记录?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					center: true
				}).then(() => {
					this.deleteTypeData(rowObj);					
				}).catch(() => {
				});				
			},
            
            handleDelClick2(rowObj){
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
						
			async getListTypeData(type,description){
                let retObj = await listDictTypeData({type: type, description: description, page: this.currentPage1, size: this.pageSize1});
                if (retObj.status != 1) {
					this.$message({
	                    type: 'error',
	                    message: '获取数据失败'
	                });
	                return;
				}
                
                this.tableData1 = [];                
                retObj.data.list.forEach(item=>this.tableData1.push(item));
                
                this.dataCount1 = retObj.data.total;
           	},            

            async getListData(type,description){
                let retObj = await listDictData({type: type, description: description, page: this.currentPage2, size: this.pageSize2});
                if (retObj.status != 1) {
					this.$message({
	                    type: 'error',
	                    message: '获取数据失败'
	                });
	                return;
				}
                
                this.tableData2 = [];                
                retObj.data.list.forEach(item=>this.tableData2.push(item));
                
                this.dataCount2 = retObj.data.total;
            },            
            
            async insertData(){
				let retObj = await insertDictData(this.dict);
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
				this.dialogVisible2 = false;
				this.getListTypeData(this.queryType,this.queryDescription);
				this.getListData(this.clickType,this.clickDescription);
            },
            
            async updateTypeData(){
				let retObj = await updateDictTypeData({type: this.dict.type, description: this.dict.description});
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
				this.dialogVisible1 = false;
				this.getListTypeData(this.queryType,this.queryDescription);
            },            
            
            async updateData(){
				let retObj = await updateDictData(this.dict);
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
				this.dialogVisible2 = false;
				this.getListData(this.clickType,this.clickDescription);
            },
            
            async deleteTypeData(rowObj){
				let retObj = await deleteDictTypeData({type: rowObj.type, description: rowObj.description});
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
				this.getListTypeData(this.queryType,this.queryDescription);
            },
           
            async deleteData(rowObj){
				let retObj = await deleteDictData({id: rowObj.id,type: rowObj.type});
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
				this.getListData(this.clickType,this.clickDescription);
            },
            async  handleAddChild(rowObj){
                this.dialogVisible3 = true;
                this.dict1={};
                this.dict1=rowObj;
                this.dictTypeForChild='';
			},
            chooseChild(){
                if(this.dictTypeForChild===undefined||this.dictTypeForChild===null||this.dictTypeForChild===''){
                    this.$message({
                        type: 'error',
                        message: '请填写子字典类型!'
                    });
                    return;
				}
                this.dialogVisible3 = false;
                this.dict2.id=this.dict1.id;
                this.dict2.type=this.dictTypeForChild;
                this.dict2.parentType=this.dict1.type;
                this.getChild();


			},
            async getChild(){
                let retObj = await getDictChild(this.dict2);
                if (retObj.status != 1) {
                    this.$message({
                        type: 'error',
                        message: '获取数据失败'
                    });
                    return;
                }
                this.dict2.children=(retObj.data.childValues===null?[]:retObj.data.childValues);
                this.dialogVisible4 = true;
            },
			async saveChild(){
                let retObj = await addChild(this.dict2);
                if (retObj.status != 1) {
                    this.$message({
                        type: 'error',
                        message: (retObj.message===null||this.dictTypeForChild===undefined)?'更新数据失败':retObj.message
                    });
                    return;
                }
                this.$message({
                    type: 'success',
                    message: '更新数据完成'
                });
                this.dict1={};
                this.dict2={};
                this.dictTypeForChild='';
                this.dialogVisible4= false;
			}
        }

	}
</script>

<style lang="less">
	@import '../../assets/css/mixin';
</style>