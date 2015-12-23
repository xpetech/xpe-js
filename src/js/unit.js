
XPE.requires = function(param, msg) {
    if (param == undefined) {
        if (XPE.logger.logFatal()) {
            XPE.logger.add("Missing param:");
            if (msg) {
                XPE.logger.add(msg);
            }
            XPE.logger.flush();
        }
        throw msg || "Required param is missing. ";
    }
};



XPE.timer = function() {
    var before = new Date().getTime();
    var start = function() {
        before = new Date().getTime();
    };

    var done = function(msg) {
        var after = new Date().getTime();
        XPE.logger.log(msg + ", total time used: " + (after - before) + " ms.");
    };

    return {
        start : start,
        done : done
    };

}();

/**
 * XPE unit test framework
 * 
 */

XPE.unit = function() {
    var tests = new Array();
    var logger=XPE.logger;

    var add = function(test, name) {
        if (typeof (test) == "function") {
            var data = {};
            data.name = name;
            data.test = test;
            tests.push(data);
        } else {
        	logger.add("<div class='error'>").add("the first argument is not a function>").add(test).add(" ").add(name).add("</div>");
        }
    };

    var exp;
    
    function create(name) {
    	var d =document.createElement("div");
    	d.id=name;
    	document.body.appendChild(d);
    	return d;
    }

    var test = function() {
        var passed = 0;
        var failed = 0;
        
        var dis = X('unit')||create('unit');
        
        dis.innerHTML="<div id='summary' ></div><div class='details'><ol id='tests' ></ol></div>";
        
        var testsEl = X('tests');
        
        for ( var i = 0; i < tests.length; ++i) {
        	var el = document.createElement("li");
        	testsEl.appendChild(el);
                el.innerHTML="Testing " + tests[i].name;
                try {
                    exp = null;
                    tests[i].test(XPE.logger);
                    if (exp != null) {
                        throw exp;
                    }
                    ++passed;
                    el.innerHTML="Testing " + tests[i].name+", passed";
                } catch (t) {
                    el.innerHTML="Testing " + tests[i].name+", failed with error:" + t;
                    ++failed;
                }
        }
        var summary="<ul>"+"<li>Total tests:" + tests.length+"</li>"+"<li>Total passed:" + passed+"</li>"+"<li>Total failed:" + failed+"</li></ul>";
        X('summary').innerHTML=summary;
        
    };

    var assertEquals = function(left, right, msg) {
        if (left !== right) {
            throw msg || "not equal ";
        }
    };

    var assertTrue = function(value, msg) {
        if (value != true) {
            throw msg || "not true";
        }
    };

    var assertDefined = function(value, msg) {
        if (value) {
            return;
        }
        throw msg || "not defined";
    };

    var assertUndefined = function(value, msg) {
        if (value) {
            throw msg || "defined";
        }
    };

    var fail = function(value) {
        exp = value;
    };

    return {
        add : add,
        test : test,
        fail : fail,
        assertDefined : assertDefined,
        assertUndefined : assertUndefined,
        assertEquals : assertEquals,
        assertTrue : assertTrue
    };

}();

var add=XPE.unit.add;
var test=XPE.unit.test;
var fail=XPE.unit.fail;
var assertUndefined =XPE.unit.assertUndefined;
var assertDefined = XPE.unit.assertDefined;
var assertEquals = XPE.unit.assertEquals;
var assertTrue = XPE.unit.assertTrue;
