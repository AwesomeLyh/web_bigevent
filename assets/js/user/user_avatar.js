$(function () {
    layer = layui.layer;

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image');
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    };
    // 1.3 创建裁剪区域
    $image.cropper(options);

    //通过按钮中转到真正的上传按钮
    $("#up-load").on("click", function () {
        $("#file").click();
    });


    //选择图片重新初始化cropper
    $("#file").on("change", function (e) {
        var filelist = e.target.files;
        if (filelist === 0) return layer.msg("请选择图片");
        // 1. 拿到用户选择的文件
        var file = filelist[0];
        console.log(file);
        // 2. 将文件转化为路径
        var url = URL.createObjectURL(file);
        // 3. 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', url) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    });

    //提交
    $("#commit_avatar").on("click", function () {
        var dataUrl = $image.cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布
            width: 100,
            height: 100
        }).toDataURL("image/png");
        $.ajax({
            type: "POST",
            url: "/my/update/avatar",
            data: {
                avatar: dataUrl
            },
            success: function (response) {
                if (response.status !== 0) return layer.msg(response.message);
                layer.msg("更换头像成功");

                // 调用父页面的方法，重新渲染用户数据
                window.parent.getUserinfo();
            }
        });
    });

})