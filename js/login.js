/**
 * Login module.  pub a login event to trigger this module.  The data must contain username and password and optionally a login call back: onLoginResponse.
 * 
 */
X.sub("init", function() {

    function onLoginResponse(respText) {
        var resp = JSON.parse(respText);
        if (resp.code == '0') {
            X.pub("loginSuccess", resp);
            return;
        }
        X.pub("loginFailed", resp);
    }
    
    function cnonce() {
    	var INT2HEX=['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];

		function toHEX(v) {
			var h='';
		    h+= INT2HEX[v >>> 28 & 0xF];
		    h+= INT2HEX[v >>> 24 & 0xF];
		    h+= INT2HEX[v >>> 20 & 0xF];
		    h+= INT2HEX[v >>> 16 & 0xF];
		    h+= INT2HEX[v >>> 12 & 0xF];
		    h+= INT2HEX[v >>> 8 & 0xF];
		    h+= INT2HEX[v >>> 4 & 0xF];
		    h+= INT2HEX[v >>> 0 & 0xF];
		    return h;
		}
    	
    	return toHEX(Math.floor(Math.random() * Math.pow(2, 32)))+toHEX(Math.floor(Math.random() * Math.pow(2, 32)));
    }
    
    
    function onLogin(type, cred) {

        cred.onLoginResponse = cred.onLoginResponse || onLoginResponse;
    
	    function onGotNonce(respText) {
	        var resp = JSON.parse(respText);
	        var pw=resp.nonce;
	        pw+=X.sha256(cred.password);
	        var cn = cnonce();
	        pw+=cn;
	        var hash =X.sha256(pw);
	        X.post("/user/login?username="+cred.username+"&password="+hash+"&nonce="+resp.nonce+"&cnonce="+cn, null, cred.onLoginResponse);
	    }
	    X.get("/user/login", onGotNonce);
    }
    
    X.sub('login', onLogin);
});