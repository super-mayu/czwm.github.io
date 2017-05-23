$(document).ready(function () {
    //查询成交记录
    var custId = Glass.getUrlParam("custId");
    var userId = Glass.getUrlParam("userId");
    getDealDetail(userId, custId);

    //保存
    $(".save-btn").click(function () {
        var dealTratorName = $("#dealTratorName").val();
        var dealResultType = $("#dealResultType").val();

        var id = $('#dealId').val();

        id = id == "" || id == '' ? -1 : id;
        var params = {
            "id": id,
            "dealTratorName": dealTratorName,
            "dealResultType": dealResultType
        };
        //转json
        params = JSON.stringify(params);
        //base64加密
        params = jQuery.base64.encode(params);

        $.ajax({
            url: Glass.host + "/cust/deal/save",
            type: "GET",
            dataType: "json",
            data: params,
            async: false,
            "success": function (resp) {
                if (resp != null) {
                    if (resp.success && resp.data != null) {

                        //保存成功刷新页面
                        getDealDetail(userId, custId);
                    }
                }

            }
        })

    });

    $(".submit-btn").click(function () {
        var dealTratorName = $("#dealTratorName").val();
        var dealResultType = $("input[name='dealResultTypeOptions']:checked").val();
        var id = $('#dealId').val();

        id = id == "" || id == '' ? -1 : id;
        var params = {
            "id": id,
            "dealTratorName": dealTratorName,
            "dealResultType": dealResultType,
            "submitFlag": 1
        };
        //转json
        params = JSON.stringify(params);
        //base64加密
        params = jQuery.base64.encode(params);

        $.ajax({
            url: Glass.host + "/cust/deal/save",
            type: "GET",
            dataType: "json",
            data: params,
            async: false,
            "success": function (resp) {
                if (resp != null) {
                    if (resp.success && resp.data != null) {

                        //保存成功刷新页面
                        getDealDetail(userId, custId);
                    }
                }

            }
        })

    });


});

/**
 * 查询客户检测结果
 */
function getDealDetail(userId, custId) {

    //给返回按钮设置初始值
    $(".back-btn").attr('href', 'main.html?custId=' + custId + '&userId=' + userId);

    $.ajax({
        url: Glass.host + "/cust/deal/query/" + custId,
        type: "GET",
        dataType: "json",
        async: false,
        "success": function (resp) {
            if (resp != null) {
                if (resp.success && resp.data != null) {

                    //是否提交过
                    if (resp.data.submitFlag == 1) {
                        //已经提交过，隐藏保存和提交按钮
                        $('.save-btn').hide();
                        $('.submit-btn').hide();

                        var userDetail = Glass.getUserDetailById(userId);
                        //且具有boss和管理员权限
                        if (userDetail != null && userDetail.authorityType != null && userDetail.authorityType >= 2) {
                            // $('.save-btn').show();
                            $('.submit-btn').show();
                        }
                    }
                    $("#dealTratorName").val(resp.data.dealTratorName);
                    $("#dealId").val(resp.data.id);
                    // if (resp.data.dealResultType == 0) {
                    //     $('#dealResultType0').attr('checked', 'checked');
                    // } else(resp.data.dealResultType == 1)
                    // {
                    //     $('#dealResultType1').attr('checked', 'checked');
                    // }
                    $('.dealResultTypeOptions' + resp.data.dealResultType).addClass("am-active");
                }
            }

        }
    });
}