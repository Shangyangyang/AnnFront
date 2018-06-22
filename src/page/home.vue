<template>
    <div>
        <bread></bread>

        <div class="homeCjr">
            <el-row :gutter="20">
                <el-col :span="16" class="homeCji-progress">
                    <el-col  class="homeCjr-title"><div>数据监控系统</div></el-col>
                    <el-col :span="24" class='chart-control'>
                        <controlChart height='100%' width='100%'></controlChart>
                    </el-col>
                </el-col>
                <el-col :span="8" class="homeCji-ann">
                    <el-col :span="24" class="homeCjr-title"><div>数据交换</div></el-col>
                    <el-col :span="24" class="annList supportData" style="height: 273px;">
                        <img src="../assets/img/dataChange.png">
                    </el-col>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="16" class="homeCji-progress">
                    <el-col :span="24" class="homeCjr-title"><div>系统日志</div></el-col>
                    <el-table :data="tableData" stripe style="width: 98%">
                        <el-table-column prop="progressCode" label="用户" width="150"></el-table-column>
                        <el-table-column prop="progressDo" label="日期" width="150"></el-table-column>
                        <el-table-column prop="progressState" label="IP" width="150"></el-table-column>
                        <el-table-column prop="progressTime" label="内容"></el-table-column>
                    </el-table>
                </el-col>
                <el-col :span="8" class="homeCji-policy">
                    <el-col :span="24" class="homeCjr-title"><div>常用功能</div></el-col>
                    <el-col :span="24" class="funList">
                        <div>
                            <img src="../assets/img/fun1.png">
                        </div>
                        <div>
                            <img src="../assets/img/fun2.png">
                        </div>
                        <div>
                            <img src="../assets/img/fun3.png">
                        </div>
                        <div>
                            <img src="../assets/img/fun4.png">
                        </div>
                        <!--<el-col :span="24">
                            <el-col :span="12">
                                <img src="../assets/img/fun1.png">
                            </el-col>
                            <el-col :span="12">
                                <img src="../assets/img/fun2.png">
                            </el-col>
                        </el-col>
                        <el-col>
                            <el-col :span="12">
                                <img src="../assets/img/fun3.png">
                            </el-col>
                            <el-col :span="12">
                                <img src="../assets/img/fun4.png">
                            </el-col>
                        </el-col>-->
                    </el-col>
                </el-col>
            </el-row>
        </div>

    </div>
</template>

<script>
    import dtime from 'time-formater'
    import ElCol from "element-ui/packages/col/src/col";
    import ElRow from "element-ui/packages/row/src/row";
    import controlChart from '@/comp/Charts/controlChart';

    export default {
        components: {
            ElRow,
            ElCol,
            controlChart
        },
        data(){
            return {
                tableData: [
                    {progressCode: '徐紫薇', progressDo: '11-20', progressState:'192.168.123.1', progressTime:'添加康复需求'},
                    {progressCode: '蒋兰新', progressDo: '10-04', progressState:'192.168.124.1', progressTime:'添加康复需求'},
                    {progressCode: '苏文娟', progressDo: '01-30', progressState:'192.168.154.1', progressTime:'个人密码更改'},
                    {progressCode: '曹宏达', progressDo: '09-08', progressState:'192.168.124.1', progressTime:'登录系统'},
                    {progressCode: '陈焕新', progressDo: '05-16', progressState:'192.168.110.1', progressTime:'修改系统设置'},
                    {progressCode: '范琦', progressDo: '08-27', progressState:'192.168.124.1', progressTime:'添加康复需求'}
                ],
                formInline: {
                    user: '',
                    region: ''
                }
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            }
        }
    }
</script>

<style lang="less">
    @import '../assets/css/mixin';
</style>
