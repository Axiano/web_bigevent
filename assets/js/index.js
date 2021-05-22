$(function () {
  // 在父页面parent.html绑定一个自定义的触发条件和执行方法
  var $html = $("html");
  $html.on('parentAndChilenEvent', function () {
    getUserInfo()
  });

  var serviceType = 'Object'
  // 调用 getUserInfo 获取用户基本信息
  getUserInfo()
  var layer = layui.layer
  // 点击按钮实现退出功能
  $('#btnlogout').on('click', function () {
    // 弹出是否退出框
    layer.confirm('确定退出登录', { icon: 3, title: '提示' }, function (index) {
      //do something
      //清空 token
      localStorage.removeItem('token')
      // 跳转到登录页
      location.href = '/login.html'
      // 关闭 confirm 询问框
      layer.close(index);
    });
  })

  // 获取用户的基本信息
  function getUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status != 0) {
          return layer.msg(res.message, { icon: 2 })
        }
        // 调用 renderAvatar() 渲染用户的头像
        renderAvatar(res.data)
      },
      // // 不论成功还是失败，都还调用这个 complete这个函数
      // complete: function (res) {
      //   // 在 complete 回调函数中，使用 res.responseText 拿到服务器返回的信息
      //   if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
      //     // 强制清空 token
      //     localStorage.removeItem('token')
      //     // 强制跳转到登录页
      //     location.href = '/login.html'
      //   }
      // }
    })
  }

  // 渲染用户的头像
  function renderAvatar(user) {
    // 获取用户名称
    var name = user.nickname || user.username
    $('#welcome').text('欢迎，' + name)
    // 按需渲染用户头像
    if (user.user_pic != null) {
      // 渲染图片头像
      $('.layui-nav-img').attr('src', user.user_pic).show()
      $('.text-avatar').hide()
    } else {
      // 渲染文本头像
      $('.layui-nav-img').hide()
      var first = name[0].toUpperCase()

      $('.text-avatar').text(first).show()
    }
  }

})

