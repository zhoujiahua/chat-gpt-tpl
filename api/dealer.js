const http = uni.$u.http
// 用户提现明细
export const cashLog = (data) => http.post('/dealer.withdraw/lists', data)
// 用户信息
export const detail = (data) => http.post('/dealer.user/detail', data)
// 我的团队
export const team = (data) => http.post('/dealer.team/lists', data)
// 我的订单
export const order = (data) => http.post('/dealer.order/lists', data)
// 我的订单
export const poster = (data) => http.post('/dealer.qrcode/poster', data)