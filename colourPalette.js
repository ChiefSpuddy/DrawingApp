function ColourPalette() {
    this.selectedColour = "#000000";
    var self = this;

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
        
        picker.input(function() {
            self.selectedColour = this.value();
            fill(self.selectedColour);
            stroke(self.selectedColour);
        });

        fill(this.selectedColour);
        stroke(this.selectedColour);
    };

    this.loadColours();
}