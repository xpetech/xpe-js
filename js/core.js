/**
 * XPE framework provides a really simple architecture framework for building
 * web applications using an event model
 * 
 * Copyright 2003-2013 SoftTouchIT
 * 
 */
var XPE = {};

XPE.isReady = false;

/*
 * Add common methods to String
 */
(function () {
   //trim for IE8
  if (typeof String.prototype.trim !== 'function') {
      String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, ''); 
      };
  }  
  if (typeof String.prototype.startsWith !== 'function') {
      String.prototype.startsWith = function (str){
        return this.slice(0, str.length) === str;
      };
  }
  if (typeof String.prototype.endsWith !== 'function') {
      String.prototype.endsWith = function (str){
        return this.slice(-str.length) === str;
      };
  }  
}());

/**
 * The XPE bus
 */
XPE.bus = function() {
    var events = {};

    return {
        subscribe : function(type, callBack) {
            if (callBack === null || typeof callBack !== 'function') {
                alert('Fatal: supplied callback is not a valid function for event type ' + type);
                return;
            }
            var ev = events[type];
            if (!ev) {
                ev = events[type] = [];
            }
            ev.push(callBack);
            if (type === "init" && XPE.isReady) {
                callBack(type, {});
            }
        },
        occurred : function(type) {
            var ev = events[type];
            var cb =0;
            if (ev) {
                for (cb=0;cb <ev.length; cb++) {
                    try {
                        ev[cb].apply(null, arguments);
                    } catch (t) {
                        if (type !== "error") {
                            XPE.bus.occurred("error", t);
                            alert('Fatal: function (' +ev[cb] +') throw exception ' + t);
                        }
                    }
                }
            }
        }
    };
}();


X.pub=XPE.bus.occurred;
X.sub=XPE.bus.subscribe;

XPE.ajax = function() {
    var queue = new Queue();
    var cb = null, oe = null;
    var inProgress = false;
    var httpRequest = function() {
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            return new ActiveXObject("Microsoft.XMLHTTP");
        }
    }();
    

    function onReadyStateChange() {
        if (httpRequest.readyState === 4) {
        	try {
	            X.pub('ajaxResponse',httpRequest);
	            if (httpRequest.status === 200) {
	                if (cb && typeof (cb) === 'function') {
	                    cb(httpRequest.responseText);
	                }
	            } else {
	                if (oe && typeof (oe) === 'function') {
	                    oe(httpRequest.status);
	                }
	            }
        	} catch (t) {
                XPE.bus.occurred("error", t);
        		alert(t);
            } finally {
	            inProgress = false;
	            handleNext();
            }
        }
    }
	
    function onGet(uri, callBack, onError) {
		var request = {};
		request.uri = uri;
		request.type = "GET";
		request.cb = callBack;
		request.oe = onError;
		queue.enque(request);
		handleNext();
	}

	function onPost(uri, body, callBack, onError) {
		var request = {};
		request.uri = uri;
		request.type = "POST";
		request.cb = callBack;
		request.oe = onError;
		request.body = body;
		queue.enque(request);
		handleNext();
	}

	function onPut(uri, body, callBack, onError) {
		var request = {};
		request.uri = uri;
		request.type = "PUT";
		request.cb = callBack;
		request.oe = onError;
		request.body = body;
		queue.enque(request);
		handleNext();
	}

	function onDel(uri, callBack, onError) {
		var request = {};
		request.uri = uri;
		request.type = "DELETE";
		request.cb = callBack;
		request.oe = onError;
		queue.enque(request);
		handleNext();
	}
    
    
    function handleNext() {
      if (inProgress) {
        return;
      }
      var request = queue.poll();
      if (!request) {
        return;
      }
      
      inProgress=true;
        cb = request.cb;
        oe = request.oe;
        if (request.type==="GET") {
          var ts= new Date().getTime();
          if (request.uri.indexOf('?')!=-1) {
            if (request.uri.indexOf('ts=')==-1) {
                request.uri=request.uri+'&ts='+ts;
            }
          } else {
            request.uri=request.uri+'?ts='+ts;
          }
          httpRequest.open('GET', request.uri);
          httpRequest.send(null);
        } else if (request.type==="POST"||request.type==="PUT") {
          httpRequest.open(request.type, request.uri);
          var ct=request.ct||'application/json';
          httpRequest.setRequestHeader('Content-Type',ct);
          if (request.body) {
              if (typeof(request.body)==="string") {
                httpRequest.send(request.body);
              } else {
                httpRequest.send(JSON.stringify(request.body));
              }
            } else {
                httpRequest.send(null);
            }
        } else if (request.type==="DELETE") {
            httpRequest.open('DELETE', request.uri);
            httpRequest.send(null);
        }
      X.pub('ajaxRequestSent',request);
    }
    


    httpRequest.onreadystatechange = onReadyStateChange;
    return {
        get : onGet,
        post : onPost,
        del: onDel,
        put: onPut
    };

}();

X.get=XPE.ajax.get;
X.post=XPE.ajax.post;
X.put=XPE.ajax.put;
X.del=XPE.ajax.del;

function Queue() {
  var queue = [];
  var head = 0;

  this.enque = function(entry) {
    queue.push(entry);
  };

  this.poll = function() {
    if (queue.length === 0 || head>=queue.length) {
      return null;
    }
    var entry = queue[head++];
    if (queue.length>8 && head * 2 >= queue.length) {
      queue = queue.slice(head);
      head = 0;
    }
    return entry;
  };
  
  this.peek = function() {
    if (queue.length === 0) {
      return null;
    }
    return queue[head];
  };

}

XPE.cookie = function() {
    function create(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function read(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for ( var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0)
                return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function remove(name) {
        create(name, "", -1);
    }

    return {
        add : create,
        get : read,
        rm : remove
    };

}();

X.cookie=XPE.cookie;

XPE.className = function(e) {
  if (!e) {
    return;
  }
  
  var names = (e.className) ? e.className.split(' ') : [];
  
  function add(name) {
    if (has(name)) {
      return;
    }
    names.push(name);
    e.className = names.join(' ').trim();
    return e;
  }
  
  function has(name) {
    for (var i=0;i<names.length;++i) {
      if (names[i]===name) {
        return true;
      }
    }
    return false;
  }
  
  function remove(name) {
    for (var i=0;i<names.length;++i) {
      if (names[i]===name) {
        names.pop(i);
        break;
      }
    }
    e.className = names.join(' ').trim();
    return e;
  }
  
  return {
    add:add,
    has:has,
    remove:remove
  };
  
};

/**
 * find a dom node using the given id or element
 */
function X(id, notRequired) {
  if (!id) {
	  alert("Null id was supplied, caller is " + arguments.callee.caller);
    return ;
  }
  var el = null;
  if (typeof id === 'string' ) {
      el = document.getElementById(id);  
    } else {
      var isElement = typeof HTMLElement === "object" ? id instanceof HTMLElement :  id && typeof id === "object" && id.nodeType === 1 && typeof id.nodeName==="string" ;
      if (!isElement) {
        return;
      }
    el=id;
  }
  if (el) {
    el.cnList = XPE.className(el);
    el.css=function(name,value) {
      el.style[name]=value;
      return el;
    };
    el.select=function(cn, fn) {
      if (cn.startsWith(".")) {}
        var es = el.getElementsByClassName(cn.substring(1));
        for (var i = 0; i < es.length; ++i) {
                fn(es[i]);
            }
      };
  } else {
	  if (!notRequired) {
		  alert(id+" was not found, caller is " + arguments.callee.caller);
	  }
  }
  return el;
}


// once the document is fully loaded, the init event is fired.
(function check() {
  var DOMContentLoaded;
  var ready = function() {
    if (XPE.isReady) {
      return;
    }
    XPE.isReady = true;
        X.pub("init", {});
  };
  
  // Cleanup functions for the document ready method
  if ( document.addEventListener ) {
    DOMContentLoaded = function() {
      document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
      ready();
    };
    document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );
    return;
  } 
  
  if ( document.attachEvent ) {
    DOMContentLoaded = function() {
      // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
      if ( document.readyState === "complete" ) {
        document.detachEvent( "onreadystatechange", DOMContentLoaded );
        ready();
      }
    };
    document.attachEvent( "onreadystatechange", DOMContentLoaded );
    return;
  }
  
}());

// //////////////end of infrastructure code ---------------
