<template>
	<view class="container">
		<u-sticky customNavHeight="0">
			<view class="search">
				<u-search @custom="onSearch" @search="onSearch" height="42" placeholder="请输入标题搜索相关记录"
					v-model="keywords"></u-search>
			</view>
		</u-sticky>
		<view class="chat" v-if="question.length">
			<view class="item" v-for="(item,index) in question" :key="index">
				<view class="user">
					<view class="problem">
						<view class="background">
							{{ item.title }}
						</view>
					</view>
				</view>
				<view class="robot">
					<view class="avatar">
						<u--image imgMode="scaleToFill" :showLoading="true" :src="setting.logo_path" width="81rpx"
							height="81rpx"></u--image>
					</view>
					<view class="reply" @click="onCopy(item.content)">
						<view class="background">
							{{ item.content }}
						</view>
						<view class="copy-text">点击内容复制</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else>
			<u-empty mode="data" text="暂无问答记录~!" icon="http://cdn.uviewui.com/uview/empty/data.png">
			</u-empty>
		</view>
	</view>
</template>

<script>
	import marked from 'marked'
	import {
		question
	} from '@/api/chat.js';
	import {
		config
	} from '@/api/system.js';
	export default {
		data() {
			return {
				page: 1,
				is_reach: false,
				keywords: "",
				active: 0,
				setting: {},
				question: [],
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
			};
		},
		onLoad() {
			let mode = uni.getStorageSync('mode')
			if (mode) {
				this.active = mode
			}
			this.getStore()
		},
		onShow() {
			let _this = this
			_this.getQuestion()
		},
		onReachBottom() {
			let _this = this
			_this.is_reach = true
			_this.page = _this.page + 1
			_this.getQuestion()
		},
		methods: {
			onSearch() {
				let _this = this
				_this.page = 1
				_this.getQuestion()
			},
			onCopy(content) {
				let oInput = document.createElement('input');
				oInput.value = content;
				document.body.appendChild(oInput);
				oInput.select(); // 选择对象;
				document.execCommand("Copy"); // 执行浏览器复制命令
				// 复制成功提示;
				uni.showToast({
					title: '内容已复制',
					icon: 'none',
					duration: 2000
				});
				oInput.remove()
			},
			getQuestion() {
				let _this = this
				question({
					page: this.page,
					keywords: this.keywords,
				}).then(res => {
					let data = res.data.question.data
					if (_this.is_reach) {
						_this.question = [...this.question, ...res.data.question.data]
					} else {
						_this.question = res.data.question.data
					}
					_this.is_reach = false
				}).catch(err => {
					uni.hideLoading()
				})
			},
			getStore() {
				config({
					key: 'store'
				}).then(res => {
					this.setting = res.data.config
					let chat_tips = this.setting.chat_tips
					this.setting.chat_tips = chat_tips.replaceAll("\n", "<br>")
					uni.setNavigationBarTitle({
						title: this.setting.name
					})
				}).catch(err => {

				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}

	.search {
		margin: 0 auto;
		padding: 30rpx;
		background-color: #fff;
	}

	.tips {
		text-align: center;
		font-size: 20rpx;
		margin-top: 30rpx;
		color: #ceccca;
	}

	.chat {
		width: 92%;
		margin: 0 auto;

		.item:first-child {
			.user {
				margin-top: 30rpx;
			}
		}

		.robot {
			width: 100%;
			display: flex;
			flex-direction: row;
			margin: 30rpx 0rpx;

			.reply {
				max-width: 73%;
				margin-left: 15rpx;
				position: relative;

				.copy-text {
					width: 160rpx;
					position: absolute;
					bottom: -52rpx;
					left: 10rpx;
					color: #82848a;
					font-size: 24rpx;
					background-color: #fff;
				}

				.background {
					padding: 20rpx;
					background-color: #f4f4f5;
					border-radius: 10rpx;
					font-size: 28rpx;
					color: #606266;
					box-shadow: 5rpx 5rpx 30rpx #f4f4f5;
				}
			}
		}

		.user {
			width: 100%;
			display: flex;
			flex-direction: row;
			margin: 15rpx 0rpx;
			text-align: right;
			justify-content: flex-end;
			margin-top: 68rpx;

			.problem {
				max-width: 73%;
				margin-right: 15rpx;

				.background {
					padding: 20rpx;
					background-color: #26B3A0;
					color: #fff;
					border-radius: 10rpx;
					padding: 30rpx;
				}
			}
		}
	}
</style>
