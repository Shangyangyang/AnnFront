<template>
	<div>
		<!-- <div><ve-line :data="chartData"></ve-line></div> -->
		<div style="padding-left: 50px; padding-top: 50px;"><ve-pie :data="chartData2"></ve-pie></div>
		<div style="padding-left: 150px;">
			<table border="1">
				<tr>
					<td>状态</td>
					<td>人数</td>
					<td>占比</td>
				</tr>
				<tr v-for="(item, index) in dataList" :key="index">
					<td>{{item.state}}</td>
					<td>{{item.peopleNum}}</td>
					<td>{{item.per}} %</td>
				</tr>
			</table>
		</div>
		<div style="padding: 50px;">
			<button style="padding: 20px; color: #000;" @click="changeArea('')">全省</button>
			<button style="padding: 20px; color: #000;" @click="changeArea('3701')">济南</button>
			<button style="padding: 20px; color: #000;" @click="changeArea('3702')">青岛</button>
		</div>
	</div>
</template>

<script>
import fetch from '@/util/fetch';
import { baseUrl, testUrl } from '@/config/env'

import VeLine from 'v-charts/lib/line.common';
import VePie from 'v-charts/lib/pie.common';

const getAggs = data => fetch(testUrl + '/es/test/aggs', data);	

export default {
	components: { VeLine, VePie },
	data() {
		return {
			chartData: {
				columns: ['日期', '销售量'],
				rows: [
					{ 日期: '1月1日', 销售量: 123 },
					{ 日期: '1月2日', 销售量: 1223 },
					{ 日期: '1月3日', 销售量: 2123 },
					{ 日期: '1月4日', 销售量: 4123 },
					{ 日期: '1月5日', 销售量: 3123 },
					{ 日期: '1月6日', 销售量: 7123 }
				]
			},
			chartData2: {
				columns: ['state', 'peopleNum'],
				rows: [
					{ state: '查无此人', peopleNum: 11589 },
					{ state: '已搬迁', peopleNum: 21565 },
					{ state: '空挂户', peopleNum: 11281 },
					{ state: '外出', peopleNum: 25696 },
					{ state: '死亡', peopleNum: 27778 },
					{ state: '正常', peopleNum: 2261425 }
				]
			},
			dataList: [],
			totalNum: 0,
			/**
			 1		查无此人
			 2		已搬迁
			 3		空挂户
			 4		外出
			 5		死亡
			 6		正常
			 
			 */
		};
	},
	created() {
		this.init()
	},
	methods:{
		init(){
			this.getAggs()
		},
		changeArea(areaCode){
			this.getAggs(areaCode)
		},
		async getAggs(areaCode){
			let retObj = await getAggs({
				areaCode: areaCode
			})
			
			let data = retObj.data
			
			let rows2 = []
			this.totalNum = 0
			
			Object.keys(data).forEach(item => {
				this.totalNum = this.totalNum + data[item]
				let obj2 = {
					state: this.changeKey(item),
					peopleNum: data[item]
				}
				rows2.push(obj2)
			})
			
			this.chartData2.rows = this.dataList = rows2
			
			this.changList()
		},
		changList(){
			if(this.dataList.length > 0 && this.totalNum > 0){
				this.dataList.forEach(item => {
					item.per = (item.peopleNum / this.totalNum * 100).toFixed(2)
				})
			}
		},
		changeKey(key){
			switch (key){
				case '1':
					return "查无此人"
					break;
				case '2':
					return "已搬迁"
					break;
				case '3':
					return "空挂户"
					break;
				case '4':
					return "外出"
					break;
				case '5':
					return "死亡"
					break;
				case '6':
					return "正常"
					break;
				default: 
					return '无'
					break;
			}
		}
	}
};
</script>
