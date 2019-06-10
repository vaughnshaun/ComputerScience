function loadFiles(callback){
	callback = callback || function(){};
	
	var files = [
		'Ex3-2.js',
		'Ex3-4.js'
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