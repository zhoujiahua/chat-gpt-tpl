const http = uni.$u.http
// 抖音用户登录
export const ByteLogin = (data) => http.post('/byte/login', data)
// 微信小程序用户登录
export const AppletLogin = (data) => http.post('/user/login', data)
// 微信H5用户登录
export const MPLogin = (data) => http.post('/user/mpLogin', data)
// 用户信息
export const detail = (data) => http.post('/user/detail', data)
// 更新用户信息
export const modify = (data) => http.post('/user/modify', data)
// 模拟练习
export const exam = (data) => http.post('/index/exam', data)
// 兑换卡密
export const exchange = (data) => http.post('/user/exchange', data)
// 提现申请
export const withdraw = (data) => http.post('/dealer.withdraw/submit', data)
// 注册用户
export const register = (data) => http.post('/user/register', data)
// H5登录
export const h_login = (data) => http.post('/user/h_login', data)
