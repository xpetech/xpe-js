X.sub("init", function() {

    var defaultText = "<p>Edit me</p>";

    var toolbarHtml = function(mini) {
        var html = '';
        html += '<button data-cmd="bold" class="fa fa-bold"></button>';
        if (!mini) {
            html += '<button data-cmd="redo" class="fa fa-repeat" />' +
                '<button data-cmd="undo"  class="fa fa-undo" />' +
                '<button data-cmd="removeFormat"  class="fa fa-eraser" />';
        }
        html += '<button data-cmd="italic"   class="fa fa-italic" />';
        html += '<button data-cmd="underline"   class="fa fa-underline" />';
        html += '<button data-cmd="justifyFull"  class="fa fa-align-justify" />';
        html += '<button data-cmd="justifyLeft"  class="fa fa-align-left" />';
        html += '<button data-cmd="justifyCenter"  class="fa fa-align-center" />';
        html += '<button data-cmd="justifyRight"   class="fa fa-align-right" />';
        html += '<button data-cmd="insertParagraph" class="fa fa-paragraph" />';
        html += '<button data-cmd="insertorderedlist"  class="fa fa-list-ol" />';
        html += '<button data-cmd="insertunorderedlist"  class="fa fa-list-ul" />';
        html += '<button data-cmd="outdent"  class="fa fa-outdent" />';
        html += '<button data-cmd="indent"  class="fa fa-indent" />';
        if (!mini) {
            html += '<button data-cmd="insertLink"  class="fa fa-chain" />';
            html += '<button data-cmd="unlink"  class="fa fa-unlink" />';
            html += '<button data-cmd="cut"  class="fa fa-cut" />';
        }
        html += '<button data-cmd="copy"  class="fa fa-copy" />';
        html += '<button data-cmd="paste"  class="fa fa-paste" />';
        html += '<button data-cmd="strikeThrough"  class="fa fa-strikethrough" />';
        html += '<button data-cmd="formatBlock" data-param="h2");">H2</button>';
        html += '<button data-cmd="formatBlock" data-param="h3");">H3</button>';
        html += '<button data-cmd="formatBlock" data-param="h4");">H4</button>';
        return html;
    };



    var makeToolbar = function(mini) {
        var toolbar = X(document.createElement('div'));
        toolbar.className = 'toolbar';
        toolbar.innerHTML = toolbarHtml(mini);
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

        return toolbar;

    };


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
        if ("textarea" == editor.type) {
            makeToolbar(true);
            var newEditor = document.createElement('div');
            editor.parentElement.insertBefore(newEditor, editor);
            newEditor.minToolbar = true;
            setupDiv(newEditor);
            editor.hidden = true;
            if (editor.value && editor.value.length > 0) {
                newEditor.innerHTML = editor.value;
            } else if (editor.placeholder) {
                newEditor.firsttime = true;
                newEditor.innerHTML = '<p>' + editor.placeholder + '</p>';
            }

            editor.addEventListener('change', function() {
                newEditor.innerHTML = editor.value;
                newEditor.firsttime = false;
            });
            
            //whenever the editable div is updated, we update the original form field value
            newEditor.addEventListener("input", function() {
                editor.value = newEditor.innerHTML;
            }, false);
            
            newEditor.onblur = function() {
                editor.value = newEditor.innerHTML;
            };

            
        } else {
            setupDiv(editor);
        }
    }


    function setupDiv(editor) {
        var toolbar;
        editor.classList.add('editor');


        editor.onclick = function(e) {
            e.preventDefault();
            editor.editing = true;
            editor.setAttribute('contenteditable', true);
            if (editor.firsttime) {
                editor.innerHTML = "";
                editor.firsttime = false;
            }

            if (!toolbar) {
                toolbar = makeToolbar(editor.minToolbar);
                editor.parentElement.insertBefore(toolbar, editor);
            }
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

        document.addEventListener('click', function(e) {
            if (clieckOutside(e)) {
                if (editor.editing) {
                    X.pub('doneEditing', editor);
                    editor.editing = false;
                }
                if (toolbar) {
                    toolbar.css('display', 'none');
                }
                return;
            }
        });


        if (editor.innerHTML.trim().length === 0) {
            editor.innerHTML = defaultText;
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