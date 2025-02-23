//global variables that will store the toolbox colour palette
//and the helper functions
var toolbox = null;
var colourP = null;
var helpers = null;
var DEBUG = true; // Add debug flag

function setup() {
    //create a canvas to fill the content div from index.html
    canvasContainer = select('#content');
    var c = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
    c.attribute('willReadFrequently', true);  // Add this attribute to optimize pixel operations
    c.parent("content");

    //create helper functions and the colour palette
    helpers = new HelperFunctions();
    colourP = new ColourPalette();

    //create a toolbox for storing the tools
    toolbox = new Toolbox();

    //add the tools to the toolbox.
    toolbox.addTool(new FreehandTool());
    toolbox.addTool(new LineToTool());
    toolbox.addTool(new SprayCanTool());
    toolbox.addTool(new mirrorDrawTool());
    toolbox.addTool(new StampTool());
    toolbox.addTool(new ShapesTool("icons/shapes.png"));
    toolbox.addTool(new ScissorsTool());

    background(255);
    loadPixels();

    // Update clear button listener to just clear the canvas
    select('#clearButton').mouseClicked(function() {
        background(255);
        loadPixels();
    });

    // Add save functionality
    select('#saveImageButton').mouseClicked(function() {
        saveCanvas('myDrawing', 'png');
    });
}

// Add debug logging function
function debugLog(message) {
    if (DEBUG) {
        console.log('[DEBUG] ' + message);
    }
}

function draw() {
    //call the draw function from the selected tool.
    //hasOwnProperty is a javascript function that tests
    //if an object contains a particular method or property
    //if there isn't a draw method the app will alert the user
    if (toolbox.selectedTool.hasOwnProperty("draw")) {
        toolbox.selectedTool.draw();
    } else {
        alert("it doesn't look like your tool has a draw method!");
    }
}

function mousePressed() {
    if (toolbox.selectedTool.hasOwnProperty("mousePressed")) {
        toolbox.selectedTool.mousePressed();
    }
}

function mouseDragged() {
    if (toolbox.selectedTool.hasOwnProperty("mouseDragged")) {
        toolbox.selectedTool.mouseDragged();
    }
}

function mouseReleased() {
    if (toolbox.selectedTool.hasOwnProperty("mouseReleased")) {
        toolbox.selectedTool.mouseReleased();
    }
}

// Add window error handler
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.log('Error: ' + msg + '\nURL: ' + url + '\nLine: ' + lineNo + '\nColumn: ' + columnNo + '\nError object: ' + JSON.stringify(error));
    return false;
};