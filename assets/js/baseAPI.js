// 秒次调用 $>grt()/$.post()/$.ajax() 的时候都会先调用 $.ajaxPrefilter( 这个函数
// 在这个函数中，可以拿到，我们给 ajax提供的配置对象
$.ajaxPrefilter(function (options) {
  // 发起真正的 Ajax请求之前，统一拼接发请求的根路径
  options.url = 'http://api-breakingnews-web.itheima.net' + options.url
  console.log(options.url);
})