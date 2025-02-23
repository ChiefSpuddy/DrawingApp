function ShapesTool() {
    this.name = "shapes";
    this.icon = "assets/shapes.png";
    this.editMode = false;
    this.currentShape = [];

    // Function to calculate the opposite point based on the axis
    this.draw = function() {
        // Remove clear() and background() calls
        if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) {
            return;
        }

        updatePixels(); // Restore previous state
        
        // Draw current shape
        if (this.currentShape.length > 0) {
            push();
            strokeWeight(2);
            stroke(0);
            noFill();
            
            beginShape();
            for (let i = 0; i < this.currentShape.length; i++) {
                vertex(this.currentShape[i].x, this.currentShape[i].y);
            }
            endShape();

            if (this.editMode) {
                for (let i = 0; i < this.currentShape.length; i++) {
                    fill('red');
                    ellipse(this.currentShape[i].x, this.currentShape[i].y, 10);
                }
            }
            pop();
        }
        
        // Rest of the draw function...
        //Wrote by Sam May
        // Draw the options panel
        if (mouseIsPressed) {
            if (!this.editMode) {
                this.currentShape.push({ x: mouseX, y: mouseY });
            } else {
                // Improved multi-point editing
                let pointMoved = false;
                for (let i = this.currentShape.length - 1; i >= 0; i--) {
                    if (!pointMoved && dist(this.currentShape[i].x, this.currentShape[i].y, mouseX, mouseY) < 20) {
                        this.currentShape[i].x = mouseX;
                        this.currentShape[i].y = mouseY;
                        pointMoved = true;
                    }
                }
            }
        }
    };

    // Function to populate the options panel
    this.populateOptions = function() {
        select(".options").html("");

        //Button container
        let buttonContainer = createDiv('');
        buttonContainer.parent(select(".options"));
        buttonContainer.style('display', 'flex');
        buttonContainer.style('gap', '10px');

        //Button for toggling edit mode
        let editButton = createButton('Toggle Edit Mode');
        editButton.parent(buttonContainer);
        editButton.mouseClicked(() => {
            this.editMode = !this.editMode;
        });

        //Button for clearing the shape
        let clearButton = createButton('Clear Shape');
        clearButton.parent(buttonContainer);
        clearButton.mouseClicked(() => {
            this.currentShape = [];
            clear();
            background(255);
        });
    };

    this.unselectTool = function() {
        this.currentShape = [];
        // Remove clear() and background() calls
        loadPixels();
    };
}
