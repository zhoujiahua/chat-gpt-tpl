<template>
	<view class="container">
		<view class="notice" v-if="setting.sys_notice">
			<u-notice-bar bgColor="#fff" color="#82848a" :text="setting.sys_notice"></u-notice-bar>
		</view>
		<view class="form">
			<view class="logo">
				<u--image :src="setting.logo_path" shape="circle" width="200rpx" height="200rpx">
				</u--image>
			</view>
			<u-transition :show="true" mode="slide-left">
				<view class="title">{{ setting.title }}</view>
			</u-transition>
			<u-transition :show="true" mode="slide-right">
				<view class="desc">{{ setting.slogan }}</view>
			</u-transition>
			<view class="btn-group">
				<view class="btn" v-on:click="onToForm">
					<u-button shape="circle" iconColor="#ffffff" color="#3975FB" icon="edit-pen" text="一键开启体验">
					</u-button>
				</view>
				<view class="btn" @click="onCopy">
					<u-button shape="circle" color="#3975FB" :plain="true" icon="share" text="推荐给朋友"></u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		config
	} from '@/api/system.js';
	import {
		detail
	} from '@/api/user.js';
	export default {
		data() {
			return {
				userInfo: {},
				setting: {},
				dealerSetting: {}
			};
		},
		onLoad() {
			this.getStore()
			this.getUser()
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
			getStore() {
				config({
					key: 'store'
				}).then(res => {
					this.setting = res.data.config
					uni.setNavigationBarTitle({
						title: this.setting.name
					})
				}).catch(err => {

				})
			},
			onToForm() {
				if (this.setting.tpl_mode == 20) {
					uni.navigateTo({
						url: '/pages/main/chat/index'
					})
					return false;
				}
				uni.navigateTo({
					url: '/pages/main/form/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	.form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 40%;

		.title {
			font-size: 38rpx;
			font-weight: bolder;
			margin-top: 15rpx;
		}

		.desc {
			margin-top: 15rpx;
			font-size: 28rpx;
			color: #666;
		}

		.btn-group {
			width: 80%;

			.btn {
				margin: 30rpx 0rpx;

				.u-button {
					height: 100rpx;
				}
			}
		}
	}
</style>
