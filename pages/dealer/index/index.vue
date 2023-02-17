<template>
	<view class="containers">
		<view class="dealer">
			<view class="user">
				<view class="bg"></view>
				<view class="info">
					<view class="left">
						<view class="image"><u--image shape="circle" :showLoading="true" :src="userInfo.avatarUrl?userInfo.avatarUrl:'https://img.alicdn.com/imgextra/i1/2064565174/O1CN01uN8F1r1o5k0Th391y_!!2064565174.png'" width="56" height="56"></u--image></view>
						<view class="content">
							<view class="nickname">{{ userInfo.nickName }}</view>
							<view class="idcard" v-if="userInfo && userInfo.parent">推荐人：{{ userInfo.parent.nickName }}</view>
							<view class="idcard" v-else>推荐人：平台推荐</view>
						</view>
					</view>
					<view class="right" @click="onWithdrawal">
						<view class="btn">
							<view class="icon"><u-icon name="https://img.alicdn.com/imgextra/i3/2064565174/O1CN01eetZyU1o5k0lqlMJW_!!2064565174.png"></u-icon></view>
							<view class="text">提现</view>
						</view>
					</view>
				</view>
				<view class="data">
					<view class="item">
						<view class="value">{{ dealer.user_id?dealer.money:0 }}元</view>
						<view class="text">可提现</view>
					</view>
					<view class="item line"></view>
					<view class="item">
						<view class="value">{{ dealer.user_id?dealer.freeze_money:0 }}元</view>
						<view class="text">冻结中</view>
					</view>
					<view class="item line"></view>
					<view class="item">
						<view class="value">{{ dealer.user_id?dealer.total_money:0 }}元</view>
						<view class="text">总收益</view>
					</view>
				</view>
			</view>
			<view class="apps">
				<view class="title">我的应用</view>
				<view class="tool">
					<view class="item" v-on:click="onWithdrawalLog">
						<view class="icon"><u-icon size="38" name="https://img.alicdn.com/imgextra/i2/2064565174/O1CN01Sko2KO1o5k0bmQFG8_!!2064565174.png"></u-icon></view>
						<view class="text">提现明细</view>
					</view>
					<view class="item" v-on:click="onDealerOrder">
						<view class="icon"><u-icon size="38" name="https://img.alicdn.com/imgextra/i3/2064565174/O1CN01rWX7Kh1o5k0p499mO_!!2064565174.png"></u-icon></view>
						<view class="text">订单明细</view>
					</view>
					<view class="item" v-on:click="onMyTeam">
						<view class="icon"><u-icon size="38" name="https://img.alicdn.com/imgextra/i2/2064565174/O1CN01CUMx9E1o5k0n4dCSX_!!2064565174.png"></u-icon></view>
						<view class="text">我的团队</view>
					</view>
					<view class="item" @click="onPoster">
						<view class="icon"><u-icon size="38" name="https://img.alicdn.com/imgextra/i4/2064565174/O1CN01UTVgkC1o5k0il2w5j_!!2064565174.png"></u-icon></view>
						<view class="text">推广海报</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { detail, order } from '@/api/dealer.js';
export default {
	data() {
		return {
			userInfo: [],
			Auth: true,
			dealer: []
		};
	},
	onShow() {
		this.getUser();
	},
	methods: {
		onPoster(){
			uni.navigateTo({
				url:'/pages/dealer/poster/index'
			})
		},
		onWithdrawal(){
			uni.navigateTo({
				url:'/pages/dealer/withdrawal/index'
			})
		},
		onDealerOrder() {
			uni.navigateTo({
				url: '/pages/dealer/order/index'
			});
		},
		onMyTeam() {
			uni.navigateTo({
				url: '/pages/dealer/team/index'
			});
		},
		onWithdrawalLog() {
			uni.navigateTo({
				url: '/pages/dealer/cash/index'
			});
		},
		getUser() {
			let _this = this;
			detail({})
				.then(res => {
					_this.dealer = res.data.dealer;
					_this.userInfo = res.data.user;
				})
				.catch(err => {
					console.log(err);
				});
		}
	}
};
</script>

<style lang="scss">
.dealer {
	width: 100%;
	.apps {
		width: 85%;
		margin: 15rpx auto;
		background-color: #fff;
		padding: 30rpx;
		border-radius: 15rpx;
		.title {
			font-size: 28rpx;
			color: #333333;
			font-weight: bolder;
			margin-bottom: 15rpx;
		}
		.tool {
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				.icon {
					margin: 15rpx 0rpx;
				}
				.text {
					color: #333333;
					font-size: 24rpx;
				}
			}
		}
	}
	.user {
		width: 100%;
		.bg {
			width: 100%;
			height: 360rpx;
			position: absolute;
			left: 0rpx;
			top: 0rpx;
			z-index: 998;
			background-size: cover;
			background-image: url('https://img.alicdn.com/imgextra/i4/2064565174/O1CN019dG3Gh1o5k0WtjMYC_!!2064565174.png');
		}
		.info {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			position: relative;
			z-index: 999;
			.left {
				display: flex;
				flex-direction: row;
				align-items: center;
				padding-top: 60rpx;
				padding-bottom: 30rpx;
				margin-left: 30rpx;
				.content {
					color: #fff;
					margin-left: 30rpx;
					.nickname {
						font-weight: bolder;
						font-size: 32rpx;
					}
					.idcard {
						font-size: 24rpx;
						margin-top: 15rpx;
					}
				}
			}
			.right {
				.btn {
					height: 60rpx;
					width: 120rpx;
					padding: 5rpx 15rpx;
					background-color: #fff;
					border-radius: 30rpx 0rpx 0rpx 30rpx;
					display: flex;
					flex-direction: row;
					justify-content: space-around;
					align-items: center;
					.text {
						font-size: 28rpx;
						color: #447bfc;
					}
				}
			}
		}
		.data {
			width: 90%;
			margin: 0 auto;
			background-color: #fff;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			padding: 60rpx 15rpx;
			border-radius: 15rpx;
			z-index: 999;
			position: relative;
			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				.value {
					color: #447bfc;
					font-size: 30rpx;
					font-weight: bolder;
					margin-bottom: 15rpx;
				}
				.text {
					color: #666666;
					font-size: 28rpx;
				}
			}
			.line {
				border-left: 1px solid #f1f1f1;
			}
		}
	}
}
.no-dealer {
	padding-top: 120rpx;
	.submit {
		width: 40%;
		margin: 120rpx auto;
	}
}
</style>
