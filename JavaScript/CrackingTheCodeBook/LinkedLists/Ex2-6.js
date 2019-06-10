(function(){
	Questions = this.Questions || {};
	Questions.Ex2_6 = {
		run: function(){
			
			/*
				Time: O(n)
				Space: O(n)
			*/
			function doIterationWithMap(list){
				var duppedNode;
				var visitedMap = {};
				
				var iter = list;
				while(iter && !duppedNode){
					if(!visitedMap[iter.item]){
						visitedMap[iter.item] = iter.item;
					}
					else {
						duppedNode = iter;
					}
					iter = iter.next;
				}
				
				return duppedNode;
			}
			
			/*
				Time: O(n^2)
				Space: O(1)
				Yes this is O(n) even though the examined size
				gets smaller at each iteration. In order for this
				to be nlogn the sample size must be halfed at each iteration
				NOTE: Doesn't acutally work because when it gets to the end it cycles back
				NEED LENGTH TO DO THIS. ACTUALLY LENGTH IS NOT UPDATED DURING THE CORRUPTION
				I WOULD HAVE TO ASSUME LENGTH + 1
			*/
			function doIterationDouble(list){
				var iter = list;
				var duppedNode;
				
				// Loop through the list
				while(iter && !duppedNode){
					var compIter = iter.next;
					
					// Always compare the next one because no node to recheck after determining that the node is unique
					while(compIter && !duppedNode){
						if(iter.item == compIter.item){
							duppedNode = compIter;
						}
						compIter = compIter.next;
					}
					iter = iter.next;
				}
				
				return duppedNode;
			}
			
			function doIterationDoubleWithLength(list, length){
				var iter = list;
				var duppedNode;
				
				// Loop through the list
				var i =0;
				while(i < length + 1 && !duppedNode){
					var compIter = iter.next;
					
					// Always compare the next one because no node to recheck after determining that the node is unique
					var j = i + 1;
					while(j < length + 1 && !duppedNode){
						if(iter.item == compIter.item){
							duppedNode = compIter;
						}
						compIter = compIter.next;
						j++;
					}
					iter = iter.next;
					i++;
				}
				
				return duppedNode;
			}
			
			/*
				Time: O(n)
				Space: O(1)
				This allows for doing a check that assumes that
				the duplicate shares the same address (is the actual node not a different node with the same value).
				It is also assumed that the list is sorted. I guess the purpose is to remove a node that is accidentally added twice
			*/
			function doIterationAssumeSorted(list){
				var iter = list;
				var duppedNode;
				while(iter.next && !duppedNode){
					if(iter.next.item < iter.item){
						duppedNode = iter.next;
					}
					iter = iter.next;
				}
				
				return duppedNode;
			}
			
			function getNodeString(node){
				var nextItem;
				var item = node.item;
				
				if(node.next){
					nextItem = node.next.item;
				}
				
				return "Node: " + item + "\nNext Node: " + nextItem;
			}
			
			console.log('Linked List Exercise 2.6\n\n');
			//var getDuppedNode = doIterationWithMap;
			//var getDuppedNode = doIterationAssumeSorted;
			var getDuppedNode = doIterationDoubleWithLength;
			// NOTE: BAD!! var getDuppedNode = doIterationDouble;
			
			var myList = Lists.LinkedList();
			myList.enqueue('A');
			myList.enqueue('B');
			myList.enqueue('C');
			myList.enqueue('D');
			myList.enqueue('E');
			var eNode = myList.dangerous.getNode('E');
			var cNode = myList.dangerous.getNode('C');
			
			eNode.next = cNode;
			
			// Print the dupped node
			console.log(getNodeString(getDuppedNode(myList.dangerous.getHeadNode(), myList.getCount())));
			
		}
	};
	Questions.Ex2_6.run();
})();