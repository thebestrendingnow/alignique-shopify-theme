/**
 * Alignique AI Chatbot - Enhanced Strategic Version
 * Features: Auto-greet, Email capture, Discount strategy, Smart conversation
 */

const ALIGNIQUE_CHATBOT = {
  apiUrl: 'https://alignique-backend.shermanmonte1111.workers.dev/api/chat',
  greeting: {
    delay: 3800, // 3.8 seconds
    message: "👋 Hi! I'm your personal gift consultant. Looking for the perfect zodiac gift? I can help you find something special!"
  },
  discount: {
    code: 'COSMIC10',
    percentage: 10,
    minMessages: 3 // Ask after 3+ messages
  },
  colors: {
    primary: '#D4AF37',
    secondary: '#000000',
    text: '#FFFFFF'
  }
};

class AligniqueChatbot {
  constructor() {
    this.isOpen = false;
    this.messageCount = 0;
    this.userEmail = null;
    this.hasOfferedDiscount = false;
    this.conversationIntent = null;
    this.init();
  }

  init() {
    this.createWidget();
    this.attachEventListeners();
    this.scheduleGreeting();
  }

  createWidget() {
    const widget = document.createElement('div');
    widget.innerHTML = `
      <div id="alignique-chatbot-widget" class="alignique-chat-widget">
        <!-- Chat Button -->
        <button id="alignique-chat-btn" class="alignique-chat-btn" aria-label="Open chat">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" fill="currentColor"/>
            <circle cx="12" cy="11" r="1" fill="#000"/>
            <circle cx="8" cy="11" r="1" fill="#000"/>
            <circle cx="16" cy="11" r="1" fill="#000"/>
          </svg>
          <span class="alignique-chat-badge">AI</span>
        </button>

        <!-- Chat Panel -->
        <div id="alignique-chat-panel" class="alignique-chat-panel">
          <!-- Header -->
          <div class="alignique-chat-header">
            <div class="alignique-chat-header-content">
              <div class="alignique-chat-avatar">✨</div>
              <div>
                <h3>Alignique AI Assistant</h3>
                <p class="alignique-chat-status">
                  <span class="status-dot"></span> Online
                </p>
              </div>
            </div>
            <button id="alignique-chat-close" class="alignique-chat-close" aria-label="Close chat">×</button>
          </div>

          <!-- Messages -->
          <div id="alignique-chat-messages" class="alignique-chat-messages">
            <div class="alignique-message bot">
              <div class="message-avatar">🤖</div>
              <div class="message-content">
                <p>Welcome to Alignique! 🌟 I'm here to help you discover gifts aligned with the cosmos.</p>
                <p style="margin-top: 8px; font-size: 0.9em; opacity: 0.9;">
                  Tell me about the person you're shopping for, or ask about any zodiac sign!
                </p>
              </div>
            </div>
          </div>

          <!-- Quick Replies -->
          <div id="alignique-quick-replies" class="alignique-quick-replies">
            <button class="quick-reply" data-message="What's the best gift for Aries?">♈ Aries Gifts</button>
            <button class="quick-reply" data-message="Show me bestsellers">⭐ Bestsellers</button>
            <button class="quick-reply" data-message="I need help choosing">🎁 Help Me Choose</button>
          </div>

          <!-- Input Area -->
          <div class="alignique-chat-input-area">
            <input 
              type="text" 
              id="alignique-chat-input" 
              placeholder="Type your message..."
              autocomplete="off"
            />
            <button id="alignique-chat-send" class="alignique-chat-send" aria-label="Send message">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="currentColor"/>
              </svg>
            </button>
          </div>

          <!-- Powered By -->
          <div class="alignique-chat-footer">
            <small>Powered by AI • GPT-5.1</small>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(widget);
  }

  attachEventListeners() {
    const btn = document.getElementById('alignique-chat-btn');
    const close = document.getElementById('alignique-chat-close');
    const send = document.getElementById('alignique-chat-send');
    const input = document.getElementById('alignique-chat-input');

    btn?.addEventListener('click', () => this.toggleChat());
    close?.addEventListener('click', () => this.toggleChat());
    send?.addEventListener('click', () => this.sendMessage());
    input?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });

    // Quick replies
    document.querySelectorAll('.quick-reply').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const message = e.target.dataset.message;
        this.sendMessage(message);
      });
    });
  }

  scheduleGreeting() {
    // Auto-greet after 3.8 seconds for new visitors
    const hasVisited = localStorage.getItem('alignique_visited');
    
    if (!hasVisited) {
      setTimeout(() => {
        if (!this.isOpen) {
          this.showNotification(ALIGNIQUE_CHATBOT.greeting.message);
        }
      }, ALIGNIQUE_CHATBOT.greeting.delay);
      
      localStorage.setItem('alignique_visited', 'true');
    }
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    const panel = document.getElementById('alignique-chat-panel');
    const btn = document.getElementById('alignique-chat-btn');
    
    if (this.isOpen) {
      panel?.classList.add('open');
      btn?.classList.add('active');
      document.getElementById('alignique-chat-input')?.focus();
    } else {
      panel?.classList.remove('open');
      btn?.classList.remove('active');
    }
  }

  showNotification(message) {
    const btn = document.getElementById('alignique-chat-btn');
    const notification = document.createElement('div');
    notification.className = 'alignique-chat-notification';
    notification.textContent = message;
    
    btn?.parentElement?.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);

    // Auto-hide after 8 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 8000);

    // Open chat if clicked
    notification.addEventListener('click', () => {
      this.toggleChat();
      notification.remove();
    });
  }

  async sendMessage(messageText = null) {
    const input = document.getElementById('alignique-chat-input');
    const message = messageText || input?.value?.trim();
    
    if (!message) return;

    // Clear input
    if (!messageText) input.value = '';

    // Hide quick replies after first message
    const quickReplies = document.getElementById('alignique-quick-replies');
    if (quickReplies && this.messageCount === 0) {
      quickReplies.style.display = 'none';
    }

    // Add user message
    this.addMessage(message, 'user');
    this.messageCount++;

    // Analyze intent
    this.analyzeIntent(message);

    // Show typing indicator
    this.showTyping();

    try {
      // Get AI response
      const response = await this.getAIResponse(message);
      
      // Remove typing indicator
      this.removeTyping();

      // Add bot response
      this.addMessage(response, 'bot');

      // Strategic discount offer
      this.considerDiscountOffer();

    } catch (error) {
      console.error('Chat error:', error);
      this.removeTyping();
      this.addMessage('I apologize, but I\'m having trouble connecting. Please try again or contact us at support@alignique.shop', 'bot');
    }
  }

  analyzeIntent(message) {
    const lower = message.toLowerCase();
    
    if (lower.includes('buy') || lower.includes('purchase') || lower.includes('price')) {
      this.conversationIntent = 'buying';
    } else if (lower.includes('gift') || lower.includes('recommend')) {
      this.conversationIntent = 'gift-seeking';
    } else if (lower.includes('help') || lower.includes('question')) {
      this.conversationIntent = 'help';
    }
  }

  async getAIResponse(message) {
    // Enhanced prompt for strategic conversation
    const systemContext = `You are Alignique's AI gift consultant. You help customers find perfect zodiac-themed gifts.
    
    Guidelines:
    - Be warm, friendly, and knowledgeable about astrology
    - Ask clarifying questions to understand their needs
    - Recommend specific products with prices
    - Build trust through education, not pushiness
    - If they show buying intent, guide them gently
    
    Current conversation intent: ${this.conversationIntent || 'exploratory'}
    Message count: ${this.messageCount}
    
    Customer message: ${message}`;

    try {
      const response = await fetch(ALIGNIQUE_CHATBOT.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: systemContext,
          sessionId: this.getSessionId()
        })
      });

      if (!response.ok) {
        throw new Error('API error');
      }

      const data = await response.json();
      return data.response || this.getFallbackResponse(message);
      
    } catch (error) {
      return this.getFallbackResponse(message);
    }
  }

  getFallbackResponse(message) {
    const lower = message.toLowerCase();
    
    // Zodiac-specific responses
    const zodiacResponses = {
      'aries': '♈ Aries (Mar 21-Apr 19) are bold and passionate! They love statement pieces. I recommend our Celestial Diamond Necklace (€299) or Fire Element Bracelet (€149). Would you like to see these?',
      'taurus': '♉ Taurus (Apr 20-May 20) appreciate luxury and quality. Our Moonstone Ring (€139) or Venus Charm Necklace (€199) would be perfect. Both are elegant and timeless!',
      'gemini': '♊ Gemini (May 21-Jun 20) love versatility! The Zodiac Charm Bracelet (€149) with interchangeable charms is ideal. They can mix and match styles!',
      'cancer': '♋ Cancer (Jun 21-Jul 22) are emotional and sentimental. Our Moon Phase Necklace (€179) or Pearl Collection (€159) would touch their heart!',
      'leo': '♌ Leo (Jul 23-Aug 22) love to shine! The Star Sign Earring Collection (€89) or Golden Sun Pendant (€229) matches their radiant personality!',
      'virgo': '♍ Virgo (Aug 23-Sep 22) appreciate attention to detail. Our Minimalist Constellation Necklace (€129) or Birthstone Ring (€169) are perfect!',
      'libra': '♎ Libra (Sep 23-Oct 22) love balance and beauty. The Harmony Bracelet Set (€149) or Rose Gold Collection (€189) would delight them!',
      'scorpio': '♏ Scorpio (Oct 23-Nov 21) are intense and mysterious. Our Black Onyx Ring (€159) or Scorpio Constellation Necklace (€199) matches their energy!',
      'sagittarius': '♐ Sagittarius (Nov 22-Dec 21) are adventurous! The Traveler\'s Charm Bracelet (€139) or Arrow Pendant (€119) fits their spirit!',
      'capricorn': '♑ Capricorn (Dec 22-Jan 19) appreciate quality and tradition. Our Classic Diamond Studs (€249) or Capricorn Signet Ring (€179) are ideal!',
      'aquarius': '♒ Aquarius (Jan 20-Feb 18) are unique and innovative. The Futuristic Star Earrings (€99) or Aquarius Wave Necklace (€159) match their vibe!',
      'pisces': '♓ Pisces (Feb 19-Mar 20) are dreamy and artistic. Our Opal Necklace (€189) or Mermaid Scale Bracelet (€129) would be perfect!'
    };

    for (const [sign, response] of Object.entries(zodiacResponses)) {
      if (lower.includes(sign)) return response;
    }

    // General responses
    if (lower.includes('price') || lower.includes('cost')) {
      return '💰 Our collection ranges from €89 to €299, with most pieces around €149-€179. We offer:\n\n• Zodiac Charm Bracelet: €149 (bestseller)\n• Star Sign Earrings: €89\n• Celestial Necklace: €199\n• Moonstone Ring: €139\n\nFree shipping on orders over €100! What\'s your budget?';
    }

    if (lower.includes('shipping') || lower.includes('delivery')) {
      return '🚚 We offer:\n\n• FREE shipping on orders €100+\n• Standard shipping: 3-5 business days\n• Express: 1-2 days (€15)\n• All items come in luxury gift packaging\n\nWhere should we ship to?';
    }

    if (lower.includes('help') || lower.includes('choose')) {
      return '🎁 I\'d love to help you choose! To find the perfect gift, tell me:\n\n1️⃣ What\'s their zodiac sign?\n2️⃣ What\'s the occasion? (birthday, anniversary, etc.)\n3️⃣ Your budget range?\n\nI\'ll find something perfectly aligned! ✨';
    }

    // Default
    return '✨ That\'s a great question! I can help you with:\n\n• Zodiac gift recommendations\n• Product details & pricing\n• Shipping information\n• Finding the perfect piece\n\nWhat would you like to know about?';
  }

  considerDiscountOffer() {
    // Strategic discount offer after enough engagement
    if (this.hasOfferedDiscount || this.userEmail) return;
    if (this.messageCount < ALIGNIQUE_CHATBOT.discount.minMessages) return;
    
    // Only offer if they show buying intent
    if (this.conversationIntent === 'buying' || this.conversationIntent === 'gift-seeking') {
      this.hasOfferedDiscount = true;
      
      setTimeout(() => {
        this.addMessage(
          `🎉 I can see you're really interested! Since this is your first time, I'd love to offer you ${ALIGNIQUE_CHATBOT.discount.percentage}% off your first order.\n\nWould you like me to send you the discount code via email?`,
          'bot',
          true // Show email capture buttons
        );
      }, 1500);
    }
  }

  addMessage(text, sender, showEmailCapture = false) {
    const messagesContainer = document.getElementById('alignique-chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `alignique-message ${sender}`;
    
    if (sender === 'bot') {
      messageDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
          <p>${text}</p>
          ${showEmailCapture ? this.getEmailCaptureHTML() : ''}
        </div>
      `;
      
      if (showEmailCapture) {
        // Attach email capture listeners
        setTimeout(() => {
          this.attachEmailCaptureListeners();
        }, 100);
      }
    } else {
      messageDiv.innerHTML = `
        <div class="message-content">
          <p>${text}</p>
        </div>
      `;
    }
    
    messagesContainer?.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  getEmailCaptureHTML() {
    return `
      <div class="email-capture" style="margin-top: 12px;">
        <input 
          type="email" 
          id="discount-email" 
          placeholder="your@email.com"
          class="email-input"
          style="width: 100%; padding: 10px; border: 1px solid #D4AF37; border-radius: 8px; margin-bottom: 8px; background: rgba(0,0,0,0.3); color: white;"
        />
        <div style="display: flex; gap: 8px;">
          <button class="email-submit-btn" style="flex: 1; padding: 10px; background: linear-gradient(135deg, #D4AF37, #F59E0B); border: none; border-radius: 8px; color: #000; font-weight: 600; cursor: pointer;">
            Yes, Send Code! ✨
          </button>
          <button class="email-skip-btn" style="padding: 10px 15px; background: transparent; border: 1px solid rgba(212,175,55,0.3); border-radius: 8px; color: #9CA3AF; cursor: pointer;">
            Maybe Later
          </button>
        </div>
      </div>
    `;
  }

  attachEmailCaptureListeners() {
    const submitBtn = document.querySelector('.email-submit-btn');
    const skipBtn = document.querySelector('.email-skip-btn');
    const emailInput = document.getElementById('discount-email');

    submitBtn?.addEventListener('click', () => {
      const email = emailInput?.value?.trim();
      if (email && this.validateEmail(email)) {
        this.captureEmail(email);
      } else {
        alert('Please enter a valid email address');
      }
    });

    skipBtn?.addEventListener('click', () => {
      this.addMessage('No problem! If you change your mind, just ask me for a discount code anytime. 😊', 'bot');
    });
  }

  validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async captureEmail(email) {
    this.userEmail = email;
    
    // Save to localStorage
    localStorage.setItem('alignique_email', email);
    
    // Show discount code
    this.addMessage(
      `🎊 Awesome! Your discount code is:\n\n**${ALIGNIQUE_CHATBOT.discount.code}**\n\nUse it at checkout for ${ALIGNIQUE_CHATBOT.discount.percentage}% off! I've also sent it to ${email}.\n\nReady to start shopping? I can show you our bestsellers! 🛍️`,
      'bot'
    );

    // Send to backend (optional)
    try {
      await fetch('https://alignique-backend.shermanmonte1111.workers.dev/api/email-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'chatbot', discountCode: ALIGNIQUE_CHATBOT.discount.code })
      });
    } catch (error) {
      console.error('Email capture error:', error);
    }
  }

  showTyping() {
    const messagesContainer = document.getElementById('alignique-chat-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'alignique-message bot typing-indicator';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `
      <div class="message-avatar">🤖</div>
      <div class="message-content">
        <div class="typing-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    `;
    messagesContainer?.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  removeTyping() {
    document.getElementById('typing-indicator')?.remove();
  }

  getSessionId() {
    let sessionId = sessionStorage.getItem('alignique_session');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('alignique_session', sessionId);
    }
    return sessionId;
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.aligniqueChatbot = new AligniqueChatbot();
  });
} else {
  window.aligniqueChatbot = new AligniqueChatbot();
}
