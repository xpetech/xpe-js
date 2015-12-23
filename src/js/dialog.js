/**
 * A modal creates a dialog window for displaying messages
 */
X.sub("init", function() {

    var overlay = X('dialog_overlay', true);

    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'dialog_overlay';
        document.body.appendChild(overlay);
    }

    var callback = null;
    var validator = null;

    overlay.style.visibility = 'hidden';
    overlay.innerHTML = '<div id="dialog_panel"><div id="dialog_title">标题</div><div id="dialog_content"> </div><div id="dialog_control"><a href="#" id="dialog_ok" class="button">OK</a><a href="#" id="dialog_close" class="button">Cancel</a></div></div>';

    var panel = X('dialog_panel');

    X('dialog_close').addEventListener('click', onClose);

    function closeAndCallback() {
        onClose();
        if (callback) {
            callback();
        }
    }

    X('dialog_ok').addEventListener('click', function() {
        if (validator) {
            validator(cloaseAndCallback);
        } else {
            closeAndCallback();
        }
    });


    function onDisplay(evt, obj) {
        callback = null;
        validator = null;


        if (obj.noCancel) {
            X('dialog_close').style.display = 'none';
        } else {
            X('dialog_close').style.display = 'inline-block';
        }

        if (obj.doNotShowOk) {
            X('dialog_ok').style.display = 'none';
        } else {
            X('dialog_ok').style.display = 'inline-block';
        }

        if ('string' === typeof obj) {
            X('dialog_content').innerHTML = obj;
            X('dialog_close').style.display = 'none';
            callback = null;
        } else {
            X('dialog_title').innerHTML = obj.title;
            X('dialog_content').innerHTML = obj.msg;
            X('dialog_ok').innerHTML = obj.okText;
            X('dialog_close').innerHTML = obj.closeText;
            callback = obj.callback;
            validator = obj.validator;
        }
        overlay.style.visibility = 'visible';
        //by getting the actual width of the panel, we can then calculate the
        //margin-left correctly so the div can be positioned correctly in the middle
        //this works for div that positioned as absolute or fixed
        //if the div is static positioned, then just use margin:0 auto
        var marginLeft = -Math.floor(panel.offsetWidth / 2) + 'px';
        panel.css('marginLeft', marginLeft);
    }

    function onClose() {
        overlay.style.visibility = 'hidden';
    }


    X.error = function(title, msg) {
        onDisplay("showModal", {
            title: title,
            msg: msg,
            noCancel: true,
            okText: 'OK'
        });
    };

    X.dialog = X.error;

    X.underConstruction = function() {
        X.error('建设中', '请已后再试。');
        return false;
    };


    X.sub("showDialog", onDisplay);
    X.sub("closeDialog", onClose);

});