function GridArray(){
	var _rowCount;
	var _colCount;
	var _cells;
	
	function getMaxSelectedCount(){
		var queue = Queue();
		var connectedList = [];
		var highest = {
			count: 0,
			color: '',
			path: []
		};
		resetStatus();
		queue.push(getCell(0,0));
		
		while(!queue.isEmpty()){
			var currentCell = queue.pop();
			
			// Start counting if the selected cell hasn't been visited before
			if(!currentCell.visited){
				currentCell.visited = true;
				connectedList = [currentCell];
				var count = getConnectedCount(currentCell, queue, connectedList) + 1;
				
				if(count > highest.count){
					highest.count = count;
					highest.color = currentCell.data;
					highest.path = connectedList;
				}
			}
		}
		
		return highest;
	}
	
	function getConnectedCount(cell, queue, connectedList){
		// Recursive Version
		/*var neighbors = getNeighbors(cell);
		var count = 0;
		for(var key in neighbors){
			var current = neighbors[key];
			if(current && !current.visited){
				if(isConnected(cell, current)){
					count++;
					connectedList.push(current);
					current.visited = true;
					count += getConnectedCount(current, queue, connectedList);
				}
				else {
					queue.push(current);
				}
			}
		}*/
		
		// Iterative version
		var stack = Stack();
		stack.push(cell);
		var count = 0;

		while(!stack.isEmpty()){
			cell = stack.pop();
			var neighbors = getNeighbors(cell);
			for(var key in neighbors){
				var current = neighbors[key];
				if(current && !current.visited){
					if(isConnected(cell, current)){
						count++;
						connectedList.push(current);
						current.visited = true;
						stack.push(current);
						//count += getConnectedCount(current, queue, connectedList);
					}
					else {
						queue.push(current);
					}
				}
			}
		}
		
		return count;
	}
	
	function isConnected(cell, cellCompare){
		if(!cellCompare) return false;
		
		return cell.data == cellCompare.data;
	}
	
	function getNeighbors(cell){
		return {
			left: getCell(cell.getRow(), cell.getCol() -1),
			right: getCell(cell.getRow(), cell.getCol() + 1),
			top: getCell(cell.getRow() - 1, cell.getCol()),
			bottom: getCell(cell.getRow() + 1, cell.getCol())
		};
	}
	
	function loadCells(input, rCount, cCount){
		input = input || [[]];
		_rowCount = rCount;
		_colCount = cCount;
		_cells = [];
		for(var i =0; i < rCount; i++){
			for(var j = 0; j < cCount; j++){
				_cells.push(Cell(i, j, input[i][j] || 'white'));
			}
		}
	}
	
	function getCellIndex(r, c){
		return _colCount * r + c;
	}
	
	function getCell(r, c){
		if(r > -1 && r < _rowCount && c > -1 && c < _colCount)
		return _cells[getCellIndex(r, c)];
	}
	
	function getCellData(r, c){
		return getCell(r,c).data;
	}
	
	function resetStatus(){
		for(var i = 0; i < _cells.length; i++){
			_cells[i].visited = false;
		}
	}
	
	function Cell(r, c, d){
		var _row = r;
		var _col = c;
		var data = d;
		
		return {
			visited: false,
			data,
			getRow: function (){
				return _row;
			},
			getCol: function(){
				return _col;
			}
		}
	}
	
	return {
		loadCells,
		resetStatus,
		getMaxSelectedCount,
		getRowCount: function(){
			return _rowCount;
		},
		getColCount: function(){
			return _colCount;
		},
		getCellData
	}
}

function GridTreeLike(){
	var _rowCount;
	var _colCount;
	var _cells;
	
	function getMaxSelectedCount(){
		var queue = Queue();
		var connectedList = [];
		var highest = {
			count: 0,
			color: '',
			path: []
		};
		resetStatus();
		queue.push(getCell(0,0));
		
		while(!queue.isEmpty()){
			var currentCell = queue.pop();
			
			// Start counting if the selected cell hasn't been visited before
			if(!currentCell.visited){
				currentCell.visited = true;
				connectedList = [currentCell];
				var count = getConnectedCount(currentCell, queue, connectedList) + 1;
				
				if(count > highest.count){
					highest.count = count;
					highest.color = currentCell.data;
					highest.path = connectedList;
				}
			}
		}
		
		return highest;
	}
	
	function getConnectedCount(cell, queue, connectedList){
		// Recursive Version
		/*var neighbors = getNeighbors(cell);
		var count = 0;
		for(var key in neighbors){
			var current = neighbors[key];
			if(current && !current.visited){
				if(isConnected(cell, current)){
					count++;
					connectedList.push(current);
					current.visited = true;
					count += getConnectedCount(current, queue, connectedList);
				}
				else {
					queue.push(current);
				}
			}
		}*/
		
		// Iterative version
		var stack = Stack();
		stack.push(cell);
		var count = 0;

		while(!stack.isEmpty()){
			cell = stack.pop();
			var neighbors = getNeighbors(cell);
			for(var key in neighbors){
				var current = neighbors[key];
				if(current && !current.visited){
					if(isConnected(cell, current)){
						count++;
						connectedList.push(current);
						current.visited = true;
						stack.push(current);
						//count += getConnectedCount(current, queue, connectedList);
					}
					else {
						queue.push(current);
					}
				}
			}
		}
		
		return count;
	}
	
	function isConnected(cell, cellCompare){
		if(!cellCompare) return false;
		
		return cell.data == cellCompare.data;
	}
	
	function getNeighbors(cell){
		return {
			left: cell.getLeft(),
			right: cell.getRight(),
			top: cell.getTop(),
			bottom: cell.getBottom()
		};
	}
	
	function loadCells(input, rCount, cCount){
		input = input || [[]];
		_rowCount = rCount;
		_colCount = cCount;
		_cells = undefined;
		
		// This tracks the row that is above the current row that is being processed
		var aboveCell;
		for(var i = 0; i < input.length; i++){
			// current cell aligns with cells within the columns of the current row
			var currentCell = Cell(i, j, input[i][j] || 'white');
			if(!_cells){
				_cells = currentCell;
			}
			
			var startCell = currentCell;
			for(var j = 1; j < input[i].length; j++){
				var newCell = Cell(i, j, input[i][j] || 'white');
				currentCell.right = newCell;
				newCell.left = currentCell;
				currentCell = currentCell.right;
				
				if(aboveCell){
					newCell.top = aboveCell;
					aboveCell.bottom = newCell;
					aboveCell = aboveCell.right;
				}
			}
			aboveCell = start;
		}
	}
	
	function getCell(r, c){
		if(r > -1 && r < _rowCount && c > -1 && c < _colCount)
		return _cells[getCellIndex(r, c)];
	}
	
	function getCellData(r, c){
		return getCell(r,c).data;
	}
	
	function resetStatus(){
		for(var i = 0; i < _cells.length; i++){
			_cells[i].visited = false;
		}
	}
	
	function Cell(r, c, d){
		var _row = r;
		var _col = c;
		var data = d;
		
		return {
			visited: false,
			data,
			getRow: function (){
				return _row;
			},
			getCol: function(){
				return _col;
			}
		}
	}
	
	return {
		loadCells,
		resetStatus,
		getMaxSelectedCount,
		getRowCount: function(){
			return _rowCount;
		},
		getColCount: function(){
			return _colCount;
		},
		getCellData
	}
}

function Queue(){
	var _head;
	var _tail;
	
	return {
		push: function(item){
			if(!_head){
				_head = {
					item: item
				};
				_tail = _head;
			}
			else {
				_tail.next = {
					item
				};
				_tail = _tail.next;
			}
		},
		
		pop: function(){
			var item;
			
			if(_head){
				item = _head.item;
				_head = _head.next;
			}
			
			return item;
		},
		
		isEmpty: function(){
			return !_head;
		}
	}; 
}

function Stack() {
	var _top;
	return {
		push: function(item){
			var newNode = {
				item
			};
			
			newNode.next = _top;
			_top = newNode;
		},
		
		pop: function(){
			var item;
			
			if(_top){
				item = _top.item;
				_top = _top.next;
			}
			
			return item;
		},
		
		isEmpty: function(){
			return !_top;
		}
	};
}