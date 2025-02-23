function ShapeDrawTool() {
    // Tool for drawing shapes - rectangle, circle, triangle, ellipse
    this.name = "shapes";
    this.icon = "assets/shapes.png";
    
    // Shape drawing properties
    this.currentShape = "rectangle";  // Default shape type
    this.startX = -1;  // Starting X coordinate of shape
    this.startY = -1;  // Starting Y coordinate of shape
    this.fillShape = false;  // Whether to fill the shape with color
    this.shapeSize = 50;  // Base size for shapes

    // Main drawing function
    this.draw = function() {
        updatePixels();  // Restore canvas state
        
        // Handle shape preview while drawing
        if (mouseIsPressed) {
            // Store start position when mouse is first pressed
            if (this.startX === -1) {
                this.startX = mouseX;
                this.startY = mouseY;
            }
            
            // Draw shape preview
            push();  // Save drawing settings
            stroke(colourP.selectedColour);
            if (this.fillShape) {
                fill(colourP.selectedColour);
            } else {
                noFill();
            }
            
            this.drawShape(this.startX, this.startY, mouseX, mouseY);
            pop();  // Restore drawing settings
        } else {
            // Reset start position when mouse is released
            this.startX = -1;
            this.startY = -1;
        }
    };

    // Draw the selected shape type
    this.drawShape = function(startX, startY, endX, endY) {
        let w = endX - startX;  // Calculate width
        let h = endY - startY;  // Calculate height
        
        // Draw different shapes based on selection
        switch(this.currentShape) {
            case "rectangle":
                rect(startX, startY, w, h);
                break;
            case "circle":
                let diameter = dist(startX, startY, endX, endY);
                circle(startX, startY, diameter);
                break;
            case "triangle":
                triangle(startX, startY,           // Top point
                        startX + w, startY,        // Right point
                        startX + w/2, startY + h); // Bottom point
                break;
            case "ellipse":
                ellipse(startX + w/2, startY + h/2, Math.abs(w), Math.abs(h));
                break;
        }
    };

    // Finalize shape when mouse is released
    this.mouseReleased = function() {
        if (this.startX !== -1) {
            push();
            stroke(colourP.selectedColour);
            if (this.fillShape) {
                fill(colourP.selectedColour);
            } else {
                noFill();
            }
            this.drawShape(this.startX, this.startY, mouseX, mouseY);
            pop();
            loadPixels();  // Save the drawn shape
        }
    };

    // Creates the shape tool controls
    this.populateOptions = function() {
        select(".options").html("");
        
        // Creates a container for the options
        let container = createDiv();
        container.class('tool-options-container');
        container.parent(select(".options"));

        // Creates a shape type dropdown menu
        let shapeSelect = createSelect();
        shapeSelect.class('shape-select');
        shapeSelect.parent(container);
        
        // Adds shape options with proper capitalisation
        const shapes = ["Rectangle", "Circle", "Triangle", "Ellipse"];
        shapes.forEach(shape => shapeSelect.option(shape, shape.toLowerCase()));
        shapeSelect.selected(this.currentShape);
        shapeSelect.changed(() => this.currentShape = shapeSelect.value());

        // Creates the fill toggle checkbox
        let fillToggle = createCheckbox('Fill Shape', this.fillShape);
        fillToggle.class('tool-checkbox');
        fillToggle.parent(container);
        fillToggle.changed(() => this.fillShape = fillToggle.checked());
    };

    // Cleanup when the tool is deselected
    this.unselectTool = function() {
        select(".options").html("");
    };
}
