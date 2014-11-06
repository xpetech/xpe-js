
// similar to the Java StringBuilder

var StringBuilder = function(value) {
    var data = [];

    this.append = function(v) {
        if (v) {
            data.push(v);
        }
        return this;
    };

    this.append(value);

    this.clear = function() {
        while (data.pop()) {
        }
    };

    this.toString = function() {
        return data.join("");
    };
};

XPE.logger = function() {
    var sb = new StringBuilder();
    var levels = {
        "debug" : 100,
        "info" : 80,
        "warn" : 30,
        "fatal" : 10,
        "none" : 1000
    };
    var level = levels["debug"];

    var setLevel = function(l) {
        if (levels[l]) {
            this.level = levels[l];
        }
    };

    var logInfo = function() {
        if (level >= levels["info"]) {
            return true;
        }
        return false;
    };

    var logDebug = function() {
        if (level >= levels["debug"]) {
            return true;
        }
        return false;
    };

    var logWarn = function() {
        if (level >= levels["warn"]) {
            return true;
        }
        return false;
    };

    var logFatal = function() {
        if (level >= levels["fatal"]) {
            return true;
        }
        return false;
    };

    var log = function(msg) {
        sb.append(msg);
    };

    var add = function(msg) {
        sb.append(msg);
        return this;
    };

    var flush = function() {
    };

    var show = function() {
        return sb.toString();
    };

    var clear = function() {
        sb.clear();
    };

    return {
        log : log,
        show : show,
        flush : flush,
        clear : clear,
        logInfo : logInfo,
        logDebug : logDebug,
        logWarn : logWarn,
        logFatal : logFatal,
        add : add,
        setLevel : setLevel
    };

}();
