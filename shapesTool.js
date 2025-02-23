// Tools for drawing and editing custom shapes
function ShapesTool() {
    // Tool identification and state
    this.name = "shapes";
    this.icon = "assets/shapes.png"; // Icon for the tool
    this.editMode = false;
    this.currentShape = [];

    // The main drawing and shape manipulation function
    this.draw = function() {
        // Prevents drawing outside the canvas.
        if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) {
            return;
        }

        updatePixels(); // Restores the previous state
        
        // Renders the current shape and edit points
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
        
        // Handles point addition and editing
        if (mouseIsPressed) {
            if (!this.editMode) {
                this.currentShape.push({ x: mouseX, y: mouseY });
            } else {
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

    // Setup shape tool interface controls
    this.populateOptions = function() {
        select(".options").html("");

        let buttonContainer = createDiv();
        buttonContainer.class('tool-button-container');
        buttonContainer.parent(select(".options"));

        let editButton = createButton('Toggle Edit Mode');
        editButton.class('tool-button');
        editButton.parent(buttonContainer);
        editButton.mouseClicked(() => {
            this.editMode = !this.editMode;
        });

        let clearButton = createButton('Clear Shape');
        clearButton.class('tool-button');
        clearButton.parent(buttonContainer);
        clearButton.mouseClicked(() => {
            this.currentShape = [];
            clear();
            background(255);
        });
    };

    // Cleanup when tool is deselected
    this.unselectTool = function() {
        this.currentShape = [];
        loadPixels();
    };
}
