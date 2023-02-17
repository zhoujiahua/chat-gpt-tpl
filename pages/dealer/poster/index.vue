<template>
	<view class="container">
		<view class="poster">
			<u-image :showLoading="true" :src="qrcode" width="100%" :height="screenHeight" @click="onPreviewImage">
			</u-image>
		</view>
	</view>
</template>

<script>
	import {
		poster
	} from '@/api/dealer.js';
	export default {
		data() {
			return {
				qrcode: '',
				screenHeight: 0
			};
		},
		onLoad() {
			this.screenHeight = uni.getSystemInfoSync()['screenHeight'];
		},
		onShow() {
			this.getPoster();
		},
		methods: {
			onPreviewImage() {
				uni.previewImage({
					urls: [this.qrcode]
				});
			},
			getPoster() {
				let platform = 'douyin'
				// #ifdef MP-WEIXIN
				platform = 'weixin'
				// #endif
				poster({
						platform: platform
					})
					.then(res => {
						this.qrcode = res.data.qrcode;
						uni.previewImage({
							urls: res.data.qrcode
						});
					})
					.catch(err => {});
			}
		}
	};
</script>

<style lang="scss"></style>
