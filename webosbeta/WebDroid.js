class WebDroid {
    constructor() {
        this.apps = [
            { name: 'Calculator', icon: 'fa-calculator' },
            { name: 'Notes', icon: 'fa-sticky-note' },
            { name: 'Camera', icon: 'fa-camera' },
            { name: 'Gallery', icon: 'fa-images' },
        ];
        this.init();
    }

    init() {
        const appContainer = document.getElementById('webdroid-app');
        appContainer.innerHTML = `
            <div class="webdroid-container">
                <div class="webdroid-status-bar">
                    <span class="webdroid-time"></span>
                    <span class="webdroid-icons">
                        <i class="fas fa-wifi"></i>
                        <i class="fas fa-battery-full"></i>
                    </span>
                </div>
                <div class="webdroid-app-grid"></div>
                <div class="webdroid-nav-bar">
                    <button class="webdroid-nav-button" id="webdroid-back"><i class="fas fa-arrow-left"></i></button>
                    <button class="webdroid-nav-button" id="webdroid-home"><i class="fas fa-home"></i></button>
                    <button class="webdroid-nav-button" id="webdroid-recent"><i class="fas fa-th"></i></button>
                </div>
            </div>
        `;

        this.renderApps();
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);

        document.getElementById('webdroid-back').addEventListener('click', () => this.goBack());
        document.getElementById('webdroid-home').addEventListener('click', () => this.goHome());
        document.getElementById('webdroid-recent').addEventListener('click', () => this.showRecent());
    }

    renderApps() {
        const appGrid = document.querySelector('.webdroid-app-grid');
        appGrid.innerHTML = this.apps.map(app => `
            <div class="webdroid-app-icon">
                <i class="fas ${app.icon}"></i>
                <span>${app.name}</span>
            </div>
        `).join('');

        appGrid.querySelectorAll('.webdroid-app-icon').forEach((icon, index) => {
            icon.addEventListener('click', () => this.openApp(this.apps[index]));
        });
    }

    updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        document.querySelector('.webdroid-time').textContent = timeString;
    }

    openApp(app) {
        console.log(`Opening ${app.name}`);
        // Implement app opening logic here
    }

    goBack() {
        console.log('Going back');
        // Implement back navigation logic here
    }

    goHome() {
        console.log('Going home');
        this.renderApps();
    }

    showRecent() {
        console.log('Showing recent apps');
        // Implement recent apps view here
    }
}

const webDroid = new WebDroid();
