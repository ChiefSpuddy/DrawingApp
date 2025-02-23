// Store main application components
var toolbox = null;
var colourP = null;
var helpers = null;

function setup() {
    // Initialize canvas
    canvasContainer = select('#content');
    var c = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
    c.attribute('willReadFrequently', true);  // Optimize for pixel operations
    c.parent("content");

    // Initialize core components
    helpers = new HelperFunctions();
    colourP = new ColourPalette();
    toolbox = new Toolbox();

    // Add all drawing tools
    toolbox.addTool(new FreehandTool()); // Draw Tool
    toolbox.addTool(new LineToTool()); // Line Tool
    toolbox.addTool(new SprayCanTool()); // Spray Can Tool
    toolbox.addTool(new mirrorDrawTool()); // Mirror Draw Tool
    toolbox.addTool(new StampTool()); // Stamp Tool
    toolbox.addTool(new ShapeDrawTool()); // Shape Drawing tool
    toolbox.addTool(new ScissorsTool()); // Scissors Tool
    toolbox.addTool(new EraserTool()); // Eraser Tool
    toolbox.addTool(new TextTool()); // Text tool

    // Set up canvas
    background(255);
    loadPixels();

    // Updates theclear button listener to just clear the canvas
    select('#clearButton').mouseClicked(function() {
        background(255);
        loadPixels();
    });

    // Ssave function to save the drawing
    select('#saveImageButton').mouseClicked(function() {
        saveCanvas('myDrawing', 'png');
    });
}

// Main draw loop
function draw() {
    if (toolbox && toolbox.selectedTool && toolbox.selectedTool.hasOwnProperty("draw")) {
        toolbox.selectedTool.draw();
    }
}

// Mouse event handlers
function mousePressed() {
    if (toolbox && toolbox.selectedTool && toolbox.selectedTool.hasOwnProperty("mousePressed")) {
        toolbox.selectedTool.mousePressed();
    }
}

function mouseDragged() {
    if (toolbox && toolbox.selectedTool && toolbox.selectedTool.hasOwnProperty("mouseDragged")) {
        toolbox.selectedTool.mouseDragged();
    }
}

function mouseReleased() {
    if (toolbox && toolbox.selectedTool && toolbox.selectedTool.hasOwnProperty("mouseReleased")) {
        toolbox.selectedTool.mouseReleased();
    }
}

function keyPressed() {
    if (toolbox && toolbox.selectedTool && toolbox.selectedTool.hasOwnProperty("keyPressed")) {
        toolbox.selectedTool.keyPressed(window.event);
    }
}

// Simplifies error handler to log the error message
window.onerror = function(msg) {
    console.error('Error:', msg);
    return false;
};