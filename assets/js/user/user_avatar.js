$(function () {
  var layer = layui.layer
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  // 为上传按钮点击事件
  $('#btnChoseImage').on('click', function () {
    $('#file').click()
  })
  // 为文件选择框绑定 change 事件
  $('#file').on('change', function (e) {
    // 获取用户选择的文件
    var filelist = e.target.files
    // $('.cropper-box"').arrt('src', filelist[0])
    // console.log(filelist);
    if (filelist.length === 0) {
      return layer.msg('请选择图片', { icon: 2 })
    }
    // 拿到用户选择的文件
    var file = e.target.files[0]
    // 根据选择的文件，创建一个对应的 URL 地址：
    var imgUrl = URL.createObjectURL(file)
    // 重新初始化裁剪区
    $image
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', imgUrl)  // 重新设置图片路径
      .cropper(options)        // 重新初始化裁剪区域
  })
  // 为确定绑定点击事件
  $('#btnUpload').on('click', function () {
    // 拿到用户裁剪后的图片
    var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    // 调用接口，把头像上传到服务器
    $.ajax({
      method: 'POST',
      url: '/my/update/avatar',
      data: {
        avatar: dataURL
      },
      success: function (res) {
        if (res.status != 0) {
          return layer.msg('更新头像失败', { icon: 2 })
        }
        layer.msg('更新头像成功', { icon: 1 })
        // 调用父页面的的getUserInfo() 函数
        parent.$("html").trigger("parentAndChilenEvent");
      }
    })
  })

})