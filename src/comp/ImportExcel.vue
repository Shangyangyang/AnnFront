<template>
	<div>
		<el-dialog :title="title" :visible.sync="visible" width="30%"  :before-close="dialogClose">
			<el-form>
				<el-upload
						name="file"
						action="/cc/userImport/importExcel"
						:file-list="fileList"
						:before-upload="beforeAvatarUpload"
						:show-file-list=false >

						<el-button size="small" type="primary">点击上传</el-button>
						<el-button size="small"  @click.stop="template"  type="primary" style="margin-left: 20px;">导出下载模板</el-button>

					<div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件，且不超过5M</div>
				</el-upload>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
    import fetch from '@/util/fetch'

    export default {
        data () {
            return {
                fileList: [],
                visible: this.show,
            };
        },
        props: ['show','dialogT','downTemplate'],
        watch: {
            show () {
                this.visible = this.show;
            }
        },
        computed: {
            title:function () {
                return this.dialogT;
            }
        },
        methods:{
            beforeAvatarUpload(file) {
                const isExcel = (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')||(file.type ==='application/vnd.ms-excel');
                const isLt5M = file.size / 1024 / 1024 < 5;
                if (!isExcel) {
                    this.$message.error('上传文件只能是 xls/xlsx 格式!');
                }
                if (!isLt5M) {
                    this.$message.error('上传文件大小不能超过 5MB!');
                }

                if(isExcel&&isLt5M){
                    //将文件转化为formdata数据上传
                    let fd = new FormData()
                    fd.append('file', file)

                    var xhr = new XMLHttpRequest()
                    xhr.open('POST', '/cc/userImport/importExcel', true)
                    // url就是要发送的post请求的地址
                    xhr.send(fd)
                    xhr.onload = () => {
                        if (xhr.status === 200) {
						   if(JSON.parse(xhr.responseText).status===1){
                               this.$message({
                                   dangerouslyUseHTMLString: true,
                                   type: 'success',
                                   message: JSON.parse(xhr.responseText).data
                               });
						   }else{
                               this.$message({
                                   type: 'error',
                                   message: JSON.parse(xhr.responseText).message
                               });
						   }

                        }else{
                            this.$message({
                                type: 'error',
                                message: '导入数据失败'
                            });
                        }
                    }
                }
                this.dialogClose();
                return false;
            },
            template(){
                window.location.href =this.downTemplate;
			},
            //关闭前对dialog进行处理
            dialogClose(){
                this.visible=false;
                //将父页面打开dialog控制设置为false关闭
                this.$emit('update:show', false);
            },
        }
    };
</script>
<style lang="less">
	@import '../assets/css/mixin';
</style>