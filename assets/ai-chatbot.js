/**
 * AI Chatbot Widget for Shopify Store
 * Connects to Cloudflare Workers API
 * Position: Bottom right corner
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    API_URL: 'https://alignique-backend.shermanmonte1111.workers.dev/api/chat', // Live Worker API
    POSITION: 'bottom-right',
    THEME_COLOR: '#D4AF37', // Gold - matches Alignique theme
    INITIAL_MESSAGE: "Hi! ✨ I'm your Alignique AI assistant! Looking for the perfect gift? I can help you find products based on zodiac signs, personality, and more!",
  };

  // State
  let isOpen = false;
  let sessionId = localStorage.getItem('ai_chat_session') || `session_${Date.now()}`;
  let chatHistory = [];

  // Create chatbot HTML
  function createChatbot() {
    const container = document.createElement('div');
    container.id = 'ai-chatbot-container';
    container.innerHTML = `
      <!-- Chat Button -->
      <button id="ai-chat-button" class="ai-chat-button" aria-label="Open chat">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="ai-chat-badge" id="ai-chat-badge">1</span>
      </button>

      <!-- Chat Window -->
      <div id="ai-chat-window" class="ai-chat-window ai-chat-hidden">
        <!-- Header -->
        <div class="ai-chat-header">
          <div class="ai-chat-header-content">
            <div class="ai-chat-avatar">🤖</div>
            <div>
              <div class="ai-chat-title">AI Shopping Assistant</div>
              <div class="ai-chat-subtitle">Online • Usually replies instantly</div>
            </div>
          </div>
          <button id="ai-chat-close" class="ai-chat-close-btn" aria-label="Close chat">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 6L6 18M6 6l12 12" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <!-- Messages -->
        <div id="ai-chat-messages" class="ai-chat-messages">
          <div class="ai-chat-message ai-chat-message-bot">
            <div class="ai-chat-message-avatar">🤖</div>
            <div class="ai-chat-message-content">
              ${CONFIG.INITIAL_MESSAGE}
            </div>
          </div>
        </div>

        <!-- Input -->
        <div class="ai-chat-input-container">
          <input 
            type="text" 
            id="ai-chat-input" 
            class="ai-chat-input" 
            placeholder="Type your message..."
            autocomplete="off"
          />
          <button id="ai-chat-send" class="ai-chat-send-btn" aria-label="Send message">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <!-- Powered by -->
        <div class="ai-chat-footer">
          Powered by AI ✨
        </div>
      </div>
    `;

    document.body.appendChild(container);
  }

  // Toggle chat window
  function toggleChat() {
    isOpen = !isOpen;
    const window = document.getElementById('ai-chat-window');
    const badge = document.getElementById('ai-chat-badge');

    if (isOpen) {
      window.classList.remove('ai-chat-hidden');
      badge.style.display = 'none';
      document.getElementById('ai-chat-input').focus();
    } else {
      window.classList.add('ai-chat-hidden');
    }
  }

  // Add message to chat
  function addMessage(content, isBot = false) {
    const messagesContainer = document.getElementById('ai-chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-chat-message ${isBot ? 'ai-chat-message-bot' : 'ai-chat-message-user'}`;
    
    messageDiv.innerHTML = `
      ${isBot ? '<div class="ai-chat-message-avatar">🤖</div>' : ''}
      <div class="ai-chat-message-content">${content}</div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Show typing indicator
  function showTyping() {
    const messagesContainer = document.getElementById('ai-chat-messages');
    const typingDiv = document.createElement('div');
    typingDiv.id = 'ai-chat-typing';
    typingDiv.className = 'ai-chat-message ai-chat-message-bot';
    typingDiv.innerHTML = `
      <div class="ai-chat-message-avatar">🤖</div>
      <div class="ai-chat-message-content">
        <div class="ai-chat-typing-indicator">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Remove typing indicator
  function hideTyping() {
    const typing = document.getElementById('ai-chat-typing');
    if (typing) typing.remove();
  }

  // Send message to API
  async function sendMessage(message) {
    if (!message.trim()) return;

    // Add user message
    addMessage(message, false);
    
    // Clear input
    document.getElementById('ai-chat-input').value = '';

    // Show typing
    showTyping();

    try {
      const response = await fetch(CONFIG.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          session_id: sessionId,
          context: window.location.pathname,
        }),
      });

      const data = await response.json();

      hideTyping();

      if (data.success) {
        addMessage(data.message, true);
        sessionId = data.session_id;
        localStorage.setItem('ai_chat_session', sessionId);
      } else {
        addMessage('Sorry, I encountered an error. Please try again.', true);
      }

    } catch (error) {
      console.error('Chat error:', error);
      hideTyping();
      addMessage('Sorry, I\'m having trouble connecting. Please try again later.', true);
    }
  }

  // Initialize
  function init() {
    // Create chatbot
    createChatbot();

    // Event listeners
    document.getElementById('ai-chat-button').addEventListener('click', toggleChat);
    document.getElementById('ai-chat-close').addEventListener('click', toggleChat);
    
    document.getElementById('ai-chat-send').addEventListener('click', () => {
      const input = document.getElementById('ai-chat-input');
      sendMessage(input.value);
    });

    document.getElementById('ai-chat-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage(e.target.value);
      }
    });

    // Show badge for new visitors
    if (!localStorage.getItem('ai_chat_visited')) {
      setTimeout(() => {
        const badge = document.getElementById('ai-chat-badge');
        badge.style.display = 'flex';
        localStorage.setItem('ai_chat_visited', 'true');
      }, 3000);
    }
  }

  // Wait for DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
