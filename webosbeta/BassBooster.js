class BassBooster {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.sourceNode = null;
        this.biquadFilter = this.audioContext.createBiquadFilter();
        this.biquadFilter.type = 'lowshelf';
        this.biquadFilter.frequency.value = 100;
        this.biquadFilter.gain.value = 0;

        this.isBoostEnabled = false;

        this.init();
    }

    init() {
        const appContainer = document.getElementById('bass-booster-app');
        appContainer.innerHTML = `
            <h2>Bass Booster Extreme</h2>
            <div class="controls">
                <label for="bassLevel">Bass Level:</label>
                <input type="range" id="bassLevel" min="0" max="100" value="50">
                <button id="toggleBoost">Enable Bass Boost</button>
            </div>
            <div class="presets">
                <h3>Presets</h3>
                <button class="preset" data-value="30">Low</button>
                <button class="preset" data-value="60">Medium</button>
                <button class="preset" data-value="90">High</button>
            </div>
        `;

        const bassLevelSlider = document.getElementById('bassLevel');
        const toggleBoostButton = document.getElementById('toggleBoost');
        const presetButtons = document.querySelectorAll('.preset');

        bassLevelSlider.addEventListener('input', (e) => this.setBassLevel(e.target.value));
        toggleBoostButton.addEventListener('click', () => this.toggleBoost());
        presetButtons.forEach(button => {
            button.addEventListener('click', (e) => this.setPreset(e.target.dataset.value));
        });
    }

    async setupAudioNodes() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.sourceNode = this.audioContext.createMediaStreamSource(stream);
            this.sourceNode.connect(this.biquadFilter);
            this.biquadFilter.connect(this.audioContext.destination);
        } catch (error) {
            console.error('Error accessing audio stream:', error);
        }
    }

    setBassLevel(level) {
        const gain = (level - 50) * 0.24;
        this.biquadFilter.gain.setValueAtTime(gain, this.audioContext.currentTime);
    }

    toggleBoost() {
        this.isBoostEnabled = !this.isBoostEnabled;
        if (this.isBoostEnabled) {
            this.setupAudioNodes();
            document.getElementById('toggleBoost').textContent = 'Disable Bass Boost';
        } else {
            if (this.sourceNode) {
                this.sourceNode.disconnect();
                this.sourceNode = null;
            }
            document.getElementById('toggleBoost').textContent = 'Enable Bass Boost';
        }
    }

    setPreset(value) {
        document.getElementById('bassLevel').value = value;
        this.setBassLevel(value);
    }
}

const bassBooster = new BassBooster();
