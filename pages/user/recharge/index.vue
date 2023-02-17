<template>
	<view class="container">
		<view class="bg"></view>
		<view class="header">
			<view class="left">
				<view class="text" v-if="user.card_type == 10">剩余次数</view>
				<view class="text" v-if="user.card_type == 20">特权到期</view>
				<view class="number">
					<view v-if="user.card_type == 10">{{ user.second }}次</view>
					<view v-else>{{ user.end_time }}</view>
				</view>
			</view>
			<view class="right" @click="onClickLog">
				<u-button text="充值明细" size="small"></u-button>
			</view>
		</view>
		<view class="block">
			<view class="tool">
				<view class="head">
					<view class="icon">
						<u-icon size="22"
							name="https://img.alicdn.com/imgextra/i1/2064565174/O1CN01Z6GJ1C1o5k0eRhIfh_!!2064565174.png">
						</u-icon>
					</view>
					<view class="title">会员套餐</view>
				</view>
				<view class="plan">
					<view class="item" :class="active == index ? 'active' : ''" @click="onClickPlan(index)"
						v-for="(item, index) in plan" :key="index">
						<view class="number" v-if="item.type == 10">{{ item.gift_money }}次</view>
						<view class="number" v-else>{{ item.gift_money }}天</view>
						<view class="price">￥{{ item.money }}</view>
					</view>
				</view>
				<view class="submit" @click="onSubmit">
					<u-button text="立即支付" color="#5286FE" shape="circle"></u-button>
				</view>
			</view>
		</view>
		<view class="block">
			<view class="tool">
				<view class="head">
					<view class="icon">
						<u-icon size="22"
							name="https://img.alicdn.com/imgextra/i1/2064565174/O1CN01HBe82n1o5k0cuW3LP_!!2064565174.png">
						</u-icon>
					</view>
					<view class="title">充值说明</view>
				</view>
				<view class="remarks">
					<view class="content">
						<rich-text :nodes="setting.describe"></rich-text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import siteinfo from '@/siteinfo.js';
	import {
		plan,
		submit
	} from '@/api/recharge.js';
	import {
		config
	} from '@/api/system.js';
	var jweixin = require('jweixin-module');
	export default {
		data() {
			return {
				active: 0,
				plan: [],
				user: [],
				setting: [],
				store: {}
			};
		},
		onLoad() {
			this.getConfig();
		},
		onShow() {
			this.getPlan();
		},
		methods: {
			getConfig() {
				let _this = this;
				config({
					key: 'store'
				}).then(res => {
					this.store = res.data.config
				}).catch(err => {

				})
			},
			onClickLog() {
				uni.navigateTo({
					url: '/pages/user/recharge/log'
				})
			},
			onSubmit() {
				if (this.store.mode == 20) {
					let url =
						siteinfo.siteroot + '/recharge/submit&token=' + uni.getStorageSync('token') + '&wxapp_id=' +
						siteinfo.uniacid + '&planId=' + this.plan[this
							.active].plan_id + '&return_url=' + encodeURIComponent(window.location.href);
					window.location.href = url;
					return false;
				}
				submit({
						planId: this.plan[this.active].plan_id
					})
					.then(res => {
						let payment = res.data.payment;
						jweixin.config({
							debug: payment.jssdk
								.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
							appId: payment.jssdk.appId, // 必填，公众号的唯一标识
							timestamp: payment.jssdk.timestamp, // 必填，生成签名的时间戳
							nonceStr: payment.jssdk.nonceStr, // 必填，生成签名的随机串
							signature: payment.jssdk.signature, // 必填，签名
							jsApiList: payment.jssdk.jsApiList // 必填，需要使用的JS接口列表
						});
						jweixin.ready(function() {
							jweixin.chooseWXPay({
								timestamp: payment.payment
									.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
								nonceStr: payment.payment.nonceStr, // 支付签名随机串，不长于 32 位
								package: payment.payment
									.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
								signType: payment.payment
									.signType, // 微信支付V3的传入RSA,微信支付V2的传入格式与V2统一下单的签名格式保持一致
								paySign: payment.payment.paySign, // 支付签名
								success: function(res) {
									_this.getPlan();
								}
							});
						});
					})
					.catch(err => {
						console.log(err);
					});
			},
			getPlan() {
				plan({})
					.then(res => {
						this.plan = res.data.plan;
						this.user = res.data.user;
						this.setting = res.data.setting;
						let describe = this.setting.describe;
						this.setting.describe = describe.replace(/\n/g, '<br />');
					})
					.catch(err => {});
			},
			onClickPlan(index) {
				this.active = index;
			}
		}
	};
</script>

<style lang="scss">
	rich-text {
		font-size: 24rpx;
		color: #666;
		line-height: 64rpx;
	}

	.block {
		width: 100%;
		background-color: #fff;
		position: relative;
		top: -50rpx;
		left: 0rpx;
		border-radius: 30rpx 30rpx 0rpx 0rpx;

		.tool {
			.remarks {
				margin-top: 15rpx;
			}

			.submit {
				margin-top: 30rpx;
			}

			padding: 30rpx;

			.head {
				display: flex;
				flex-direction: row;

				.title {
					font-size: 32rpx;
					color: #333333;
					margin-left: 15rpx;
				}
			}

			.plan {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				justify-content: space-between;
				margin-top: 30rpx;

				.item {
					width: 30%;
					border: 2rpx solid #d8d8d8;
					text-align: center;
					margin: 15rpx 0rpx;
					padding: 20rpx 0rpx;
					border-radius: 12rpx;

					.number {
						color: #3b75fa;
						font-size: 36rpx;
						font-weight: bolder;
					}

					.price {
						color: #666666;
						font-size: 28rpx;
						margin-top: 15rpx;
					}
				}

				.active {
					border: 2rpx solid #5286fe !important;
				}
			}
		}
	}

	.header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 80rpx 40rpx;
		z-index: 999;
		position: relative;

		.left {
			color: #fff;
			display: flex;
			flex-direction: column;
			align-items: flex-start;

			.text {
				font-size: 32rpx;
				margin-bottom: 15rpx;
			}

			.number {
				font-size: 48rpx;
				font-weight: bolder;
			}
		}

		.right {
			.u-button {
				border-radius: 40rpx !important;
			}

			.u-button__text {
				color: #5968f9 !important;
			}
		}
	}

	.bg {
		width: 100%;
		height: 320rpx;
		background-image: url('https://img.alicdn.com/imgextra/i1/2064565174/O1CN01LI1HhE1o5k0jt0M4K_!!2064565174.png');
		background-repeat: no-repeat;
		background-size: contain;
		position: absolute;
		top: 0rpx;
		left: 0rpx;
	}
</style>
