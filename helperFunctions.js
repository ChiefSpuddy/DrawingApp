// Utility functions for common operations
function HelperFunctions() {
    // Clear canvas handler
    select("#clearButton").mouseClicked(function() {
        background(255, 255, 255);
        loadPixels();
    });

    // Save canvas handler
    select("#saveImageButton").mouseClicked(function() {
        saveCanvas("myPicture", "jpg");
    });
}