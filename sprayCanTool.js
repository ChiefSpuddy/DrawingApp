function SprayCanTool() {
    // Tool properties
    this.name = "sprayCanTool";
    this.icon = "assets/sprayCan.jpg";

    // Spray settings with defaults
    this.points = 13;      // Number of points per spray event
    this.spread = 10;      //Spray radius from mouse
    this.pointSize = 1;    // Size of each point in the spray
    this.density = 50;     // Spray density ( the delay between sprays) 
    this.lastSpray = 0;    // Timestamp of last spray event

    this.draw = function() {
        if (mouseIsPressed && millis() - this.lastSpray > (100 - this.density)) {
            push();
            strokeWeight(this.pointSize);
            
            // Create spray effect
            for (var i = 0; i < this.points; i++) {
                point(
                    random(mouseX - this.spread, mouseX + this.spread),
                    random(mouseY - this.spread, mouseY + this.spread)
                );
            }
            pop();
            
            this.lastSpray = millis();
        }
    };

    // Adds the control panel for the spray can tool
    this.populateOptions = function() {
        select(".options").html("");
        
        let container = createDiv();
        container.class('tool-options-container');
        container.parent(select(".options"));

        // Spread control 
        let spreadGroup = createDiv();
        spreadGroup.class('tool-slider-group');
    spreadGroup.parent(container);
        createP('Spray Spread').parent(spreadGroup);
        let spreadSlider = createSlider(5, 50, this.spread);
        spreadSlider.class('tool-slider');
        spreadSlider.parent(spreadGroup);
        spreadSlider.input(() => this.spread = spreadSlider.value());

        // Density control
        let densityGroup = createDiv();
        densityGroup.class('tool-slider-group');
        densityGroup.parent(container);
        createP('Spray Density').parent(densityGroup);
        let densitySlider = createSlider(1, 100, this.density);
        densitySlider.class('tool-slider');
        densitySlider.parent(densityGroup);
        densitySlider.input(() => this.density = densitySlider.value());

        // Point size control 
        let sizeGroup = createDiv();
        sizeGroup.class('tool-slider-group');
        sizeGroup.parent(container);
        createP('Point Size').parent(sizeGroup);
        let sizeSlider = createSlider(1, 5, this.pointSize);
        sizeSlider.class('tool-slider');
        sizeSlider.parent(sizeGroup);
        sizeSlider.input(() => this.pointSize = sizeSlider.value());
    };

    // Performs Cleanup when tool is deselecteds
    this.unselectTool = function() {
        select(".options").html("");
    };
}