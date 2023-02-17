<template>
	<view class="container">
		<u-toast ref="uToast"></u-toast>
		<view class="header">
			<view class="title">{{ store.title }}</view>
			<view class="desc">{{ store.slogan }}</view>
		</view>
		<view class="mode">
			<view class="item" v-for="(item,index) in mode" :key="index" @click="onSetMode(index)">
				<view class="badge" v-if="active == index">
					<u-badge shape="horn" value="使用中"></u-badge>
				</view>
				<view class="image">
					<u--image radius="160rpx" :showLoading="true" :src="item.url" width="160rpx" height="160rpx">
					</u--image>
				</view>
				<view class="text">{{ item.text }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		config
	} from '@/api/system.js';
	export default {
		data() {
			return {
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
				store: {}
			};
		},
		onLoad() {
			this.getConfig()
			let mode = uni.getStorageSync("mode")
			if (mode) {
				this.active = mode
			}
		},
		methods: {
			onSetMode(active) {
				uni.setStorageSync("mode", active)
				this.active = active
				this.$refs.uToast.show({
					type: 'success',
					message: "已切换：" + this.mode[this.active].text,
					complete() {
					}
				})
			},
			getConfig() {
				let _this = this;
				config({
					key: 'store'
				}).then(res => {
					this.store = res.data.config
					uni.setNavigationBarTitle({
						title: this.store.name
					})
				}).catch(err => {

				})
			}
		}
	}
</script>

<style lang="scss">
	.header {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 30rpx 0rpx;

		.title {
			margin-bottom: 15rpx;
			font-size: 48rpx;
			font-weight: bolder;
		}
	}

	.mode {
		display: flex;
		flex-direction: row;
		justify-content: center;
		flex-wrap: wrap;
		align-items: center;

		.item {
			width: 30%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin: 15rpx 30rpx;
			background-color: #fff;
			padding: 20rpx;
			border-radius: 10rpx;
			position: relative;

			.badge {
				position: absolute;
				top: 0rpx;
				right: 0rpx;
				z-index: 999;
			}

			.text {
				margin-top: 15rpx;
			}

			.image {
				margin-top: 15rpx;
			}
		}
	}
</style>
