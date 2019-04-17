<template>
    <div class="header_container">
		<el-row style="float: left;">
			<el-col :span="24" class="kfLogo">
				<div class="grid-content bg-purple-dark" style="float: left;height: 100%;">
					<img src="./../assets/img/kfLogo.png">
				</div>
				<div style="float: left;color:#fff;font-size: 24px;">
					控制中心
				</div>
			</el-col>
		</el-row>
		<el-dropdown @command="handleCommand" placement='start'>
			<div class="dropCon">				
				<div style="float: left;" v-show=false>
					
				</div>
				<div style="float: left;margin-left: 10px;">系统管理员<i class="el-icon-caret-bottom" style="color: #fff;"></i></div>
			</div>			
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="main">首页</el-dropdown-item>
				<el-dropdown-item command="logout">退出</el-dropdown-item>
			</el-dropdown-menu>			
		</el-dropdown>

    </div>
</template>

<script>
	import checkPermission from '@/util/checkPermission'
	

	import fetch from '@/util/fetch'
	
	const logout = () => fetch('/sys/logout');

    export default {
        
        data(){
            return {};
        },
	    	

		methods: {			
			async handleCommand(command) {
                if (command == 'main') {
					this.$router.push('/');
				}else if(command == 'logout'){
					const res = await logout()
					if (res.status == 1) {
						this.$message({
	                        type: 'success',
	                        message: '退出成功'
	                    });
	                    this.$router.push('/');
					}else{
						this.$message({
	                        type: 'error',
	                        message: res.message
	                    });
					}
				}
			},
		}
    }
</script>

<style lang="less">
	@import '../assets/css/mixin';
	.header_container{
		background-color: #1e64a9;
		width: 98%;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 2%;
	}
	.avator{
		.wh(36px, 36px);
		border-radius: 50%;
		margin-right: 37px;
	}
	.el-dropdown{
		float: right;
		height: 60px;
		margin-right: 16px;
		cursor: pointer;
		.dropCon{
			width: 100%;
			height: 60px;
			line-height: 60px;
			color: #fff;
			// overflow: hidden;
			img{
				width: 44px;
				height: 44px;
				margin-top: 8px;
				-webkit-border-radius: 50%;
				-moz-border-radius: 50%;
				border-radius: 50%;
			}
		}
		.el-dropdown-menu{
			top:55px;
			left: -12px;
			-webkit-border-radius: 0px;
			-moz-border-radius: 0px;
			border-radius: 0px;
			.el-dropdown-menu__item{
				text-align: center;
				width: 60px;
				padding:0 45px;
			}
		}
	}
	.kfLogo{
		height: 60px;
		line-height: 60px;
		// overflow: hidden;
	}
	.kfLogo img{
		vertical-align: middle;
		margin-bottom:4px;
		margin-right: 10px;
	}
</style>
