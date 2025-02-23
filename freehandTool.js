function FreehandTool() {
    this.name = "freehand";
    this.icon = "assets/freehand.jpg";
    
    this.lineThickness = 1;
    this.lineOpacity = 255; // Add opacity property (0-255)
    
    this.draw = function() {
        if(mouseIsPressed) {
            let currentColor = color(colourP.selectedColour);
            currentColor.setAlpha(this.lineOpacity); // Set transparency
            stroke(currentColor);
            strokeWeight(this.lineThickness);
            line(pmouseX, pmouseY, mouseX, mouseY);
        }
    };

    this.populateOptions = function() {
        select(".options").html("");
        
        // Creates a container for all of the controls
        let container = createDiv();
        container.class('tool-options-container');
        container.parent(select(".options"));
        
        // Line thickness controls
        let sizeGroup = createDiv();
        sizeGroup.class('tool-slider-group');
        sizeGroup.parent(container);
        
        createP('Line Thickness').parent(sizeGroup);
        let thicknessSlider = createSlider(1, 50, this.lineThickness);
        thicknessSlider.class('tool-slider');
        thicknessSlider.parent(sizeGroup);
        thicknessSlider.input(() => this.lineThickness = thicknessSlider.value());
        
        // Line opacity controls
        let opacityGroup = createDiv();
        opacityGroup.class('tool-slider-group');
        opacityGroup.parent(container);
        
        createP('Opacity').parent(opacityGroup);
        let opacitySlider = createSlider(0, 255, this.lineOpacity);
        opacitySlider.class('tool-slider');
        opacitySlider.parent(opacityGroup);
        opacitySlider.input(() => this.lineOpacity = opacitySlider.value());
    };

    this.unselectTool = function() {
        strokeWeight(1);
        stroke(0, 0, 0, 255); // Reset to be completely opaque!
        select(".options").html("");
    };
}