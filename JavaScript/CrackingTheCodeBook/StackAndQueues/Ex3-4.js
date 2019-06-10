(function(){
	function Stack(opts){
		var _length = 0;
		var _top;
		opts = opts || {};
		var canPush = opts.canPush || function(){return true;}
		var pushCondition
		
		function push(item){
			var success = canPush(this, item);
			
			if(success){
				var newNode = Node(item);
				newNode.next = _top;
				_top = newNode;
				_length++;
			}
			
			return success;
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
		
		function getString(itemPrint){
			var iter = _top;
			var results = [];
			itemPrint = itemPrint || function(item){ return item;};
			
			while(iter){
				results.push(itemPrint(iter.item));
				iter = iter.next;
			}
			
			return results.join('->');
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
			peek,
			getString
		};
	}
	
	function Disk(tower, size){
		var _size = size;
		return {
			lastTower: tower,
			lastDiskSize: undefined,
			getSize: function(){
				return _size;
			},
			canMoveTo: function(tower){
				var top = tower.peek();
				return (top ? top.getSize() : undefined) != this.lastDiskSize && tower != this.lastTower;
			}
		};
	}
	
	// Tower of Hanoi
	var opts = {
		canPush: function(stack, disk){
			var topDisk = stack.peek();
			return !topDisk || disk.getSize() < topDisk.getSize();
		}
	};
	
	var canPush = opts.canPush;
	var towers = [
		Stack(opts),
		Stack(opts),
		Stack({canPush})
	];
	
	// Fill the tower with n disks
	var disksCount = 3;
	var startTower = towers[0];
	for(var i = disksCount; i > 0; i--){
		startTower.push(Disk(startTower, i));
	}
	
	function moveToRight(){
		var currentFrom = 0;
		var currentTo = 1;
		var test = 0;
		while(towers[2].getLength() < disksCount && test < 999){
			var fromTower = towers[currentFrom];
			var toTower = towers[currentTo];
			
			if(test == 199){
				console.log('hmm')
			}
			
			var movingDisk = fromTower.peek();
			if(!movingDisk){
				currentFrom++;
			}
			else {
				var success = toTower.push(movingDisk);
				
				// If the push is not successful try another tower
				currentTo++;
				if(success){
					fromTower.pop();
					movingDisk.lastTower = fromTower;
					movingDisk.lastDiskSize = fromTower.peek() ? fromTower.peek().getSize() : undefined;
				}
				
				if(currentTo >= towers.length){
					currentTo = 0;
				}
			}
			
			// If the from and to are the same towers iterate the from
			if(currentFrom == currentTo){
				currentFrom++;
			}
			
			if(currentFrom >= towers.length){
				currentFrom = 0;
			}
			test++;
		}
	}
	
	moveToRight();
	
	console.log('Exercise 3.4 Tower of Hanoi\n\n\n');
	
	var diskPrint = function(disk){
		return disk.getSize();
	};
	for(var i = 0; i < towers.length; i++){
		console.log('Tower ' +(i + 1)+ ': ' + towers[i].getString(diskPrint));
	}
})();