const http = uni.$u.http
// 获取充值套餐
export const plan = (data) => http.post('/recharge/index',data)
// 充值次数
export const submit = (data) => http.post('/recharge/submit',data)
// 充值次数
export const order = (data) => http.post('/recharge/order',data)