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
    toolbox.addTool(new FreehandTool());
    toolbox.addTool(new LineToTool());
    toolbox.addTool(new SprayCanTool());
    toolbox.addTool(new mirrorDrawTool());
    toolbox.addTool(new StampTool());
    toolbox.addTool(new ShapeDrawTool()); // Add new shape drawing tool
    toolbox.addTool(new ScissorsTool());
    toolbox.addTool(new EraserTool()); // Add the new eraser tool
    toolbox.addTool(new TextTool()); // Add the text tool

    // Set up initial canvas state
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

// Main draw loop - handles active tool drawing
function draw() {
    if (toolbox && toolbox.selectedTool && toolbox.selectedTool.hasOwnProperty("draw")) {
        toolbox.selectedTool.draw();
    }
}

// Mouse event handlers - delegate to active tool
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

// Simplify error handler to just log the error message
window.onerror = function(msg) {
    console.error('Error:', msg);
    return false;
};