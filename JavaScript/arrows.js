function getArrowFlaps(line, flapLength){
    flapLength = flapLength || 4;

    // First transform the line into a vector
    var vector = {
        x: line.x2 - line.x1,
        y: line.y2 - line.y1
    };

    // Get the vector's magnitude
    var magnitude = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));

    // Get the unit vector
    var unitVector = {
        x: vector.x / magnitude,
        y: vector.y / magnitude
    };

    var degrees = 130;
    var radians = degrees * (Math.PI / 180);

    // Create a new line that will start the specified length from the end
    var moveDistance = magnitude - flapLength;
    var newLine = {
        x1: unitVector.x * moveDistance,
        y1: unitVector.y * moveDistance,
        x2: line.x2,
        y2: line.y2
    };

    var reverseVectorLine = {
        x: newLine.x1 - newLine.x2,
        y: newLine.y1 - newLine.y2
    };

    var flap1 = rotate(radians, newLine, reverseVectorLine);

    var flap2 = rotate(-radians, newLine, reverseVectorLine);

    function rotate(radians, newLine, reverseVectorLine){
        var result = {
            x1: newLine.x2,
            y1: newLine.y2,
            x2: reverseVectorLine.x * Math.cos(radians) - (reverseVectorLine.y * Math.sin(radians)),
            y2: reverseVectorLine.x * Math.sin(radians) + (reverseVectorLine.y * Math.cos(radians)),
        };

        var vector = getVector(result);

        // Get the vector's magnitude
        var magnitude = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));

        // Get the unit vector
        var unitVector = {
            x: vector.x / magnitude,
            y: vector.y / magnitude
        };

        // Create a new line that will start the specified length from the end
        var moveDistance = magnitude - flapLength;
        var newLine = {
            x1: unitVector.x * moveDistance,
            y1: unitVector.y * moveDistance,
            x2: line.x2,
            y2: line.y2
        };
        
        return newLine;
    }

    function getVector(line){
        return {
            x: line.x1 - line.x2,
            y: line.y1 - line.y2
        };
    }

    return {
        line: newLine,
        flap1: flap1,
        flap2: flap2
    };
}