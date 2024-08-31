class Taskbar {
    constructor() {
        this.shelf = document.getElementById('shelf');
        this.appLauncher = document.getElementById('app-launcher');
        this.pinnedApps = document.getElementById('pinned-apps');
        this.runningApps = document.getElementById('running-apps');
        this.systemTray = document.getElementById('system-tray');
        this.clock = document.getElementById('clock');
        this.appGrid = document.getElementById('app-grid');

        this.pinnedAppsList = [];
        this.runningAppsList = [];

        this.init();
    }

    init() {
        this.setupAppLauncher();
        this.setupClock();
        this.loadPinnedApps();
    }

    setupAppLauncher() {
        this.appLauncher.addEventListener('click', () => {
            this.toggleAppGrid();
        });
    }

    toggleAppGrid() {
        if (this.appGrid.style.display === 'none' || this.appGrid.style.display === '') {
            this.appGrid.style.display = 'grid';
        } else {
            this.appGrid.style.display = 'none';
        }
    }

    setupClock() {
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
    }

    updateClock() {
        const now = new Date();
        this.clock.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    loadPinnedApps() {
        // Pinned apps could be predefined or loaded from storage
        const pinnedAppsData = [
            { id: 'files', icon: 'fa-folder', name: 'Files' },
            { id: 'chrome', icon: 'fa-chrome', name: 'Chrome' },
        ];

        pinnedAppsData.forEach(app => this.addPinnedApp(app));
    }

    addPinnedApp(app) {
        const appElement = document.createElement('div');
        appElement.className = 'pinned-app';
        appElement.innerHTML = `<i class="fas ${app.icon}"></i>`;
        appElement.title = app.name;
        appElement.addEventListener('click', () => this.launchApp(app));

        this.pinnedApps.appendChild(appElement);
        this.pinnedAppsList.push(app);
    }

    launchApp(app) {
        console.log(`Launching ${app.name}`);
        window.launchApp(app.id);
    }

    addRunningApp(app) {
        if (!this.runningAppsList.some(runningApp => runningApp.id === app.id)) {
            const appElement = document.createElement('div');
            appElement.className = 'running-app';
            appElement.innerHTML = `<i class="fas ${app.icon}"></i>`;
            appElement.title = app.name;
            appElement.addEventListener('click', () => this.focusApp(app));

            this.runningApps.appendChild(appElement);
            this.runningAppsList.push(app);
        }
    }

    focusApp(app) {
        console.log(`Focusing ${app.name}`);
        window.toggleWindow(app.id);
    }

    closeApp(app) {
        const index = this.runningAppsList.findIndex(runningApp => runningApp.id === app.id);
        if (index !== -1) {
            this.runningAppsList.splice(index, 1);
            this.runningApps.removeChild(this.runningApps.childNodes[index]);
        }
    }
}

// Initialize the taskbar when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const taskbar = new Taskbar();
});
