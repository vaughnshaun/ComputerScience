function Graph(){
    var _map = VertexMap();
    var _start = [];

    // Sets vectors based on the input array
    function readInputs(inputList){
        clearVertices();
        if(inputList && inputList.length > 0){
            inputList.forEach(function(input){
                var startVertex = _map.getVertex(input.from);

                // edge will automatically connect the ending vertex
                var endVertex = _map.getVertex(input.to);
                var connectingEdge = Edge(input.cost, endVertex);

                // Connect the edge to the startVertex, adds the edge to the list of edges connected to the startVertex
                startVertex.adj.push(connectingEdge);
            });
        }
    }
	
	function travelingSalesman(startVertex){
		var result = {
			distance: undefined,
			path: []
		};
		
		_map.clearAlgorithm();
		startVertex = _map.getVertex(startVertex);
		startVertex.distance = startVertex.distance || 0;
		travelingSalesmanHelper(startVertex, startVertex, result, 0);
		
		return result;
	}
	
	function travelingSalesmanHelper(startVertex, endVertex, result, count){
		// If the start vertex is equal to the end vertex and if start has been visited already we know we are back at the beginning
		var isVisited = startVertex.visited;
		startVertex.visited = true;
		if(startVertex == endVertex && count != 0){
			// Update the path information if the required parameters are met
			var total = _map.getLength();
			if(total == count && (result.distance === undefined || endVertex.distance < result.distance)){
				result.distance = endVertex.distance;
				// Loop and add the path
				var iter = endVertex.prev;
				result.path = [endVertex.name];
				debugger;
				while(iter != endVertex){
					result.path.push(iter.name);
					iter = iter.prev;
				}
				result.path.push(startVertex.name);
			}
		}
		else if(!isVisited){
			// Do a depth first search for the next path to test
			for(var i = 0; i < startVertex.adj.length; i++){
				var curEdge = startVertex.adj[i];
				// Guard that prevents adding the previous back
				if(startVertex.prev != curEdge.destination){
					var cost = curEdge.cost;
					curEdge.destination.distance = curEdge.destination.distance || 0;
					curEdge.destination.distance =  startVertex.distance + cost;
					curEdge.destination.prev = startVertex;
					count++;
					travelingSalesmanHelper(curEdge.destination, endVertex, result, count);
					// Reset the end vertex after it is done processing
					count--;
					curEdge.destination.prev = undefined;
					curEdge.destination.distance = 0;
					curEdge.destination.visited = false;
				}
			}
		}
	}

    function clearVertices(){
        _map.clear();
        _start = [];
    }

    function getAllPaths(from, to){
        var allPaths = [];

        if(_map.contains(from)){
            traverseGraph(_map.getVertex(from), to, [], allPaths)
        }

        return allPaths;
    }
	
	function doUnWeighted(from){
		_map.clearAlgorithm();
		var fromVertex = _map.getVertex(from);
		fromVertex.dist = 0;
		var myQueue = Queue();
		myQueue.pushBack(fromVertex);
		
		while(!myQueue.isEmpty()){
			var vertex = myQueue.popFront();
			
			// Look up each edge
			for(var i = 0; i < vertex.adj.length; i++){
				var edge = vertex.adj[i];
				if(edge.destination.dist === undefined){
					edge.destination.dist = vertex.dist + 1;
					edge.destination.prev = vertex;
					myQueue.pushBack(edge.destination);
				}
			}
		}
	}
	
	function doDijkstra(from){
		_map.clearAlgorithm();
		var fromVertex = _map.getVertex(from);
		fromVertex.dist = 0;
		var pq = MinArray({
			getComparableValue: function(vertex){
				return vertex.dist;
			}
		});
		pq.push(fromVertex);
		
		// The loop shouldn't run longer than the number of vertices
		for(var i = 0; i < _map.getLength(); i++){
			if(pq.isEmpty()) return;
			
			// Get the next vertex to test
			fromVertex = undefined;
			while(!pq.isEmpty() && !fromVertex){
				fromVertex = pq.pop();
				// Consider the from vertex not found if it has been visited before
				if(fromVertex.visited){
					fromVertex = undefined;
				}
				else{
					fromVertex.visited = true;
				}
			}
			
			// Loop through all of the edges in the current vertex
			if(fromVertex){
				fromVertex.adj.forEach(function(edge){
					// if the edge cost from the current vertex accumlated distance is less than the current shortest distance to the destination
					// update the destination's distance
					if(edge.destination.dist === undefined || fromVertex.dist + edge.cost < edge.destination.dist){
						edge.destination.dist = fromVertex.dist + edge.cost;
						edge.destination.prev = fromVertex;
						pq.push(edge.destination);
					}
				});
			}
		}
		
	}
	
	function doBadDijkstra(from){
		_map.clearAlgorithm();
		var fromVertex = _map.getVertex(from);
		fromVertex.dist = 0;
		var myQueue = Queue();
		myQueue.pushBack(fromVertex);

		while(!myQueue.isEmpty()){
			var vertex = myQueue.popFront();
			vertex.visited = true;
			
			// Look up each edge
			for(var i = 0; i < vertex.adj.length; i++){
				var edge = vertex.adj[i];
				if(edge.destination.dist === undefined || vertex.dist + edge.cost < edge.destination.dist){
					edge.destination.dist = vertex.dist + edge.cost;
					edge.destination.prev = vertex;
					
					// The visited flag will cause the algorithm to give the wrong answer
					/*if(!edge.destination.visited){
						myQueue.pushBack(edge.destination);
					}*/
					
					// For this to work the algorithm has to revisit the node
					// Works but has bad performance because it is recalculating every point
					// Any gain point must recalculate its path because the shortest path so far hasn't been considered
					myQueue.pushBack(edge.destination);
				}
			}
		}
	}

    function traverseGraph(from, toName, pathHistory, allPaths, fromName){
        fromName = fromName || from.name;
        for(var i = 0; i < from.adj.length; i++){
            var curEdge = from.adj[i];
            var validEdge = true;

            // Process the destionation if it exists
            if(curEdge.destination && curEdge.destination.name != fromName){
                // Edge Case: Before switching paths at the same level make sure the next vector isn't in there already
                if(!alreadyInHistory(curEdge.destination.name, pathHistory)){
                    // Push only when a valid destination is present
                    pathHistory.push({
                        name: from.name,
                        edgeCost: curEdge.cost
                    });

                    // if the desired destination is not found, go deeper in the path
                    if(curEdge.destination.name != toName){
                        if(curEdge.destination.adj.length > 0){
                            traverseGraph(curEdge.destination, toName, pathHistory, allPaths, fromName)
                        }
                    }
                    else { // Otherwise the destination is found, update the master list (only if not looping back to the source)
                        // Copy the current path history and save it to the list of paths
                        var validPath = Object.assign([], pathHistory);
                        // Edge case: push the last point
                        validPath.push({
                            name: curEdge.destination.name,
                            edgeCost: curEdge.destination.cost
                        });
                        allPaths.push(validPath);
                    }

                    pathHistory.pop();
                }
            }
        }
    }

    return {
        readInputs,
        clearVertices,
        getAllPaths,
		doBadDijkstra,
		doDijkstra,
		doUnWeighted,
		travelingSalesman,
		getVertex: function(vertex){
			return _map.getVertex(vertex);
		}
    };
}

function alreadyInHistory(name, history){
    var isFound = false;
    for(var i = 0; i < history.length && !isFound; i++){
        if(name == history[i].name) isFound = true;
    }

    return isFound;
}

function VertexMap(){
    var _map = {};
	var _length = 0;
    return {
        getVertex: function(name){
            var vertex = _map[name];

            if(!vertex){
                vertex = Vertex(name);
                _map[name] = vertex;
				_length++;
            }

            return vertex;
        },
        contains: function(name){
            return _map[name] ? true : false;
        },
        clear: function(){
            _map = {};
			this.clearAlgorithm();
        },
		clearAlgorithm: function(){
			
			Object.keys(_map).forEach(k =>{
				var v = _map[k];
				v.dist = undefined;
				v.prev = undefined;
				v.visited = undefined;
				v.scratch = 0;
			});
		},
		getLength: function(){
			return _length;
		}
    };
}

function Vertex(name){
    return {
        name: name,
        adj: []
    };
}

function Edge(cost, destination){
    return {
        cost: cost,
        destination
    };
}

function Queue(){
	var _head;
	var _tail;
	
	function pushBack(item){
		if(!_head){
			_head = {
				item
			};
			_tail = _head;
		}
		else {
			_tail.next = {
				item
			};
			_tail = _tail.next;
		}
	}
	
	function popFront(){
		var item;
		
		if(_head){
			item = _head.item;
			_head = _head.next;
		}
		
		return item;
	}
	
	function isEmpty(){
		return !_head;
	}
	
	return {
		pushBack,
		popFront,
		isEmpty
	};
}

function MinArray(opts){
	var _arr = [];
	opts = opts || {};
	var getComparableValue = opts.getComparableValue || function(item){ return item; };
	
	return {
		isEmpty: function(){
			return _arr.length == 0 ? true : false;
		},
		
		push: function(item){
			_arr.push(item);
		},
		
		getMin: function(){
			
			var minItem;
			var index;
			
			if(_arr.length > 0){
				minItem = _arr[0];
				index = 0;
				for(var i = 1; i < _arr.length; i++){
					if(getComparableValue(minItem) > getComparableValue(_arr[i])){
						minItem = _arr[i];
						index = i;
					}
				}
			}
			
			return {
				item: minItem,
				index: index
			};
		},
		
		pop: function(){
			var top = this.getMin();
			var item;
			
			if(top.item){
				item = top.item;
				_arr.splice(top.index, 1);
			}
			
			return item;
		}
	}
}

var myGraph = Graph();
/*myGraph.readInputs([
	{from: 'A', to: 'F', cost: 100},
	{from: 'A', to: 'B', cost: 2},
	{from: 'B', to: 'D', cost: 2},
	{from: 'B', to: 'C', cost: 10},
	{from: 'C', to: 'D', cost: 92},
	{from: 'D', to: 'E', cost: 95},
	{from: 'E', to: 'F', cost: 1}
]);*/

myGraph.readInputs([
	{from: 'A', to: 'C', cost: 7},
	{from: 'A', to: 'B', cost: 2},
	{from: 'B', to: 'C', cost: 3},
	{from: 'C', to: 'D', cost: 11}
]);

/*console.log('doBadDijkstra\n\n');
myGraph.doBadDijkstra('A');
var route = myGraph.getVertex('D');
while(route){
	console.log(route.name + ': ' + route.dist);
	route = route.prev;
}

console.log('doUnWeighted\n\n');

route = myGraph.getVertex('D');
myGraph.doUnWeighted('A');
while(route){
	console.log(route.name);
	route = route.prev;
}

console.log('doDijkstra\n\n');

route = myGraph.getVertex('D');
myGraph.doDijkstra('A');
while(route){
	console.log(route.name + ': ' + route.dist);
	route = route.prev;
}*/

var tspGraph = Graph();
tspGraph.readInputs([
	{from: 1, to: 4, cost: 20},
	{from: 1, to: 2, cost: 10},
	{from: 2, to: 1, cost: 20},
	{from: 3, to: 1, cost: 15},
	{from: 1, to: 3, cost: 20},
	{from: 4, to: 2, cost: 25},
	{from: 2, to: 4, cost: 25},
	{from: 4, to: 3, cost: 30},
	{from: 2, to: 3, cost: 35},
	{from: 3, to: 2, cost: 45}
]);

var result = tspGraph.travelingSalesman(1);
console.log('Traveling Salesman ('+result.distance+'): ' + result.path.reverse().join('->'));