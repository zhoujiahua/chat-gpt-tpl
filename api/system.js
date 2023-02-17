const http = uni.$u.http
// 获取置顶配置
export const config = (data) => http.post('/system/config',data)

// 获取首页菜单
export const menus = (data) => http.post('/index/menus',data)

// 获取首页banner
export const banner = (data) => http.post('/index/banner',data)

// 开始搜题
export const search = (data) => http.post('/search/run',data)

// 帮助中心
export const help = (data) => http.post('/system/help',data)
/**
 * 文件上传
 */
export const upload = (data) => http.upload('upload/image', {
	params: {},
	/* 会加在url上 */
	// #ifdef APP-PLUS || H5
	files: [], // 需要上传的文件列表。使用 files 时，filePath 和 name 不生效。App、H5（ 2.6.15+）
	// #endif
	// #ifdef MP-ALIPAY
	fileType: 'image/video/audio', // 仅支付宝小程序，且必填。
	// #endif
	filePath: data.file, // 要上传文件资源的路径。
	// 注：如果局部custom与全局custom有同名属性，则后面的属性会覆盖前面的属性，相当于Object.assign(全局，局部)
	custom: {
		auth: true
	}, // 可以加一些自定义参数，在拦截器等地方使用。比如这里我加了一个auth，可在拦截器里拿到，如果true就传token
	name: 'iFile', // 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
	// #ifdef H5 || APP-PLUS
	timeout: 60000, // H5(HBuilderX 2.9.9+)、APP(HBuilderX 2.9.9+)
	// #endif
	header: {

	},
	/* 会与全局header合并，如有同名属性，局部覆盖全局 */
	formData: {}, // HTTP 请求中其他额外的 form data
	// 返回当前请求的task, options。请勿在此处修改options。非必填
	getTask: (task, options) => {
		// task.onProgressUpdate((res) => {
		//   console.log('上传进度' + res.progress);
		//   console.log('已经上传的数据长度' + res.totalBytesSent);
		//   console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);

		//   // 测试条件，取消上传任务。
		//   if (res.progress > 50) {
		//     uploadTask.abort();
		//   }
		// });
	},
	validateStatus: (statusCode) => { // statusCode 必存在。此处示例为全局默认配置。演示，非必填选项
		return statusCode >= 200 && statusCode < 300
	}
}).then(res => {
	// 返回的res.data 已经进行JSON.parse
	return res.data;
}).catch(err => {

})