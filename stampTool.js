function StampTool() {
    this.name = "stampTool";
    this.icon = "assets/star.png";
    
    // Define star as a property of the tool
    this.star = null;
    
    // Load the image when the tool is created
    this.star = loadImage('./assets/star.png');
    
    // Create properties for the sliders
    this.starSizeSlider = null;
    this.nStarSlider = null;
    this.transparencySlider = null;
    
    this.populateOptions = function() {
        select(".options").html("");
        
        let container = createDiv();
        container.parent(select(".options"));
        
        // Emoji selector
        let dropdownDiv = createDiv('Choose emoji: ');
        dropdownDiv.parent(container);
        
        let dropdown = createSelect();
        dropdown.parent(dropdownDiv);
        
        // Simple emoji list
        let emojis = ['⭐', '🌟', '💫', '🎨', '🎭', '😀', '😂', '😍'];
        emojis.forEach(emoji => dropdown.option(emoji));
        
        // Set initial emoji
        dropdown.selected('⭐');
        
        // Handle emoji changes
        let self = this; // Store reference to tool
        dropdown.changed(function() {
            let selectedEmoji = this.value();
            self.star = createGraphics(50, 50);
            self.star.textSize(40);
            self.star.textAlign(CENTER, CENTER);
            self.star.text(selectedEmoji, 25, 25);
        });
        
        // Trigger initial emoji
        self.star = createGraphics(50, 50);
        self.star.textSize(40);
        self.star.textAlign(CENTER, CENTER);
        self.star.text('⭐', 25, 25);

        // Create sliders
        createP('Size:').parent(container);
        this.starSizeSlider = createSlider(5, 100, 50);
        this.starSizeSlider.parent(container);

        createP('Number:').parent(container);
        this.nStarSlider = createSlider(1, 10, 1);
        this.nStarSlider.parent(container);

        createP('Opacity:').parent(container);
        this.transparencySlider = createSlider(0, 255, 255);
        this.transparencySlider.parent(container);
    };
  
    this.draw = function() {
        if (mouseIsPressed && this.star) {
            if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
                let starSize = this.starSizeSlider.value();
                let nStars = this.nStarSlider.value();
                let transparency = this.transparencySlider.value();
  
                // Set the transparency
                tint(255, transparency);
  
                for (let i = 0; i < nStars; i++) {
                    let starX = mouseX - starSize/2 + random(-10, 10);
                    let starY = mouseY - starSize/2 + random(-10, 10);
                    image(this.star, starX, starY, starSize, starSize);
                }
  
                // Reset the tint
                noTint();
            }
        }
    };
  }