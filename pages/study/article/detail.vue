<template>
	<view class="container">
		<view class="header">
			<view class="title">{{ article.article_title }}</view>
			<view class="date">
				<view class="left">
					<view class="text">{{ article.view_time }}</view>
				</view>
				<view class="right">
					<view class="icon">
						<u-icon size="14" name="eye"></u-icon>
					</view>
					<view class="num">{{ article.virtual_views + article.actual_views }}</view>
				</view>
			</view>
		</view>
		<view class="article">
			<view class="content">
				<u-parse :content="article.article_content"></u-parse>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		detail
	} from '@/api/article.js';
	export default {
		data() {
			return {
				article: {}
			};
		},
		onLoad(options) {
			this.article_id = options.article_id;
			this.getArticle();
		},
		methods: {
			getArticle() {
				detail({
						article_id: this.article_id
					})
					.then(res => {
						this.article = res.data.detail;
						uni.setNavigationBarTitle({
							title: this.article.article_title
						})
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

	.article {
		.content {
			width: 92%;
			margin: 0 auto;
		}
	}

	.header {
		display: flex;
		flex-direction: column;
		width: 92%;
		margin: 15rpx auto;
		border-bottom: 1rpx solid #f4f4f4;
		padding-bottom: 15rpx;

		.title {
			font-size: 32rpx;
			font-weight: bolder;
			margin: 15rpx 0rpx;
		}

		.date {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			color: #666;
			font-size: 24rpx;

			.right {
				display: flex;
				flex-direction: row;
				align-items: center;

				.icon {
					margin-right: 5rpx;
				}
			}
		}
	}
</style>
