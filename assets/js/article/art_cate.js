$(function () {
    var layer = layui.layer;
    var form = layui.form;
    var indexAdd = null;

    initArtCateList();
    // 获取文章分类
    function initArtCateList() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function (response) {
                var htmlStr = template('tpl-table', response);
                $('tbody').html(htmlStr);
            }
        });
    }

    //添加按钮弹出dialog
    $("#btnAddCate").on("click", function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    });

    //提交添加表单
    $("body").on("submit", "#form-add", function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg('新增分类失败！');
                initArtCateList();
                layer.msg('新增分类成功！');
                // 根据索引，关闭对应的弹出层
                layer.close(indexAdd);
            }
        })
    })
    //修改按钮弹出dialog
    var indexEdit = null;
    $("tbody").on("click", "#btn-edit", function (e) {
        var art_id = $(this).attr("data-id");
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '编辑分类信息',
            content: $('#dialog-edit').html()
        });
        $.ajax({
            type: "GET",
            url: "/my/article/cates/" + art_id,
            success: function (response) {
                console.log(response.data);
                form.val("form-edit", response.data);
            }
        });
    });

    //提交添加表单
    $("body").on("submit", "#form-edit", function (e) {
        e.preventDefault()
        console.log(1111);
        $.ajax({
            type: "POST",
            url: "/my/article/updatecate",
            data: form.val("form-edit"),
            success: function (response) {
                if (response.status !== 0) return layer.msg(response.message);
                layer.msg("修改成功");
                layer.close(indexEdit);
                initArtCateList();
            }
        });
    })

    $("tbody").on("click", "#btn-del", function (e) {
        var art_id = $(this).attr("data-id");
        layer.confirm('确认删除？', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                type: "GET",
                url: "/my/article/deletecate/" + art_id,
                success: function (response) {
                    layer.msg("删除成功");
                    initArtCateList();
                }
            });
            layer.close(index);
        });
    })

})