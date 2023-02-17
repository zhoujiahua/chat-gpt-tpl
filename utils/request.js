// 此vm参数为页面的实例，可以通过它引用vuex中的变量
import siteinfo from "../siteinfo.js"
module.exports = (vm) => {
	// 初始化请求配置
	uni.$u.http.setConfig((config) => {
		config.timeout = 600000;
		/* config 为默认全局配置*/
		config.baseURL = siteinfo.siteroot; /* 根域名 */
		config.wxapp_id = siteinfo.uniacid
		return config
	})
	// 请求拦截
	uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
		// 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
		config.data = config.data || {}
		// 根据custom参数中配置的是否需要token，添加对应的请求头
		// if(config?.custom?.auth) {
		// 	// 可以在此通过vm引用vuex中的变量，具体值在vm.$store.state中
		// 	config.header.token = vm.$store.state.userInfo.token
		// } b5e8a700ac9739a43eae0c83aca7b7b4
		const token = uni.getStorageSync('token');
		// const token = '6a1f1f6c7f43d854ba779de1dd4765f5';
		config.header.token = token;
		config.url = config.url + "&wxapp_id=" + uni.$u.http.config.wxapp_id + "&token=" + token
		return config
	}, config => { // 可使用async await 做异步操作
		return Promise.reject(config)
	})

	// 响应拦截
	uni.$u.http.interceptors.response.use((response) => {
		/* 对响应成功做点什么 可使用async await 做异步操作*/
		const data = response.data
		// 自定义参数
		const custom = response.config?.custom
		let pages = getCurrentPages()
		if (data.code !== 1) {
			// 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
			if (custom.toast !== false) {
				uni.$u.toast(data.msg)
				if (data.code == -1) {
					uni.$u.toast('登录跳转中...')
					// 缓存当前页面
					uni.setStorageSync('before_url', window.location.href)
					uni.reLaunch({
						url: '/pages/user/passport/login'
					})
					return false;
				}
			}
			// 如果需要catch返回，则进行reject
			if (custom?.catch) {
				return Promise.reject(data)
			} else {
				// 否则返回一个pending中的promise，请求不会进入catch中
				return new Promise(() => {})
			}
		}
		return data.data === undefined ? {} : data
	}, (response) => {
		// 对响应错误做点什么 （statusCode !== 200）
		return Promise.reject(response)
	})
}
