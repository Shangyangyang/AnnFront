<template>
	<div class="fillcontain">

		<head-top></head-top>

		<div class="contentAll">

            <aside :class="{showSidebar:!isCollapse}">

                <div @click.prevent="collapseC" class="sideIcon">
                    <i class="el-icon-d-arrow-right" v-show="isCollapse"></i>
                    <i class="el-icon-d-arrow-left" v-show="!isCollapse"></i>
                </div>

                <el-menu :default-active="defaultActive" :collapse="isCollapse" class="sideMenu" style="height: 100%;" router unique-opened>
                    <el-menu-item index="home">
                        <i class="el-icon-menu"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>

                    <cost-menu></cost-menu>
                    <main-menu></main-menu>
                </el-menu>

            </aside>

            <section class="content-container" id="mainSec">
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
            </section>

		</div>

	</div>
</template>

<script>
	import checkPermission from '@/util/checkPermission'
	
	import CostMenu from '@/menu/CostMenu'
	import MainMenu from '@/menu/MainMenu'

    export default {
    	components: {
			MainMenu,
			CostMenu,
			
		},
        data() {
            return {
                isCollapse: false,
            };
        },

        computed: {
            defaultActive: function(){
                return this.$route.path.replace('/', '');
            },

        },
        methods: {
            collapseC: function () {
                this.isCollapse = !this.isCollapse;
            },
        }
    }
</script>

<style lang="less" scoped>
	@import '../assets/css/mixin';
</style>
