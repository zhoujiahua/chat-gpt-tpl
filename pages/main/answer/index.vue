<template>
	<view class="container">
		<view class="action">
			<view class="tips">
				正在使用【{{ mode[active].text }}】
			</view>
			<view class="switch" @click="onSwitchMode">
				<u-switch activeColor="#3975FB" :value="true"></u-switch>
			</view>
		</view>
		<view class="answer">
			<block v-if="question.length > 0">
				<view class="item" v-for="(item,index) in question">
					<view class="ask">{{ item.title }}</view>
					<view class="content">
						<u-parse :content="item.content" :selectable="true"></u-parse>
					</view>
				</view>
			</block>
			<block v-else>
				<u-empty text="当前暂无问答" mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png">
				</u-empty>
			</block>
		</view>
		<!-- 继续提问 -->
		<view class="chase">
			<u-popup @close="onChase" :show="is_chase" round="30" :closeOnClickOverlay="true">
				<view class="form">
					<u-transition :show="true" mode="fade-left">
						<view class="panel">
							<view class="head">
								<view class="title">继续您的问题</view>
								<view class="tips">与人工智能对话</view>
							</view>
							<view class="textarea">
								<u--textarea v-model="keywords" confirmType="done" height="140"
									placeholder="支持长按粘贴您的问题"></u--textarea>
							</view>
							<view class="btn-group">
								<view class="btn paste" @click="onEmpty">
									<u-button icon="file-text" text="清空问题"></u-button>
								</view>
								<view class="btn get">
									<u-button @click="onSubmitGPT" iconColor="#ffffff" color="#3975FB" icon="edit-pen"
										text="开始提交对话"></u-button>
								</view>
							</view>
						</view>
					</u-transition>
				</view>
			</u-popup>
		</view>
		<view class="sheet">
			<view class="btn" @click="onHome">
				<u-button icon="grid" text="返回首页"></u-button>
			</view>
			<view class="btn" @click="onChase">
				<u-button iconColor="#ffffff" color="#3975FB" icon="file-text" text="继续提问AI"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		chat,
		system
	} from '@/api/chat.js';
	export default {
		data() {
			return {
				question: [],
				is_chase: false,
				keywords: '',
				active: 0,
				mode: [{
						text: '万能模型',
						url: 'https://img.alicdn.com/imgextra/i1/2064565174/O1CN0141rKL11o5k3O17T2v_!!2064565174.png'
					},
					{
						text: '面试模型',
						url: 'https://img.alicdn.com/imgextra/i4/2064565174/O1CN01yHBdlT1o5k3MdfxJa_!!2064565174.png'
					},
					{
						text: '律师模型',
						url: 'https://img.alicdn.com/imgextra/i4/2064565174/O1CN01dVkjpn1o5k3Stk8cc_!!2064565174.png'
					},
					{
						text: '恋爱模型',
						url: 'https://img.alicdn.com/imgextra/i2/2064565174/O1CN01K8uPEI1o5k3OlD2oq_!!2064565174.png'
					},
					{
						text: '编程模型',
						url: 'https://img.alicdn.com/imgextra/i3/2064565174/O1CN01nUVL9j1o5k3Hww2Mt_!!2064565174.png'
					},
					{
						text: '写作模型',
						url: 'https://img.alicdn.com/imgextra/i4/2064565174/O1CN01MFLxct1o5k3U769tD_!!2064565174.png'
					}
				],
			};
		},
		onLoad(options) {
			let mode = uni.getStorageSync('mode')
			if (mode) {
				this.active = mode
			}
			if (options.keywords) {
				this.keywords = options.keywords
				this.getChat()
			}
			this.getStore()
		},
		methods: {
			onSwitchMode(){
				uni.reLaunch({
					url:'/pages/main/mode/index'
				})
			},
			getStore() {
				system({}).then(res => {
					this.setting = res.data.setting
					uni.setNavigationBarTitle({
						title: this.setting.title
					})
				}).catch(err => {

				})
			},
			onEmpty() {
				this.keywords = ''
			},
			onSubmitGPT() {
				this.is_chase = !this.is_chase
				this.getChat()
			},
			getChat() {
				uni.showLoading({
					title: '努力思考中...'
				})
				chat({
					prompt: this.keywords
				}).then(res => {
					let data = res.data
					if (data) {
						for (let i in data) {
							let content = data[i].content
							data[i].content = content.replaceAll("\n", "<br>")
						}
					}
					this.question = [...this.question, ...data]
					uni.hideLoading()
					if (this.question.length > 2) {
						this.$nextTick(() => {
							uni.pageScrollTo({
								scrollTop: 2000000, //滚动到页面的目标位置（单位px）
								duration: 300 //滚动动画的时长，默认300ms，单位 ms
							});
						})
					}
				}).catch(err => {
					uni.hideLoading()
				})
			},
			onHome() {
				uni.reLaunch({
					url: '/pages/main/index/index'
				})
			},
			onChase() {
				this.keywords = ''
				this.is_chase = !this.is_chase
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding-bottom: 240rpx;
	}

	.chase {
		.form {
			width: 90%;
			margin: 0 auto;
			z-index: 999;
			padding-top: 15rpx;

			.panel {
				padding: 30rpx;
				background-color: #fff;
				border-radius: 15rpx;
				box-shadow: 0rpx 10rpx 10rpx #eee;
				margin: 30rpx 0rpx;

				.head {
					display: flex;
					flex-direction: row;
					justify-content: space-between;

					.tips {
						color: #dd6161;
					}
				}

				.textarea {
					margin-top: 30rpx;
				}

				.btn-group {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					margin-top: 30rpx;

					.paste {
						width: 40%;
					}

					.get {
						width: 56%;
					}
				}
			}
		}
	}

	.answer {
		width: 90%;
		margin: 0 auto;
		margin-top: 200rpx;
		z-index: -1;

		.item {
			margin-bottom: 60rpx;

			.ask {
				font-size: 36rpx;
				font-weight: bolder;
			}

			.content {
				margin-top: 30rpx;
				color: #606266;
			}
		}
	}

	.action {
		width: 92%;
		position: fixed;
		bottom: 0rpx;
		top: 0rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 80rpx;
		align-items: center;
		box-shadow: 10rpx 10rpx 10rpx #eee;
		padding: 30rpx;
		z-index: 999;
		background-color: #fff;
	}

	.sheet {
		width: 100%;
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		bottom: env(safe-area-inset-bottom);
		padding: 30rpx 0rpx;
		background-color: #fff;
		box-shadow: -10rpx -10rpx 10rpx #eee;

		.btn {
			width: 42%;

			.u-button {
				height: 90rpx;
			}
		}
	}
</style>
