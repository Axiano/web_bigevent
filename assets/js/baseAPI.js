// 秒次调用 $>grt()/$.post()/$.ajax() 的时候都会先调用 $.ajaxPrefilter( 这个函数
// 在这个函数中，可以拿到，我们给 ajax提供的配置对象
$.ajaxPrefilter(function (options) {
  // 发起真正的 Ajax请求之前，统一拼接发请求的根路径
  options.url = 'http://api-breakingnews-web.itheima.net' + options.url
  // 统一为有权限的接口，设置 headers请求头
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }
  // 全局统一挂在 complete 回调函数
  options.complete = function (res) {
    // 不论成功还是失败，都还调用这个 complete这个函数
    // 在 complete 回调函数中，使用 res.responseText 拿到服务器返回的信息
    if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
      // 强制清空 token
      localStorage.removeItem('token')
      // 强制跳转到登录页
      location.href = '/login.html'
      console.log(res);

    }
  }
})