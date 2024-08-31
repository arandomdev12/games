document.addEventListener("DOMContentLoaded", function() {
    const xtraPerformanceModeCheckbox = document.getElementById("xtra-performance-mode");
    const swapSizeInput = document.getElementById("swap-size");
    
    xtraPerformanceModeCheckbox.addEventListener("change", function() {
    if (xtraPerformanceModeCheckbox.checked) {
    // Create swap file with custom size
    browserOSFileSystem.chrome.browserOSFileSystem({
    type: 'saveFile',
    accepts: ['application/octet-stream']
    }, (entry) => {
    createSwapFile(entry, swapSizeInput.value);
    });
    
    // Delete browsing history and site data
    deleteBrowsingHistory();
    
    // Create backup file
    createBackupFile();
    } else {
    // Disable Xtra Performance Mode
    deleteSwapFile();
    }
    });
    
    function createSwapFile(entry, size) {
    browserOSFileSystem.getWritableEntry(entry, (writableEntry) => {
    writableEntry.createWriter((writer) => {
    writer.seek(0);
    writer.write(new Blob([new Uint8Array(size * 1024 * 1024)]), () => {
    console.log(`Created swap file with size ${size}MB`);
    });
    });
    });
    
    function deleteBrowsingHistory() {
    browserOSBrowsingData.remove({
    "since": 0
    }, {
    "appcache": true,
    "cache": true,
    "cookies": true,
    "downloads": true,
    "formData": true,
    "history": true,
    "indexedDB": true,
    "localStorage": true,
    "pluginData": true,
    "passwords": true,
    "serviceWorkers": true
    });
    console.log('Deleted browsing history and site data');
    }
    
    function createBackupFile() {
    browserOSFileSystem.chooseEntry({
    type: 'saveFile',
    accepts: ['application/octet-stream']
    }, (entry) => {
    browserOSFileSystem.getWritableEntry(entry, (writableEntry) => {
    writableEntry.createWriter((writer) => {
    writer.seek(0);
    writer.write(new Blob([new Uint8Array(1024 * 1024)]), () => {
    console.log('Created backup file');
    });
    });
    });
    }
    
    function deleteSwapFile() {
    // Add code to delete the swap
    }