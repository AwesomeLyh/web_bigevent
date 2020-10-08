$(function () {
    $.ajaxPrefilter(function (option) {
        option.url = "http://ajax.frontend.itheima.net" + option.url;
        // 在BaseApi 全局挂载对调用权限接口的判断，给请求加上headers
        if (option.url.indexOf("/my/") !== -1) {
            option.headers = {
                Authorization: localStorage.getItem('token') || ''
            }
        }
        // 在BaseApi 全局挂载对未登录跳转的校验
        // complete无论服务器返回结果如何 都会执行方法体
        option.complete = function (res) {
            if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
                localStorage.removeItem("token");
                location.href = "/Big/login.html";
            }
        }
    })
})