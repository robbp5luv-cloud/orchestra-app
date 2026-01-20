/**
 * Configuration Manager for API Keys
 * Handles storing and retrieving API keys from localStorage
 */

const CONFIG_STORAGE_KEY = 'vault_api_config';

// Configuration Manager
class ConfigManager {
    constructor() {
        this.config = this.loadConfig();
    }

    /**
     * Load configuration from localStorage
     */
    loadConfig() {
        try {
            const stored = localStorage.getItem(CONFIG_STORAGE_KEY);
            return stored ? JSON.parse(stored) : {
                groq: '',
                deepseek: '',
                mistral: ''
            };
        } catch (error) {
            console.error('Error loading config:', error);
            return {
                groq: '',
                deepseek: '',
                mistral: ''
            };
        }
    }

    /**
     * Save configuration to localStorage
     */
    saveConfig(config) {
        try {
            this.config = config;
            localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
            return true;
        } catch (error) {
            console.error('Error saving config:', error);
            return false;
        }
    }

    /**
     * Get API key for a specific provider
     */
    getApiKey(provider) {
        return this.config[provider] || '';
    }

    /**
     * Check if all API keys are configured
     */
    hasApiKeys() {
        return this.config.groq || this.config.deepseek || this.config.mistral;
    }

    /**
     * Get list of configured providers
     */
    getConfiguredProviders() {
        const providers = [];
        if (this.config.groq) providers.push('groq');
        if (this.config.deepseek) providers.push('deepseek');
        if (this.config.mistral) providers.push('mistral');
        return providers;
    }
}

// Initialize configuration manager
const configManager = new ConfigManager();

// Modal management
const configModal = document.getElementById('configModal');
const settingsBtn = document.getElementById('settingsBtn');
const closeModalBtn = document.getElementById('closeModal');
const saveConfigBtn = document.getElementById('saveConfig');

// API key input fields
const groqInput = document.getElementById('groqApiKey');
const deepseekInput = document.getElementById('deepseekApiKey');
const mistralInput = document.getElementById('mistralApiKey');

/**
 * Open configuration modal
 */
function openConfigModal() {
    // Load current values
    groqInput.value = configManager.getApiKey('groq');
    deepseekInput.value = configManager.getApiKey('deepseek');
    mistralInput.value = configManager.getApiKey('mistral');

    configModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

/**
 * Close configuration modal
 */
function closeConfigModal() {
    configModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

/**
 * Save configuration
 */
function saveConfiguration() {
    const config = {
        groq: groqInput.value.trim(),
        deepseek: deepseekInput.value.trim(),
        mistral: mistralInput.value.trim()
    };

    if (!config.groq && !config.deepseek && !config.mistral) {
        alert('⚠️ Please enter at least one API key to continue.');
        return;
    }

    const success = configManager.saveConfig(config);

    if (success) {
        // Show success message
        const originalText = saveConfigBtn.textContent;
        saveConfigBtn.textContent = '✓ Saved Successfully!';
        saveConfigBtn.classList.add('!bg-green-600');

        setTimeout(() => {
            saveConfigBtn.textContent = originalText;
            saveConfigBtn.classList.remove('!bg-green-600');
            closeConfigModal();
        }, 1500);
    } else {
        alert('❌ Error saving configuration. Please try again.');
    }
}

// Event listeners
settingsBtn.addEventListener('click', openConfigModal);
closeModalBtn.addEventListener('click', closeConfigModal);
saveConfigBtn.addEventListener('click', saveConfiguration);

// Close modal when clicking outside
configModal.addEventListener('click', (e) => {
    if (e.target === configModal) {
        closeConfigModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !configModal.classList.contains('hidden')) {
        closeConfigModal();
    }
});

// Auto-open modal if no API keys are configured
window.addEventListener('load', () => {
    if (!configManager.hasApiKeys()) {
        setTimeout(() => {
            openConfigModal();
        }, 1000);
    }
});
