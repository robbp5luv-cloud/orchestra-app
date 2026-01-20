// DOM Elements
const userInput = document.getElementById('userInput');
const submitBtn = document.getElementById('submitBtn');
const statusText = document.getElementById('statusText');
const statusCard = document.getElementById('statusCard');
const agentResponses = document.getElementById('agentResponses');

// State
let isOrchestrating = false;

/**
 * Initialize the application
 */
function init() {
    // Add event listeners
    submitBtn.addEventListener('click', handleSubmit);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    });

    // Focus input on load
    userInput.focus();
}

/**
 * Handle user input submission
 */
function handleSubmit() {
    const query = userInput.value.trim();

    // Validate input
    if (!query) {
        return;
    }

    // Check if API keys are configured
    if (!configManager.hasApiKeys()) {
        alert('⚠️ Please configure at least one API key in settings first!');
        openConfigModal();
        return;
    }

    // Prevent multiple submissions
    if (isOrchestrating) {
        return;
    }

    // Update UI state
    isOrchestrating = true;
    updateStatus('Orchestrating agents...');
    statusCard.classList.add('orchestrating');

    // Clear input
    userInput.value = '';
    userInput.disabled = true;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Orchestrating...';

    // Call orchestration function
    renderAgentResponses(query);
}

/**
 * Update the status card text
 * @param {string} message - The status message to display
 */
function updateStatus(message) {
    statusText.textContent = message;
}

/**
 * Reset the UI to ready state
 */
function resetToReady() {
    isOrchestrating = false;
    updateStatus('Ready for input');
    statusCard.classList.remove('orchestrating');
    userInput.disabled = false;
    submitBtn.disabled = false;
    submitBtn.textContent = 'Orchestrate';
    userInput.focus();
}

/**
 * Orchestrate multiple AI agents and render their responses
 * @param {string} query - The user's input query
 */
async function renderAgentResponses(query) {
    console.log('Orchestrating agents for query:', query);

    // Clear previous responses
    agentResponses.innerHTML = '';

    // Get configured providers
    const providers = configManager.getConfiguredProviders();

    if (providers.length === 0) {
        alert('⚠️ No API keys configured. Please add at least one API key in settings.');
        resetToReady();
        return;
    }

    // Define agent configurations
    const agents = [];

    if (providers.includes('groq')) {
        agents.push({
            name: 'Groq Llama 3.1',
            color: 'blue',
            provider: 'groq',
            apiCall: () => callGroqAPI(query)
        });
    }

    if (providers.includes('deepseek')) {
        agents.push({
            name: 'DeepSeek V3',
            color: 'green',
            provider: 'deepseek',
            apiCall: () => callDeepSeekAPI(query)
        });
    }

    if (providers.includes('mistral')) {
        agents.push({
            name: 'Mistral AI',
            color: 'slate',
            provider: 'mistral',
            apiCall: () => callMistralAPI(query)
        });
    }

    // Create placeholder cards for all agents
    const cards = {};
    agents.forEach(agent => {
        const cardId = createLoadingCard(agent.name, agent.color, query);
        cards[agent.provider] = cardId;
    });

    // Call all APIs in parallel
    const promises = agents.map(agent =>
        agent.apiCall()
            .then(response => {
                updateAgentCard(cards[agent.provider], response, false);
            })
            .catch(error => {
                console.error(`Error from ${agent.name}:`, error);
                updateAgentCard(cards[agent.provider], `❌ Error: ${error.message || 'Failed to get response'}`, true);
            })
    );

    // Wait for all responses
    await Promise.all(promises);

    // Reset to ready state after all responses
    setTimeout(() => {
        resetToReady();
    }, 500);
}

/**
 * Create a loading card for an agent
 * @param {string} agentName - The name of the agent
 * @param {string} color - The color theme for the agent
 * @param {string} query - The original query
 * @returns {string} - The card ID
 */
function createLoadingCard(agentName, color, query) {
    const cardId = `card-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const colorClasses = {
        blue: 'border-blue-500/50 bg-blue-500/10',
        green: 'border-green-500/50 bg-green-500/10',
        slate: 'border-slate-500/50 bg-slate-500/10'
    };

    const card = document.createElement('div');
    card.id = cardId;
    card.className = `agent-card ${colorClasses[color] || ''}`;
    card.innerHTML = `
        <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-full bg-${color}-500/20 flex items-center justify-center flex-shrink-0">
                <span class="w-3 h-3 rounded-full bg-${color}-500 animate-pulse"></span>
            </div>
            <div class="flex-1">
                <h3 class="text-lg font-semibold text-${color}-400 mb-2">${agentName}</h3>
                <p class="text-slate-300 text-sm mb-3 font-mono">"${query}"</p>
                <div class="response-content text-slate-300 text-sm leading-relaxed">
                    <div class="flex items-center gap-2 text-slate-400">
                        <div class="animate-spin h-4 w-4 border-2 border-${color}-500 border-t-transparent rounded-full"></div>
                        Thinking...
                    </div>
                </div>
            </div>
        </div>
    `;

    agentResponses.appendChild(card);
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    return cardId;
}

/**
 * Update an agent card with the response
 * @param {string} cardId - The card ID
 * @param {string} response - The response text
 * @param {boolean} isError - Whether this is an error response
 */
function updateAgentCard(cardId, response, isError = false) {
    const card = document.getElementById(cardId);
    if (!card) return;

    const responseContent = card.querySelector('.response-content');
    if (!responseContent) return;

    if (isError) {
        responseContent.innerHTML = `<p class="text-red-400">${response}</p>`;
    } else {
        // Format response with basic markdown support
        const formattedResponse = formatResponse(response);
        responseContent.innerHTML = formattedResponse;
    }

    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Format response text with basic markdown support
 * @param {string} text - The response text
 * @returns {string} - Formatted HTML
 */
function formatResponse(text) {
    if (!text) return '<p class="text-slate-400">No response received</p>';

    // Convert markdown-style formatting to HTML
    let formatted = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // Bold
        .replace(/\*(.*?)\*/g, '<em>$1</em>')  // Italic
        .replace(/`([^`]+)`/g, '<code class="bg-slate-700 px-1 py-0.5 rounded text-sm">$1</code>')  // Inline code
        .replace(/\n\n/g, '</p><p class="mt-2">')  // Paragraphs
        .replace(/\n/g, '<br>');  // Line breaks

    return `<p>${formatted}</p>`;
}

/**
 * Call Groq API with Llama 3.1
 * @param {string} query - The user query
 * @returns {Promise<string>} - The AI response
 */
async function callGroqAPI(query) {
    const apiKey = configManager.getApiKey('groq');

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'llama-3.1-70b-versatile',
            messages: [
                {
                    role: 'user',
                    content: query
                }
            ],
            temperature: 0.7,
            max_tokens: 1024
        })
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Groq API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'No response generated';
}

/**
 * Call DeepSeek API
 * @param {string} query - The user query
 * @returns {Promise<string>} - The AI response
 */
async function callDeepSeekAPI(query) {
    const apiKey = configManager.getApiKey('deepseek');

    const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [
                {
                    role: 'user',
                    content: query
                }
            ],
            temperature: 0.7,
            max_tokens: 1024
        })
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`DeepSeek API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'No response generated';
}

/**
 * Call Mistral AI API
 * @param {string} query - The user query
 * @returns {Promise<string>} - The AI response
 */
async function callMistralAPI(query) {
    const apiKey = configManager.getApiKey('mistral');

    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'mistral-small-latest',
            messages: [
                {
                    role: 'user',
                    content: query
                }
            ],
            temperature: 0.7,
            max_tokens: 1024
        })
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Mistral API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'No response generated';
}

// Initialize the application when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
