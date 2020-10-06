$(function () {
    // 点击且换登录预注册
    $("#reg-btn").on("click", function () {
        $("#reg-box").hide();
        $("#login-box").show();
    });
    $("#login-btn").on("click", function () {
        $("#reg-box").show();
        $("#login-box").hide();
    });

    var form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (val) {
            let pwd = $("#reg-box [name=password]").val()
            if (pwd !== val) return "两次密码不一致"
        }
    })
})