/**
 * Error module:
 *   reports error to developer, include this module during development
 */
X.sub("init", function() {

    function onError(evt, err) {
        alert('Fatal: function (' + err.caller + ') throw exception ' + err.exception);
    }

    X.sub('error', onError);


});