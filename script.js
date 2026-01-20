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
 * Placeholder function for future API integration
 * This will orchestrate multiple AI agents and render their responses
 * @param {string} query - The user's input query
 */
function renderAgentResponses(query) {
    console.log('Orchestrating agents for query:', query);

    // Clear previous responses
    agentResponses.innerHTML = '';

    // Simulate agent orchestration (replace with actual API calls)
    const agents = [
        { name: 'Claude 4.5', color: 'blue', delay: 1000 },
        { name: 'Gemini 1.5 Pro', color: 'green', delay: 1500 },
        { name: 'Grok 4.1', color: 'slate', delay: 2000 }
    ];

    // Simulate responses from each agent
    agents.forEach((agent, index) => {
        setTimeout(() => {
            addAgentCard(agent.name, agent.color, query);

            // If this is the last agent, reset to ready state
            if (index === agents.length - 1) {
                setTimeout(() => {
                    resetToReady();
                }, 500);
            }
        }, agent.delay);
    });
}

/**
 * Add an agent response card to the UI
 * @param {string} agentName - The name of the agent
 * @param {string} color - The color theme for the agent
 * @param {string} query - The original query
 */
function addAgentCard(agentName, color, query) {
    const colorClasses = {
        blue: 'border-blue-500/50 bg-blue-500/10',
        green: 'border-green-500/50 bg-green-500/10',
        slate: 'border-slate-500/50 bg-slate-500/10'
    };

    const card = document.createElement('div');
    card.className = `agent-card ${colorClasses[color] || ''}`;
    card.innerHTML = `
        <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-full bg-${color}-500/20 flex items-center justify-center flex-shrink-0">
                <span class="w-3 h-3 rounded-full bg-${color}-500"></span>
            </div>
            <div class="flex-1">
                <h3 class="text-lg font-semibold text-${color}-400 mb-2">${agentName}</h3>
                <p class="text-slate-300 text-sm mb-2">Query: "${query}"</p>
                <p class="text-slate-400 text-sm italic">
                    Response placeholder - API integration pending
                </p>
            </div>
        </div>
    `;

    agentResponses.appendChild(card);

    // Smooth scroll to new card
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Initialize the application when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
