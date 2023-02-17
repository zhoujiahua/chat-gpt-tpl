<template>
	<view class="container">
		<u-sticky>
			<view class="tabs"><u-tabs :scrollable="false" :list="tabs" @click="onClickTabs"></u-tabs></view>
		</u-sticky>
		<view class="lists" v-if="cash.length > 0">
			<view class="item" v-for="(item, index) in cash" :key="index">
				<view class="left">
					<view class="top">余额提现</view>
					<view class="bottom">{{ item.create_time }}</view>
				</view>
				<view class="right">
					<view class="top">-{{ item.money }}</view>
					<view :class="item.apply_status.value == 20 || item.apply_status.value == 40 ? 'bottom success' : 'bottom error'">{{ item.apply_status.name }}</view>
				</view>
			</view>
		</view>
		<view class="lists" v-else><u-empty text="暂无提现记录" mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png"></u-empty></view>
	</view>
</template>

<script>
import { cashLog } from '@/api/dealer.js';
export default {
	data() {
		return {
			cash: [],
			status: -1,
			tabs: [
				{
					name: '全部',
					value: -1
				},
				{
					name: '审核中',

					value: 10
				},
				{
					name: '已通过',

					value: 20
				},
				{
					name: '已打款',
					value: 40
				},
				{
					name: '已驳回',

					value: 30
				}
			]
		};
	},
	onShow() {
		this.getCashLog();
	},
	methods: {
		onClickTabs(e) {
			this.status = e.value;
			this.getCashLog();
		},
		getCashLog() { 
			cashLog({ status: this.status })
				.then(res => {
					this.cash = res.data.list.data;
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
			.top {
				color: #333333;
				font-weight: bolder;
				font-size: 32rpx;
				margin-bottom: 15rpx;
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
