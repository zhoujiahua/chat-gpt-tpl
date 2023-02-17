<template>
	<view class="content">
		<u-toast ref="uToast"></u-toast>
		<view class="header">
			<image :src="store.logo_path"></image>
		</view>
		<view class="list">
			<view class="list-call">
				<u-icon name="account" size="22"></u-icon>
				<input class="sl-input" v-model="phone" type="number" maxlength="11" placeholder="请输入手机号或邮箱" />
			</view>
			<view class="list-call">
				<u-icon name="lock" size="22"></u-icon>
				<input class="sl-input" v-model="password" type="text" maxlength="32" placeholder="输入密码"
					password="true" />
			</view>
			<view class="button-login" hover-class="button-hover" @tap="bindLogin()">
				<text>立即登录</text>
			</view>
			<view class="agreenment">
				<text @click="onKefu">联系客服</text>
				<text>|</text>
				<navigator url="reg" open-type="navigate">注册账户</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		h_login
	} from '@/api/user.js';
	import {
		config
	} from '@/api/system.js';
	export default {
		data() {
			return {
				store: {},
				phone: '',
				password: ''
			};
		},
		onLoad() {
			this.getConfig()
		},
		methods: {
			onKefu() {
				window.location.href = this.store.kefu_url
			},
			getConfig() {
				let _this = this;
				config({
					key: 'store'
				}).then(res => {
					this.store = res.data.config
				}).catch(err => {

				})
			},
			bindLogin() {
				let _this = this
				h_login({
					phone: _this.phone,
					password: _this.password
				}).then(res => {
					if (res.code == 1) {
						_this.$refs.uToast.show({
							type: 'success',
							message: "登录成功~！",
							complete() {
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
							}
						})
					}
				}).catch(err => {

				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.header {
		width: 161rpx;
		height: 161rpx;
		box-shadow: 0rpx 12rpx 13rpx 0rpx rgba(57, 117, 251, 0.47);
		border-radius: 50%;
		margin-top: 30rpx;
		margin-left: auto;
		margin-right: auto;
	}

	.header image {
		width: 161rpx;
		height: 161rpx;
		border-radius: 50%;
	}

	.list {
		display: flex;
		flex-direction: column;
		padding-top: 50rpx;
		padding-left: 70rpx;
		padding-right: 70rpx;
	}

	.list-call {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 100rpx;
		color: #333333;
		border-bottom: 0.5px solid #e2e2e2;
	}

	.list-call .img {
		width: 40rpx;
		height: 40rpx;
	}

	.list-call .sl-input {
		flex: 1;
		text-align: left;
		font-size: 32rpx;
		margin-left: 16rpx;
	}

	.button-login {
		color: #FFFFFF;
		font-size: 34rpx;
		width: 470rpx;
		height: 100rpx;
		background: linear-gradient(-90deg, rgba(57, 117, 251, 0.47), rgba(21, 137, 226, 1.0));
		box-shadow: 0rpx 0rpx 13rpx 0rpx rgba(164, 217, 228, 0.2);
		border-radius: 50rpx;
		line-height: 100rpx;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-top: 100rpx;
	}

	.button-hover {
		background: linear-gradient(-90deg, rgba(57, 117, 251, 0.47), rgba(21, 137, 226, 1.0));
	}

	.agreenment {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		margin-top: 80rpx;
		color: #3975FB;
		text-align: center;
		height: 40rpx;
		line-height: 40rpx;
	}

	.agreenment text {
		font-size: 24rpx;
		margin-left: 15rpx;
		margin-right: 15rpx;
	}
</style>
