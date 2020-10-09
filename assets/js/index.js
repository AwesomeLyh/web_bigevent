$(function () {
    var layer = layui.layer;
    getUserinfo();
    // 获取登录的用户信息
    function getUserinfo() {
        // const token = localStorage.getItem("token");
        $.ajax({
            type: "get",
            url: "/my/userinfo",
            // 在BaseApi 全局挂载了判断，对调用权限接口的请求加上headers
            // headers: {
            //     "Authorization": token || ""
            // },
            success: function (response) {
                if (response.status !== 0) return layer.msg(response.message);
                renderUserData(response.data);
            }
        });
    }

    //渲染用户数据
    function renderUserData(user) {
        var name = user.nickname || user.username;
        $('#welcome').html('欢迎&nbsp;,' + name)
        var headPortrait = user.user_pic;
        if (headPortrait != null) {
            $(".layui-nav-img").attr("src", headPortrait).show();;
            $(".text-avatar").hide();
        } else {
            var first = name[0].toUpperCase();
            $(".text-avatar").html(first).show();
            $(".layui-nav-img").hide();
        }
    }

    //清除本地存储中的Token
    function clearToken() {
        localStorage.removeItem("token")
    }


    //退出登录
    $("#exit").on("click", function (e) {
        console.log(111);
        e.preventDefault();
        layer.confirm('确认退出？', { icon: 3, title: '提示' }, function (index) {
            clearToken();
            location.href = "/Big/login.html";
            // 关闭 confirm 询问框
            layer.close(index)
        });
    });
})