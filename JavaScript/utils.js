(function(){
	var _body;
	htmlWriter = {
		log: function(text){
			var newHtml = document.createElement('span');
			text = (text || '') + '\n';
			text = text.replace(new RegExp('\n', 'g'), '<br/>');
			text = text.replace(new RegExp('\t', 'g'), '&nbsp;&nbsp;&nbsp;&nbsp;');
			text = text.replace(new RegExp(' ', 'g'), '&nbsp;');
			newHtml.innerHTML = text;
			
			setTimeout(function(){
				if(!_body){
					document.body.appendChild(newHtml);
				}
				else {
					_body.appendChild(newHtml);
				}
			});
		},
		logObject: function(obj, title){
			if(title){
				this.log(title);
			}
			for(var key in obj){
				this.log(key + ': ' + obj[key]);
			}
		},
		setBody: function(b){
			_body = b;
		}
	};
})();