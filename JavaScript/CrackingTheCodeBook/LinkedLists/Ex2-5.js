(function(){
	Questions = this.Questions || {};
	Questions.Ex2_5 = {
		iterative: {
			
		},
		recursive: {
			addLists: addListsRecursive
		}
	};
	
	function addListsRecursive(listA, listB, addValue){
		var valueA = 0;
		var valueB = 0;
		var base = 10;
		var sumList;
		addValue = addValue || 0;
		
		if(listA || listB){
			if(listA) {
				valueA = listA.item;
				listA = listA.next;
			}
			
			if(listB){
				valueB = listB.item;
				listB = listB.next;
			}
			
			var sum = valueA + valueB + addValue;
			if(sum >= base){
				addValue = 1;
				sum = sum - base;
			}
			
			sumList = {
				item: sum
			};
			
			if(listA || listB){
				sumList.next = addListsRecursive(listA, listB, addValue);
			}
		}
		
		return sumList;
	}
})();