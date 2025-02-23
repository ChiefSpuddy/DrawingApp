function StampTool() {
    // Tool identification
    this.name = "stampTool";
    this.icon = "assets/star.png";
    
    // Store current stamp image and settings
    this.star = null;
    this.starSizeSlider = null;
    this.nStarSlider = null;
    this.transparencySlider = null;
    
    // Control rapid stamping
    this.lastStampTime = 0;
    const STAMP_DELAY = 150;
    
    // Create tool interface
    this.populateOptions = function() {
        select(".options").html("");
        
        let container = createDiv();
        container.class('stamp-container');
        container.parent(select(".options"));
        
        // Emoji selector in its own container
        let dropdownDiv = createDiv();
        dropdownDiv.class('emoji-select-container');
        dropdownDiv.parent(container);
        
        let dropdown = createSelect();
        dropdown.class('emoji-select');
        dropdown.parent(dropdownDiv);
        
        // Organized emoji list
        const emojiCategories = {
            "Galaxy": ['⭐', '🌟', '💫', '✨', '🌍', '🌎', '🌏', '🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘', '🪐', '☄️'],
            "Nature": ['🌸', '🌺', '🍀', '🌿', '🌳', '🦋', '🐝'],
            "Weather": ['☀️', '🌙', '⛈️', '🌈', '❄️', '⚡'],
            "Hearts": ['❤️', '💖', '💙', '💚', '💛', '💜'],
            "Faces": ['😊', '😄', '🥰', '😎', '🤩', '😺'],
            "Symbols": ['💫', '💥', '💢', '💨', '🎵', '🎶'],
            "Objects": ['🎨', '🖌️', '✏️', '📝', '🎭', '🎪']
        };

        // Create optgroups for each category
        for (let category in emojiCategories) {
            let group = createElement('optgroup');
            group.attribute('label', category);
            group.parent(dropdown);
            
            emojiCategories[category].forEach(emoji => {
                let option = createElement('option');
                option.value(emoji);
                option.html(emoji);
                option.parent(group);
            });
        }
        
        dropdown.selected('⭐');
        
        // Handle emoji changes
        let self = this;
        dropdown.changed(function() {
            let selectedEmoji = this.value();
            self.star = createGraphics(50, 50);
            self.star.textSize(40);
            self.star.textAlign(CENTER, CENTER);
            self.star.text(selectedEmoji, 25, 25);
        });
        
        // Initial emoji setup
        self.star = createGraphics(50, 50);
        self.star.textSize(40);
        self.star.textAlign(CENTER, CENTER);
        self.star.text('⭐', 25, 25);

        // Create container for sliders
        let controlsContainer = createDiv();
        controlsContainer.class('stamp-controls');
        controlsContainer.parent(container);

        // Create slider groups
        let sizeGroup = createDiv();
        sizeGroup.class('stamp-slider-group');
        createP('Size').parent(sizeGroup);
        this.starSizeSlider = createSlider(5, 100, 50);
        this.starSizeSlider.class('stamp-slider');
        this.starSizeSlider.parent(sizeGroup);
        sizeGroup.parent(controlsContainer);

        let numberGroup = createDiv();
        numberGroup.class('stamp-slider-group');
        createP('Count').parent(numberGroup);
        this.nStarSlider = createSlider(1, 10, 1);
        this.nStarSlider.class('stamp-slider');
        this.nStarSlider.parent(numberGroup);
        numberGroup.parent(controlsContainer);

        let opacityGroup = createDiv();
        opacityGroup.class('stamp-slider-group');
        createP('Transparency').parent(opacityGroup);
        this.transparencySlider = createSlider(0, 255, 255);
        this.transparencySlider.class('stamp-slider');
        this.transparencySlider.parent(opacityGroup);
        opacityGroup.parent(controlsContainer);
    };
  
    // Handle stamping on canvas
    this.draw = function() {
        if (mouseIsPressed && this.star) {
            if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
                let currentTime = millis();
                let nStars = this.nStarSlider.value();
                
                // Only draw if enough time has passed or if multiple stamps are allowed
                if (currentTime - this.lastStampTime >= STAMP_DELAY || nStars > 1) {
                    let starSize = this.starSizeSlider.value();
                    let transparency = this.transparencySlider.value();
                    
                    tint(255, transparency);
                    
                    for (let i = 0; i < nStars; i++) {
                        let starX = mouseX - starSize/2 + random(-10, 10);
                        let starY = mouseY - starSize/2 + random(-10, 10);
                        image(this.star, starX, starY, starSize, starSize);
                    }
                    
                    noTint();
                    this.lastStampTime = currentTime;
                }
            }
        }
    };
}