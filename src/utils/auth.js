const localStorage = window.localStorage
const USER_KEY = 'user_info'

// export 也用来导出，它支持导出多个成员
// 这种方式的好处是：支持按需加载，需要谁加载谁，打包（npm run bulid）的时候，对于没有使用的，不会打包到结果中
// 获取数据
export function getUser () {
    return JSON.parse(localStorage.getItem(USER_KEY))
}
// 保存数据
export function saveUser (data) {
    localStorage.setItem(USER_KEY,JSON.stringify(data))
}
// 删除数据
export function removeUser () {
    localStorage.removeItem(USER_KEY)
}