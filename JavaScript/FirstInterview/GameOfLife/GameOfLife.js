(function(){
	Games = {
		Life
	};
	
	// The possible neighbors for a cell
	const NEIGHBORS = [
		[-1,-1],
		[-1,0],
		[-1,1],
		[0,-1],
		[0,1],
		[1,-1],
		[1,0],
		[1,1]
	];
	
	const MAX_ALIVE = 4;
	const NUM_OF_NEIGHBORS = NEIGHBORS.length;
	
	function Life(){
		var cells = [];
		var cellsBuffer = [];
		var dimensionCount = 2;
		var generationChange = true;
		var rowSize;
		var colSize;
		
		function setInitialState(input, rSize, cSize){
			rowSize = rSize;
			colSize = cSize;
			generationChange = true;
			for(var i = 0; i < rowSize; i++){
				input[i] = input[i] || [];
				for(var j =0; j < colSize; j++){
					setAlive(i, j, input[i][j] ? true : false);
				}
			}
		}
		
		function setAlive(row, col, isAlive, buffer){
			var scopedCells = buffer || cells;
			if(row < rowSize && col < colSize){
				scopedCells[getCellIndex(row, col)] = isAlive ? true : false;
			}
		}
		
		function isAlive(row, col){
			return cells[getCellIndex(row, col)] ? true : false;
		}
		
		function copyFromBuffer(){
			for(var i = 0; i < rowSize; i++){
				for(var j = 0; j < colSize; j++){
					var index = getCellIndex(i, j);
					cells[index] = cellsBuffer[index];
				}
			}
		}
		
		function getCellIndex(row, col){
			return (row * colSize) + col;
		}
		
		function doNextGeneration(){
			generationChange = false;
			for(var i = 0; i < rowSize; i++){
				for(var j = 0; j < colSize; j++){
					var aliveCount = getLivingNeighborCount(i, j, MAX_ALIVE);
					
					// Apply the generation rules
					if(shouldChange(aliveCount)){
						var cellAlive = isAlive(i,j);
						if(cellAlive && shouldDie(aliveCount)){
							setAlive(i, j, false, cellsBuffer);
							generationChange = true;
						}
						else if(!cellAlive && shouldRegenerate(aliveCount)){
							setAlive(i, j, true, cellsBuffer);
							generationChange = true;
						}
					}
					else {
						setAlive(i, j, isAlive(i, j), cellsBuffer);
					}
				}
			}
			
			// Update the current cells;
			if(generationChange) copyFromBuffer();
		}
		
		function isChanged(){
			return generationChange;
		}
		
		function shouldDie(aliveCount){
			return aliveCount < 2 || aliveCount > 3;
		}
		
		function shouldRegenerate(aliveCount){
			return aliveCount == 3;
		}
		
		function shouldChange(aliveCount){
			return !(aliveCount == 2 || aliveCount == 3);
		}
		
		function getLivingNeighborCount(row, col, max){
			max = max || NUM_OF_NEIGHBORS;
			var aliveCount = 0;
			
			for(var i = 0; i < NUM_OF_NEIGHBORS && aliveCount < max; i++){
				if(isAlive(row + NEIGHBORS[i][0], col + NEIGHBORS[i][1])){
					aliveCount++;
				}
			}
			
			return aliveCount;
		}
		
		return {
			isAlive,
			doNextGeneration,
			isChanged,
			getRowCount: function(){
				return rowSize;
			},
			getColCount: function(){
				return colSize;
			},
			setInitialState
		};
	}
})();