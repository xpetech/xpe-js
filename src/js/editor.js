X.sub("init", function() {


    var toolbarHtml =
        '<button data-cmd="bold" class="fa fa-bold"></button>' +
        '<button data-cmd="redo" class="fa fa-repeat" />' +
        '<button data-cmd="undo"  class="fa fa-undo" />' +
        '<button data-cmd="removeFormat"  class="fa fa-eraser" />' +
        '<button data-cmd="italic"   class="fa fa-italic" />' +
        '<button data-cmd="underline"   class="fa fa-underline" />' +
        '<button data-cmd="justifyFull"  class="fa fa-align-justify" />' +
        '<button data-cmd="justifyLeft"  class="fa fa-align-left" />' +
        '<button data-cmd="justifyCenter"  class="fa fa-align-center" />' +
        '<button data-cmd="justifyRight"   class="fa fa-align-right" />' +
        '<button data-cmd="insertParagraph" class="fa fa-paragraph" />' +
        '<button data-cmd="insertorderedlist"  class="fa fa-list-ol" />' +
        '<button data-cmd="insertunorderedlist"  class="fa fa-list-ul" />' +
        '<button data-cmd="outdent"  class="fa fa-outdent" />' +
        '<button data-cmd="indent"  class="fa fa-indent" />' +
        '<button data-cmd="insertLink"  class="fa fa-chain" />' +
        '<button data-cmd="unlink"  class="fa fa-unlink" />' +
        '<button data-cmd="cut"  class="fa fa-cut" />' +
        '<button data-cmd="copy"  class="fa fa-copy" />' +
        '<button data-cmd="paste"  class="fa fa-paste" />' +
        '<button data-cmd="strikeThrough"  class="fa fa-strikethrough" />' +
        '<button data-cmd="formatBlock" data-param="h2");">H2</button>' +
        '<button data-cmd="formatBlock" data-param="h3");">H3</button>' +
        '<button data-cmd="formatBlock" data-param="h4");">H4</button>' ;


    var toolbar = X(document.createElement('div'));

    (function() {
        toolbar.id = 'toolbar';
        toolbar.innerHTML = toolbarHtml;
        document.body.appendChild(toolbar);
        toolbar.css('display', 'none');

        var buttons = toolbar.getElementsByTagName('button');
        for (var i = 0; i < buttons.length; ++i) {
            var but = buttons[i];
            but.onclick = makeListener(but.dataset);
        }

        function makeListener(data) {
            return function(e) {
                e.preventDefault();
                document.execCommand(data.cmd, false, data.param);
            };
        }

    }());


    var popup = document.createElement('div');
    popup.id = 'popup';
    document.body.appendChild(popup);
    popup.style.visibility = 'hidden';
    popup.onmouseout = function() {
        window.addEventListener('click', closePopup);
    };

    function showPopup(evt, msg) {
        evt.preventDefault();
        popup.style.visibility = 'visible';
        popup.style.left = evt.clientX + 'px';
        popup.style.top = evt.clientY + 'px';
        window.removeEventListener('click', closePopup);
    }

    function closePopup(evt) {
        popup.style.visibility = 'hidden';
    }


    function setupEditor(editor) {
        editor.classList.add('editor');

        editor.onclick = function(e) {
            e.preventDefault();
            editor.editing = true;
            editor.setAttribute('contenteditable', true);
            toolbar.css('position', 'absolute');
            toolbar.css('display', 'block');
            toolbar.css('top', (editor.offsetTop - toolbar.offsetHeight - 5) + 'px');
            toolbar.css('left', (editor.offsetLeft) + 'px');
        };

        function clieckOutside(e) {
            var t = e.target;

            while (t !== null) {
                if (t === editor || t === toolbar) {
                    return false;
                }
                t = t.parentNode;
            }

            return true;
        }

        document.onclick = function(e) {
            if (clieckOutside(e)) {
                if (editor.editing) {
                    X.pub('doneEditing', editor);
                    editor.editing = false;
                }
                toolbar.css('display', 'none');
                return;
            }
        };


        if (editor.innerHTML.trim().length === 0) {
            editor.innerHTML = "<p>Edit me</p>";
        }


        editor.oncontextmenu = function(evt) {
            evt.preventDefault();
            var msg = "<ul>";
            msg += "<li><a  id='tidy' >Tidy</a></li>";
            msg += "<li><a  id='rmStyle' >Remove Style</a></li>";
            msg += "<li><a  id='clear' >Clear</a></li>";
            msg += "</ul>";
            popup.innerHTML = msg;
            X('clear').onclick = function(e) {
                e.preventDefault();
                clean();
            };
            X('tidy').onclick = function(e) {
                e.preventDefault();
                editor.innerHTML = style_html(editor.innerHTML);
            };
            X('rmStyle').onclick = function(e) {
                e.preventDefault();
                var s = editor.getElementsByTagName('style');
                var i = 0;
                if (s) {
                    for (i = 0; i < s.length; ++i) {
                        s[i].parentElement.removeChild(s[i]);
                    }
                }
                s = editor.getElementsByTagName("*");
                if (s) {
                    for (i = 0; i < s.length; ++i) {
                        s[i].removeAttribute('style');
                        s[i].removeAttribute('class');
                        s[i].innerHTML = s[i].innerHTML.trim();
                        if (s[i].tagName === "P" && s[i].innerHTML.length === 0) {
                            s[i].parentElement.removeChild(s[i]);
                        }
                    }
                }
            };
            showPopup(evt, msg);
        };

        function clean() {
            editor.innerHTML = "Text";
        }
    }

    var nl = document.querySelectorAll("*[data-toggle='editor']");
    for (var i = 0; i < nl.length; ++i) {
        setupEditor(nl[i]);
    }


});