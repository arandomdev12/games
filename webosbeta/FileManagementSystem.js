fileList.innerHTML = "";
directory.files.forEach((file) => {
const fileElement = document.createElement("div");
fileElement.textContent = file.name;
fileList.appendChild(fileElement);
});
});

// Handle file operations (e.g., create, delete, rename)
appContainer.addEventListener("click", (e) => {
if (e.target.classList.contains("