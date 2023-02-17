<template>
	<view class="container">
		<u-sticky>
			<view class="tabs">
				<u-tabs :scrollable="false" :list="tabs" @click="onClickTabs"></u-tabs>
			</view>
		</u-sticky>
		<view class="lists" v-if="order.length > 0">
			<view class="item" v-for="(item, index) in order" :key="index">
				<view class="user">
					<u--image shape="circle" :showLoading="true" :src="item.user.avatarUrl" width="56" height="56">
					</u--image>
				</view>
				<view class="left">
					<view class="top">{{ item.user.nickName }}</view>
					<view class="bottom">消费金额：￥{{ item.order_price }}</view>
				</view>
				<view class="right">
					<block v-if="item.user_id == item.first_user_id">
						<view class="top error">+{{ item.first_money }}</view>
					</block>
					<block v-else-if="item.user_id == item.second_user_id">
						<view class="top error">+{{ item.second_money }}</view>
					</block>
					<block v-else-if="item.user_id == item.third_user_id">
						<view class="top error">+{{ item.third_money }}</view>
					</block>
					<view class="bottom time">{{ item.create_time }}</view>
				</view>
			</view>
		</view>
		<view class="lists" v-else>
			<u-empty text="暂无分销记录" mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png"></u-empty>
		</view>
	</view>
</template>

<script>
	import {
		order
	} from '@/api/dealer.js';
	export default {
		data() {
			return {
				order: [],
				settled: -1,
				page: 1,
				is_reach: false,
				last_page: 1,
				tabs: [{
						name: '全部',
						value: -1
					},
					{
						name: '未结算',

						value: 0
					},
					{
						name: '已结算',

						value: 1
					}
				]
			};
		},
		onShow() {
			this.getOrder();
		},
		methods: {
			onReachBottom() {
				this.is_reach = true;
				if (this.page <= this.last_page) {
					this.page = this.page += 1;
					this.getOrder();
				}
			},
			onClickTabs(e) {
				this.page = 1;
				this.settled = e.value;
				this.getOrder();
			},
			getOrder() {
				order({
						settled: this.settled,
						page: this.page
					})
					.then(res => {
						if (this.is_reach) {
							this.order = [...this.order, ...res.data.list.data];
						} else {
							this.order = res.data.list.data;
						}
						this.is_reach = false;
						this.last_page = res.data.list.last_page;
					})
					.catch(err => {});
			}
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}

	.tabs {
		background-color: #fff;
	}

	.lists {
		.item {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 36rpx;
			border-bottom: 1rpx solid #f4f4f4;

			.left {
				.top {
					font-size: 32rpx;
					font-weight: bolder;
					color: #333333;
					margin-bottom: 15rpx;
				}

				.bottom {
					font-size: 24rpx;
					color: #999999;
				}
			}

			.right {
				.time {
					color: #999999;
					font-size: 24rpx;
				}

				.top {
					color: #333333;
					font-weight: bolder;
					font-size: 32rpx;
					margin-bottom: 15rpx;
					text-align: right;
				}

				.bottom {
					font-size: 24rpx;
				}

				.success {
					color: #3b75fa;
				}

				.error {
					color: #f24e52;
				}
			}
		}
	}
</style>
