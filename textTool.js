function TextTool() {
    this.name = "text";
    this.icon = "assets/text.png"; // Icon for the tool 
    
    this.fontSize = 20;
    this.currentFont = 'Arial';
    this.textContent = 'Click to type';
    this.alignment = 'left';
    
    //List of fonts to choose from
    this.fonts = [
        'Arial',
        'Times New Roman',
        'Courier New',
        'Georgia',
        'Verdana',
        'Helvetica'
    ];

    this.draw = function() {
        updatePixels();
        
        // Show text preview at cursor position
        if (!mouseIsPressed) {
            push();
            textSize(this.fontSize);
            textFont(this.currentFont);
            textAlign(this.alignment === 'left' ? LEFT : 
                     this.alignment === 'center' ? CENTER : RIGHT);
            
            // Show semi-transparent preview text
            let c = color(colourP.selectedColour);
            c.setAlpha(127);
            fill(c);
            noStroke();
            text(this.textContent, mouseX, mouseY);
            pop();
        }
    };

    this.mousePressed = function() {
        // Places the text permanently on the canvas
        push();
        textSize(this.fontSize);
        textFont(this.currentFont);
        textAlign(this.alignment === 'left' ? LEFT : 
                 this.alignment === 'center' ? CENTER : RIGHT);
        
        fill(colourP.selectedColour);
        noStroke();
        text(this.textContent, mouseX, mouseY);
        pop();
        
        // Saves the canvas state with the new text
        loadPixels();
    };

    this.populateOptions = function() {
        select(".options").html("");
        
        let container = createDiv();
        container.class('tool-options-container');
        container.parent(select(".options"));

        // Text input
        let textInput = createInput(this.textContent);
        textInput.class('text-input');
        textInput.parent(container);
        textInput.input(() => this.textContent = textInput.value());

        // Font selection dropdown
        let fontSelect = createSelect();
        fontSelect.class('font-select');
        fontSelect.parent(container);
        this.fonts.forEach(font => fontSelect.option(font));
        fontSelect.selected(this.currentFont);
        fontSelect.changed(() => this.currentFont = fontSelect.value());

        // Font size control slider
        let sizeGroup = createDiv();
        sizeGroup.class('tool-slider-group');
        sizeGroup.parent(container);
        
        createP('Font Size').parent(sizeGroup);
        let sizeSlider = createSlider(8, 72, this.fontSize);
        sizeSlider.class('tool-slider');
        sizeSlider.parent(sizeGroup);
        sizeSlider.input(() => this.fontSize = sizeSlider.value());

        // Alignment buttons 
        let alignGroup = createDiv();
        alignGroup.class('text-align-group');
        alignGroup.parent(container);

        let alignments = ['left', 'center', 'right'];
        alignments.forEach(align => {
            let btn = createButton(align);
            btn.class('text-align-button');
            if(align === this.alignment) btn.class('active');
            btn.parent(alignGroup);
            btn.mousePressed(() => {
                this.alignment = align;
                selectAll('.text-align-button').forEach(b => b.removeClass('active'));
                btn.class('text-align-button active');
            });
        });
    };

    this.unselectTool = function() {
        select(".options").html("");
    };
}
