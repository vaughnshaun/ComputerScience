(function(){
	/*function countPatternInString(str){
		var result = {
			pattern: '',
			count: 0
		};
		
		if(str.length > 0){
			// Pretend to allocated curPattern[str.length] here
			var curPattern = [str[0]];
			var patternIndex = 0;
			var patternCount = 1;
			var patternLength = 1;
			var isSame = true;
			
			// Loop through the string, compare, and build pattern at the same time
			for(var i = 0; i < str.length; i++){
				if(curPattern[patternIndex] == str[i]){
					patternIndex++;
					
					// The patternIndex should be reset if the current pattern index exceeds the pattern length
					if(!isSame && patternIndex >= patternLength){
						patternCount++;
						patternIndex = 0;
					}
				}
				else {
					// Don't copy over the entire pattern, just add to it
					if(isSame && curPattern[patternIndex] === undefined && str[i] === str[0]){
						curPattern[patternIndex] = str[i];
						patternIndex++;
						patternLength++;
						patternCount = 1;
					}
					else {
						isSame = false;
						patternCount = 1;
						patternIndex = 0;
						
						// Copy the remaining required letters. This may void that extra if I have for the  same check
						for(var j = patternLength; j <= i; j++){
							curPattern[j] = str[j];
						}
						patternLength = patternLength + (i - patternLength) + 1;
					}
				}
			}
			
			result.pattern = curPattern.join('');
			result.count = patternCount;
		}
		
		return result;
	}*/
	
	function countPattern(str){
		var result = {
			count: 0,
			length: str.length
		};
		
		countPatternHelper(str, 1, result);
		
		// Do extra validation for non unique characters or no obvious pattern
		if(result.count == str.length || result.length * result.count != str.length){
			result.count = 1;
			result.length = str.length
		}
		
		return result;
	}
	
	function countPatternHelper(str, patternLength, result){
		if(patternLength * 2 <= str.length){
			result.count = 1;
			result.length = patternLength;
			// This can be optimized by not creating a new sub string everytime
			// Just use an isEqual method and each index
			//var patternStr = str.substring(0, patternLength);
			var maxJumps = Math.ceil(str.length / patternLength);
			for(var i = 1; i < maxJumps; i++){
				//if((i * patternLength) <= str.length && patternStr == str.substring(i * patternLength, (i + 1) * patternLength)){
				if(i * patternLength <= str.length && isEqual(str, 0, patternLength, i * patternLength, (i + 1) * patternLength)){
					result.count++;
				}
				else {
					countPatternHelper(str, patternLength + 1, result);
					break;
				}
			}
		}
	}
	
	function isEqual(str, startA, endA, startB, endB){
		var isEqual = false;
		if(endA - startA == endB - startB){
			isEqual = true;
			var length = endA - startA;
			for(var i = 0; i < length && isEqual; i++){
				isEqual = str[startA + i] == str[startB + i];
			}
		}
		
		return isEqual;
	}
	
	//var str = "ababab";
	//var str = "xxxxxxx";
	var str = "aabbaaabba";
	//var str = "nopattern";
	var obj = countPattern(str);
	var title = 'The pattern count in string';
	obj = {
		count: obj.count,
		pattern: str.substring(0, obj.length)
	};
	htmlWriter.logObject(obj, title);
	 
})();