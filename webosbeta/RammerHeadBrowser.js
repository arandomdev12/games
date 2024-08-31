// RammerheadBrowser.js

// Get the app container element
const appContainer = document.getElementById("rammerhead-browser-app");

// Initialize browser functionality
const browser = new RammerheadBrowser();
browser.init(appContainer);

// Handle user input (e.g., URL input)
const urlInput = appContainer.querySelector("input[type='url']");
urlInput.addEventListener("keypress", (e) => {
if (e.key === "Enter") {
browser.navigate(urlInput.value);
}
});

// Handle browser navigation
browser.on("navigate", (url) => {
// Update URL input field
urlInput.value = url;

// Load page content from server
fetch(url)
.then(response => response.text())
.then(html => {
const pageContent = appContainer.querySelector(".page-content");
pageContent.innerHTML = html;
});
});

// Handle page loading
browser.on("load", (page) => {
// Render page content
const pageContent = appContainer.querySelector(".page-content");
pageContent.innerHTML = page.content;
});

// Add bookmarks functionality
const bookmarksButton = appContainer.querySelector(".bookmarks-button");
bookmarksButton.addEventListener("click", () => {
// Toggle bookmarks panel
const bookmarksPanel = appContainer.querySelector(".bookmarks-panel");
bookmarksPanel.classList.toggle("visible");
});

// Add history functionality
const historyButton = appContainer.querySelector(".history-button");
historyButton.addEventListener("click", () => {
// Toggle history panel
const historyPanel = appContainer.querySelector(".history-panel");
historyPanel.classList.toggle("visible");
});