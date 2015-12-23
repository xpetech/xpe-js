//this allows a user to select a local file and then write it to a local canvas
X.sub("init", function() {

    var html = '<div class="imageSelector" ><div id="thumbPreview" > </div> <input id="imageFile"  type="file" name="imageFile"  accept="image/*"> </div>';

    var callback = null;
    var res;

    function onOK() {
        if (callback) {
            callback(res);
        }
    }

    var MAX_WIDTH = 1600;
    var MAX_HEIGHT = 1024;

    function read(file, preview) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            var r = {};
            r.name = file.name;
            r.data = evt.target.result;

            var img = document.createElement("img");
            img.src = r.data;

            var width = img.width;
            var height = img.height;


            if (width > MAX_WIDTH || height > MAX_HEIGHT) {
                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                var canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);
                r.data = canvas.toDataURL("image/jpeg");
                var i = file.name.indexOf('.');
                if (i !== -1) {
                    r.name = file.name.substring(0, i) + ".jpg";
                } else {
                    r.name = file.name + ".jpg";
                }
            }

            res.push(r);
            img = document.createElement("img");
            img.src = r.data;
            preview.appendChild(img);
        };
        reader.readAsDataURL(file);
    }

    function onSelected() {
        var preview = X('thumbPreview');
        preview.innerHTML = "";
        res = [];
        var files = X('imageFile').files;
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
            
            X.pub('imagesDropped', res);
            return false;
        };

    }

    function onSelectImage(name, obj) {
        if (!obj.callback) {
            alert('call back not specified');
        }
        callback = obj.callback;
        var show = {};
        show.msg = html;
        show.title = "Select Image";
        show.callback = onOK;
        X.pub('showDialog', show);
        var el = X('imageFile');
        if (obj.single) {
            el.setAttribute('single', true);
        } else if (obj.multiple) {
            el.setAttribute('multiple', true);
        }
        el.onchange = onSelected;
    }

    X.sub('selectImage', onSelectImage);
    
    X.sub('dropImage', onDrop);


});