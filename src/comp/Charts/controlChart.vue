<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>

<script>
    import echarts from 'echarts'

    export default {
        props: {
            className: {
                type: String,
                default: 'chart'
            },
            id: {
                type: String,
                default: 'chart'
            },
            width: {
                type: String,
                default: '200px'
            },
            height: {
                type: String,
                default: '200px'
            }
        },
        data() {
            return {
                chart: null
            }
        },
        mounted() {
            this.initChart()
            this.chart = null
        },
        beforeDestroy() {
            if (!this.chart) {
                return
            }
            this.chart.dispose()
            this.chart = null
        },
        methods: {
            initChart() {
                this.chart = echarts.init(document.getElementById(this.id));
                var data = [["7:00",116],["8:00",129],["9:00",135],["10:00",86],["11:00",73],["12:00",85],["13:00",73],["14:00",68],["15:00",92],["16:00",130],["17:00",245],["18:00",139]];

                var dateList = data.map(function (item) {
                    return item[0];
                });
                var valueList = data.map(function (item) {
                    return item[1];
                });
                this.chart.setOption({
                    // Make gradient line here
                    title : {
                        text: '早六点至晚六点每小时访问量',
                        textStyle: {
                            color: '#87cefa',// 主标题文字颜色
                        },
                        x: 'center',
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    color: ["#79be88"],
                    toolbox: {
                        show : true,
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : dateList
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            type:'line',
                            itemStyle: {normal: {areaStyle: {type: 'default'}}},
                            data: valueList
                        }
                    ]
                })
            }
        }
    }
</script>
