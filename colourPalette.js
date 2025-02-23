// Manages color selection for drawing tools
function ColourPalette() {
    // Store current color
    this.selectedColour = "#000000";
    
    // Create color picker interface
    this.loadColours = function() {
        var palette = select('.colourPalette');
        
        // Add label
        createDiv('Current Color')
            .class('colourPicker-label')
            .parent(palette);
        
        // Create wrapper for picker and tooltip
        var wrapper = createDiv()
            .class('colourPicker-wrapper')
            .parent(palette);
        
        // Create color picker
        var picker = createColorPicker('#000000');
        picker.parent(wrapper);
        picker.class('colourPicker');
        
        // Add tooltip
        createDiv('Click to change color')
            .class('colourPicker-tooltip')
            .parent(wrapper);
        
        picker.input(() => {
            this.selectedColour = picker.value();
            fill(this.selectedColour);
            stroke(this.selectedColour);
        });

        fill(this.selectedColour);
        stroke(this.selectedColour);
    };

    // Initialize on creation
    this.loadColours();
}