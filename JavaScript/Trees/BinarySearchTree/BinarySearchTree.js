function BinarySearchTree(){
	var _root;
	
	function putItem(item){
		var newNode = BinaryNode(item);
		
		// If the tree is empty set the root to the new node
		if(isEmpty()){
			_root = newNode;
		}
		else { // Otherwise call insert node to place the node in the correct place
			insertNode(_root, newNode);
		}
	}
	
	function removeItem(item){
		var foundNode = findNode(item);
		deleteNode(foundNode);
	}
	
	function deleteNode(foundNode){
		if(foundNode.getNode()){
			if(!foundNode.getNode().left){
				foundNode.setNode(foundNode.getNode().right);
			}
			else if(!foundNode.getNode().right){
				foundNode.setNode(foundNode.getNode().left);
			}
			else { // This will keep overwriting the node to be deleted with the pred and will do the full delete once the base cases are hit
				var pred = getPred(foundNode.getNode());
				// Get the value of the next closet value and replace the found node's value
				foundNode.getNode().item = pred.getNode().item;
				
				// Delete the pred, but pass it all the way through the delete again, but it may not be at the bottom
				deleteNode(pred);
			}
		}
	}
	
	function isEmpty(){
		return !_root;
	}
	
	function getLength(treeNode){
		if(!treeNode) return 0;
		
		return getLength(treeNode.left) + getLength(treeNode.right) + 1;
	}
	
	function getInRangeCount(min, max){
		var count = 0;
		// Decide which search algorithm to use
		
		// Use breadth first because the value could be found earlier since it is in both sides
		if(min <= _root.item && max > _root.item){
			count = countInRangeBreadthFirst(_root, min, max);
		}
		else if(min <= _root.item && max <= _root.item){ // DF left side
			count = countInRangeDepthFirst(_root.left, min, max);
			
			if(isItemInRange(_root.item, min, max)) count++;
		}
		else if(min > _root.item && max > _root.item){ // DF right side
			count = countInRangeDepthFirst(_root.right, min, max);
		}
		
		return count;
	}
	
	function countInRangeBreadthFirst(treeNode, min, max){
		if(!treeNode) return 0;
		
		var count = 0;
		
		var queue = Queue();
		queue.enqueue(treeNode);
		
		while(!queue.isEmpty()){
			var curTree = queue.dequeue();
			
			// See if the count is in range and add its children for processing later
			// Noticed that children only get added when the parent is in range.
			// This allows for early termination
			if(isItemInRange(curTree.item, min, max)){
				if(curTree.left) queue.enqueue(curTree.left);
				if(curTree.right) queue.enqueue(curTree.right);
				
				count++;
			}
		}
	
		return count;
	}
	
	function Queue(){
		var _arr = [];
		var _length = 0;
		
		function enqueue(item){
			_arr[_length] = item;
			_length++;
		}
		
		function dequeue(){
			var item;
			if(!isEmpty()){
				item = _arr[0];
				deleteItem(0);
			}
			return item;
		}
		
		function deleteItem(index){
			_length--;
			for(var i = index; i < _length; i++){
				_arr[i] = _arr[i + 1];
			}
		}
		
		function isEmpty(){
			return _length == 0;
		}
		
		return {
			enqueue,
			dequeue,
			isEmpty
		};
	}
	
	function isItemInRange(item, min, max){
		return item >= min && item <= max;
	}
	
	function countInRangeDepthFirst(treeNode, min, max){
		if(!treeNode) return 0;
		
		var count = isItemInRange(treeNode.item, min, max) ? 1 : 0;
		
		return countInRangeDepthFirst(treeNode.left, min, max) + countInRangeDepthFirst(treeNode.right, min, max) + count;
	}
	
	function getLengthIter(treeNode){
		
	}
	
	function preorder(treeNode, callback){
		if(treeNode){
			callback = callback || function(){};
			callback(treeNode.item);
			preorder(treeNode.left, callback);
			preorder(treeNode.right, callback);
		}
	}
	
	function postorder(treeNode, callback){
		if(treeNode){
			callback = callback || function(){};
			postorder(treeNode.left, callback);
			postorder(treeNode.right, callback);
			callback(treeNode.item);
		}
	}
	
	function inorder(treeNode, callback){
		if(treeNode){
			callback = callback || function(){};
			inorder(treeNode.left, callback);
			callback(treeNode.item);
			inorder(treeNode.right, callback);
		}
	}
	
	function invertTree(treeNode){
		// notice that the treeNode.left || treeNode.right is not needed since we never actually use .left or .left
		// For example .left.doSomething() will throw an error like cannot invoke on undefined
		if(treeNode /*&& (treeNode.left || treeNode.right)*/){
			// Swap the nodes
			var tempLeft = treeNode.left;
			treeNode.left = treeNode.right;
			treeNode.right = tempLeft;
			
			// Now check the left and right children to see if they have nodes to swap
			invertTree(treeNode.left);
			invertTree(treeNode.right);
		}
	}

	function insertNode(treeNode, newNode, direction){
		// Place the node in the appropriate side of tree
		if(direction && !treeNode[direction]){
			treeNode[direction] = newNode;
		}
		else { // Otherwise keep looking for an empty spot
			// No direction indicates that this is the first call and we are at the root
			treeNode = !direction ? treeNode : treeNode[direction];
			
			// Determine if the left or right should be search
			if(newNode.item < treeNode.item) insertNode(treeNode, newNode, 'left');
			else insertNode(treeNode, newNode, 'right');
		}
	}
	
	// Probably better to do find node iteratively because I can track the parent
	function findNode(item, parentNode, direction){
		// Base only run the function if the tree node exist.
		// A tree node will not exist when the item is not found
		var foundNode;

		// Must decide if we are comparing the root or if we need to look at one of the children
		// All of this work just because pointers are not supported
		var compNode = !parentNode ? _root : parentNode[direction];
		if(compNode){
			if(compNode.item === item){
				foundNode = FoundNodeWrapper(parentNode, direction);
			}
			else if(item < compNode.item){
				foundNode = findNode(item, compNode, 'left');
			}
			else {
				foundNode = findNode(item, compNode, 'right');
			}
		}
		
		return foundNode;
	}
	
	// This enables the mimicking of pointers
	function FoundNodeWrapper(parent, direction){
		return {
			getNode: function(){
				if(!parent) return _root;
				else if(direction) return parent[direction];
				
				return undefined;
			},
			
			setNode: function(newNode){
				if(!parent){
					_root = newNode;
				}
				else if(direction){
					parent[direction] = newNode;
				}
			}
		}
	}
	
	function getPred(node){
		var parent = node;
		var direction = 'left';
		node = node.left;
		while(node.right){
			parent = node;
			direction = 'right';
			node = node.right;
		}
		
		return FoundNodeWrapper(parent, direction);
	}
	
	function BinaryNode(item){
		return {
			left: undefined,
			right: undefined,
			item: item
		};
	}
	
	function hasNodeNonKeyed(parentNode, node){
		var hasNode;
		// The parent node should only be traversed once.
		// This is a helper for findAncestor
		// findAncestor should reset the visited flag on the first call
		if(parentNode && !parentNode.visited){
			if(parentNode === node){
				hasNode = true;
			}
			else {
				hasNode = hasNodeNonKeyed(parentNode.left, node);
				if(!hasNode) hasNode = hasNodeNonKeyed(parentNode.right, node);
			}
		}
		
		return hasNode;
	}
	
	/*function nodeInParent(parentNode, node){
		var hasNode;
		if(parentNode && !parentNode.visited){
			parentNode.visited = true;
			if(parentNode.left && !parentNode.left.visited && parentNode.left === node){
				hasNode = true;
			}
			else if(parentNode.right && !parentNode.right.visited && parentNode.right === node){
				hasNode = true;
			}
			else if(parentNode.visited){
				hasNode = nodeInParent(parentNode.left, node);
				if(!hasNode) hasNode = nodeInParent(parentNode.right, node);
			}
			parentNode.visited = true;
		}
		
		return hasNode;
	}*/
	
	function findAncestor(parentNode, nodeA, nodeB, foundInfo){
		foundInfo = foundInfo || {};
		
		if(nodeA && nodeB){
			if(parentNode){
				if(parentNode === nodeA){
					foundInfo.hasA = true;
				}
				else { // Look for nodeA in the other branches
					findAncestor(parentNode.left, nodeA, nodeB, foundInfo);
					if(!foundInfo.hasA) findAncestor(parentNode.right, nodeA, nodeB, foundInfo);
				}
				
				// If node a has been found then look for the most common ancestor
				// This uses the power of the default stack so I don't have to create extra storage
				if(foundInfo.hasA && !foundInfo.ancestor){
					if(hasNodeNonKeyed(parentNode, nodeB)){
						foundInfo.hasB = true;
						foundInfo.ancestor = parentNode;
					}
					// The parent node for visited should be set here
					// This allows for O(n) flag reset when calling findAncestor
					// Setting visited here will make the child nodes implicitly visited because the chain is cut off
					parentNode.visited = true;
				}
			}	
		}
		
		return foundInfo;
	}
	
	function clearVisited(parentNode){
		if(parentNode){
			parentNode.visited = false;
			clearVisited(parentNode.left);
			clearVisited(parentNode.right);	
		}
	}
	
	function isBSTBetter(){
		return isBSTBetterHelper(_root);
	}
	
	function isBSTBetterHelper(parentNode, leftCap, rightCap){
		if(parentNode){
			
			// Do the range check based on the parent of the current parent
			if(leftCap && (parentNode.right && parentNode.right.item > leftCap)) return false;
			else if(rightCap && (parentNode.left && parentNode.left.item <= rightCap)) return false;
			
			// Check the left and right side for the tree. This is the same for either side
			if(parentNode.left && parentNode.left.item > parentNode.item) return false;
			else if(parentNode.right && parentNode.right.item <= parentNode.item) return false;
			
			return isBSTBetterHelper(parentNode.left, parentNode.item) && isBSTBetterHelper(parentNode.right, undefined, parentNode.item);
		}
	
		// Everything is good
		return true;
	}
	
	function isBSTMinMax(){
		return isBSTHelperMinMax(_root);
	}
	
	function isBSTHelperMinMax(parentNode, min, max){
		if(parentNode){
			if(min !== undefined && parentNode.item <= min) return false;
			else if(max !== undefined && parentNode.item > max) return false;
			
			// Switch the branches and update the min and max as you go
			// Going to the left so the next item cannot be bigger than parentNode.item
			// Going right so the next item cannot be smaller than parentNode.item
			return !isBSTHelperMinMax(parentNode.left, min, parentNode.item) || !isBSTHelperMinMax(parentNode.right, parentNode.item, max) ? false : true;
		}
		
		// All is good
		return true;
	}
	
	function isBST(parentNode){
		var prevValue;
		
		function isBSTInner(parentNode){
			if(parentNode){			
				if(!isBSTInner(parentNode.left)) return false;
				
				// This is the main loop portion. The general case.
				// Remember the traveral is essentially a loop over the correct order
				// In this case ASC
				if(prevValue !== undefined && parentNode.item <= prevValue){
					return false;
				}
				prevValue = parentNode.item;

				if(!isBSTInner(parentNode.right)) return false;
			}
			
			return true;
		}
		
		return isBSTInner(_root);
	}
	
	return {
		putItem,
		removeItem,
		isEmpty,
		getLength: function(){
			return getLength(_root);
		},
		preorder: function(callback){
			preorder(_root, callback);
		},
		postorder: function(callback){
			postorder(_root, callback);
		},
		inorder: function(callback){
			inorder(_root, callback);
		},
		inorderString: function(){
			var arr = [];
			inorder(_root, function(item){
				arr.push(item);
			});
			
			return '[' + arr.join(', ') + ']';
		},
		/*isBST: function(){
			return isBST(_root);
		},*/
		//isBST: isBSTBetter,
		isBST: isBSTHelperMinMax,
		findAncestor: function(itemA, itemB){
			clearVisited(_root);
			var nodeA = findNode(itemA);
			nodeA = nodeA ? nodeA.getNode() : undefined;
			var nodeB = findNode(itemB);
			nodeB = nodeB ? nodeB.getNode() : undefined;
			var foundInfo = findAncestor(_root, nodeA, nodeB);
			var item = foundInfo.ancestor ? foundInfo.ancestor.item : undefined;
			return item;
		},
		invert: function(){
			invertTree(_root);
		},
		getInRangeCount,
		_dangerous: {
			findNode: function(item){
				return findNode(item);
			}
		}
	};
}

var bst = BinarySearchTree();
bst.putItem(20);
bst.putItem(15);
bst.putItem(30);
bst.putItem(10);
bst.putItem(18);
bst.putItem(25);
bst.putItem(50);
bst.putItem(40);
bst.putItem(11);
bst.putItem(16);

// Does breadth first
//var min = 15;
//var max = 40;

// Does depth first left
var min = 10;
var max = 20;

// Does depth first right
//var min = 25;
//var max = 40;

htmlWriter.log("In range count: " + bst.getInRangeCount(min, max));
htmlWriter.log('Before Invert: ' + bst.inorderString());
bst.invert()
htmlWriter.log('After Invert: ' + bst.inorderString());

// findAncestor needs to have the visited reset if you call it over and over again
/*htmlWriter.log('Most common Ancestor (11)(40): ' + bst.findAncestor(11, 40));
htmlWriter.log('Most common Ancestor (11)(16): ' + bst.findAncestor(11, 16));
htmlWriter.log('Most common Ancestor (10)(18): ' + bst.findAncestor(10, 18));
htmlWriter.log('Most common Ancestor (25)(40): ' + bst.findAncestor(25, 40));
htmlWriter.log('Most common Ancestor (10)(10): ' + bst.findAncestor(10, 10));
htmlWriter.log('Most common Ancestor (15)(20): ' + bst.findAncestor(15, 20));

htmlWriter.log('Is ' + bst.inorderString() +' bst: ' + bst.isBST());
bst._dangerous.findNode(40).getNode().item = 2;
htmlWriter.log('Is ' + bst.inorderString() +' bst: ' + bst.isBST());*/
/*var arr = [];
bst.inorder(function(item){
	arr.push(item);
});

htmlWriter.log(arr.join(', '));
htmlWriter.log('Length: ' + bst.getLength());
bst.removeItem(20);
bst.removeItem(15);
arr = [];
bst.inorder(function(item){
	arr.push(item);
});
htmlWriter.log(arr.join(', '));
htmlWriter.log('Length: ' + bst.getLength());*/