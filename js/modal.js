/**
 * A modal creates a dialog window for displaying messages
 */
X.sub("init", function() {
	
	var overlay = X('modal_overlay', true);

	if (!overlay) {
		overlay = document.createElement('div');
		overlay.id = 'modal_overlay';
		document.body.appendChild(overlay);
	}

	overlay.style.visibility = 'hidden';

	function onDisplay(evt, obj) {
		overlay.innerHTML = '<div id="modal_panel"><div id="modal_title">标题</div><div id="modal_content"> </div><div id="modal_control"><a href="#" class="button" id="modal_close">关闭</a></div></div>';
		var panel = X('modal_panel');
		var callback =null;
		if ('string' === typeof obj )  {
			X('modal_content').innerHTML = obj;
		} else {
			X('modal_title').innerHTML = obj.title;
			X('modal_content').innerHTML = obj.msg;
			callback=obj.callback;
			if (obj.nocontrol) {
				X('modal_control').style.display="none";
			} else  if (obj.close) {
				X('modal_control').style.display="block";
				X('modal_close').innerHTML=obj.close;
			}
		}
		overlay.style.visibility = 'visible';
		//by getting the actual width of the panel, we can then calculate the
		//margin-left correctly so the div can be positioned correctly in the middle
		//this works for div that positioned as absolute or fixed
		//if the div is static positioned, then just use margin:0 auto
		var marginLeft=-Math.floor(panel.offsetWidth/2)+'px';
		panel.css('marginLeft',marginLeft);
		
		var closeBut = X('modal_close');
		if (closeBut) {
			closeBut.addEventListener('click', onClose);
		}
		
		
		function onClose() {
			overlay.style.visibility = 'hidden';
			if (callback) {
				callback();
			}
		}
	}

	function done() {
		overlay.style.visibility = 'hidden';
	}
	
	X.sub("underConstruction", function() {
		onDisplay('','建设中，请稍后再访问。');
	});

	X.sub("showModal", onDisplay);
	X.sub("closeModal", done);

});
