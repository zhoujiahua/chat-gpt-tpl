<template>
	<view class="container">
		<u-collapse @change="change" @close="close" @open="open">
			<u-collapse-item :title="item.title" name="Docs guide" v-for="(item,index) in list" :key="index">
				<text class="u-collapse-content">{{ item.content }}</text>
			</u-collapse-item>
		</u-collapse>
	</view>
</template>

<script>
	import { help } from '@/api/system.js';
	export default {
		data() {
			return {
				list: []
			};
		},
		onLoad() {
			this.getHelp();
		},
		methods: {
			open(e) {
				// console.log('open', e)
			},
			close(e) {
				// console.log('close', e)
			},
			change(e) {
				// console.log('change', e)
			},
			getHelp() {
				help({})
					.then(res => {
						this.list = res.data.list;
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
</style>
