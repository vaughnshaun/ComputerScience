(function(){
	function Stack(compareCallback){
		var _length = 0;
		var _top;
		var _doCompare = compareCallback || function(itemA, itemB){
			if(itemA < itemB) return -1;
			else if(itemA > itemB) return 1;
			
			return 0;
		};
		
		function push(item){
			var newNode = Node(item);
			newNode.next = _top;
			_top = newNode;
			_length++;
		}
		
		function pop() {
			var popped = _top;
			var item;
			if(popped){
				_length--;
				_top = _top.next;
				item = popped.item;
			}
			
			return item;
		}
		
		function peek(){
			return _top ? _top.item : undefined;
		}
		
		function getLength(){
			return _length;
		}
		
		function Node(item) {
			return {
				item,
				next: undefined
			}
		}
		
		return {
			push,
			pop,
			getLength,
			peek
		};
	}
	
	function StackWithMin(){
		var _stack = Stack();
		var minStack = Stack();
		var minValue;
		
		return {
			push: function(item){
				_stack.push(item);
				
				if(minValue === undefined || item < minValue){
					minValue = item;
					minStack.push({
						item: item,
						index: _stack.getLength() - 1
					});
				}
			},
			
			pop: function(){
				var result = _stack.pop();
				if(minStack.peek().index == _stack.getLength()){
					var popped = minStack.pop();
					
					if(minStack.peek()) minValue = minStack.peek().item;
					else minValue = undefined;
				}
			
				return result;
			},
			
			getLength: function(){
				return _stack.getLength();
			},
			
			getMin: function(){
				return minValue;
			}
		};
	}
	
	console.log('Exercise 3.2\n\n')
	var stack = StackWithMin();
	stack.push(10);
	stack.push(20);
	stack.push(5);
	stack.push(40);
	stack.push(1);
	
	while(stack.getLength() > 0){
		console.log('min: ' + stack.getMin());
		stack.pop();
	}
})();