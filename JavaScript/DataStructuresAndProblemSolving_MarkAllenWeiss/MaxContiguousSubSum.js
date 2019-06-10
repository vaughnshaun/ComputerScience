/*
	Get the sum and range of the largest contiguous sum
*/
(function(){
	Program = this.Program || {};
	
	Program.MaxContiguous = {
		getSumLinear,
		getSumQuadratic,
		renderExample
	};
	
	function getSumLinear(list){
		var highest = {};
		if(list.length){
			if(list.length > 1){
				var current = {sum: list[0], start: 0, end: 0};
				var highest = {sum: list[0], start: 0, end: 0};
				var runningSum = 0;
				
				for(var i = 0; i < list.length; i++){
					// If the current range is not adding any value change it
					if(current.sum <= 0){
						current.sum = 0;
						current.start = i;
						current.end = i;
						runningSum = 0;
					}
					
					runningSum += list[i];
					
					// See if the range must be extended
					if(current.sum < runningSum){
						current.end = i;
					}
					
					current.sum += list[i];
					if(current.sum > highest.sum){
						highest.sum = current.sum;
						highest.start = current.start;
						highest.end = current.end;
					}
				}
			}
			
			// There is no valid maximum sum
			if(highest.sum < 0){
				highest.sum = 0;
				highest.start = undefined;
				highest.end = undefined
			}
		}
		
		return highest;
	}
	
	function getSumQuadratic(list) {
		var highest = {
			sum: 0
		};
		var sum = 0;
		
		if(list.length > 0){
			highest.start = 0;
			highest.end = 0;
			for(var i = 0; i < list.length; i++){
				sum = list[i];
				for(var j = i + 1; j < list.length; j++){
					sum += list[j];
					if(sum > highest.sum){
						highest.sum = sum;
						highest.start = i;
						highest.end = j;
					}
				}
			}
		}
		
		if(highest.sum < 0){
			highest.sum = 0;
			highest.start = undefined;
			highest.end = undefined;
		}
		
		return highest;
	}
	
	function renderExample(){
		var samples = [
			[-2, 11, -4, 13, -5, 2],
			[1, -3, 4, -2, -1, 6]
		];
		
		var linearEl = document.getElementById('linear');
		var quadraticEl = document.getElementById('quadratic');
		var verifiedEl = document.getElementById('verified');
		
		
	}
	
	function renderSamples(samples){
		var samples = '<div class="bracket">[</div>' +samples.map(function(s){
			return s.map((value, index) => {
				return '<div class="sample-cell'+index+'"></div>'
			});
		}).join(', ') + '<div class="bracket">]</div>';
	}
})();