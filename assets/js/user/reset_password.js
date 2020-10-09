$(function () {
    var form = layui.form;

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (val) {
            console.log($("#reset_pwd [name=oldPwd]").val());
            let pwd = $("#reset_pwd [name=oldPwd]").val();
            if (pwd == val) return "新密码与原密码不能一致";
        },
        newPwd: function (val) {
            let pwd = $("#reset_pwd [name=rePwd]").val();
            if (pwd !== val) return "两次密码不一致";
        }
    })

    //提交
    $("#reset_pwd").on("submit", function () {
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            async: false,
            data: $(this).serialize(),
            success: function (response) {
                if (response.status !== 0) return layer.msg(response.message)
                localStorage.removeItem("token");
                window.parent.location.href = "/Big/login.html";
            }
        });
    });

})