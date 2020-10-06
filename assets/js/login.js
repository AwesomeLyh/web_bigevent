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
})