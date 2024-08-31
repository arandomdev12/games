// XboxCloudGaming.js

// Get the app container element
const appContainer = document.getElementById("xbox-cloud-gaming-app");

// Initialize Xbox Cloud Gaming functionality
const xboxCloudGaming = new XboxCloudGaming();
xboxCloudGaming.init(appContainer);

// Create iframe to embed Xbox Cloud Gaming site
const iframe = document.createElement("iframe");
iframe.src = "https://www.xbox.com/cloud-gaming";
iframe.frameBorder = "0";
iframe.width = "100%";
iframe.height = "100%";
appContainer.appendChild(iframe);

// Add Hardware PowerBoost+ feature
const hardwarePowerBoostPlusButton = appContainer.querySelector(".hardware-power-boost-plus-button");
hardwarePowerBoostPlusButton.addEventListener("click", () => {
xboxCloudGaming.initHardwarePowerBoostPlus();
});

// Initialize Hardware PowerBoost+ feature
xboxCloudGaming.initHardwarePowerBoostPlus = () => {
// Connect to closest proxy server
const proxyServer = getClosestProxyServer();
const xhr = new XMLHttpRequest();
xhr.open("GET", `https://${proxyServer}/hw_power_boost_plus`, true);
xhr.onload = () => {
if (xhr.status === 200) {
const response = JSON.parse(xhr.responseText);
const swapFileUrl = response.swap_file_url;
const accelerationEnabled = response.acceleration_enabled;

// Create swap file and tweak performance values
createSwapFile(swapFileUrl, accelerationEnabled);
}
};
xhr.send();

// Run 3D hardware acceleration in background
run3DAccelerationInBackground();

// Set up options for Hardware PowerBoost+
const optionsForm = appContainer.querySelector(".hardware-power-boost-plus-options-form");
optionsForm.addEventListener("submit", (e) => {
e.preventDefault();
const keepEnabledWhileOutOfApp = optionsForm.querySelector("input[name='keep-enabled-while-out-of-app']").checked;
const initializeOnAppLaunch = optionsForm.querySelector("input[name='initialize-on-app-launch']").checked;

// Save options to local storage
localStorage.setItem("hw_power_boost_plus_options", JSON.stringify({
keepEnabledWhileOutOfApp,
initializeOnAppLaunch
}));
});
};

// Create swap file and tweak performance values