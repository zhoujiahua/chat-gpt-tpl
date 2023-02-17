const http = uni.$u.http
// 用户登录
export const login = (data) => http.post('/user/login', data)
// 用户信息
export const detail = (data) => http.get('/user/detail', {
	params: data
})
// 问答列表
export const question = (data) => http.get('/user/question', {
	params: data
})
// AI对话
export const chat = (data) => http.post('/chat/run', data)
// 获取系统配置
export const system = (data) => http.post('/chat/system', data)
export const favorite = (data) => http.get('/chat/favorite', {
	params: data
})
