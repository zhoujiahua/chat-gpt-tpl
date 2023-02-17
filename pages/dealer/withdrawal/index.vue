<template>
	<view class="container">
		<u-toast ref="uToast"></u-toast>
		<view class="header">
			<view class="bg"></view>
			<view class="withdrawal">
				<view class="top">
					<view class="label">可提现金额：</view>
					<view class="money">￥{{ dealer.money }}</view>
				</view>
				<view class="bottom">
					<view class="label">可提现金额：</view>
					<view class="input" v-if="active == 0"><input v-model="money" focus placeholder="请输入提现金额" /></view>
					<view class="input" v-if="active == 1"><input v-model="alipay.money" focus placeholder="请输入提现金额" />
					</view>
					<view class="input" v-if="active == 2"><input v-model="bank.money" focus placeholder="请输入提现金额" />
					</view>
				</view>
			</view>
		</view>
		<view class="tips" v-if="setting.settlement">
			<view class="text">最低提现金额{{ setting.settlement.values.min_money }}元</view>
		</view>
		<view class="form">
			<view class="tabs">
				<u-tabs :scrollable="false" :list="tabs" @click="onClickTabs"></u-tabs>
			</view>
			<view class="alipay item" v-if="active == 0">
				<input class="input" placeholder="请输入姓名" />
				<input class="input" placeholder="请输入联系电话" />
			</view>
			<view class="alipay item" v-if="active == 1">
				<input class="input" v-model="alipay.alipay_name" placeholder="请输入姓名" />
				<input class="input" v-model="alipay.alipay_account" placeholder="请输入支付宝账号" />
			</view>
			<view class="bank item" v-if="active == 2">
				<input class="input" v-model="bank.bank_name" placeholder="请输入姓名" />
				<input class="input" v-model="bank.bank_account" placeholder="请输入开户行名称/地址" />
				<input class="input" v-model="bank.bank_card" placeholder="请输入银行卡号" />
			</view>
			<view class="submit" @click="submit">
				<u-button shape="circle" text="立即提现" color="#2f6cf9"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		detail
	} from '@/api/dealer.js';
	import {
		withdraw
	} from '@/api/user.js';
	export default {
		data() {
			return {
				dealer: [],
				user: [],
				balance: '',
				active: 0,
				setting: [],
				money: '',
				alipay: {
					money: '',
					alipay_name: '',
					alipay_account: '',
					pay_type: 20
				},
				bank: {
					money: '',
					bank_name: '',
					bank_account: '',
					bank_card: '',
					pay_type: 30
				},
				tabs: [{
						name: '微信'
					},
					{
						name: '支付宝'
					},
					{
						name: '银行卡'
					}
				]
			};
		},
		onShow() {
			this.getUser()
		},
		methods: {
			getUser() {
				let _this = this;
				detail({})
					.then(res => {
						_this.dealer = res.data.dealer;
						_this.setting = res.data.setting
					})
					.catch(err => {
						console.log(err);
					});
			},
			submit() {
				let data = {};
				if (this.active == 0) {
					data = {
						pay_type: 10,
						money: this.money
					};
				}
				if (this.active == 1) {
					data = this.alipay;
				}
				if (this.active == 2) {
					data = this.bank;
				}
				withdraw({
						data: JSON.stringify(data)
					})
					.then(res => {
						if (res.code == 1) {
							this.getUser()
							this.$refs.uToast.show({
								type: 'success',
								message: res.msg,
								complete() {}
							})
						}
						console.log(res);
					})
					.catch(err => {});
			},
			onClickTabs(e) {
				this.active = e.index;
			}
		}
	};
</script>

<style lang="scss">
	page {
		width: 100%;
	}

	.form {
		background-color: #fff;
		padding: 30rpx;
		margin-top: 30rpx;

		.submit {
			margin-top: 30rpx;
		}

		.item {
			width: 90%;
			margin: 0 auto;

			.input {
				font-size: 28rpx;
				margin: 15rpx 0rpx;
				border-bottom: 1rpx solid #f4f4f4;
				padding-bottom: 15rpx;
			}
		}
	}

	.tips {
		text-align: right;
		margin-top: 140rpx;
		font-size: 28rpx;
		margin-right: 60rpx;
		color: #666;
	}

	.header {
		width: 100%;
		position: relative;

		.withdrawal {
			width: 80%;
			background-color: #fff;
			position: absolute;
			bottom: -120rpx;
			left: 5%;
			border-radius: 10rpx;
			box-shadow: 0rpx 5rpx 15rpx #ccc;
			display: flex;
			flex-direction: column;
			padding: 30rpx;
			font-size: 28rpx;

			.top {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				border-bottom: 1rpx solid #f4f4f4;
				padding-bottom: 26rpx;

				.money {
					font-size: 32rpx;
					font-weight: bolder;
					color: #2f6cf9;
				}
			}

			.bottom {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding-top: 26rpx;

				input {
					text-align: right;
					text-align: end;
				}
			}
		}

		.bg {
			width: 100%;
			height: 200rpx;
			background-image: url('https://img.alicdn.com/imgextra/i3/2064565174/O1CN01oZpUUH1o5k0sFyhK7_!!2064565174.png');
			background-repeat: no-repeat;
			background-size: cover;
		}
	}
</style>
