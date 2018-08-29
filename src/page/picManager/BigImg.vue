<template>
    <!-- 过渡动画 -->
    <transition name="fade">
        <div class="img-view" @click="bigImg">
            <div class="img">
                <img :src="imgSrc">
            </div>
			<!-- 遮罩层 -->
			<div class="img-layer"></div>
        </div>
    </transition>
</template>
<script>
export default {
    props: ['imgSrc'],
    methods: {
        bigImg() {
            // 发送事件
            this.$emit('clickit')
        }
    }
}
</script>
<style scoped>
/*动画*/
.fade-enter-active,
.fade-leave-active {
    transition: all .2s linear;
    transform: translate3D(0, 0, 0);
}

.fade-enter,
.fade-leave-active {
    transform: translate3D(100%, 0, 0);
}


/* bigimg */

.img-view {
    position: relative;
    width: 100%;
    height: 100%;
}

/*遮罩层样式*/
.img-view .img-layer {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    overflow: hidden;
}

/*不限制图片大小，实现居中*/
.img-view .img img {
    max-width: 1200px;
    display: block;
    z-index: 1000;
}

.img img{
	position: fixed !important;
	position: absolute;
	left: 500px;
	bottom: 100px !important;
	bottom: auto;
	top: expression(eval(document.compatMode && document.compatMode ==
		'CSS1Compat')? documentElement.scrollTop+(documentElement.clientHeight-
		 this.clientHeight): document.body.scrollTop+(document.body.clientHeight-
		 this.clientHeight));
}

</style>