// The signon app determines the current status of the user, if the user already
// logs in, a welcome message is displayed
X.sub("init", function() {
    var login = X("login_banner");
    var original = login.innerHTML;

    var cursorStyle = document.body.style.cursor;
    var loading = true;
    var toShowLoading = false;

    X.sub('ajaxRequestSent', function() {
        loading = true;
        //the busy modal not not be shown if response is received with 500 ms
        if (toShowLoading) {
            return;
        }
        toShowLoading = true;
        setTimeout(function() {
            if (!loading) {
                return;
            }
            var data = {};
            data.title = '正在联系服务器...';
            data.msg = '<img src="/css/images/ajaxLoader.gif" alt="loading ..." />';
            data.nocontrol = true;
            //X.pub('showModal', data);
            toShowLoading = false;
        }, 100);
    });

    X.sub('ajaxResponse', function() {
        loading = false;
        X.pub('closeModal');
    })

    if (!login) {
        alert('login_banner element is not found');
        return;
    }

    var profile = {};

    function onGetSession(respText) {
        var resp = JSON.parse(respText);
        if (resp.code && resp.code != '0') {
            return;
        }

        profile = resp;
        displayProfile();
        if (window.location.pathname === '/login') {
            window.location = '/';
        }
    }

    function onLoginSuccess() {
        if (X.cookie.get('xsid')) {
            X.get("/user/session?xsid=" + X.cookie.get('xsid'), onGetSession);
        }
    }

    function displayProfile() {
        login.innerHTML = "<span> 欢迎您， <a href='/member'>" + profile.username + "</a> <a href='#' id='signOff'>退出</a></span>";
        var f = X('signOff');
        f.addEventListener("click", function(e) {
            X.post("/signoff?xsid=" + X.cookie.get('xsid'), null, onLogoff);
            e.preventDefault();
        }, false);
    }

    function onLogoff() {
        X.pub('userLogOff', '');
        X.cookie.rm('xsid');
        profile = {};
        login.innerHTML = original;
    }

    X.sub('loginSuccess', onLoginSuccess);

    X.sub("loginFailed", function() {
        X.pub('showDialog', {
            title: '友情提示',
            msg: '用户名或密码不对。',
            noCancel: true,
            okText: 'OK'
        });
    });


    onLoginSuccess();

    function checkBrower() {
        var sUserAgent = navigator.userAgent.toLowerCase();
        //var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";   
        //var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os"; 
        var bIE = sUserAgent.match(/msie/);
        //var bFF = sUserAgent.match(/firefox/);
        //var bCh = sUserAgent.match(/chrome/);

        var bIEa = false;
        if (bIE) {
            var ua = navigator.userAgent.toLowerCase();
            var va = ua.substr(ua.indexOf("msie "), 6);
            var vs = va.split(' ');
            //alert(vs[1]);
            var v = parseInt(vs[1]);
            if (v < 8) {
                bIEa = true;
            }
        }
        if (bIEa) {
            alert('暂不支持7.0及以下版本IE浏览器');

        }
    }
    checkBrower();

});