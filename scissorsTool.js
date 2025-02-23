function ScissorsTool() {
    this.name = "scissors";
    this.icon = "assets/scissors.png";
    
    this.selectMode = 0;
    this.selectedArea = {x: 0, y:0, w: 0, h: 0};
    this.selectedPixels = null;

    this.draw = function() {
        if(this.selectMode === 1) {
            // Draw selection rectangle on top without affecting pixels
            push();
            updatePixels(); // Restore background
            stroke(0);
            strokeWeight(1);
            setLineDash([5, 5]);
            noFill();
            rect(this.selectedArea.x, this.selectedArea.y, 
                 this.selectedArea.w, this.selectedArea.h);
            pop();
        } else if(this.selectMode === 2 && this.selectedPixels) {
            updatePixels(); // Restore background
            // Only show content preview
            push();
            tint(255, 180);
            image(this.selectedPixels, mouseX, mouseY);
            pop();
        }
    };

    // Helper function for dashed lines
    function setLineDash(list) {
        drawingContext.setLineDash(list);
    }

    this.mousePressed = function() {
        if(this.selectMode === 1 && !this.selectedArea.isDrawn) {
            loadPixels();
            this.selectedArea.x = mouseX;
            this.selectedArea.y = mouseY;
            this.selectedArea.w = 0;
            this.selectedArea.h = 0;
            this.selectedArea.isDrawn = false;
        } else if(this.selectMode === 2 && this.selectedPixels) {
            push();
            tint(255, 255); // Full opacity for final paste
            image(this.selectedPixels, mouseX, mouseY);
            pop();
            loadPixels();
            setLineDash([]); // Reset line dash to prevent artifacts
        }
    };

    this.mouseDragged = function() {
        if(this.selectMode === 1 && !this.selectedArea.isDrawn) {
            this.selectedArea.w = mouseX - this.selectedArea.x;
            this.selectedArea.h = mouseY - this.selectedArea.y;
        }
    };

    this.mouseReleased = function() {
        if(this.selectMode === 1 && !this.selectedArea.isDrawn) {
            // Normalize selection coordinates
            let x = this.selectedArea.x;
            let y = this.selectedArea.y;
            let w = this.selectedArea.w;
            let h = this.selectedArea.h;
            
            if(w < 0) {
                x += w;
                w = Math.abs(w);
            }
            if(h < 0) {
                y += h;
                h = Math.abs(h);
            }
            
            // Update selectedArea with normalized coordinates
            this.selectedArea.x = x;
            this.selectedArea.y = y;
            this.selectedArea.w = w;
            this.selectedArea.h = h;
            this.selectedArea.isDrawn = true;  // Mark the selection as complete
        }
    };

    this.populateOptions = function() {
        // Clear existing options
        var optionsDiv = document.querySelector(".options");
        if (!optionsDiv) return;
        optionsDiv.innerHTML = "";
        
        // Create button using DOM directly first
        var button = document.createElement('button');
        button.innerHTML = 'select area';
        button.style.padding = '5px';
        button.style.margin = '5px';
        button.style.fontSize = '12px';
        button.style.backgroundColor = '#fff';
        button.style.border = '1px solid #000';
        button.style.cursor = 'pointer';
        optionsDiv.appendChild(button);
        
        var self = this;
        button.addEventListener('click', function() {
            if(self.selectMode === 0) {
                self.selectMode = 1;
                self.selectedArea = {
                    x: 0, 
                    y: 0, 
                    w: 0, 
                    h: 0, 
                    isDrawn: false
                };
                button.innerHTML = "Cut";
                loadPixels();
            }
            else if(self.selectMode === 1 && self.selectedArea.isDrawn) {
                let x = self.selectedArea.x;
                let y = self.selectedArea.y;
                let w = self.selectedArea.w;
                let h = self.selectedArea.h;

                updatePixels(); // Restore clean background without selection rectangle
                // Capture the selected area
                self.selectedPixels = get(x, y, w, h);
                
                // Clear the selected area
                push();
                fill(255);
                noStroke();
                rect(x, y, w, h);
                pop();
                
                loadPixels(); // Save the state with cleared area
                self.selectMode = 2;
                button.innerHTML = "End Paste";
            }
            else if(self.selectMode === 2) {
                self.selectMode = 0;
                self.selectedArea = {
                    x: 0, 
                    y: 0, 
                    w: 0, 
                    h: 0, 
                    isDrawn: false
                };
                button.innerHTML = "select area";
                self.selectedPixels = null;
                loadPixels();
            }
        });
    };

    this.unselectTool = function() {
        select(".options").html("");
        this.selectMode = 0;
        this.selectedPixels = null;
    };
}