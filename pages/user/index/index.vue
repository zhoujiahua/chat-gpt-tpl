<template>
	<view class="container">
		<view class="header">
			<view class="bg"></view>
			<view class="user" v-on:click="onToLogin">
				<view class="image" v-if="!userInfo.user_id">
					<u--image shape="circle" :showLoading="true"
						src="https://img.alicdn.com/imgextra/i1/2064565174/O1CN01uN8F1r1o5k0Th391y_!!2064565174.png"
						width="56px" height="56px"></u--image>
				</view>
				<view class="image" v-else>
					<u--image shape="circle" :showLoading="true"
						:src="userInfo.avatarUrl?userInfo.avatarUrl:'https://img.alicdn.com/imgextra/i1/2064565174/O1CN01uN8F1r1o5k0Th391y_!!2064565174.png'"
						width="56px" height="56px">
					</u--image>
				</view>
				<view class="content" v-if="!userInfo.user_id">
					<view class="nickname">{{ store.title }}</view>
					<view class="idcard">ID：888888</view>
				</view>
				<view class="content" v-else>
					<view class="nickname">{{ userInfo.nickName }}</view>
					<view class="idcard">ID：{{ userInfo.user_id }}</view>
				</view>
			</view>
			<view class="card">
				<view class="content">
					<view class="left">
						<view class="number" v-if="!userInfo.user_id">享受更多特权</view>
						<view class="number" v-else>
							<view v-if="userInfo.card_type == 10">当前剩余次数：{{ userInfo.second }}次</view>
							<view v-else>特权到期：{{ userInfo.end_time }}</view>
						</view>
						<view class="text">{{ store.slogan }}</view>
					</view>
					<view class="right" v-if="!userInfo.user_id" v-on:click="onToLogin">
						<view class="btn">
							<u-button shape="circle" color="#333" size="small" text="立即登录"></u-button>
						</view>
					</view>
					<view class="right" v-else>
						<view class="btn" @click="onRecharge" v-if="store.is_recharge == 10">
							<u-button shape="circle" color="#333" size="small" text="快速充值"></u-button>
						</view>
						<view class="btn" v-on:click="is_exchange = true" v-else>
							<u-button shape="circle" color="#333" size="small" text="卡密兑换"></u-button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="tool">
			<navigator url="/pages/dealer/index/index"
				v-if="dealerSetting.basic && dealerSetting.basic.values.is_open == 1">
				<view class="cell">
					<view class="left">
						<view class="icon">
							<u-icon size="25"
								name="https://img.alicdn.com/imgextra/i3/2064565174/O1CN01wNHVtU1o5k0bL56LJ_!!2064565174.png">
							</u-icon>
						</view>
						<view class="text">分销中心</view>
					</view>
					<view class="right">
						<view class="icon">
							<u--image
								src="https://img.alicdn.com/imgextra/i4/2064565174/O1CN011ZSo1M1o5k0fw4PPD_!!2064565174.png"
								width="6" height="12"></u--image>
						</view>
					</view>
				</view>
			</navigator>
			<view class="cell" v-on:click="is_exchange = true">
				<view class="left">
					<view class="icon">
						<u-icon size="25"
							name="https://img.alicdn.com/imgextra/i4/2064565174/O1CN013KjsNf1o5k0pU20dm_!!2064565174.png">
						</u-icon>
					</view>
					<view class="text">卡密兑换</view>
				</view>
				<view class="right">
					<view class="icon">
						<u--image
							src="https://img.alicdn.com/imgextra/i4/2064565174/O1CN011ZSo1M1o5k0fw4PPD_!!2064565174.png"
							width="6" height="12"></u--image>
					</view>
				</view>
			</view>
			<navigator url="/pages/study/index/index">
				<view class="cell">
					<view class="left">
						<view class="icon">
							<u-icon size="25"
								name="https://img.alicdn.com/imgextra/i3/2064565174/O1CN01qu595Z1o5k0lPatEM_!!2064565174.png">
							</u-icon>
						</view>
						<view class="text">学院中心</view>
					</view>
					<view class="right">
						<view class="icon">
							<u--image
								src="https://img.alicdn.com/imgextra/i4/2064565174/O1CN011ZSo1M1o5k0fw4PPD_!!2064565174.png"
								width="6" height="12"></u--image>
						</view>
					</view>
				</view>
			</navigator>
			<view class="cell" @click="onKefu">
				<view class="left">
					<view class="icon">
						<u-icon size="25"
							name="https://img.alicdn.com/imgextra/i3/2064565174/O1CN01oipOsE1o5k0mdNpPH_!!2064565174.png">
						</u-icon>
					</view>
					<view class="text">在线客服</view>
				</view>
				<view class="right">
					<view class="icon">
						<u--image
							src="https://img.alicdn.com/imgextra/i4/2064565174/O1CN011ZSo1M1o5k0fw4PPD_!!2064565174.png"
							width="6" height="12"></u--image>
					</view>
				</view>
			</view>
			<navigator url="/pages/user/question/index" v-if="store.is_record == 10">
				<view class="cell">
					<view class="left">
						<view class="icon">
							<u-icon size="25"
								name="https://img.alicdn.com/imgextra/i1/2064565174/O1CN01TkKDZ61o5k0fw1SFe_!!2064565174.png">
							</u-icon>
						</view>
						<view class="text">问答记录</view>
					</view>
					<view class="right">
						<view class="icon">
							<u--image
								src="https://img.alicdn.com/imgextra/i4/2064565174/O1CN011ZSo1M1o5k0fw4PPD_!!2064565174.png"
								width="6" height="12"></u--image>
						</view>
					</view>
				</view>
			</navigator>
			<navigator url="/pages/user/help/index">
				<view class="cell">
					<view class="left">
						<view class="icon">
							<u-icon size="25"
								name="https://img.alicdn.com/imgextra/i3/2064565174/O1CN010WpTsM1o5k0WSHEho_!!2064565174.png">
							</u-icon>
						</view>
						<view class="text">帮助中心</view>
					</view>
					<view class="right">
						<view class="icon">
							<u--image
								src="https://img.alicdn.com/imgextra/i4/2064565174/O1CN011ZSo1M1o5k0fw4PPD_!!2064565174.png"
								width="6" height="12"></u--image>
						</view>
					</view>
				</view>
			</navigator>
		</view>
		<!-- 弹窗兑换 -->
		<view class="mark">
			<u-overlay :show="is_exchange">
				<view class="overlay-warp">
					<view class="warp">
						<view class="close" v-on:click="doMask">
							<view class="icon">
								<u-icon size="20"
									name="https://img.alicdn.com/imgextra/i3/2064565174/O1CN0138dRin1o5k0oIYa3m_!!2064565174.png">
								</u-icon>
							</view>
						</view>
						<view class="input"><input @tap.stop @blur="onChangeInput" placeholder="请输入卡密兑换" /></view>
						<view class="submit">
							<u-button @click="onSubmit" color="#3975FB" shape="circle" text="立即兑换"></u-button>
						</view>
					</view>
				</view>
			</u-overlay>
		</view>
		<!-- 版权说明 -->
		<view class="copyright">
			<view class="text">{{ store.copyright }}</view>
		</view>
	</view>
</template>

<script>
	import {
		detail,
		exchange
	} from '@/api/user.js';
	import {
		config
	} from '@/api/system.js';
	export default {
		data() {
			return {
				is_exchange: false,
				cardNumber: '',
				userInfo: [],
				store: {},
				is_pay: false,
				recharge: [],
				dealerSetting: []
			};
		},
		onLoad() {},
		onShow() {
			this.getUser();
			this.getConfig();
		},
		methods: {
			onKefu() {
				window.location.href = this.store.kefu_url
			},
			onChangeInput(e) {
				this.cardNumber = e.detail.value;
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
			doMask() {
				this.is_exchange = !this.is_exchange;
			},
			onSubmit() {
				exchange({
						code: this.cardNumber
					})
					.then(res => {
						this.doMask();
						this.getUser();
						if (res.code == 1) {
							uni.showToast({
								title: res.msg
							});
						}
					})
					.catch(err => {
						this.doMask();
					});
			},
			onToLogin() {
				let _this = this;
				if (!_this.userInfo) {
					uni.navigateTo({
						url: '/pages/user/passport/login'
					});
				}
			},
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
			onRecharge() {
				uni.navigateTo({
					url: '/pages/user/recharge/index'
				})
			},
			onTool(value) {
				if (value == 50) {
					uni.navigateTo({
						url: '/pages/dealer/index/index'
					});
					return false;
				}
			}
		}
	};
</script>

<style lang="scss">
	page {
		padding-bottom: 120rpx;
	}

	/* 版权 */
	.copyright {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 30rpx;

		.text {
			font-size: 20rpx;
			color: #bababa;
		}
	}

	.mark {
		.overlay-warp {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
			z-index: 9999;

			.warp {
				width: 480rpx;
				height: 420rpx;
				background-image: url('https://img.alicdn.com/imgextra/i1/2064565174/O1CN01ykrIWT1o5k0tHmyAZ_!!2064565174.png');
				background-repeat: no-repeat;
				background-size: cover;

				.submit {
					width: 80%;
					margin: 0 auto;
					margin-top: 60rpx;
				}

				.input {
					width: 80%;
					margin: 0 auto;
					margin-top: 80rpx;
					z-index: 999;
					border: 1rpx solid #f4f4f4;
					padding: 15rpx;
					border-radius: 5rpx;

					input {
						font-size: 28rpx;
						color: #666;
						border-radius: 15rpx;
					}
				}

				.close {
					display: flex;
					flex-direction: row;
					justify-content: flex-end;
					width: 100%;
					padding-top: 15rpx;

					.icon {
						margin-right: 15rpx;
					}
				}
			}
		}
	}

	.tool {
		width: 80%;
		margin: 0 auto;
		margin-top: 40rpx;
		background-color: #fff;
		padding: 34rpx;
		border-radius: 15rpx;

		.cell {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 40rpx;

			.left {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;

				.text {
					font-size: 28rpx;
					color: #333333;
					margin-left: 15rpx;
				}
			}
		}
	}

	.header {
		width: 100%;
		position: relative;
		z-index: 999;

		.user {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding-top: 60rpx;
			padding-bottom: 74rpx;
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

		.bg {
			width: 100%;
			height: 100%;
			background-image: url('https://img.alicdn.com/imgextra/i4/2064565174/O1CN017UzT9L1o5k0bK7ost_!!2064565174.png');
			position: absolute;
			top: 0rpx;
			left: 0rpx;
			background-size: contain;
			z-index: -1;
			background-repeat: no-repeat;
		}

		.card {
			width: 86%;
			margin: 0 auto;
			background-size: cover;
			border-radius: 15rpx;
			background-image: url('https://img.alicdn.com/imgextra/i1/2064565174/O1CN011ROzWL1o5k0crT8pm_!!2064565174.png');

			.content {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				padding: 48rpx;

				.left {
					.number {
						font-weight: bolder;
						font-size: 28rpx;
						color: #eed9b0;
					}

					.text {
						font-size: 24rpx;
						color: #e2cead;
						margin-top: 24rpx;
					}
				}

				.right {
					.btn {
						.u-button--small {
							padding: 0rpx 30rpx !important;
						}

						.u-button__text {
							color: #333333 !important;
						}
					}
				}
			}
		}
	}
</style>
