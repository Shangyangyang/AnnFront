<template>
	<div>
		<div style="margin: 20px 0px 10px; padding: 10px 17px 10px; background-color: #eee;">
			<el-breadcrumb separator=">>">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/xuebiList' }">
					图片管理
				</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/TimelineLabelList' }">
					标签管理
				</el-breadcrumb-item>
				<el-breadcrumb-item>快速选择管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div>
			<div style="margin-top: 15px; margin-left: 17px; margin-bottom: 20px;">
				<el-button @click="addLabel" plain type="primary">新增</el-button>
			</div>
			<el-table :data="list" style="width: 100%" stripe border>
				<el-table-column type="index" :index="index => index + 1"></el-table-column>
				<el-table-column prop="name" label="别名" width="180"></el-table-column>
				<el-table-column prop="selectNum" label="选择次数" width="180"></el-table-column>
				<el-table-column prop="labelName" label="标签组合"></el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="openEdit(scope.row)">
							编辑
						</el-button>
						<el-button type="text" size="small" @click="delete2(scope.row.id)">
							删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="Pagination" style="text-align: right;">
				<el-pagination
					background
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="currentPage"
					:page-size="pageSize"
					:total="dataCount"
					:page-sizes="[10, 20, 30, 40, 50]"
					layout="total, sizes, prev, pager, next"
				></el-pagination>
			</div>
		</div>
		<el-dialog
			:title="'编辑'"
			:visible.sync="editDialogFlag"
			width="50%"
			:before-close="handleClose"
		>
			<div>
				<el-form :label-position="'right'" label-width="80px" :rules="rules" ref="formE" :model="formE">
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="别名" prop="name">
								<el-input v-model="formE.name"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="归属" prop="name">
								<data-dict dictType="timeline_label_belong" :dictValue.sync="formE.belong" :dictName.sync="formE.belongName"></data-dict>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="24">
							<el-form-item label="标签组" prop="labels">
								<el-col :span="16">
									<el-input v-model="formE.labelName" size="15"
									clearable placeholder="请输入标签,逗号隔开" disabled></el-input>
								</el-col>
								<el-col :span="8">
									<select-label 
										:labelNames.sync="formE.labelName" 
										:removeIds="formE.labels"
										:labels.sync="formE.labels"
									>
									</select-label>
								</el-col>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editDialogFlag = false">取 消</el-button>
				<el-button type="primary" @click="save2">保 存</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import fetch from '@/util/fetch';
import utils from '@/util/utils';

const list = data => fetch('/timeline/labelQuick/list', data);
const save = data => fetch('/timeline/labelQuick/save', data);
const deleteData = data => fetch('/timeline/labelQuick/delete', data);

export default {
	data() {
		return {
			list: [],
			typeList: [{ name: '雪碧', value: '1' }, { name: '乐乐', value: '2' }],
			
			form: {},
			formE: {
				type: '',
				labelName: '',
			},
			
			resetForm: '',

			editDialogFlag: false,

			count: 2,
			currentPage: 1,
			pageSize: 10,
			dataCount: 0,

			rules: {
				name: [{ required: true, message: '请填写名称', trigger: 'blur' }],
				type: [{ required: true, message: '请选择类型', trigger: 'blur' }],
			}
		};
	},
	created: function() {
		this.resetForm = JSON.stringify(this.formE);
		this.fetchData();
	},
	methods: {
		addLabel() {
			// 审核状态默认通过
			this.formE.status = '1';
			// 选择次数初始化
			this.formE.selectNum = '0';
			this.editDialogFlag = true;
		},
		async delete2(id) {
			this.$confirm('确定要删除吗？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
				center: true
			})
				.then(async () => {
					let retObj = await deleteData({
						id: id
					});

					if (utils.checkResult(retObj)) {
						this.$message.success('操作成功');
						this.fetchData();
					}
				})
				.catch(() => {});
		},
		openEdit(form) {
			this.formE = form;
			this.editDialogFlag = true;
		},
		async save2() {
			this.$refs['formE'].validate(async valid => {
				if (valid) {
					let retObj = await save(this.formE);

					if (utils.checkResult(retObj, this)) {
						this.$message.success('操作成功');
						this.fetchData();
						this.formE = JSON.parse(this.resetForm);
						this.editDialogFlag = false;
					}
				} else {
					return false;
				}
			});
		},
		getColor() {
			let r = utils.rnd(255, 150);
			let g = utils.rnd(255, 150);
			let b = utils.rnd(255, 150);
			let str = r + ',' + g + ',' + b;
		
			return `rgb(${str})`;
		},
		handleClose(done) {
			this.$confirm('确认关闭？')
				.then(_ => {
					done();
					this.editDialogFlag = false;
				})
				.catch(_ => {});
		},
		async updateLabel() {
			let retObj = await updateLabel();
			if (utils.checkResult(retObj, this)) {
				this.$message.success('操作成功');
			}
		},
		async fetchData() {
			this.form.page = this.currentPage;
			this.form.size = this.pageSize;

			let retObj = await list(this.form);
			if (utils.checkResult(retObj, this)) {
				this.list = [];
				
				retObj.data.list.forEach(item => {
					let arr = item.labels.split(';');
					let labelName = '';
					
					arr.forEach(label =>{
						if(label){
							let arr2 = label.split(',');
							labelName += `${arr2[1]}, `
						}
					});
					this.$set(item, 'labelName', labelName);
					this.list.push(item);
				});
				this.dataCount = retObj.data.total;
			}
		},
		handleSizeChange(val) {
			this.fetchData();
		},
		handleCurrentChange(val) {
			this.currentPage = val;
			this.fetchData();
		}
	}
};
</script>
<style>
	.el-input.is-disabled .el-input__inner{
		color: #000000;
		font-weight: bold;
	}
</style>