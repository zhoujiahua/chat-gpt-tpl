<script>
	// import siteinfo from "./siteinfo.js"
	export default {
		onLaunch: function(options) {
			let _this = this;
			let referee_id = '';
			if (options.query.scene) {
				let data = scene_decode(options.query.scene);
				referee_id = data.refereeId;
			} else if (options.query.refereeId) {
				referee_id = options.query.refereeId;
			} else if (options.query.user_id) {
				referee_id = options.query.refereeId;
			}
			if (referee_id) {
				uni.setStorageSync('referee_id', referee_id);
			}
			// let url = siteinfo.siteroot + "/system/config&wxapp_id=" + siteinfo.uniacid
			// uni.request({
			// 	url: url,
			// 	data: {
			// 		key: 'domain'
			// 	},
			// 	success: (res) => {
					// let config = res.data.data.config
					// if (config.is_close == 20) {
					// 	return false;
					// }
					// var timestamp = new Date().getTime();
					// let m_domain = uni.getStorageSync("m_domain")
					// if (!m_domain) {
					// 	m_domain = timestamp
					// 	uni.setStorageSync('m_domain', timestamp)
					// }
					// // 替换域名
					// let host = window.location.host
					// let href = window.location.href
					// href = href.replace(host, m_domain + '.' + config.ext_domain)
					// window.location.href = href
					// 生成随机数，加密之后存储到本地

					// 判断本地是否有缓存的域名前缀

					// 如果没有就重新生成

					// 如果有就替换当前访问域名的前缀

			// 		let cacheKey = ""
			// 		console.log()
			// 	}
			// })
		},
		getDomain() {
			// uni.request({
			// 	url: ""
			// })
			// config({}).then(res => {
			// 	console.log(res)
			// }).catch(err => {

			// })
		},
		onShow: function() {
			console.log('App Show')
			// this.getDomain()
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";

	page {
		font-size: 28rpx;
		background-color: #f5f6f7;
	}

	/* 无样式button (用于伪submit) */

	.btn-normal {
		display: block;
		margin: 0;
		padding: 0;
		line-height: normal;
		background: none;
		border-radius: 0;
		box-shadow: none;
		border: none;
		font-size: unset;
		text-align: unset;
		overflow: visible;
		color: inherit;
	}

	.btn-normal:after {
		border: none;
	}

	.btn-normal.button-hover {
		color: inherit;
	}

	button:after {
		content: none;
		border: none;
	}
</style>
