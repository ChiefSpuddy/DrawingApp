// A tool for drawing straight lines to the screen

function LineToTool(){
	this.icon = "assets/lineTo.jpg"; // Icon for the line tool
	this.name = "LineTo";

	var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;

	// Draws the line to the screen 
	this.draw = function(){

		// Only draw when mouse is clicked
		if(mouseIsPressed){
			// If it's the start of drawing a new line
			if(startMouseX == -1){
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				//save the current pixel Array
				loadPixels();
			}

			else{
				// Update the screen with the saved pixels to hide any previous
				// Line between mouse pressed and released
				updatePixels();
				// Draw the line
				line(startMouseX, startMouseY, mouseX, mouseY);
			}

		}

		else if(drawing){
			// Saves the pixels with the most recent line and reset the
			// Drawing bool, and start locations!
			loadPixels();
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};


}
