$(function () {
    // 点击且换登录预注册
    $("#reg-btn").on("click", function () {
        $("#reg").hide();
        $("#login").show();
    });
    $("#login-btn").on("click", function () {
        $("#reg").show();
        $("#login").hide();
    });
})