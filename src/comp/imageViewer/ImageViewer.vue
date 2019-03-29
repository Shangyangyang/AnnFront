<template>
	<div v-if="visible" @click="hideImage">
		<div class="see-image" :style="{ backgroundColor:background }">
			<img v-drag="greet" id="drag" class="image" :src="currentImg" @mousewheel="wheel" ref="user_image" />
		</div>
		<div class="close" @click="close" v-show="cinfig_4"><img src="./icon/close.png" /></div>
		<div class="rotate" @click.stop="rotateImage" v-show="config_3"><img src="./icon/rotate.png" /></div>

	</div>
</template>

<script>
	const {
		config_1,
		config_2,
		config_3,
		cinfig_4
	} = {
		config_1: 0.3,
		config_2: true,
		config_3: true,
		cinfig_4: true,
	};
	
	export default {
		data() {
			return {
				currentImg: '',
				visible: false,
				background: config_1 > 1 || config_1 <= 0 || typeof config_1 !== "number" ? null : 'rgba(0,0,0,' + config_1 + ')',
				config_3,
				cinfig_4,
			}
		},
		watch: {},
		methods: {
			close() {
				this.clearImg();
			},
			
			greet(val) {
				this.val = val;
			},

			
			hideImage(e) {
				if (!this.visible || (!config_2 && cinfig_4)) return;
				document.addEventListener('click', (e) => {
					if (e.target.nodeName !== 'IMG' && e.target.nodeName !== 'BUTTON') {
						this.clearImg();
					}
				});
			},

		
			rotateImage(e) {
				
				let fromRotateDeg = this.$refs.user_image.style.transform.split(' ');

				switch (fromRotateDeg[0]) {
					case 'rotate(0deg)':
						fromRotateDeg[0] = 'rotate(90deg)';
						break;
					case 'rotate(90deg)':
						fromRotateDeg[0] = 'rotate(180deg)';
						break;
					case 'rotate(180deg)':
						fromRotateDeg[0] = 'rotate(270deg)';
						break;
					case 'rotate(270deg)':
						fromRotateDeg[0] = 'rotate(360deg)';
						break;
					default:
						fromRotateDeg[0] = 'rotate(90deg)';
						break;
				}
				this.$refs.user_image.style.transform = fromRotateDeg.join(' ');
			},
			
			wheel(e) {

				if (e.wheelDelta) { 
					if (e.wheelDelta < 0) {
						this.$refs.user_image.style.transform = this.$refs.user_image.style.transform + ' scale(0.9)';
					}
					if (e.wheelDelta > 0) { 
						this.$refs.user_image.style.transform = this.$refs.user_image.style.transform + ' scale(1.1)';
					}
				} else if (e.detail) {
					if (e.detail < 0) { 
						this.$refs.user_image.style.transform = this.$refs.user_image.style.transform + ' scale(0.9)';
					}
					if (e.detail > 0) { 
						this.$refs.user_image.style.transform = this.$refs.user_image.style.transform + ' scale(1.1)';
					}
				}
			},

			//当图片隐藏时候的回调
			clearImg() {
				this.visible = false;
				document.removeEventListener('click', null);
				setTimeout(() => {
					if (this.$refs.user_image) {
						this.$refs.user_image.style.transform = 'rotate(0deg)';
						this.$refs.user_image.style.left = '';
						this.$refs.user_image.style.top = '';
					}
				}, 100)
			},
		}
	}
</script>

<style scoped>
	.see-image {
		width: 100%;
		z-index: 9999;
		background: rgba(0, 0, 0, .3);
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		animation: .25s showAimation ease;
	}

	@keyframes showAimation {
		from {
			opacity: .3;
		}

		to {
			opacity: 1;
		}
	}

	.image {
		max-width: 400px;
		min-width: 150px;
		position: absolute;
	}

	.rotate {
		width: 30px;
		height: 30px;
		background: #fff;
		border-radius: 50%;
		position: absolute;
		bottom: 50px;
		left: 50%;
		margin-left: -15px;
		color: #000;
		border: 1px solid rgba(0, 0, 0, .4);
		font-size: 12px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		z-index: 10000;
	}

	.rotate img {
		width: 10px;
	}

	.rotate:hover {
		background: #409EFF;
		border: 1px solid #409EFF;
	}

	.close {
		position: absolute;
		right: 140px;
		top: 140px;
		height: 40px;
		width: 40px;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: .3s;
		cursor: pointer;
		z-index: 10000;
	}

	.close:hover {
		transform: rotate(90deg);
	}

	.close img {
		width: 40px;
		height: 40px;

	}
</style>
