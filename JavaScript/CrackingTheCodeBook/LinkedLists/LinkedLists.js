(function(){
	Lists = this.Lists || {
		LinkedList
	};
	
	// Linked list has an advantage in insert. No need to resize or shift items around just reconnect that's it.
	
	function LinkedList (){
		var _head;
		var _tail;
		var _length = 0;

		function enqueue(item) {
			var newNode = Node(item);
			
			if(!_head){
				_head = newNode;
				_tail = newNode;
			}
			else { // Remember a real life queue has a tail that keeps moving
				_tail.next = newNode; // Set the last node's next to the new node
				_tail = newNode; // The new node is now the last node in the queue
			}
			
			_length++;
		}
		
		function dequeue() {
			var item;
			if(_head){
				item = _head;
				var newHead = _head.next;
				// delete _head;
				_head = _head.next;
				_length--;
				
				if(!_head){
					_tail = undefined;
				}
			}
			
			return item;
		}
		
		function isFull(){
			var result = false;
			
			try{
				var newNode = Node();
			}
			catch{
				result = true;
			}
			
			return result;
		}
		
		function isEmpty(){
			return !_tail ? true : false;
		}
		
		function insert(index, item){
			var curIndex = 0;
			var iter = _head;
			var foundNode;
			
			// The loop is neccessary only if the index is valid
			if(index >= 0 && index < _length){
					while(iter && !foundNode){
					if(curIndex == index){
						foundNode = iter;
					}
					curIndex++;
					iter = iter.next;
				}
			}
			
			if(foundNode){
				var newNode = Node(item);
				// Link the new node to the node a head of it
				newNode.next = foundNode.next;
				foundNode.next = newNode;
				_length++;
			}
			else { // The new node should go to the back of the line
				enqueue(item);
			}
		}
		
		/* 
			Search: O(n)
			Insert: O(1)
		*/
		function remove(item){
			if(_head){
				if(_head.item == item){
					dequeue();
				}
				else {
					// Remember to use the iter.next technique
					// because access to the previous node for linking is required
					var nodeToDelete;
					var iter = _head;
					while(iter.next && !nodeToDelete){
						if(iter.next.item == item){
							nodeToDelete = iter.next.item
							_length--;
							// Relink the list
							iter.next = iter.next.next;
						}
						iter = iter.next;
					}
					
					/*if(nodeToDelete){
						delete nodeToDelete
					}*/
				}
			}
		}
		
		function clear(){
			while(_head){
				var toDelete = _head;
				_head = _head.next;
				// delete toDelete
			}
			
			_tail = undefined;
			_length = 0;
		}
		
		function getDisplayString(){
			var result = [];
			var iter = _head;
			while(iter){
				result.push('['+iter.item+']');
				iter = iter.next;
			}
			
			return result.join('->');
		}
		
		function Node(item){
			return {
				item: item,
				next: undefined
			};
		}
		
		function getCount(){
			return _length;
		}
		
		function getHeadNode(){
			return _head;
		}
		
		function getNode(item){
			var foundNode;
			var iter = _head;
			while(iter && !foundNode){
				if(iter.item == item){
					foundNode = iter;
				}
				iter = iter.next;
			}
			
			return foundNode;
		}
		
		// This is a dangerous api that exposes some internals
		// Use this only for experimentation
		var dangerous = {
			getHeadNode,
			getNode
		};
		
		return {
			enqueue,
			dequeue,
			isFull,
			isEmpty,
			insert,
			remove,
			clear,
			getDisplayString,
			getCount,
			dangerous
		}
	}
	
})();