<template>
	<view class="container">
		<view class="tabs">
			<u-tabs keyName="name" :scrollable="false" :list="tabs" @click="onClickTabs"></u-tabs>
		</view>
		<view class="number">
			<view class="text" v-if="index+1 == 1">团队人数：{{ dealer?dealer.first_num:0 }}人</view>
			<view class="text" v-if="index+1 == 2">团队人数：{{ dealer?dealer.second_num:0 }}人</view>
			<view class="text" v-if="index+1 == 3">团队人数：{{ dealer?dealer.third_num:0 }}人</view>
		</view>
		<view class="people" v-if="child.length > 0">
			<view class="item" v-for="(item, index) in child" :key="index">
				<view class="head">
					<u--image shape="circle" :showLoading="true" :src="item.user.avatarUrl" width="52px" height="52px">
					</u--image>
				</view>
				<view class="info">
					<view class="nickname">{{ item.user.nickName }}</view>
					<view class="date">{{ item.create_time }}</view>
				</view>
			</view>
		</view>
		<view class="people" v-else>
			<u-empty text="暂无团队记录" mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png"></u-empty>
		</view>
	</view>
</template>

<script>
	import {
		team
	} from '@/api/dealer.js';
	export default {
		data() {
			return {
				tabs: [{
						name: '一级团队'
					},
					{
						name: '二级团队'
					},
					{
						name: '三级团队'
					}
				],
				child: [],
				dealer: [],
				index: 0,
				level: 1
			};
		},
		onShow() {
			this.getTeam();
		},
		methods: {
			onClickTabs(e) {
				this.index = e.index;
				this.getTeam();
			},
			getTeam() {
				team({
						level: this.index + 1
					})
					.then(res => {
						this.child = res.data.list.data;
						this.dealer = res.data.dealer;
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

	.people {
		.item {
			display: flex;
			flex-direction: row;
			align-items: center;
			border-bottom: 1rpx solid #ecedef;

			.head {
				margin: 20rpx;
				margin-left: 40rpx;
			}

			.info {
				.nickname {
					font-size: 30rpx;
					color: #333333;
					margin-bottom: 10rpx;
				}

				.date {
					font-size: 24rpx;
					color: #999999;
				}
			}
		}
	}

	.number {
		background-color: #f5f6f7;

		.text {
			font-size: 28rpx;
			color: #999999;
			padding: 30rpx;
		}
	}
</style>
