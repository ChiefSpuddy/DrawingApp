// Tool for drawing with mirror symmetry effect
function mirrorDrawTool() {
    // Tool identification
    this.name = "mirrorDraw";
    this.icon = "assets/mirrorDraw.jpg";

    // Mirror configuration
    this.axis = "x";  // Current mirror axis
    this.lineOfSymmetry = width / 2;  // position of mirror line

    var self = this;

    // Track previous drawing points
    var previousMouseX = -1;
    var previousMouseY = -1;
    var previousOppositeMouseX = -1;
    var previousOppositeMouseY = -1;

    //draw mirrored lines
    this.draw = function() {
        //display the last save state of pixels
        updatePixels();

        //do the drawing if the mouse is pressed
        if (mouseIsPressed) {
            //if the previous values are -1 set them to the current mouse location
            //and mirrored positions
            if (previousMouseX == -1) {
                previousMouseX = mouseX;
                previousMouseY = mouseY;
                previousOppositeMouseX = this.calculateOpposite(mouseX, "x");
                previousOppositeMouseY = this.calculateOpposite(mouseY, "y");
            }
            //if there are values in the previous locations
            //draw a line between them and the current positions
            else {
                line(previousMouseX, previousMouseY, mouseX, mouseY);
                previousMouseX = mouseX;
                previousMouseY = mouseY;

                //these are for the mirrored drawing the other side of the
                //line of symmetry
                var oX = this.calculateOpposite(mouseX, "x");
                var oY = this.calculateOpposite(mouseY, "y");
                line(previousOppositeMouseX, previousOppositeMouseY, oX, oY);
                previousOppositeMouseX = oX;
                previousOppositeMouseY = oY;
            }
        }
        //if the mouse isn't pressed reset the previous values to -1
        else {
            previousMouseX = -1;
            previousMouseY = -1;
            previousOppositeMouseX = -1;
            previousOppositeMouseY = -1;
        }

        //after the drawing is done save the pixel state. We don't want the
        //line of symmetry to be part of our drawing
        loadPixels();

        //push the drawing state so that we can set the stroke weight and colour
        push();
        strokeWeight(3);
        stroke("red");
        //draw the line of symmetry
        if (this.axis == "x") {
            line(width / 2, 0, width / 2, height);
        } else {
            line(0, height / 2, width, height / 2);
        }
        //return to the original stroke
        pop();
    };

    //Calculate mirrored point position
    this.calculateOpposite = function(n, a) {
        if (a != this.axis) {
            return n;
        }

        // if n is less than the line of symmetry return a coordinate
        // that is far greater than the line of symmetry by the distance from
        // n to that line.
        if (n < this.lineOfSymmetry) {
            return this.lineOfSymmetry + (this.lineOfSymmetry - n);
        }

        // otherwise a coordinate that is smaller than the line of symmetry
        // by the distance between it and n.
        else {
            return this.lineOfSymmetry - (n - this.lineOfSymmetry);
        }
    };

    // Cleanup when tool is deselected
    this.unselectTool = function() {
        updatePixels();
        // Clear options
        select(".options").html("");
    };

    // Creates the mirror tool interface
    this.populateOptions = function() {
        let buttonContainer = createDiv();
        buttonContainer.class('tool-button-container');
        buttonContainer.parent(select(".options"));
        
        let directionButton = createButton('Make Horizontal');
        directionButton.class('tool-button');
        directionButton.id('directionButton');
        directionButton.parent(buttonContainer);
        
        directionButton.mouseClicked(function() {
            if (self.axis == "x") {
                self.axis = "y";
                self.lineOfSymmetry = height / 2;
                this.html('Make Vertical');
            } else {
                self.axis = "x";
                self.lineOfSymmetry = width / 2;
                this.html('Make Horizontal');
            }
        });
    };
}