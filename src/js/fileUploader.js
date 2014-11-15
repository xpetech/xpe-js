/**
 * File uploader module:
 *  Selects and uploads files
 * 
 * requires dialog
 * 
 */
X.sub("init", function() {


    var html = '<div class="fileSelector" ><div ><ul id="fileThumb" ></ul> </div> <input id="filenames"  type="file" name="filenames"  accept="*/*"> </div>';

    var uploadURL;
    var callback = null;
    var res;

    function onOK() {
        if (callback) {
            callback(res);
            return;
        }
        if (uploadURL) {
            //uploading one by one
        }
    }


    function read(file, preview) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            var r = {};
            r.name = file.name;
            r.data = evt.target.result;
            res.push(r);
            var img = document.createElement("li");
            img.src = r.data;
            preview.appendChild(img);
        };
        reader.readAsDataURL(file);
    }

    function onSelected() {
        var preview = X('fileThumb');
        preview.innerHTML = "";
        res = [];
        var files = X('filenames').files;
        for (var i = 0; i < files.length; ++i) {
            read(files[i], preview);
        }
    }

    function onDrop(name, id) {
        var preview = X(id);
        preview.innerHTML = "";


        preview.ondragover = function() {
            this.className = 'hover';
            return false;
        };

        preview.ondragend = function() {
            this.className = '';
            return false;
        };

        preview.ondrop = function(e) {
            this.className = '';

            e.preventDefault();

            var files = e.dataTransfer.files;
            for (var i = 0; i < files.length; ++i) {
                read(files[i], preview);
            }

            X.pub('filesDropped', res);
            return false;
        };

    }

    function onSelectFiles(name, obj) {
        uploadURL = obj.uploadURL;
        callback = obj.callback;
        var show = {};
        show.msg = html;
        show.title = "Select Files";
        show.callback = onOK;
        X.pub('showDialog', show);
        var el = X('filenames');
        if (obj.single) {
            el.setAttribute('single', true);
        } else if (obj.multiple) {
            el.setAttribute('multiple', true);
        }
        el.onchange = onSelected;
    }

    X.sub('selectFiles', onSelectFiles);

    X.sub('dropFiles', onDrop);

});