<template>
	<view class="container">
		<view class="bg"></view>
		<view class="form">
			<view class="header">
				<view class="title">人工智能回答你需要的问题</view>
			</view>
			<block v-if="article.length > 0">
				<view class="panel" v-for="(item,index) in article">
					<view class="head">
						<view class="title">问：{{ item.article_title }}</view>
					</view>
					<view class="content">
						<u-parse :selectable="true" :content="item.article_content"></u-parse>
					</view>
					<view class="bottom">
						ChatGPT回答时间：{{ item.create_time }}
					</view>
				</view>
			</block>
			<block v-else>
				<u-empty text="当前暂无收录回答" mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png">
				</u-empty>
			</block>
		</view>
	</view>
</template>

<script>
	import {
		favorite,
		system
	} from '@/api/chat.js';
	export default {
		data() {
			return {
				article: []
			};
		},
		onLoad() {
			this.getFavorite()
			this.getStore()
		},
		methods: {
			getStore() {
				system({}).then(res => {
					this.setting = res.data.setting
					uni.setNavigationBarTitle({
						title: this.setting.title
					})
				}).catch(err => {

				})
			},
			getFavorite() {
				favorite({}).then(res => {
					let article = res.data.article.data
					if (article) {
						for (let i in article) {
							let content = article[i].article_content
							article[i].article_content = content.replaceAll("\n", "<br>")
						}
					}
					this.article = article
				}).catch(err => {

				})
			},
			onSubmit() {
				uni.navigateTo({
					url: '/pages/main/answer/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.form {
		width: 90%;
		margin: 0 auto;
		z-index: 999;

		.header {
			margin-bottom: 30rpx;

			.title {
				text-align: center;
				color: #fff;
				margin: 30rpx 0rpx;
			}
		}

		.panel {
			padding: 30rpx;
			background-color: #fff;
			border-radius: 15rpx;
			box-shadow: 0rpx 10rpx 10rpx #eee;
			margin-bottom: 15rpx;

			.bottom {
				font-size: 24rpx;
			}

			.head {
				border-bottom: 1rpx solid #eee;
				padding-bottom: 30rpx;

				.title {
					font-weight: bolder;
					font-size: 30rpx;
				}
			}

			.content {
				margin: 30rpx 0rpx;
			}

			.bottom {
				background-color: #F0FAF8;
				color: #26B3A0;
				padding: 15rpx;
				border-radius: 10rpx;
			}
		}
	}

	.bg {
		position: fixed;
		top: 0rpx;
		left: 0rpx;
		width: 100%;
		background-color: #26B3A0;
		min-height: 200rpx;
		border-radius: 0rpx 0rpx 140rpx 140rpx;
		z-index: -1;
	}
</style>
