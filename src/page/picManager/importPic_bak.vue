<template>
	<div class="fillcontain">
		<bread></bread>
		<div class="table_container areaList">
			<el-container>
				<el-main class="adminSet">
					<el-row type="flex" class="header">
						<el-col style="width:16px;border-bottom: 1px solid #ccc;"></el-col>
						<el-col class="admin_title">时间表图片基表管理</el-col>
						<el-col style="flex: 1;border-bottom: 1px solid #ccc;"></el-col>
					</el-row>
					<div style="padding:20px 10px; width: 100%;border-bottom: 1px solid #e5e5e5;" class="dicTop">
						<el-table-column prop="pictures" label="描述图片">
							<!-- <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img> -->
							<li v-for="item in pics">
								<span style="background-color: #00FFFF;height:90px;">
									<img v-lazy="item.src" width="150" :alt="item.filename" height="150" class="head_pic"  @click="clickImg($event)"/>
								</span>
								<span style="background-color: #3AA9CA;height:90px;">{{item.filename}}</span>
							</li>
						</el-table-column>
					</div>
				</el-main>
			</el-container>
		</div>
		<el-dialog :title="title" :visible.sync="showImg" :width="picWidth" :before-close="handleCloseOilWear">
			<img :src="imgSrc" :width="picWidth"/>	
		</el-dialog>
	</div>
</template>

<script>
	import fetch from '@/util/fetch';
	import BigImg from './BigImg.vue';
	import { baseUrl } from '@/config/env';
	
	
	const picList = data => fetch('/timeline/importPic/list', data);
    
	export default {
		data() {
			return {
				pics: [],
				showImg:false,
				title: '',
                imgSrc: '',
				picWidth: '',
				picHeight: ''
			}
		},
		created() {
			this.getPicList();
			let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			this.picWidth = w * 0.7;
			this.picHeight = h * 0.7;
			console.log(this.picWidth);
			console.log(this.picHeight);
		},
		methods: {
			async getPicList(){
				let retObj = await picList();
				if(retObj.status != 1) {
					this.$message({
						type: 'error',
						message: '获取数据失败'
					});
					return;
				}
				this.pics = [];
				retObj.data.list.forEach(item =>
					{
						item.src = baseUrl + "\\" + item.src;
						this.pics.push(item);
					}
				);
			},
			handleCloseOilWear(done) {
				this.showImg = false;
				done();
			},
			clickImg(e) {
                // 获取当前图片地址
				this.title = e.currentTarget.alt;
                this.imgSrc = e.currentTarget.src;
                this.showImg = true;
            },
            viewImg(){
                this.showImg = false;
            }
		},
		components: {
			'big-img':BigImg
		}
	}
</script>

<style lang="less">
	@import '../../assets/css/mixin';
</style>