<template>
	<div>
		<el-dialog
			title="选择标签"
			:visible.sync="dialogVisible"
			width="60%"
			:before-close="handleClose"
			:append-to-body="true"
		>
			<el-col :span="24">
				快捷选择： <el-select v-model="quickLabel" placeholder="请选择" filterable @change="changeQuick">
					<el-option
						v-for="item in quickList"
						:key="item.id"
						:label="item.name"
						:value="item.id"
					></el-option>
				</el-select>
			</el-col>
			<el-col :span="24" style="margin: 8px; padding: 5px; border: 1px solid #aaa;">
				<el-radio-group
					v-model="labelType"
					size="small"
					style="margin-top: 5px;"
					@change="changeR"
				>
					<el-radio-button :label="item.value" :key="item.value" v-for="item in typeList">
						{{ item.name }}
					</el-radio-button>
				</el-radio-group>
			</el-col>
			<div>
				<el-tag
					style="margin: 8px 4px; opacity: 0.8;"
					v-for="label in list"
					:key="label.id"
					:color="label.bgcolor"
					@click.native="selectTag(label)"
				>
					<font :color="label.fontcolor">{{ label.name }}</font>
				</el-tag>
			</div>
			<div style="margin: 8px; padding: 5px; border: 1px solid #aaa;">
				已选择的：
				<el-tag
					style="margin: 4px 2px;"
					v-for="(label, index) in sList"
					:key="index"
					closable
					@close="removeTag(label)"
				>
					{{ label.name }}
				</el-tag>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="selectedLabel">确 定</el-button>
			</span>
		</el-dialog>
		<!-- <span>{{names}}</span> -->
		<el-button type="primary" @click="dialogVisible = true" icon="el-icon-search">
			选择标签
		</el-button>
	</div>
</template>

<script>
/**
 * 主要工作就是展示所有标签，
 * 可以根据类型筛选，
 * 选择标签，然后把标签ID和NAME返回到父组件
 */
import fetch from '@/util/fetch';
import utils from '@/util/utils';
import Constants from '@/util/constant.js';

const list = data => fetch('/timeline/label/list', data);
const quickList = data => fetch('/timeline/labelQuick/list', data);
const save = data => fetch('/timeline/label/save', data);
const saveQuick = data => fetch('/timeline/labelQuick/save', data);
const deleteData = data => fetch('/timeline/label/delete', data);

export default {
	// 重置标签的作用
	props: ['removeIds'],

	data() {
		return {
			list: [],
			sList: [],
			typeList: [
				{ name: '地点', value: '1' },
				{ name: '时间', value: '6' },
				{ name: '在哪', value: '2' },
				{ name: '物品', value: '3' },
				{ name: '表情', value: '4' },
				{ name: '动作', value: '5' },
				{ name: '事件', value: '7' },
				{ name: '天气', value: '8' },
				{ name: '形容词', value: '9' },
				{ name: '全部', value: '' }
			],
			quickList: [],

			form: {},
			quickForm: {},

			labelType: '',
			
			listC: '', // 复制品
			ids: '',
			names: '',
			idnames: '',
			quickLabel: '',

			dialogVisible: false
		};
	},
	created: function() {
		this.fetchData();
		this.fetchQuickData();
	},
	computed: {
		ids2() {
			return this.removeIds;
		}
	},
	watch: {
		ids2(newValue, oldValue) {
			// 重置操作
			if (!this.removeIds) {
				this.sList = [];
				this.fetchData();
				this.labelType = '';
			}
		},
	},
	methods: {
		selectedLabel() {
			this.dialogVisible = false;
			this.doChangeVal();
		},
		doChangeVal() {
			// 重置
			this.ids = this.names = this.idnames = '';

			this.sList.forEach(item => {
				this.ids = `${this.ids}${this.ids ? ',' : ''}${item.id}`;
				this.names = `${this.names}${this.names ? ',' : ''}${item.name}`;
				this.idnames = `${this.idnames}${item.id},${item.name};`;
			});

			this.ids = this.ids == '' ? '' : `${this.ids},`;
			this.names = this.names == '' ? '' : `${this.names},`;

			this.$emit('update:labelIds', this.ids);
			this.$emit('update:labelNames', this.names);
			this.$emit('update:labels', this.idnames);
			
			this.$emit('onSelect');
		},
		handleClose(done) {
			done();
		},
		changeR() {
			let arr = JSON.parse(this.listC);

			if (this.labelType === '') {
				this.list = arr;
			} else {
				this.list = arr.filter(l => {
					return l.type == this.labelType;
				});
			}
		},
		removeTag(label) {
			let index = this.sList.indexOf(label);
			if (index > -1) {
				this.sList.splice(index, 1);
			}
		},
		selectTag(label) {
			if (this.sList.find(n => n.id == label.id)) {
				this.$message.error('标签已存在，请勿重复添加');
			} else {
				this.sList.push(label);
			}
		},
		async fetchData() {
			this.form.page = 0;
			this.form.size = 0;
			// 默认审核通过的
			this.form.status = Constants.TIMELINE_LABEL_STATUS_YI;
			this.form.belong = Constants.TIMELINE_LABEL_BELONG_XUEBI;

			let retObj = await list(this.form);
			
			if (utils.checkResult(retObj, this)) {
				this.list = [];
				retObj.data.list.forEach(item => {
					this.list.push(item);
				});
			}

			this.listC = JSON.stringify(this.list);
		},
		async fetchQuickData() {
			if(!this.quickList || this.quickList.length == 0){
				this.quickForm.page = 0;
				this.quickForm.size = 0;
				// 默认审核通过的
				this.quickForm.belong = Constants.TIMELINE_LABEL_BELONG_XUEBI;
				
				let retObj = await quickList(this.quickForm);
				
				if (utils.checkResult(retObj, this)) {
					this.quickList = [];
					retObj.data.list.forEach(item => {
						this.quickList.push(item);
					});
				}
			}
		},
		// 快捷选择的值变化时
		changeQuick(id){
			let q = this.quickList.find(function(quick){
				if(quick.id == id) return true;
				else return false;
			});
			
			let arr = q.labels.split(';');
			
			// 循环添加到数组中
			arr.forEach(l => {
				if(!l) return;
				
				let arr2 = l.split(',');
				
				if (this.sList.find(n => n.id == arr2[0])) {
					// 不执行操作
				} else {
					this.sList.push({
						id: arr2[0],
						name: arr2[1],
					});
				}
			});
			
			// 清空下拉框的值
			this.quickLabel = '';
			
			// 保存选择次数
			let q2 = {
				id: id,
				selectRaise: id
			}
			
			this.saveQuick(q2);
		},
		async saveQuick(quick){
			let retObj = await saveQuick(quick);
			utils.checkResult(retObj, this);
		}
	}
};
</script>
