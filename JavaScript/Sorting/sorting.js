(function(){
    sorting = this.sorting || {
        selectionSort: selectionSort,
        selectionSortModified: selectionSortModified
    };

    // Modifies in place
    function selectionSort(arr, getValue){
        if(typeof getValue != "function")
            getValue = undefined;

        /// Only sort the arr if the array is greater than 1, because there is no point otherwise
        if(arr && arr.length > 1){
            getValue = getValue || function(arr){ return arr;};
            // Start at the beginning of the list and compare it to every other item in the list
            for(var i = 0; i < arr.length; i++){
                var highestIndex = i;
                
                for(var j = i + 1; j < arr.length; j++){
                    if(getValue(arr[highestIndex]) < getValue(arr[j])){
                        highestIndex = j;
                    }
                }

                // Do the swap only if the highest index changed
                if(highestIndex != i){
                    var highValue = arr[highestIndex];
                    arr[highestIndex] = arr[i];
                    arr[i] = highValue;
                }
            }
        }
    }

    // Lets modify this so that it will be stable and be able to leave the loop early
    // If equal to the highest over value there is no need to search
    function selectionSortModified(arr, getValue){
        if(typeof getValue != "function")
            getValue = undefined;

        /// Only sort the arr if the array is greater than 1, because there is no point otherwise
        if(arr && arr.length > 1){
            var overallHighest;
            var previousHighest;
            getValue = getValue || function(arr){ return arr;};
            
            // Start at the beginning of the list and compare it to every other item in the list
            for(var i = 0; i < arr.length; i++){
                var highestIndex = i;
                var highestValue = getValue(arr[highestIndex]);

                // If the highest value is equal to the overall highest then no need
                // to continue searching. The highest value is also found from the
                // Checking against overallHighest makes it stable.
                // Checking against previousHeight prevents having to continue the search and swapping
                // start
                for(var j = i + 1;j< arr.length && highestValue !== overallHighest && highestValue !== previousHighest; j++){
                    if(highestValue < getValue(arr[j])){
                        highestIndex = j;
                        highestValue = getValue(arr[j]);
                    }
                }

                // Do the swap only if the highest index changed
                if(highestIndex != i){
                var highValue = arr[highestIndex];
                arr[highestIndex] = arr[i];
                arr[i] = highValue;
                }
            }

            // The overall highest is the highest value found the on first full iteration
            if(i == 0){
                overallHighest = highestValue;
            }

            previousHeighest = highestValue;
        }
    }
})();