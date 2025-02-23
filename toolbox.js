//container object for storing the tools. Functions to add new tools and select a tool
function Toolbox() {

	var self = this;

	this.tools = [];
	this.selectedTool = null;

	var toolbarItemClick = function() {
		//remove any existing borders
		var items = selectAll(".sideBarItem");
		for (var i = 0; i < items.length; i++) {
			items[i].style('border', '0')
		}

		var toolName = this.id().split("sideBarItem")[0];
		self.selectTool(toolName);

		 // Add border to selected tool
        this.style('border', '2px solid blue');

		//call loadPixels to make sure most recent changes are saved to pixel array
		loadPixels();

	}

	//add a new tool icon to the html page
	var addToolIcon = function(icon, name) {
		console.log('Adding tool:', name);
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

	// Helper function to get tooltip text
	function getToolTipText(name) {
		switch(name.toLowerCase()) {
			case 'freehand': return 'Freehand Drawing';
			case 'lineto': return 'Line Tool';
			case 'spraycan': return 'Spray Paint';
			case 'mirrordraw': return 'Mirror Drawing';
			case 'stamp': return 'Stamp Tool';
			case 'shapes': return 'Shape Tool';
			case 'scissors': return 'Scissors Tool';
			default: return name;
		}
	}

	//adds a tool to the tools array
	this.addTool = function(tool) {
		if (!tool) {
			console.error('Null tool provided');
			return;
		}
		if (!tool.hasOwnProperty("icon") || !tool.hasOwnProperty("name")) {
			console.error("Tool missing name or icon:", tool);
			return;
		}
		this.tools.push(tool);
		addToolIcon(tool.icon, tool.name);
		if (this.selectedTool == null) {
			this.selectTool(tool.name);
		}
	};
	
	this.selectTool = function(toolName) {
		console.log("Selecting tool:", toolName);
		for (var i = 0; i < this.tools.length; i++) {
			if (this.tools[i].name == toolName) {
				// First unselects the current tool (if exists)
				if (this.selectedTool != null && this.selectedTool.hasOwnProperty("unselectTool")) {
					this.selectedTool.unselectTool();
					loadPixels(); // Make sure we save the clean state
				}
				
				// Then selects a new tool
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