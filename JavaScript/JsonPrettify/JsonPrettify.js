// Corner Case - Occurs only outside of normal operating parameters. Multiple variables with multiple extremes
// Edge Case - One variable at an extreme

var tabEntity = "&emsp;";
function getPrettyJson(json) {
	// Just let the parse throw to the calling point
	json = JSON.parse(json);
	var html = [];
	var tabHtml = '';

	processObject(json, html, tabHtml, false, false);

	return html.join('');
}

function processObject(curObject, html, tabHtml, startTabbingEnabled){
	var start = '';
	var end = '';
	var isObject = true;
    var isArray = false;
    var endingTabHtml = tabHtml;

	if(curObject instanceof Array){
	start = '<span class="squareBracket">[</span><br/>';
	end = '<span class="squareBracket">]</span>';
	isArray = true;
    }
    else if(curObject instanceof Object) {
        start = '<span class="curlyBrace">{</span><br/>';
        end = '<span class="curlyBrace">}</span>';
    }
    else {
        isObject = false;
    }

    if(start)
    html.push((startTabbingEnabled ? tabHtml : '') + start);

    // If primitive
    if(!isObject){
        var qoute = '';
        switch(typeof curObject){
            case 'string':
            html.push('<span class="string">');
            qoute = '"';
            break;

            case 'boolean':
            html.push('<span class="boolean">');
            break;

            case 'number':
            html.push('<span class="number">');
            break;
        }
        html.push(qoute + curObject + qoute + '</span>');
    }
    else { // Otherwise object loop and repeat process

        // Get the total number of values in the current object
        var totalValues = Object.keys(curObject).length;

        // Track the number of values processed so far
        var valuesProcessed = 0;

        // Tab over for all key value pairs since all objects have a nesting nature
        tabHtml += tabEntity;
        // Object.keys is not gauranteed to return the list of keys in the original order
        // The for in loop will return the keys in order most of the time
        for(var key in curObject){
            // Add the key if the object is not an array
            var includeTabbing = true;
            if(!isArray){
                html.push(tabHtml + '<span class="key">"' + key + '":</span>&nbsp;');
                includeTabbing = false;
            }

            // Rerun the processObject to account for values that can be objects/arrays
            // This will also do the normal value logic
            // Edge Case: Tabbing should only be used if a value is not preceded by a key
            processObject(curObject[key],  html, tabHtml, includeTabbing);

            // After each value is retrieved add a comma and a newline
            // The comma is only added if the value is not the last value in the object
            valuesProcessed++;
            var comma = "";

            // Edge Case: A comma should not be added if the object is the last one to be processed
            if(valuesProcessed < totalValues){
                comma = ",";
            }

            html.push(comma + '<br/>');
        }
    }

    if(end)
    html.push(endingTabHtml + end);
}
