$(function () {
    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage;

    // pagenum	是	int	页码值
    // pagesize	是	int	每页显示多少条数据
    // cate_id	否	string	文章分类的 Id
    // state	否	string	文章的状态，可选值有：已发布、草稿
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: "",
        state: "",
    }

    // 给时间补0
    function formatDate(date) {
        return date > 9 ? date : "0" + date;
    }

    // 模板时间格式化
    template.defaults.imports.dataFormat = function () {
        const dt = new Date();
        var y = dt.getFullYear();
        var m = formatDate(dt.getMonth + 1);
        var d = formatDate(dt.getDate());
        var h = formatDate(dt.getHours());
        var m = formatDate(dt.getMinutes());
        var s = formatDate(dt.getSeconds());
        return y + '-' + m + '-' + d + ' ' + h + ':' + m + ':' + s
    }

    //分页渲染
    function rdnerPage(total) {
        layui.use('laypage', function () {
            //执行一个laypage实例
            laypage.render({
                elem: 'paging', //注意，这里的 test1 是 ID，不用加 # 号
                count: total,//数据总数，从服务端得到
                limit: q.pagesize,// 每页显示的条数 
                curr: q.pagenum,//起始页
                layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
                limits: [2, 3, 5, 10],
                jump: function (obj, first) {
                    q.pagenum = obj.curr;
                    
                    q.pagesize = obj.limit;
                    if (first !== true) {
                        initTable();
                    }
                }
            });
        })
    }

    //初始化文章分类
    initCate();
    function initCate() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function (response) {
                var htmlStr = template('tpl-cate', response);
                $('#cate_select').html(htmlStr);
                //layui组件发生变化，重新渲染组件
                form.render();
            }
        });
    }

    //初始化文章列表的方法
    initTable();
    function initTable() {
        $.ajax({
            type: "GET",
            url: "/my/article/list",
            data: q,
            success: function (response) {
                if (response.status !== 0) return layer.msg(response.message)
                $("tbody").html(template("tpl-list", response));
                //调用分页渲染
                rdnerPage(response.total);
            }
        })
    }


    // 为筛选表单绑定 submit 事件
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        // 获取表单中选中项的值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        // 为查询参数对象 q 中对应的属性赋值
        q.cate_id = cate_id
        q.state = state
        // 根据最新的筛选条件，重新渲染表格的数据
        initTable()
    })

    $("tbody").on("click", "#btn-del", function (e) {
        var art_id = $(this).attr("data-id");
        var len = $('.btn-delete').length;
        layer.confirm('确认删除？', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                type: "GET",
                url: "/my/article/delete/" + art_id,
                success: function (response) {
                    layer.msg("删除成功");
                    if (len === 1) {
                        // 如果 len 的值等于1，证明删除完毕之后，页面上就没有任何数据了
                        // 页码值最小必须是 1
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    initTable();
                }
            });
            layer.close(index);
        });
    })


})