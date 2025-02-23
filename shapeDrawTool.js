function ShapeDrawTool() {
    this.name = "shapes";
    this.icon = "assets/shapes.png";
    
    this.currentShape = "rectangle";
    this.startX = -1;
    this.startY = -1;
    this.fillShape = false;
    this.shapeSize = 50;

    this.draw = function() {
        updatePixels();
        
        // If mouse is pressed, show shape preview
        if (mouseIsPressed) {
            if (this.startX === -1) {
                this.startX = mouseX;
                this.startY = mouseY;
            }
            
            push();
            stroke(colourP.selectedColour);
            if (this.fillShape) {
                fill(colourP.selectedColour);
            } else {
                noFill();
            }
            
            // Draw shape preview
            this.drawShape(this.startX, this.startY, mouseX, mouseY);
            pop();
        } else {
            this.startX = -1;
            this.startY = -1;
        }
    };

    this.drawShape = function(startX, startY, endX, endY) {
        let w = endX - startX;
        let h = endY - startY;
        
        switch(this.currentShape) {
            case "rectangle":
                rect(startX, startY, w, h);
                break;
            case "circle":
                let diameter = dist(startX, startY, endX, endY);
                circle(startX, startY, diameter);
                break;
            case "triangle":
                triangle(startX, startY,  // 1st point
                        startX + w, startY,  // 2nd point
                        startX + w/2, startY + h); // 3rd point
                break;
            case "ellipse":
                ellipse(startX + w/2, startY + h/2, Math.abs(w), Math.abs(h));
                break;
        }
    };

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
            loadPixels();
        }
    };

    this.populateOptions = function() {
        select(".options").html("");
        
        let container = createDiv();
        container.class('tool-options-container');
        container.parent(select(".options"));

        // Shape selector
        let shapeSelect = createSelect();
        shapeSelect.class('shape-select');
        shapeSelect.parent(container);
        
        // Update shape names with capitalization
        const shapes = ["Rectangle", "Circle", "Triangle", "Ellipse"];
        shapes.forEach(shape => shapeSelect.option(shape, shape.toLowerCase()));
        shapeSelect.selected(this.currentShape);
        shapeSelect.changed(() => this.currentShape = shapeSelect.value());

        // Fill toggle with updated styling
        let fillToggle = createCheckbox('Fill Shape', this.fillShape);
        fillToggle.class('tool-checkbox');
        fillToggle.parent(container);
        fillToggle.changed(() => this.fillShape = fillToggle.checked());
    };

    this.unselectTool = function() {
        select(".options").html("");
    };
}
