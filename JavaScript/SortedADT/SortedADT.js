(function(){
	ADT = {
		Sorted: SortedADT
	};
	
	function SortedADT(type, opts){
		var list;
		if(type == SortedADT.Linked){
			list = LinkedSortedADT(opts);
		}
		else {
			list = ArraySortedADT(opts);
		}
		
		return list;
	}
	SortedADT.Array = 0;
	SortedADT.Linked = 1;
	
	function ArraySortedADT(opts){
		var _currentIndex = -1;
		var _length = 0; // The length of the list. This ignores the actual length of the array
		var _arr = []; // The backing array
		opts = opts || {};
		var isDesc = opts.desc === true ? true : false;
		
		function putItem(item){
			var insertionIndex = findInsertionIndex(item);
			
			// Shift the existing elements over to the right
			for(var index = _length; index > insertionIndex; index--){
				_arr[index] = _arr[index - 1];
			}
			
			// Place the new value at the specified index
			_arr[insertionIndex] = item;
			_length++;
		}
		
		function deleteItem(item){
			var iterIndex = findItemIndex(item);
			iterIndex = iterIndex.index;
			
			if(iterIndex > -1){
				for(;iterIndex < _length -1;iterIndex++){
					_arr[iterIndex] = _arr[iterIndex + 1];
				}
				_length--;
			}
		}
		
		function getItem(item){
			var index = findItemIndex(item, opts);
			index = index.index;
			item = undefined;
			
			if(index > -1){
				item = _arr[index];
			}
			
			return item;
		}
		
		function deleteAll(){
			_length = 0;
		}
		
		function isEmpty(){
			return _length == 0;
		}
		
		function resetList(){
			_currentIndex = -1;
		}
		
		function next(){
			if(_currentIndex + 1 >= _length)
				return false;
			
			_currentIndex++;
			return true;
		}

		function readItem(){
			return _arr[_currentIndex];
		}
		
		function findInsertionIndex(item){
			var insertionPoint = findItemIndex(item);
			insertionPoint = insertionPoint.center;
			
			// If this is the first insert fix it.
			// The search will find nothing be default so the list has to have something in there to work
			if(insertionPoint == -1){
				insertionPoint = 0;
			}
			else if(isAfter(item, _arr[insertionPoint], opts.desc)){
				// Must be iterated if the found item is after the insertion point
				insertionPoint++;
			}
			
			/*var insertionPoint = 0;
			for(var i = 0; i < _length && isAfter(item, _arr[i]); i++){
				insertionPoint++;
			}*/
			
			return insertionPoint;
		}
		
		function findItemIndex(item){
			var desc = opts.desc === true ? true : false;
			
			var first = 0;
			var last = _length - 1;
			var center = Math.floor(last / 2); // JavaScript only has a number type so floor is needed
			var index = -1;
			var isEqual = false;
			
			// Always save both sides unless you are always pushing over to the right
			while(first <= last && !isEqual){
				var isInRight = isAfter(item, _arr[center], desc);
				var test = [];
				for(var i = first; i <= last;i++){
					test.push(_arr[i]);
				}
				//console.log('[' + test.join(', ') + ']');
				if(item == _arr[center]){
					index = center;
					isEqual = true;
				}
				else if(isInRight){
					first = center + 1;
				}
				else {
					last = center - 1;
				}
				
				// JavaScript only has a number type so floor is needed
				center = Math.floor((last - first) / 2) + first;
			}
			
			return {
				index: index,
				center
			}
		}
		
		// Determines if an item should appear after another item
		function isAfter(itemA, itemB, desc){
			var result = false;
			if(desc){
				result = itemA < itemB;
			}
			else {
				result = itemA > itemB;
			}
			
			return result;
		}
		
		function getLength(){
			return _length;
		}
		
		function getString(){
			var values = [];
			
			resetList();
			while(next()){
				values.push(readItem());
			}
			resetList();
			
			return '[' + values.join(', ') + ']';
		}
		
		return {
			putItem,
			deleteItem,
			getItem,
			deleteAll,
			isEmpty,
			resetList,
			next,
			readItem,
			getLength,
			getString
		};
	}
	
	function LinkedSortedADT(opts){
		var _head;
		var _length = 0;
		var _current;
		
		function putItem(item){
			var newNode = {
				item
			};
			_length++;
			
			// Place the node at the head if it is the first or is less than the head
			if(!_head || item < _head.item){
				newNode.next = _head;
				_head = newNode;
			}
			else {
				var iter = _head;
				var insertAtNode;
				while(iter.next && !insertAtNode){
					if(item < iter.next.item){
						insertAtNode = iter;
					}
					iter = iter.next;
				}
				
				// If the item is not found in the list set the insertion point to the last node
				if(!insertAtNode){
					insertAtNode = iter;
				}
				
				// Do the insert
				newNode.next = insertAtNode.next;
				insertAtNode.next = newNode;
			}
		}
		
		function deleteItem(item){
			if(item == _head.item){
				//console.log('Cleanup: delete head: ' + _head.item);
				_head = _head.next;
			}
			else{
				var iter = _head;
				var nodeToDelete;
				while(iter.next && !nodeToDelete){
					if(iter.next.item == item){
						nodeToDelete = iter.next;
						//console.log('Cleanup: delete iter.next: ' + nodeToDelete.item);
						iter.next = iter.next.next;
					}
					iter = iter.next;
				}
			}
			_length--;
		}
		
		function getItem(item){
			var node = getNode(item);
			
			return node ? node.item : undefined;
		}
	
		function getNode(item){
			var iter = _head;
			var foundNode;
			while(iter && !foundNode){
				if(iter.item == item){
					foundNode = iter;
				}
				iter = iter.next;
			}
			
			return foundNode;
		}
		
		function deleteAll(){
			_length = 0;
		}
		
		function isEmpty(){
			return !_head;
		}
		
		function resetList(){
			_current = null;
		}
		
		function getString(){
			var values = [];
			
			resetList();
			while(next()){
				values.push(readItem());
			}
			resetList();
			
			return '[' + values.join(', ') + ']';
		}
		
		function next(){
			if(!_head) return false;
			
			if(!_current) _current = _head;
			else if(!_current.next) return false;
			else _current = _current.next;
			
			return true;
		}

		function readItem(){
			return _current ? _current.item : undefined;
		}
		
		function getLength(){
			return _length;
		}
		
		return {
			putItem,
			deleteItem,
			getItem,
			deleteAll,
			isEmpty,
			resetList,
			next,
			readItem,
			getLength,
			getString
		};
	}
	
	function doTest(desc){
		var listStrings = {};
		Object.keys(ADT.Sorted).forEach(listType => {
			var adt = ADT.Sorted(listType, {desc: desc});
			listStrings[listType] = [];
			console.log('Start ' + listType);
			var sample = [10, 4,8,1,2,3,9,7,4,4,4,5,5,2,10,1,1,0];
			
			console.log('Original Length: ' + sample.length);
			
			for(var i = 0; i < sample.length; i++){
				adt.putItem(sample[i]);
			}
			
			console.log('Sorted Length: ' + adt.getLength());
			
			console.log('Sorted values: ' + adt.getString());
			listStrings[listType].push(adt.getString());
			
			adt.deleteItem(4);
			adt.deleteItem(4);
			adt.deleteItem(4);
			adt.deleteItem(10);
			adt.deleteItem(1);
			adt.deleteItem(1);
			adt.deleteItem(9);
			adt.deleteItem(9);
			adt.deleteItem(0);
			adt.deleteItem(1);
			console.log('After Delete: ' + adt.getString());
			listStrings[listType].push(adt.getString());
			console.log('Get Item: ' + adt.getItem(2));
			console.log('Get Item None: ' + adt.getItem(999));
			adt.deleteAll();
			console.log('After Delete All: ' + adt.getString());
			listStrings[listType].push(adt.getString());
			
			console.log('End ' + listType);
		});
		
		// Compare the strings to see if the results are the same
		var prevLists;
		var isListEqual = true;

		// This will make share all list for the given type returns equal values
		for(var key in listStrings){
			// Compare only if the previous list is available
			if(prevLists){
				for(var i = 0; i < prevLists.length && isListEqual; i++){
					isListEqual = prevLists[i] == listStrings[key][i]
				} 
			}
			prevLists = listStrings[key];
		}
		
		console.log('Test Result: ' + (isListEqual ? 'Success' : 'Failure'));
	}
	
	doTest(false);
	
})();