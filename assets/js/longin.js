$(function () {
  // 点击去注册账号的链接
  $('#link_reg').on('click', function () {
    $('.title-box').text('我是注册框框')
    $('.login-box').hide(400)
    $('.reg-box').show(400)
  })
  // 点击去登录的链接
  $('#link_login').on('click', function () {
    $('.title-box').text('我是登录框框')
    $('.login-box').show(400)
    $('.reg-box').hide(400)
  })

  // 从layiu中获取form对象
  var form = layui.form
  var layer = layui.layer
  // 通过form.verify() 函数自定义校验规则
  form.verify({
    // 自定义一个叫做 pwd 验证规则
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 校验两次密码是否相同
    repwd: function (value) {
      // 通过形参拿到的确认密码框的内容，还需要拿到密码框的内容，需要进行等于的判断。
      // 如果判断失败，弹出一个失败的消息
      var pwd = $('.reg-box [name=password]').val()
      if (pwd != value) {
        return '两次密码不一致'
      }
    }
  })

  //监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    e.preventDefault()
    var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
    $.post('/api/reguser', data, function (res) {
      if (res.status != 0) {
        return layer.msg(res.message, { icon: 2 });
      }
      layer.msg(res.message, { icon: 1 });
      $('#link_login').click()
    })
  })

  // 监听登录表单的提交事件
  $('#form_login').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/login',
      // 快速获取表单数据
      data: $(this).serialize(),
      success: function (res) {
        if (res.status != 0) {
          return layer.msg('登录失败', { icon: 2 });
        }
        layer.msg('登录成功', { icon: 1 });
        // 将登录成功得到的 token 字符串，保存到 localStoage 中
        localStorage.setItem('token', res.token)
        location.href = '/index.html'
      }
    })
  })
})