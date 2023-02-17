const http = uni.$u.http
// 文章列表
export const article = (data) => http.get('/article/lists', {
	params: data
})
// 文章详情
export const detail = (data) => http.get('/article/detail', {
	params: data
})
// 文章分类
export const category = (data) => http.post('/article/index', data)