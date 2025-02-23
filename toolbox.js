// Manages drawing tools and tool selection
function Toolbox() {
    // Store available tools and currently selected tool
    this.tools = [];
    this.selectedTool = null;

    // Handle tool selection in sidebar
    var toolbarItemClick = function() {
        //remove any existing borders
        var items = selectAll(".sideBarItem");
        for (var i = 0; i < items.length; i++) {
            items[i].style('border', '0')
        }

        var toolName = this.id().split("sideBarItem")[0];
        this.style('border', '2px solid blue');
        
        // Use this instead of self since it's only used once
        toolbox.selectTool(toolName);
        loadPixels();
    }

    // Create visual representation of tool in sidebar
    var addToolIcon = function(icon, name) {
        var sideBarItem = createDiv();
        sideBarItem.class('sideBarItem');
        sideBarItem.id(name + "sideBarItem");
        
        // Create image
        var img = createImg(icon);
        sideBarItem.child(img);
        
        // Create tooltip
        var tooltip = createDiv(name);
        tooltip.class('tooltiptext');
        sideBarItem.child(tooltip);
        
        sideBarItem.parent('sidebar');
        sideBarItem.mouseClicked(toolbarItemClick);
    };

    // Add new tool to available tools
    this.addTool = function(tool) {
        if (!tool) {
            return;
        }
        if (!tool.hasOwnProperty("icon") || !tool.hasOwnProperty("name")) {
            return;
        }
        this.tools.push(tool);
        addToolIcon(tool.icon, tool.name);
        //if no tool is selected (ie. none have been added so far)
        //make this tool the selected one.
        if (this.selectedTool == null) {
            this.selectTool(tool.name);
        }
    };
    
    // Switch active tool and setup its options
    this.selectTool = function(toolName) {
        for (var i = 0; i < this.tools.length; i++) {
            if (this.tools[i].name == toolName) {
                // First unselect current tool (if exists)
                if (this.selectedTool != null && this.selectedTool.hasOwnProperty("unselectTool")) {
                    this.selectedTool.unselectTool();
                    loadPixels(); // Make sure we save the clean state
                }
                
                // Then select new tool
                this.selectedTool = this.tools[i];
                select("#" + toolName + "sideBarItem").style("border", "2px solid blue");
                
                // Setup new tool options
                if (this.selectedTool.hasOwnProperty("populateOptions")) {
                    this.selectedTool.populateOptions();
                }
            }
        }
    };
}