<template>
	<view class="container">
		<view class="loading">
			<u--image :showLoading="true" src="/static/images/13d0b8359dc30b5509a545c5e9305e05.gif" width="120px"
				height="120px"></u--image>
		</view>
	</view>
</template>

<script>
	import {
		MPLogin
	} from '@/api/user.js';
	import {
		config
	} from '@/api/system.js';
	export default {
		data() {
			return {
				isWeixin: '',
				mp: {},
				store: {}
			};
		},
		onLoad(options) {
			let _this = this;
			if (options.delta) {
				_this.delta = options.delta
			}
			_this.getStore()
		},
		methods: {
			getStore() {
				let _this = this;
				config({
					key: 'store'
				}).then(res => {
					_this.store = res.data.config
					if (_this.store.mode == 20) {
						uni.redirectTo({
							url: '/pages/user/login/login'
						})
						return false;
					}
					_this.getConfig()
				}).catch(err => {

				})
			},
			getConfig() {
				config({
						key: 'mp'
					})
					.then(res => {
						this.mp = res.data.config;
						this.isWeixin = this.isWechat();
						if (this.isWeixin) {
							// #ifdef H5
							this.checkWeChatCode();
							// #endif
						}
					})
					.catch(err => {});
			},
			isWechat() {
				return String(navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) === 'micromessenger';
			},
			getUrlCode(name) {
				return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) ||
				[, ''
				])[1].replace(/\+/g, '%20')) || null;
			},
			checkWeChatCode() {
				let code = this.getUrlCode('code');
				let referee_id = uni.getStorageSync('referee_id');
				if (code) {
					console.log("进入登录...")
					MPLogin({
							code: code,
							referee_id: referee_id
						})
						.then(res => {
							uni.setStorageSync('user_id', res.data.user_id);
							uni.setStorageSync('token', res.data.token);
							let before_url = uni.getStorageSync('before_url');
							if (before_url) {
								window.location.href = before_url;
							} else {
								uni.reLaunch({
									url: '/pages/main/index/index'
								});
							}
						})
						.catch(err => {});
				} else {
					this.getWeChatCode();
				}
			},
			getWeChatCode() {
				let local = encodeURIComponent(window.location.href);
				let appid = this.mp.app_id;
				window.location.href =
					'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
					appid +
					'&redirect_uri=' +
					local +
					'&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect';
			},
		}
	};
</script>

<style lang="scss">
	page {
		background: #fff;
		font-size: 32rpx;
	}

	.loading {
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin-top: 280rpx;
	}

	.popup {
		.content {
			background-color: #fff;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 60rpx 30rpx;
			border-radius: 30rpx;
			padding-bottom: 20rpx;

			.login-tips {
				.text {
					font-size: 18rpx;
					background-color: #f3f4f6;
					padding: 10rpx 15rpx;
					border-radius: 15rpx;
					color: #909399;
				}
			}

			.avatar {
				width: 140rpx;
				height: 140rpx;
				border-radius: 50%;
			}

			.avatar-default {
				width: 140rpx;
				height: 140rpx;
			}

			.nickname {
				margin-top: 30rpx;

				input {
					border-bottom: 3rpx solid #f4f4f5;
					padding-bottom: 15rpx;
				}
			}

			.btn-group {
				width: 50%;
				margin-top: 15rpx;

				button[type='primary'] {
					background: linear-gradient(180deg, #f56c6c 0%, #e45656 100%) !important;
					border-radius: 60rpx;
					font-size: 24rpx;
					padding: 10rpx 15rpx;
				}
			}
		}
	}

	.container {
		padding: 0 60rpx;
	}

	.wechatapp {
		padding: 80rpx 0 48rpx;
		border-bottom: 1rpx solid #e3e3e3;
		margin-bottom: 72rpx;
		text-align: center;
	}

	.wechatapp .header {
		width: 190rpx;
		height: 190rpx;
		border: 2px solid #fff;
		margin: 0rpx auto 0;
		border-radius: 50%;
		overflow: hidden;
		box-shadow: 1px 0px 5px rgba(50, 50, 50, 0.3);
	}

	.auth-title {
		width: 80%;
		margin: 0 auto;
		color: #585858;
		font-size: 34rpx;
		margin-bottom: 40rpx;
	}

	.auth-subtitle {
		width: 80%;
		margin: 0 auto;
		color: #888;
		margin-bottom: 88rpx;
		font-size: 28rpx;
	}

	.login-btn {
		padding: 0 48rpx;
	}

	.login-btn button {
		height: 88rpx;
		line-height: 88rpx;
		background: #2f6cf9;
		color: #fff;
		font-size: 30rpx;
		border-radius: 999rpx;
		text-align: center;
	}

	.no-login-btn {
		margin-top: 20rpx;
		padding: 0 48rpx;
	}

	.no-login-btn button {
		height: 88rpx;
		line-height: 88rpx;
		background: #dfdfdf;
		color: #fff;
		font-size: 30rpx;
		border-radius: 999rpx;
		text-align: center;
	}
</style>
