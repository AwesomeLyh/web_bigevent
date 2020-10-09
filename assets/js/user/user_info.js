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

    $("#user_info").on("submit", function () {

    });


    // 重置表单数据
    $("#btn_reset").on("click", function (e) {
        e.preventDefault();
        //获取数据重新渲染
        initUserData();
    });
})