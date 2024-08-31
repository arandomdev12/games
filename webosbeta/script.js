document.addEventListener('DOMContentLoaded', () => {
    const bootScreenContainer = document.getElementById('boot-screen-container');
    const loginScreenContainer = document.getElementById('login-screen-container');
    const desktop = document.getElementById('desktop');

    // Simulate boot process with a delay
    setTimeout(() => {
        bootScreenContainer.style.display = 'none';
        loginScreenContainer.style.display = 'block';
    }, 3000); // 3 seconds for boot simulation

    // Handle login process
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        loginScreenContainer.style.display = 'none';
        desktop.style.display = 'block';
        taskbar = new Taskbar(); // Initialize taskbar
    });

    // Initialize taskbar in login process
    let taskbar;
});

function createAppWindow(appName, content) {
    const template = document.getElementById('app-window-template');
    const clone = template.content.cloneNode(true);
    const appWindow = clone.querySelector('.app-window');
    const title = clone.querySelector('.app-window-title');
    const windowContent = clone.querySelector('.app-window-content');

    title.textContent = appName;
    windowContent.innerHTML = content;

    document.getElementById('app-windows-container').appendChild(clone);

    const closeButton = appWindow.querySelector('.app-window-close');
    closeButton.addEventListener('click', () => closeWindow(appWindow, appName));

    taskbar.addRunningApp({ id: appName, icon: `fa-${appName}`, name: appName });
}

function closeWindow(appWindow, appName) {
    appWindow.remove();
    taskbar.closeApp({ id: appName });
}
