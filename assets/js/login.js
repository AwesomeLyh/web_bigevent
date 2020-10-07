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
    var layer = layui.layer

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (val) {
            let pwd = $("#reg-box [name=password]").val()
            if (pwd !== val) return "两次密码不一致"
        }
    })

    //注册表单提交事件
    $("#form_reg").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/api/reguser",
            data: {
                username: $("#form_reg [name=username]").val(),
                password: $("#form_reg [name=password]").val()
            },
            success: function (response) {
                if (response.status !== 0) return layer.msg(response.message);
                layer.msg("注册成功，请登录");
                $("#reg-btn").click();
            }
        });
    });

    //登录表单的提交事件
    $("#form_login").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (response) {
                if (response.status !== 0) return layer.msg(response.message);
                layer.msg("登录成功");
                localStorage.setItem("token", response.token);
                location.href = "/Big/index.html";
            }
        });
    });
})