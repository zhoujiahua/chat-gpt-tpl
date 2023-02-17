<template>
	<view class="container">
		<u-toast ref="uToast"></u-toast>
		<view class="bg"></view>
		<view class="form">
			<view class="header">
				<view class="title">人工智能回答你需要的问题</view>
			</view>
			<u-transition :show="true" mode="fade-left">
				<view class="panel">
					<view class="head">
						<view class="title">填写您的问题</view>
						<view class="tips">与人工智能对话</view>
					</view>
					<view class="textarea">
						<u--textarea v-model="keywords" confirmType="done" height="140" placeholder="支持长按粘贴您的问题">
						</u--textarea>
					</view>
					<view class="btn-group">
						<view class="btn paste" @click="onEmpty">
							<u-button icon="file-text" text="清空问题"></u-button>
						</view>
						<view class="btn get">
							<u-button @click="onSubmitGPT" iconColor="#ffffff" color="#3975FB" icon="edit-pen"
								text="获取问题答案"></u-button>
						</view>
					</view>
				</view>
			</u-transition>
		</view>
		<view class="alert">
			<u-alert title="当前使用人数过多,获取答案可能超过30秒钟" type="error"></u-alert>
		</view>
		<view class="tool">
			<view class="header">
				<view class="title">功能特性</view>
			</view>
			<u-transition :show="true" mode="slide-up">
				<view class="grid">
					<view class="item">
						<view class="icon">
							<u-icon size="28"
								name="https://img.alicdn.com/imgextra/i1/2064565174/O1CN01v7Y9311o5k2r5Rwaq_!!2064565174.png">
							</u-icon>
						</view>
						<view class="title">AI回答</view>
						<view class="desc">轻松获取</view>
					</view>
					<view class="item">
						<view class="icon">
							<u-icon size="28"
								name="https://img.alicdn.com/imgextra/i1/2064565174/O1CN01H200mY1o5k2ythU1B_!!2064565174.png">
							</u-icon>
						</view>
						<view class="title">智能答案</view>
						<view class="desc">免去千篇一律</view>
					</view>
					<view class="item">
						<view class="icon">
							<u-icon size="28"
								name="https://img.alicdn.com/imgextra/i1/2064565174/O1CN01FDSoxG1o5k2xjTHUD_!!2064565174.png">
							</u-icon>
						</view>
						<view class="title">自动代码</view>
						<view class="desc">免去繁琐搜索</view>
					</view>
					<view class="item">
						<view class="icon">
							<u-icon size="28"
								name="https://img.alicdn.com/imgextra/i4/2064565174/O1CN01UP4ksa1o5k2rDpdOP_!!2064565174.png">
							</u-icon>
						</view>
						<view class="title">引导写作</view>
						<view class="desc">AI发散思维</view>
					</view>
					<view class="item">
						<view class="icon">
							<u-icon size="28"
								name="https://img.alicdn.com/imgextra/i2/2064565174/O1CN01Oep4C01o5k2zlWs2q_!!2064565174.png">
							</u-icon>
						</view>
						<view class="title">存在限制</view>
						<view class="desc">会有偏见内容</view>
					</view>
					<view class="item">
						<view class="icon">
							<u-icon size="28"
								name="https://img.alicdn.com/imgextra/i1/2064565174/O1CN01onUFC01o5k2uPHOqj_!!2064565174.png">
							</u-icon>
						</view>
						<view class="title">在线工具</view>
						<view class="desc">无需下载软件</view>
					</view>
				</view>
			</u-transition>
		</view>
		<view class="share" @click="onCopy">
			<u-button shape="circle" color="#3975FB" :plain="true" icon="share" text="推荐给朋友"></u-button>
		</view>
	</view>
</template>

<script>
	import {
		system
	} from '@/api/chat.js';
	import {
		detail
	} from '@/api/user.js';
	export default {
		data() {
			return {
				userInfo: {},
				dealerSetting: {},
				setting: {},
				keywords: ''
			};
		},
		onLoad() {
			this.getStore()
		},
		methods: {
			getUser() {
				let _this = this;
				detail({})
					.then(res => {
						_this.userInfo = res.data.userInfo;
						_this.dealerSetting = res.data.dealerSetting;
					})
					.catch(err => {
						console.log(err);
					});
			},
			getStore() {
				system({}).then(res => {
					this.setting = res.data.setting
					if (this.setting.tpl_mode == 20) {
						uni.redirectTo({
							url: '/pages/main/chat/index'
						})
						return false;
					}
					uni.setNavigationBarTitle({
						title: this.setting.title
					})
				}).catch(err => {

				})
			},
			onEmpty() {
				this.keywords = ''
			},
			onCopy() {
				if (this.dealerSetting.basic && this.dealerSetting.basic.values.is_open == 1) {
					uni.navigateTo({
						url: '/pages/dealer/poster/index'
					})
					return false;
				}
				let href = window.location.href
				let index = href.indexOf("#")
				let url = href.substring(0, index)
				let oInput = document.createElement('input');
				oInput.value = url;
				document.body.appendChild(oInput);
				oInput.select(); // 选择对象;
				document.execCommand("Copy"); // 执行浏览器复制命令
				// 复制成功提示;
				uni.showToast({
					title: '链接已复制',
					icon: 'none',
					duration: 2000
				});
				oInput.remove()
			},
			onSubmitGPT() {
				if (!this.keywords) {
					this.$refs.uToast.show({
						type: 'error',
						icon: false,
						message: "问题不能为空",
						complete() {

						}
					})
					return false;
				}
				uni.navigateTo({
					url: '/pages/main/answer/index?keywords=' + this.keywords
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.share {
		position: fixed;
		right: 40rpx;
		bottom: 120rpx;
		width: 40%;

		.u-button {
			box-shadow: 0rpx 10rpx 10rpx #eee !important;
		}
	}

	.tool {
		width: 90%;
		margin: 15rpx auto;

		.header {
			.title {
				margin-bottom: 30rpx;
			}
		}

		.grid {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;

			.item {
				width: 30%;
				display: flex;
				flex-direction: column;
				align-items: center;
				background-color: #d5e8fb;
				margin: 15rpx 0rpx;
				padding: 30rpx 0rpx;
				border-radius: 10rpx;

				.title {
					color: #1B2B20;
					margin-top: 15rpx;
				}

				.desc {
					color: #67776C;
					font-size: 24rpx;
				}
			}
		}
	}

	.alert {
		width: 90%;
		margin: 30rpx auto;
	}

	.form {
		width: 90%;
		margin: 0 auto;
		z-index: 999;

		.header {
			margin-bottom: 30rpx;

			.title {
				text-align: center;
				margin: 30rpx 0rpx;
			}
		}

		.panel {
			padding: 30rpx;
			background-color: #fff;
			border-radius: 15rpx;
			box-shadow: 0rpx 10rpx 10rpx #eee;

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

	.bg {
		position: fixed;
		top: 0rpx;
		left: 0rpx;
		width: 100%;
		background-color: #3975FB;
		min-height: 200rpx;
		border-radius: 0rpx 0rpx 140rpx 140rpx;
		z-index: -1;
	}
</style>
