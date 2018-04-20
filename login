
<!doctype html>
<html lang="zh-Hans">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="description" content="初云 初云盾 云盾 应用级DDoS防御 高防服务器 高防服务器租用 高防云服务器 防御服务器 服务器防御 游戏高防 棋牌高防 高防游戏服务器 游戏服务器 棋牌服务器 云防护 游戏DDoS防御 应用级DDoS防御 初云盾 防攻击服务器" />
<meta name="keywords" content="云盾,初云盾,高防服务器,高防服务器租用,高防云服务器,防御服务器,服务器防御,游戏高防,棋牌高防,高防游戏服务器,游戏服务器,棋牌服务器,云防护,游戏DDoS防御,应用级DDoS防御,初云盾,防攻击服务器" />
<title>云盾 - 新一代抗DDoS产品_无视DDoS攻击_隐藏IP_BGP加速_告别传统高防</title>
<link href="static/index/app.css" rel="stylesheet" />
</head>
<body>
<section class="section auth">
<div class="auth-bg"></div>
<div class="logo text-center m-t-55">
<a href="index.html"><img src="static/index/logo1.png" height="88"></a>
</div>
<div class="container">
<div class="row">
<div class="col-xs-4 col-xs-offset-4">
<div class="auth-content">
<p class="auth-title">登录 初云 帐号</p>
<div class="line m-b-20"></div>
<form id="login_form" role="form" method="POST" action="login">
<input type='hidden' name='csrfmiddlewaretoken' value='9OzUAr7WRmTBMKaW6fA30rnij2GRqrbfqJnFMPYkIEH0aaPKZ1G1KRV0REigwFhy' />
<div class="form-group p-t-5 ">
<label for="">用户名</label>
<input type="text" class="form-control" name="username" value="" onchange="back_clear();">
</div>
<div class="form-group p-t-5 ">
<label for="">密码 </label>
<span class="pull-right"><a href="getback_password">忘记密码?</a></span>
<input type="password" class="form-control" name="password" oninput="back_clear();">
</div>
<div class="form-group m-b-15" id="back-msg">
<span class="back-content hidden"></span>
</div>
<div class="form-group p-t-15">
<button type="submit" class="btn btn-primary btn-lg btn-block">登录</button>
</div>
</form>
<div class="line m-b-30 m-t-30"></div>
<a class="btn btn-link btn-lg btn-block" href="register">还没有帐户？立即注册 ></a>
</div>
</div>
</div>
</div>
</section>
<footer>
<p class="copyright text-center text-white">Copyright © 2010–2016 ChuYunCloud LLC. All screenshots © their respective owners.</p>
</footer>
<script src="static/plugins/jquery/jquery-1.9.1.min.js"></script>
<script src="static/plugins/bootstrap/js/bootstrap.min.js"></script>
<script src="static/js/common.js"></script>
<script>
		var config = {
            rules : {
                username : {
                    required : true
                },
                password : {
                    required : true
                }
            },
            messages : {
                username : {
                    required : "请输入登录用户名."
                },
                password : {
                    required : "请输入登录密码."
                }
            },
            ajaxSubmit : {
                url : "/login"
            }
        };
        MyValidator.init($("#login_form"),config);
	</script>
<script type="text/javascript"  src="http://idm-su.baidu.com/su.js"></script>
</body>
</html>