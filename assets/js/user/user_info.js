$(function () {
    var layer = layui.layer;
    var form = layui.form;

    // 初始化用户信息
    initUserData();
    function initUserData() {
        // const token = localStorage.getItem("token");
        $.ajax({
            type: "get",
            url: "/my/userinfo",
            success: function (response) {
                console.log(response);
                if (response.status !== 0) return layer.msg(response.message);
                form.val("user_info", response.data);
            }
        });
    }

    // 更新用户信息
    $("#user_info").on("submit", function (e) {
        e.preventDefault();
        var user_info = form.val("user_info");
        console.log(user_info);
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            // data: JSON.stringify(user_info),
            data: $(this).serialize(),
            success: function (response) {
                if (response.status !== 0) return layer.msg(response.message);
                
                // 调用父页面的方法，重新渲染用户头像
                window.parent.getUserinfo();
            }
        });
    });

    // 重置表单数据
    $("#btn_reset").on("click", function (e) {
        e.preventDefault();
        //获取数据重新渲染
        initUserData();
    });
})