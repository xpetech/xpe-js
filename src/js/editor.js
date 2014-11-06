X.sub("init", function() {

    var toolbarHtml =
        '<button id="cleanBut"  title="Clean" ><img src="data:image/gif;base64,R0lGODlhFgAWAIQbAD04KTRLYzFRjlldZl9vj1dusY14WYODhpWIbbSVFY6O7IOXw5qbms+wUbCztca0ccS4kdDQjdTLtMrL1O3YitHa7OPcsd/f4PfvrvDv8Pv5xv///////////////////yH5BAEKAB8ALAAAAAAWABYAAAV84CeOZGmeaKqubMteyzK547QoBcFWTm/jgsHq4rhMLoxFIehQQSAWR+Z4IAyaJ0kEgtFoLIzLwRE4oCQWrxoTOTAIhMCZ0tVgMBQKZHAYyFEWEV14eQ8IflhnEHmFDQkAiSkQCI2PDC4QBg+OAJc0ewadNCOgo6anqKkoIQA7" /></button>' +
        '<button onclick="X.pub(\'ec\',\'bold\');" ><img class="intLink" title="Undo"  src="data:image/gif;base64,R0lGODlhFgAWAOMKADljwliE33mOrpGjuYKl8aezxqPD+7/I19DV3NHa7P///////////////////////yH5BAEKAA8ALAAAAAAWABYAAARR8MlJq7046807TkaYeJJBnES4EeUJvIGapWYAC0CsocQ7SDlWJkAkCA6ToMYWIARGQF3mRQVIEjkkSVLIbSfEwhdRIH4fh/DZMICe3/C4nBQBADs=" /></button>' +
        '<button onclick="X.pub(\'ec\',\'bold\');" ><img class="intLink" title="Redo"   src="data:image/gif;base64,R0lGODlhFgAWAMIHAB1ChDljwl9vj1iE34Kl8aPD+7/I1////yH5BAEKAAcALAAAAAAWABYAAANKeLrc/jDKSesyphi7SiEgsVXZEATDICqBVJjpqWZt9NaEDNbQK1wCQsxlYnxMAImhyDoFAElJasRRvAZVRqqQXUy7Cgx4TC6bswkAOw==" /></button>' +
        '<button onclick="X.pub(\'ec\',\'removeFormat\';"><img class="intLink" title="Remove formatting"   src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB9oECQMCKPI8CIIAAAAIdEVYdENvbW1lbnQA9syWvwAAAuhJREFUOMtjYBgFxAB501ZWBvVaL2nHnlmk6mXCJbF69zU+Hz/9fB5O1lx+bg45qhl8/fYr5it3XrP/YWTUvvvk3VeqGXz70TvbJy8+Wv39+2/Hz19/mGwjZzuTYjALuoBv9jImaXHeyD3H7kU8fPj2ICML8z92dlbtMzdeiG3fco7J08foH1kurkm3E9iw54YvKwuTuom+LPt/BgbWf3//sf37/1/c02cCG1lB8f//f95DZx74MTMzshhoSm6szrQ/a6Ir/Z2RkfEjBxuLYFpDiDi6Af///2ckaHBp7+7wmavP5n76+P2ClrLIYl8H9W36auJCbCxM4szMTJac7Kza////R3H1w2cfWAgafPbqs5g7D95++/P1B4+ECK8tAwMDw/1H7159+/7r7ZcvPz4fOHbzEwMDwx8GBgaGnNatfHZx8zqrJ+4VJBh5CQEGOySEua/v3n7hXmqI8WUGBgYGL3vVG7fuPK3i5GD9/fja7ZsMDAzMG/Ze52mZeSj4yu1XEq/ff7W5dvfVAS1lsXc4Db7z8C3r8p7Qjf///2dnZGxlqJuyr3rPqQd/Hhyu7oSpYWScylDQsd3kzvnH738wMDzj5GBN1VIWW4c3KDon7VOvm7S3paB9u5qsU5/x5KUnlY+eexQbkLNsErK61+++VnAJcfkyMTIwffj0QwZbJDKjcETs1Y8evyd48toz8y/ffzv//vPP4veffxpX77z6l5JewHPu8MqTDAwMDLzyrjb/mZm0JcT5Lj+89+Ybm6zz95oMh7s4XbygN3Sluq4Mj5K8iKMgP4f0////fv77//8nLy+7MCcXmyYDAwODS9jM9tcvPypd35pne3ljdjvj26+H2dhYpuENikgfvQeXNmSl3tqepxXsqhXPyc666s+fv1fMdKR3TK72zpix8nTc7bdfhfkEeVbC9KhbK/9iYWHiErbu6MWbY/7//8/4//9/pgOnH6jGVazvFDRtq2VgiBIZrUTIBgCk+ivHvuEKwAAAAABJRU5ErkJggg==">' +
        '<button onclick="X.pub(\'ec\',\'bold\');" ><img class="intLink" title="Bold"  id="bold" src="data:image/gif;base64,R0lGODlhFgAWAID/AMDAwAAAACH5BAEAAAAALAAAAAAWABYAQAInhI+pa+H9mJy0LhdgtrxzDG5WGFVk6aXqyk6Y9kXvKKNuLbb6zgMFADs=" /></button>' +
        '<button onclick="X.pub(\'ec\',\'italic\');" ><img class="intLink" title="Italic" id="italic" src="data:image/gif;base64,R0lGODlhFgAWAKEDAAAAAF9vj5WIbf///yH5BAEAAAMALAAAAAAWABYAAAIjnI+py+0Po5x0gXvruEKHrF2BB1YiCWgbMFIYpsbyTNd2UwAAOw==" /></button>' +
        '<button onclick="X.pub(\'ec\',\'underline\');" ><img class="intLink" title="Underline"  src="data:image/gif;base64,R0lGODlhFgAWAKECAAAAAF9vj////////yH5BAEAAAIALAAAAAAWABYAAAIrlI+py+0Po5zUgAsEzvEeL4Ea15EiJJ5PSqJmuwKBEKgxVuXWtun+DwxCCgA7" /></button>' +
        '<button onclick="X.pub(\'ec\',\'justifyleft\');"><img class="intLink" title="Left align"  src="data:image/gif;base64,R0lGODlhFgAWAID/AMDAwAAAACH5BAEAAAAALAAAAAAWABYAQAIghI+py+0Po5y02ouz3jL4D4JMGELkGYxo+qzl4nKyXAAAOw==" /></button>' +
        '<button onclick="X.pub(\'ec\',\'justifycenter\');"><img class="intLink" title="Center align"  src="data:image/gif;base64,R0lGODlhFgAWAID/AMDAwAAAACH5BAEAAAAALAAAAAAWABYAQAIfhI+py+0Po5y02ouz3jL4D4JOGI7kaZ5Bqn4sycVbAQA7" /></button>' +
        '<button onclick="X.pub(\'ec\',\'justifyright\');" ><img class="intLink" title="Right align" src="data:image/gif;base64,R0lGODlhFgAWAID/AMDAwAAAACH5BAEAAAAALAAAAAAWABYAQAIghI+py+0Po5y02ouz3jL4D4JQGDLkGYxouqzl43JyVgAAOw==" /></button>' +
        '<button onclick="X.pub(\'ec\',\'insertorderedlist\');"><img class="intLink" title="Numbered list"  src="data:image/gif;base64,R0lGODlhFgAWAMIGAAAAADljwliE35GjuaezxtHa7P///////yH5BAEAAAcALAAAAAAWABYAAAM2eLrc/jDKSespwjoRFvggCBUBoTFBeq6QIAysQnRHaEOzyaZ07Lu9lUBnC0UGQU1K52s6n5oEADs=" /></button>' +
        '<button onclick="X.pub(\'ec\',\'insertunorderedlist\');"><img class="intLink" title="Dotted list"  src="data:image/gif;base64,R0lGODlhFgAWAMIGAAAAAB1ChF9vj1iE33mOrqezxv///////yH5BAEAAAcALAAAAAAWABYAAAMyeLrc/jDKSesppNhGRlBAKIZRERBbqm6YtnbfMY7lud64UwiuKnigGQliQuWOyKQykgAAOw==" /></button>' +
        '<button onclick="X.pub(\'ec\',\'formatblock\',\'blockquote\');"><img class="intLink" title="Quote" src="data:image/gif;base64,R0lGODlhFgAWAIQXAC1NqjFRjkBgmT9nqUJnsk9xrFJ7u2R9qmKBt1iGzHmOrm6Sz4OXw3Odz4Cl2ZSnw6KxyqO306K63bG70bTB0rDI3bvI4P///////////////////////////////////yH5BAEKAB8ALAAAAAAWABYAAAVP4CeOZGmeaKqubEs2CekkErvEI1zZuOgYFlakECEZFi0GgTGKEBATFmJAVXweVOoKEQgABB9IQDCmrLpjETrQQlhHjINrTq/b7/i8fp8PAQA7" /></button>' +
        '<button onclick="X.pub(\'ec\',\'outdent\');"><img class="intLink" title="Add indentation"   src="data:image/gif;base64,R0lGODlhFgAWAMIHAAAAADljwliE35GjuaezxtDV3NHa7P///yH5BAEAAAcALAAAAAAWABYAAAM2eLrc/jDKCQG9F2i7u8agQgyK1z2EIBil+TWqEMxhMczsYVJ3e4ahk+sFnAgtxSQDqWw6n5cEADs=" /></button>' +
        '<button onclick="X.pub(\'ec\',\'indent\');"><img class="intLink" title="Delete indentation" src="data:image/gif;base64,R0lGODlhFgAWAOMIAAAAADljwl9vj1iE35GjuaezxtDV3NHa7P///////////////////////////////yH5BAEAAAgALAAAAAAWABYAAAQ7EMlJq704650B/x8gemMpgugwHJNZXodKsO5oqUOgo5KhBwWESyMQsCRDHu9VOyk5TM9zSpFSr9gsJwIAOw==" /></button>' +
        '<button onclick="var sLnk=prompt(\'Write the URL here\',\'http:\/\/\');if(sLnk&&sLnk!=\'\'&&sLnk!=\'http://\'){ X.pub(\'ec\',\'createLink\',sLnk);}" ><img class="intLink" title="Hyperlink" src="data:image/gif;base64,R0lGODlhFgAWAOMKAB1ChDRLY19vj3mOrpGjuaezxrCztb/I19Ha7Pv8/f///////////////////////yH5BAEKAA8ALAAAAAAWABYAAARY8MlJq7046827/2BYIQVhHg9pEgVGIklyDEUBy/RlE4FQF4dCj2AQXAiJQDCWQCAEBwIioEMQBgSAFhDAGghGi9XgHAhMNoSZgJkJei33UESv2+/4vD4TAQA7" /></button>' +
        '<button onclick="X.pub(\'ec\',\'cut\');"><img class="intLink" title="Cut"  src="data:image/gif;base64,R0lGODlhFgAWAIQSAB1ChBFNsRJTySJYwjljwkxwl19vj1dusYODhl6MnHmOrpqbmpGjuaezxrCztcDCxL/I18rL1P///////////////////////////////////////////////////////yH5BAEAAB8ALAAAAAAWABYAAAVu4CeOZGmeaKqubDs6TNnEbGNApNG0kbGMi5trwcA9GArXh+FAfBAw5UexUDAQESkRsfhJPwaH4YsEGAAJGisRGAQY7UCC9ZAXBB+74LGCRxIEHwAHdWooDgGJcwpxDisQBQRjIgkDCVlfmZqbmiEAOw==" /></button>' +
        '<button onclick="X.pub(\'ec\',\'copy\');" title="Copy"><img class="intLink"  src="data:image/gif;base64,R0lGODlhFgAWAIQcAB1ChBFNsTRLYyJYwjljwl9vj1iE31iGzF6MnHWX9HOdz5GjuYCl2YKl8ZOt4qezxqK63aK/9KPD+7DI3b/I17LM/MrL1MLY9NHa7OPs++bx/Pv8/f///////////////yH5BAEAAB8ALAAAAAAWABYAAAWG4CeOZGmeaKqubOum1SQ/kPVOW749BeVSus2CgrCxHptLBbOQxCSNCCaF1GUqwQbBd0JGJAyGJJiobE+LnCaDcXAaEoxhQACgNw0FQx9kP+wmaRgYFBQNeAoGihCAJQsCkJAKOhgXEw8BLQYciooHf5o7EA+kC40qBKkAAAGrpy+wsbKzIiEAOw==" /></button>' +
        '<button onclick="X.pub(\'ec\',\'paste\');" title="Paste" ><img class="intLink" src="data:image/gif;base64,R0lGODlhFgAWAIQUAD04KTRLY2tXQF9vj414WZWIbXmOrpqbmpGjudClFaezxsa0cb/I1+3YitHa7PrkIPHvbuPs+/fvrvv8/f///////////////////////////////////////////////yH5BAEAAB8ALAAAAAAWABYAAAWN4CeOZGmeaKqubGsusPvBSyFJjVDs6nJLB0khR4AkBCmfsCGBQAoCwjF5gwquVykSFbwZE+AwIBV0GhFog2EwIDchjwRiQo9E2Fx4XD5R+B0DDAEnBXBhBhN2DgwDAQFjJYVhCQYRfgoIDGiQJAWTCQMRiwwMfgicnVcAAAMOaK+bLAOrtLUyt7i5uiUhADs=" /></button>' +
        '<button onclick="var t =prompt(\'Paste something.\');X.pub(\'ec\',\'inserttext\',t);">T</button>' +
        '<button onclick="var t =prompt(\'Insert image link.\');X.pub(\'ec\',\'insertImage\',t);">Img</button>' +
        '<button onclick="X.pub(\'ec\',\'formatblock\',\'h2\');">H2</button>' +
        '<button onclick="X.pub(\'ec\',\'formatblock\',\'h3\');">H3</button>' +
        '<button onclick="X.pub(\'ec\',\'formatblock\',\'h4\');">H4</button>' +
        '<button onclick="X.pub(\'ec\',\'formatblock\',\'p\');">P</button>' +
        '<button id="doneEditing">Done</button>';

    var currentEditor;

    X.sub('ec', function(evt, cmd, param) {
        document.execCommand(cmd, false, param);
    });

    X.sub('heading', function(evt, h) {
        document.execCommand("heading", false, h);
    });

    var toolbar = X('toolbar');
    if (!toolbar) {
        toolbar = document.createElement('div');
        toolbar.id = 'toolbar';
        toolbar.innerHTML = toolbarHtml;
        document.body.appendChild(toolbar);
        toolbar = X(toolbar);
        toolbar.css('display', 'none');
    }


    var popup = X('popup');
    if (!popup) {
        popup = document.createElement('div');
        popup.id = 'popup';
        document.body.appendChild(popup);
        popup.style.visibility = 'hidden';
        popup.onmouseout = function() {
            window.addEventListener('click', closePopup);
        };
    }

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

    var editors = [];

    function editing(evt, el, saveService, id, title) {
        var ed = X(el);
        if (!ed) {
            error("editor element not found");
            return;
        }
        ed.saveService = saveService;
        ed.id = ed.id|| id;
        ed.title = title || "No title";
        if (ed.innerHTML.trim().length === 0) {
            ed.innerHTML = "<p>Edit me</p>";
        }

        editors.push(ed);
        ed.onmouseover = function() {
            hintEditor(ed);
        };
        ed.onmouseout = function() {
            removeHintEditor(ed);
        };
        ed.onclick = function() {
            setupEditor(ed);
        };
        currentEditor = ed;
    }

    function hintEditor(editor) {
        editor.classList.add('editor');
        toolbar.css('display', 'block');
        toolbar.css('top', (editor.offsetTop - toolbar.offsetHeight - 5) + 'px');
        toolbar.css('left', (editor.offsetLeft) + 'px');
    }

    function removeHintEditor(editor) {
        if (editor.editing) {
            return;
        }
        editor.classList.remove('editor');
        toolbar.css('display', 'none');
    }


    function setupEditor(editor) {
        editor.editing = true;
        editor.classList.add('editor');
        editor.setAttribute('contenteditable', true);
        toolbar.css('display', 'block');
        toolbar.css('top', (editor.offsetTop - toolbar.offsetHeight - 5) + 'px');
        toolbar.css('left', (editor.offsetLeft) + 'px');

        if (editor.innerHTML.trim().length === 0) {
            editor.innerHTML = "<p>Edit me</p>";
        }

        X('doneEditing').onclick = function(e) {
            e.preventDefault();
            save(onDoneEditing);
        };

        function onDoneEditing(respText) {
            var resp = onResponse(respText);
            editor.setAttribute('contenteditable', false);
            editor.classList.remove('editor');
            toolbar.css('display', 'none');
            editor.editing = false;
        }

        function save(callback) {
            var obj = {};
            obj.id = editor.id;
            obj.title = editor.title;
            obj.body = editor.innerHTML;
            if (typeof editor.saveService === 'function') {
                editor.saveService(editor);
                var res={};
                res.code='0';
                callback(JSON.stringify(res));
                return;
            } 
            X.post(editor.saveService, obj, callback);
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
                        s[i].innerHTML=s[i].innerHTML.trim();
                        if (s[i].tagName==="P" && s[i].innerHTML.length===0) {
                            s[i].parentElement.removeChild(s[i]);
                        }
                    }
                }
            };
            showPopup(evt, msg);
        };


        X('cleanBut').onclick = function(e) {
            e.preventDefault();
            clean();
        };

        function clean() {
            editor.innerHTML = "Text";
        }
    }

    function onResponse(respText) {
        try {
            var resp = JSON.parse(respText);
            if (resp.code && resp.code != '0') {
                if (resp.code == '2') {
                    X.pub("checkSession", "");
                    return false;
                }
                error(resp.msg);
                return false;
            }
            return resp;
        } catch (e) {
            error("Invalid response:" + respText);
            return false;
        }
    }

    function error(msg) {
        var obj = {};
        obj.title = "Error";
        obj.msg = '<p>' + msg + '</p>';
        obj.noCancel = true;
        X.pub('showDialog', obj);
    }

    X.sub('editing', editing);

    X.pub('editorReady', {});


});