# 🔒 The Vault: Multi-Agent Orchestrator

> **Silicon Valley's #1 Multi-LLM Interface** - Query multiple AI models simultaneously and compare their responses in real-time.

![The Vault](https://img.shields.io/badge/AI-Multi--LLM-blue) ![Status](https://img.shields.io/badge/status-active-success) ![License](https://img.shields.io/badge/license-MIT-green)

## 🌟 Features

- **Multi-LLM Orchestration**: Query 3 powerful AI models simultaneously
- **Real-time Responses**: Get answers from multiple AIs in parallel
- **Free Tier Support**: Integrates with free API tiers from leading AI providers
- **Beautiful UI**: Modern, responsive interface built with Tailwind CSS
- **Secure Storage**: API keys stored locally in your browser
- **Zero Backend**: Runs entirely in the browser - no server required

## 🤖 Supported AI Models

| Model | Provider | Speed | Strengths |
|-------|----------|-------|-----------|
| **Llama 3.1 70B** | Groq | ⚡ Ultra Fast | General-purpose, fast inference |
| **DeepSeek V3** | DeepSeek | 🧠 Smart | Reasoning, complex tasks |
| **Mistral Small** | Mistral AI | 📊 Efficient | Balanced performance |

## 🚀 Quick Start

### 1. Clone or Download

```bash
git clone https://github.com/your-username/orchestra-app.git
cd orchestra-app
```

### 2. Open in Browser

Simply open `index.html` in your web browser:

```bash
# Using Python's built-in server (recommended)
python3 -m http.server 8000

# Then open http://localhost:8000 in your browser
```

Or just double-click `index.html` to open it directly.

### 3. Configure API Keys

Click the ⚙️ settings icon in the top-left corner and add your free API keys.

## 🔑 Getting Free API Keys

### Groq API (Llama 3.1)

1. Visit [https://console.groq.com/keys](https://console.groq.com/keys)
2. Sign up for a free account
3. Generate a new API key
4. **Free Tier**: 14,400 requests per day

### DeepSeek API

1. Visit [https://platform.deepseek.com/api_keys](https://platform.deepseek.com/api_keys)
2. Create a free account
3. Generate your API key
4. **Free Tier**: Available with generous limits

### Mistral AI

1. Visit [https://console.mistral.ai/api-keys/](https://console.mistral.ai/api-keys/)
2. Sign up for a free account
3. Create a new API key
4. **Free Tier**: Trial credits included

## 📖 How to Use

1. **Configure APIs**: Click the settings gear and add at least one API key
2. **Enter Query**: Type your question in the input field at the bottom
3. **Orchestrate**: Press Enter or click "Orchestrate"
4. **Compare**: Watch as multiple AIs respond simultaneously
5. **Analyze**: Compare different perspectives and approaches

## 💡 Example Queries

Try these to see the power of multi-LLM orchestration:

- "Explain quantum computing in simple terms"
- "Write a Python function to check if a number is prime"
- "What are the pros and cons of electric vehicles?"
- "Explain the concept of recursion with an example"
- "What is the future of artificial intelligence?"

## 🛠️ Technical Stack

- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: Tailwind CSS (CDN)
- **Storage**: LocalStorage API
- **AI APIs**:
  - Groq API (OpenAI-compatible)
  - DeepSeek API
  - Mistral AI API

## 📁 Project Structure

```
orchestra-app/
├── index.html      # Main HTML structure
├── style.css       # Custom styles and animations
├── config.js       # API configuration management
├── script.js       # Core application logic & API calls
└── README.md       # This file
```

## 🔒 Privacy & Security

- ✅ All API keys are stored **locally** in your browser
- ✅ No data is sent to any third-party servers (except the AI providers)
- ✅ No backend or database required
- ✅ Open-source and transparent code

## 🎨 Features in Detail

### Parallel Processing
All configured AI models are queried simultaneously, giving you faster results and diverse perspectives.

### Loading States
Each AI card shows a loading spinner while waiting for responses, so you know the system is working.

### Error Handling
If an API call fails, you'll see a clear error message instead of the app breaking.

### Markdown Support
Responses support basic markdown formatting:
- **Bold** text with `**text**`
- *Italic* text with `*text*`
- `Inline code` with backticks

### Responsive Design
Works beautifully on desktop, tablet, and mobile devices.

## 🐛 Troubleshooting

### API Key Issues
- Make sure you've copied the entire API key without spaces
- Check that you have remaining quota on your free tier
- Verify the API key is active in the provider's console

### CORS Errors
- Use a local server (like `python3 -m http.server`) instead of opening the file directly
- Some browsers block API calls from `file://` URLs

### No Response
- Check your internet connection
- Verify API keys are correctly configured
- Open browser console (F12) to see detailed error messages

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Add support for more AI models
- Improve the UI/UX

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Credits

Built with ❤️ using:
- [Tailwind CSS](https://tailwindcss.com/)
- [Groq](https://groq.com/)
- [DeepSeek](https://www.deepseek.com/)
- [Mistral AI](https://mistral.ai/)

---

**Made for developers, researchers, and AI enthusiasts who want to harness the power of multiple LLMs at once.**

🌟 If you find this useful, star the repo!
