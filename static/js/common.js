if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (prefix){
    return this.slice(0, prefix.length) === prefix;
  };
}
if (typeof String.prototype.endsWith != 'function') {
  String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
  };
}

/**
 * 0:成功 1：失败
 * @type {{YES: string, NO: string}}
 */
var YesOrNo={
    YES:"1",
    NO:"0"
};
var Status = {
    SUCCESS:"0",
    FAIL:"1"
};

/**
 * 异步调用
 */
var doAjax = function(req){
    var type = req.type;
    var url = req.url;
    var data = req.data;
    var async = req.async;
    var success = req.success;
    type = type==undefined?'POST':type;
    async = async==undefined?true:async;
    $.ajax({
        type : type,
        url : url,
        data : data,
        async: async,
        success : function(dataResp) {
            if(!dataResp){
                alert('通讯异常。');
                return;
            }
            success(dataResp);
        }
    });
};
/**
 * 获取form表单数据
 * @param frm
 * @returns
 */
var getFormJson = function(frm) {
    var o = {};
    var a = $(frm).serializeArray();
    $.each(a, function(){
        if(o[this.name] !== undefined) {
            if(!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
/**
 * form 表单异步提交
 * @param frm
 */
var form_submit_ajax = function (frm,fun_validate) {
    if(frm){
        var form = $(frm);
        var req = {};
        req.url = form.attr("action");
        req.type = form.attr("method");
        req.data = getFormJson(form);

        if(fun_validate!=null && !fun_validate()){
            return;
        }

        req.success = form_submit_ajax_success;
        doAjax(req);
    }else{
        //非form
    }
};
var back_fail = function(msg){
    var back_content = $(".back-content");
    back_content.text(msg);
    back_content.removeClass('hidden');
    back_content.removeClass('text-success');
    back_content.addClass('text-danger');
};
var back_success = function(msg){
    var back_content = $(".back-content");
    back_content.text(msg);
    back_content.removeClass('hidden');
    back_content.addClass('text-success');
    back_content.removeClass('text-danger');
};
var back_clear = function(){
    var back_content = $(".back-content");
    back_content.text("");
    back_content.addClass('hidden');
};

/**
 * form 表单异步提交回调
 * @param resp
 */
var form_submit_ajax_success = function (msg) {
    if(!msg){
        alert("通讯数据异常");
        return;
    }else{
        if(msg.status==Status.SUCCESS){
            if(msg.nextUrl){
                if(msg.async==YesOrNo.YES){
                    asyncLoadUrl(msg.nextUrl);
                }else{
                    window.location.href=msg.nextUrl;
                }
            }else{
                back_success(msg.msg);
            }
        }else{
            back_fail(msg.msg);
        }
    }
};

/**
 * 局部刷新某页面
 */
var handleReload = function(targetId, url, data){
    var req = {};
    req.url = url;
    req.type = "GET";
    req.data = data;
    req.success = function(resp){
        $(targetId).html(resp);
    };
    doAjax(req);
};

var updateCreateParam = function(){
    $("#check-list-line").text($("#app_line option:selected").text());
    $("#check-list-type").text($("#app_type option:selected").text());
    if ($("#app_config option:selected").val() != '') {
        $("#check-list-config").text($("#app_config option:selected").text());
    }
    $("#check-list-protect").text($("#app_protect_package option:selected").text());
    $("#check-list-region").text($("#app_region option:selected").text());
    $("#check-list-month").text($("#app_time option:selected").text())
    ajaxUpdateCreatePrice();
};

var ajaxUpdateCreatePrice = function(){
    var req = {};
    req.url = "/app_create_price";
    req.type = "GET";
    var form = $("#app_create_form");
    req.data = getFormJson(form);
    req.success = function(data){
        if(!data){
            alert("通讯异常,请刷新页面重试");
            return;
        }
        if(data.status==0){
            $("#app-create-price").text(data.price);
            back_clear();
            if(data.code_valid == 1){
                $("#tg_feedback").addClass('has-success');
                $("#tg_feedback").addClass('has-feedback');
                $("#tg_check").removeClass('hidden');
            }else{
                $("#tg_feedback").removeClass('has-success');
                $("#tg_feedback").removeClass('has-feedback');
                $("#tg_check").addClass('hidden');
            }
        }else{
            $("#tg_feedback").removeClass('has-success');
            $("#tg_feedback").removeClass('has-feedback');
            $("#tg_check").addClass('hidden');
            back_fail(data.msg);
        }
    };
    doAjax(req);
};

var updateUpgradeParam = function(){
    $("#check-list-line").text($("#app_line option:selected").text());
    if ($("#app_config option:selected").val() != '') {
        $("#check-list-config").text($("#app_config option:selected").text());
    }
    $("#check-list-protect").text($("#app_protect_package option:selected").text());
    $("#check-list-region").text($("#app_region option:selected").text());
    $("#check-list-month").text($("#app_time option:selected").text())
    ajaxUpdateUpgradePrice();
};

var ajaxUpdateUpgradePrice = function(){
    var req = {};
    req.url = "/app_upgrade_price";
    req.type = "GET";
    var form = $("#app_upgrade_form");
    req.data = getFormJson(form);
    req.success = function(data){
        if(!data){
            alert("通讯异常,请刷新页面重试");
            return;
        }
        if(data.status==0){
            $("#app-upgrade-price").text(data.price);
            back_clear();
            if(data.code_valid == 1){
                $("#tg_feedback").addClass('has-success');
                $("#tg_feedback").addClass('has-feedback');
                $("#tg_check").removeClass('hidden');
            }else{
                $("#tg_feedback").removeClass('has-success');
                $("#tg_feedback").removeClass('has-feedback');
                $("#tg_check").addClass('hidden');
            }
        }else{
            $("#tg_feedback").removeClass('has-success');
            $("#tg_feedback").removeClass('has-feedback');
            $("#tg_check").addClass('hidden');
            back_fail(data.msg);
        }
    };
    doAjax(req);
};

var updateParam = function(){
    $("#check-list-line").text($("#app_line option:selected").text());
    if ($("#app_config option:selected").val() != '') {
        $("#check-list-config").text($("#app_config option:selected").text());
    }
    $("#check-list-protect").text($("#app_protect_package option:selected").text());
    $("#check-list-region").text($("#app_region option:selected").text());
    $("#check-list-month").text($("#app_time option:selected").text())
    ajaxUpdatePrice();
};

var ajaxUpdatePrice = function(){
    var req = {};
    req.url = "/app_update_price";
    req.type = "GET";
    var form = $("#app_update_form");
    req.data = getFormJson(form);
    req.success = function(data){
        if(!data){
            alert("通讯异常,请刷新页面重试");
            return;
        }
        if(data.status==0){
            $("#app-update-price").text(data.price);
            back_clear();
            if(data.code_valid == 1){
                $("#tg_feedback").addClass('has-success');
                $("#tg_feedback").addClass('has-feedback');
                $("#tg_check").removeClass('hidden');
            }else{
                $("#tg_feedback").removeClass('has-success');
                $("#tg_feedback").removeClass('has-feedback');
                $("#tg_check").addClass('hidden');
            }
        }else{
            $("#tg_feedback").removeClass('has-success');
            $("#tg_feedback").removeClass('has-feedback');
            $("#tg_check").addClass('hidden');
            back_fail(data.msg);
        }
    };
    doAjax(req);
};

var payOrder = function (order_id) {
    var req = {};
    req.url = "/user_order_update";
    req.type = "GET";
    req.data = {'order_id':order_id, 'action':'pay'};
    req.success = function (msg) {
        if(!msg){
            alert("通讯数据异常");
        }else{
            if(msg.status==Status.SUCCESS){
                if(msg.nextUrl){
                    if(msg.async==YesOrNo.YES){
                        asyncLoadUrl(msg.nextUrl);
                    }else{
                        window.location.href=msg.nextUrl;
                    }
                }else{
                    alert(msg.msg);
                }
            }else{
                alert(msg.msg);
            }
        }
    };
    doAjax(req);
};

var MyValidator = function() {
    var handleSubmit = function(target,config) {
        var submitForm = $(target);
        submitForm.validate({
            errorElement : 'span',
            errorClass : 'help-block',
            focusInvalid : false,
            rules : config.rules,
            messages :config.messages,

            highlight : function(element) {
                $(element).closest('.form-group').addClass('has-error');
            },

            success : function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement : function(error, element) {
                element.parent('div').append(error);
            },

            submitHandler: function (form) {
                if(config.ajaxSubmit){
                    $(form).attr('action',config.ajaxSubmit.url);
                }
                $(form).ajaxSubmit(function(data){
                    if(!data){
                        alert("通讯异常");
                        return;
                    }
                    var status = data.status;
                    var msg = data.msg;
                    var nextUrl = data.nextUrl;

                    if(status==0){
                        if(msg){
                            back_success(msg);
                        }
                        if(nextUrl){
                            if(nextUrl.indexOf("#")!=-1){
                                window.location.hash=nextUrl+new Date().getTime();
                            }else{
                                window.location.href=nextUrl;
                            }
                            return;
                        }
                        var callback = config.callback;
                        if(callback){
                            callback(data);
                            return;
                        }
                    }else{
                        back_fail(msg);
                        $('#captcha').attr('src','/captcha?_r='+Math.random());
                        return;
                    }
                });
                return false;
            }
        });

        submitForm.find('input').keypress(function(e) {
            if (e.which == 13) {//回车键
                if (submitForm.validate().form()) {
                    submitForm.submit();
                }
                return false;
            }
        });
    };
    return {
        init : function(target,config) {
            $.getScript('/static/js/jquery-validation-1.14.0/dist/jquery.validate.min.js').done(function(){
                $.getScript('/static/js/jquery-validation-1.14.0/lib/jquery.form.js').done(function () {
                    handleSubmit(target,config);
                });
            });
        }
    };
}();