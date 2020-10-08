$(function () {
    getUserinfo();
    // 获取登录的用户信息
    function getUserinfo() {
        const token = localStorage.getItem("token");
        $.ajax({
            type: "get",
            url: "/my/userinfo",
            headers: {
                "Authorization": token || ""
            },
            success: function (response) {
                if (response.status !== 0) return layer.msg(response.message);
                renderUserData(response.data);
            }
        });
    }

    //渲染用户数据
    function renderUserData(user) {
        console.log(user);
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
})