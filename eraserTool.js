function EraserTool() {
    this.name = "eraser";
    this.icon = "assets/erase.png";
    
    this.eraserSize = 20;
    this.previousMouseX = -1;
    this.previousMouseY = -1;

    this.draw = function() {
        // Save the current pixel state
        updatePixels();
        
        if (mouseIsPressed) {
            // When mouse is pressed, draw white line between previous and current points
            if (this.previousMouseX > 0 && this.previousMouseY > 0) {
                push();
                stroke(255);
                strokeWeight(this.eraserSize);
                strokeCap(PROJECT);
                line(this.previousMouseX, this.previousMouseY, mouseX, mouseY);
                pop();
                // Save the erased state
                loadPixels();
            }
            
            // Update previous position
            this.previousMouseX = mouseX;
            this.previousMouseY = mouseY;
        } else {
            // Reset previous position when mouse is released
            this.previousMouseX = -1;
            this.previousMouseY = -1;
            
            // Only draw preview circle when not erasing
            push();
            stroke(100);
            strokeWeight(1);
            noFill();
            ellipse(mouseX, mouseY, this.eraserSize, this.eraserSize);
            pop();
        }
    };

    this.populateOptions = function() {
        select(".options").html("");
        
        let sizeLabel = createP('Eraser Size');
        sizeLabel.parent(select(".options"));
        
        let sizeSlider = createSlider(5, 100, 20);
        sizeSlider.parent(select(".options"));
        sizeSlider.class('tool-slider');
        
        let self = this;
        sizeSlider.input(function() {
            self.eraserSize = this.value();
        });
    };

    this.unselectTool = function() {
        select(".options").html("");
    };
}
