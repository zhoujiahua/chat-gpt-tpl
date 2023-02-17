/**
 * 工具类
 */
module.exports = {
	compareVersion(v1, v2) {
		v1 = v1.split('.')
		v2 = v2.split('.')
		const len = Math.max(v1.length, v2.length)

		while (v1.length < len) {
			v1.push('0')
		}
		while (v2.length < len) {
			v2.push('0')
		}

		for (let i = 0; i < len; i++) {
			const num1 = parseInt(v1[i])
			const num2 = parseInt(v2[i])

			if (num1 > num2) {
				return 1
			} else if (num1 < num2) {
				return -1
			}
		}

		return 0
	},
	/**
	 * scene解码
	 */
	scene_decode(e) {
		if (e === undefined)
			return {};
		let scene = decodeURIComponent(e),
			params = scene.split('&'),
			data = {};
		for (let i in params) {
			var val = params[i].split('=');
			val.length > 0 && val[0] && (data[val[0]] = val[1] || null)
		}
		return data;
	},

	/**
	 * 格式化日期格式 (用于兼容ios Date对象)
	 */
	format_date(time) {
		// 将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式 
		return time.replace(/\-/g, "/");
	},

	/**
	 * 对象转URL
	 */
	urlEncode(data) {
		var _result = [];
		for (var key in data) {
			var value = data[key];
			if (value.constructor == Array) {
				value.forEach(_value => {
					_result.push(key + "=" + _value);
				});
			} else {
				_result.push(key + '=' + value);
			}
		}
		return _result.join('&');
	},

	/**
	 * 遍历对象
	 */
	objForEach(obj, callback) {
		Object.keys(obj).forEach((key) => {
			callback(obj[key], key);
		});
	},

	/**
	 * 是否在数组内
	 */
	inArray(search, array) {
		for (var i in array) {
			if (array[i] == search) {
				return true;
			}
		}
		return false;
	},

	/**
	 * 判断是否为正整数
	 */
	isPositiveInteger(value) {
		return /(^[0-9]\d*$)/.test(value);
	},

	/**
	 * 对Date的扩展，将 Date 转化为指定格式的String
	 * 月(Y)、月(m)、日(d)、小时(H)、分(M)、秒(S) 可以用 1-2 个占位符，
	 * 例子：
	 * dateFormat('YYYY-mm-dd HH:MM:SS', new Date()) ==> 2020-01-01 08:00:00
	 */
	dateFormat(fmt, date) {
		const opt = {
			"Y+": date.getFullYear().toString(), // 年
			"m+": (date.getMonth() + 1).toString(), // 月
			"d+": date.getDate().toString(), // 日
			"H+": date.getHours().toString(), // 时
			"M+": date.getMinutes().toString(), // 分
			"S+": date.getSeconds().toString() // 秒
			// 有其他格式化字符需求可以继续添加，必须转化成字符串
		};
		let ret;
		for (let k in opt) {
			ret = new RegExp("(" + k + ")").exec(fmt);
			if (ret) {
				fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
			};
		};
		return fmt;
	},

};
