function loadFiles(callback){
	callback = callback || function(){};
	
	var files = [
		'Ex2-5.js',
		'Ex2-6.js'
	];

	files.forEach(f => {
		var script = document.createElement('script');
		script.src = f;
		document.body.appendChild(script);
	});
	
	setTimeout(function(){
		callback();
	}, 2000);
}