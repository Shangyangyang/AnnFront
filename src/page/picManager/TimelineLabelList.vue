<template>
	<div>
		<bread-head></bread-head>
		<div>
			<div style="margin-top: 15px; margin-left: 17px; margin-bottom: 20px;">
				<el-button @click="addLabel" plain type="primary">新增</el-button>
				<el-button @click="openQuick" plain type="primary">快速选择管理</el-button>
				<!-- <el-button @click="updateLabel" plain type="primary">更新</el-button> -->
			</div>
			<el-table :data="list" style="width: 100%" stripe border>
				<el-table-column type="index" :index="index => index + 1"></el-table-column>
				<el-table-column prop="name" label="标签名" width="180"></el-table-column>
				<el-table-column prop="typeName" label="类型" width="180"></el-table-column>
				<el-table-column prop="belongName" label="归属"></el-table-column>
				<el-table-column prop="selectNum" label="选择次数"></el-table-column>
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
							<el-form-item label="名称" prop="name">
								<el-input v-model="formE.name"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="类型" prop="type">
								<el-radio-group
									v-model="formE.type"
									size="small"
									style="margin-top: 5px;"
								>
									<el-radio-button
										:label="item.value"
										:key="item.value"
										v-for="item in typeList"
									>
										{{ item.name }}
									</el-radio-button>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="说明" prop="reason">
								<el-input v-model="formE.reason"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="归属" prop="belong">
								<el-radio-group
									v-model="formE.belong"
									size="small"
									style="margin-top: 5px;"
								>
									<el-radio-button
										:label="item.value"
										:key="item.value"
										v-for="item in belongList"
									>
										{{ item.name }}
									</el-radio-button>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editDialogFlag = false">取 消</el-button>
				<el-button type="primary" @click="save2">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import fetch from '@/util/fetch';
import utils from '@/util/utils';

const list = data => fetch('/timeline/label/list', data);
const updateLabel = data => fetch('/timeline/label/updateLabel', data);
const save = data => fetch('/timeline/label/save', data);
const deleteData = data => fetch('/timeline/label/delete', data);

export default {
	data() {
		return {
			list: [],
			typeList: [
				{ name: '地点', value: '1' },
				{ name: '时间', value: '6' },
				{ name: '在哪', value: '2' },
				{ name: '物品', value: '3' },
				{ name: '表情', value: '4' },
				{ name: '动作', value: '5' },
				{ name: '事件', value: '7' },
				{ name: '天气', value: '8' },
				{ name: '形容词', value: '9' }
			],
			belongList: [{ name: '雪碧', value: '1' }, { name: '乐乐', value: '2' }],
			form: {},
			formE: {
				type: '',
				belong: ''
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
				belong: [{ required: true, message: '请选择归属', trigger: 'blur' }]
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
					this.formE.bgcolor = this.getColor();
					this.formE.fontcolor = '#000';
					let retObj = await save(this.formE);

					if (utils.checkResult(retObj, this)) {
						this.$message.success('操作成功');
						this.fetchData();

						this.formE = JSON.parse(this.resetForm);

						this.editDialogFlag = false;
					}
				} else {
					console.log('error submit!!');
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

				this.list.push(...retObj.data.list);
				this.dataCount = retObj.data.total;
			}
		},
		handleSizeChange(val) {
			this.fetchData();
		},
		handleCurrentChange(val) {
			this.currentPage = val;
			this.fetchData();
		},
		// 打开快速选择标签管理页面
		openQuick(){
			this.$router.push('TimelineLabelQuickList');
		},
	}
};
</script>
