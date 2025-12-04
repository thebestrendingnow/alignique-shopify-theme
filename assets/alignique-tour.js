/**
 * Alignique Website Tour
 * Interactive guided tour with voice option and auto-pilot
 */

const TOUR_STEPS = [
  {
    target: '.header',
    title: '✨ Welcome to Alignique!',
    content: 'Your cosmic guide to perfect gifts. Let me show you around!',
    voice: 'Welcome to Alignique! Your cosmic guide to perfect gifts. Let me show you around!'
  },
  {
    target: 'nav, .header__menu',
    title: '🧭 Navigation',
    content: 'Browse by zodiac sign, check new arrivals, or explore our bestsellers. Everything is organized for easy discovery!',
    voice: 'Browse by zodiac sign, check new arrivals, or explore our bestsellers.'
  },
  {
    target: '#shopify-section-sections--*[data-section-type="hero"] , .hero, [class*="hero"]',
    title: '🌟 Personalized Gifts',
    content: 'Every gift is aligned with the stars. Our AI helps you find the perfect match for any zodiac sign!',
    voice: 'Every gift is aligned with the stars. Our AI helps you find the perfect match!'
  },
  {
    target: '[class*="gift-finder"], [class*="zodiac"]',
    title: '🔮 Gift Finder',
    content: 'Click any zodiac sign to see curated collections. Each piece is chosen to match the unique energy of every sign!',
    voice: 'Click any zodiac sign to see curated collections chosen to match their unique energy!'
  },
  {
    target: '[class*="product"], .product-grid',
    title: '💎 Premium Collection',
    content: 'Handpicked jewelry and gifts. Hover over any item for quick view, reviews, and instant add to cart!',
    voice: 'Handpicked jewelry and gifts. Hover for quick view, reviews, and instant add to cart!'
  },
  {
    target: '#alignique-chat-btn, .chatbot-widget',
    title: '🤖 AI Assistant',
    content: 'Need help? Click here anytime! I provide personalized recommendations, answer questions, and can even unlock exclusive discounts!',
    voice: 'Need help? Click the chat button anytime for personalized recommendations and exclusive discounts!'
  },
  {
    target: 'footer, .footer',
    title: '📞 Stay Connected',
    content: 'Find contact info, shipping details, and join our newsletter for cosmic insights and special offers!',
    voice: 'Find contact info, shipping details, and join our newsletter for cosmic insights!'
  }
];

class AligniqueTour {
  constructor() {
    this.currentStep = 0;
    this.isPlaying = false;
    this.autoPlay = false;
    this.voiceEnabled = false;
    this.synthesis = window.speechSynthesis;
    this.init();
  }

  init() {
    // Check if user has seen tour
    const hasSeenTour = localStorage.getItem('alignique_tour_completed');
    
    if (!hasSeenTour && !sessionStorage.getItem('alignique_tour_shown')) {
      // Show tour after page loads
      setTimeout(() => {
        this.showTourPrompt();
      }, 1500);
      sessionStorage.setItem('alignique_tour_shown', 'true');
    }
  }

  showTourPrompt() {
    const prompt = document.createElement('div');
    prompt.className = 'tour-prompt';
    prompt.innerHTML = `
      <div class="tour-prompt-content">
        <div class="tour-prompt-icon">✨</div>
        <h3>First time at Alignique?</h3>
        <p>Take a quick tour to discover all our cosmic features!</p>
        <div class="tour-prompt-options">
          <label class="tour-option">
            <input type="checkbox" id="tour-voice-enable" />
            <span>🔊 Enable Voice Guide</span>
          </label>
          <label class="tour-option">
            <input type="checkbox" id="tour-autopilot" />
            <span>🚀 Auto-Pilot Mode</span>
          </label>
        </div>
        <div class="tour-prompt-buttons">
          <button class="tour-btn tour-btn-primary" id="start-tour">
            Start Tour (30s)
          </button>
          <button class="tour-btn tour-btn-secondary" id="skip-tour">
            Skip for Now
          </button>
        </div>
        <small style="color: #9CA3AF; margin-top: 10px; display: block;">
          You can always restart the tour from the menu
        </small>
      </div>
    `;

    document.body.appendChild(prompt);

    // Add event listeners
    document.getElementById('start-tour')?.addEventListener('click', () => {
      this.voiceEnabled = document.getElementById('tour-voice-enable')?.checked || false;
      this.autoPlay = document.getElementById('tour-autopilot')?.checked || false;
      prompt.remove();
      this.startTour();
    });

    document.getElementById('skip-tour')?.addEventListener('click', () => {
      prompt.remove();
      localStorage.setItem('alignique_tour_completed', 'skipped');
    });

    // Show prompt with animation
    setTimeout(() => prompt.classList.add('show'), 100);
  }

  startTour() {
    this.currentStep = 0;
    this.isPlaying = true;
    this.createTourOverlay();
    this.showStep(0);
  }

  createTourOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'tour-overlay';
    overlay.className = 'tour-overlay';
    document.body.appendChild(overlay);

    const tooltip = document.createElement('div');
    tooltip.id = 'tour-tooltip';
    tooltip.className = 'tour-tooltip';
    document.body.appendChild(tooltip);
  }

  showStep(stepIndex) {
    if (stepIndex >= TOUR_STEPS.length) {
      this.completeTour();
      return;
    }

    const step = TOUR_STEPS[stepIndex];
    const target = this.findTarget(step.target);

    if (!target) {
      // Skip to next step if target not found
      this.showStep(stepIndex + 1);
      return;
    }

    // Highlight target
    this.highlightElement(target);

    // Show tooltip
    this.showTooltip(target, step, stepIndex);

    // Speak if voice enabled
    if (this.voiceEnabled && this.synthesis) {
      this.speak(step.voice || step.content);
    }

    // Auto-advance if autopilot
    if (this.autoPlay) {
      setTimeout(() => {
        this.nextStep();
      }, 4000); // 4 seconds per step
    }
  }

  findTarget(selector) {
    // Handle multiple selectors
    const selectors = selector.split(',').map(s => s.trim());
    
    for (const sel of selectors) {
      // Handle wildcard selectors
      if (sel.includes('*')) {
        const pattern = sel.replace('*', '');
        const elements = document.querySelectorAll(`[class*="${pattern}"], [id*="${pattern}"]`);
        if (elements.length > 0) return elements[0];
      } else {
        const el = document.querySelector(sel);
        if (el) return el;
      }
    }
    
    return null;
  }

  highlightElement(element) {
    // Remove previous highlights
    document.querySelectorAll('.tour-highlight').forEach(el => {
      el.classList.remove('tour-highlight');
    });

    // Add highlight
    element.classList.add('tour-highlight');
    
    // Scroll into view
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  showTooltip(target, step, stepIndex) {
    const tooltip = document.getElementById('tour-tooltip');
    if (!tooltip) return;

    const rect = target.getBoundingClientRect();
    const progress = ((stepIndex + 1) / TOUR_STEPS.length) * 100;

    tooltip.innerHTML = `
      <div class="tour-tooltip-header">
        <span class="tour-step-number">${stepIndex + 1}/${TOUR_STEPS.length}</span>
        <button class="tour-close" id="tour-close-btn">×</button>
      </div>
      <h3>${step.title}</h3>
      <p>${step.content}</p>
      <div class="tour-progress">
        <div class="tour-progress-bar" style="width: ${progress}%"></div>
      </div>
      <div class="tour-tooltip-footer">
        ${stepIndex > 0 ? '<button class="tour-btn-nav" id="tour-prev">← Previous</button>' : '<span></span>'}
        ${!this.autoPlay ? `<button class="tour-btn-nav tour-btn-primary" id="tour-next">
          ${stepIndex < TOUR_STEPS.length - 1 ? 'Next →' : 'Finish ✨'}
        </button>` : `<button class="tour-btn-nav" id="tour-pause">⏸ Pause</button>`}
      </div>
    `;

    // Position tooltip
    this.positionTooltip(tooltip, rect);

    // Show tooltip
    tooltip.classList.add('show');

    // Attach event listeners
    this.attachTooltipListeners();
  }

  positionTooltip(tooltip, targetRect) {
    const tooltipRect = tooltip.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    let top, left;

    // Try to position below target
    if (targetRect.bottom + tooltipRect.height + 20 < viewportHeight) {
      top = targetRect.bottom + 20;
    } else if (targetRect.top - tooltipRect.height - 20 > 0) {
      // Position above if not enough space below
      top = targetRect.top - tooltipRect.height - 20;
    } else {
      // Center vertically if neither works
      top = (viewportHeight - tooltipRect.height) / 2;
    }

    // Center horizontally relative to target
    left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);

    // Keep within viewport
    left = Math.max(20, Math.min(left, viewportWidth - tooltipRect.width - 20));
    top = Math.max(20, Math.min(top, viewportHeight - tooltipRect.height - 20));

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
  }

  attachTooltipListeners() {
    document.getElementById('tour-next')?.addEventListener('click', () => this.nextStep());
    document.getElementById('tour-prev')?.addEventListener('click', () => this.prevStep());
    document.getElementById('tour-close-btn')?.addEventListener('click', () => this.endTour());
    document.getElementById('tour-pause')?.addEventListener('click', () => this.toggleAutoPilot());
  }

  nextStep() {
    this.currentStep++;
    this.showStep(this.currentStep);
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.showStep(this.currentStep);
    }
  }

  toggleAutoPilot() {
    this.autoPlay = !this.autoPlay;
    const btn = document.getElementById('tour-pause');
    if (btn) {
      btn.textContent = this.autoPlay ? '⏸ Pause' : '▶ Resume';
    }
    
    if (this.autoPlay) {
      setTimeout(() => this.nextStep(), 4000);
    }
  }

  speak(text) {
    if (!this.synthesis) return;

    // Cancel any ongoing speech
    this.synthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;

    // Try to use a nice voice
    const voices = this.synthesis.getVoices();
    const preferredVoice = voices.find(v => 
      v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Google')
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    this.synthesis.speak(utterance);
  }

  endTour() {
    this.isPlaying = false;
    
    // Stop speech
    if (this.synthesis) {
      this.synthesis.cancel();
    }

    // Remove highlights
    document.querySelectorAll('.tour-highlight').forEach(el => {
      el.classList.remove('tour-highlight');
    });

    // Remove overlay and tooltip
    document.getElementById('tour-overlay')?.remove();
    document.getElementById('tour-tooltip')?.remove();

    localStorage.setItem('alignique_tour_completed', 'ended');
  }

  completeTour() {
    // Stop speech
    if (this.synthesis) {
      this.synthesis.cancel();
    }

    // Show completion message
    const tooltip = document.getElementById('tour-tooltip');
    if (tooltip) {
      tooltip.innerHTML = `
        <div class="tour-complete">
          <div class="tour-complete-icon">🎉</div>
          <h3>Tour Complete!</h3>
          <p>You're all set to explore Alignique!</p>
          <p style="margin-top: 12px; font-size: 0.9em; color: #9CA3AF;">
            Remember: Our AI assistant is always here to help. Just click the chat button!
          </p>
          <button class="tour-btn tour-btn-primary" id="tour-finish" style="margin-top: 20px;">
            Start Shopping ✨
          </button>
        </div>
      `;

      document.getElementById('tour-finish')?.addEventListener('click', () => {
        this.endTour();
      });
    }

    localStorage.setItem('alignique_tour_completed', 'true');

    // Remove after a few seconds
    setTimeout(() => {
      this.endTour();
    }, 5000);
  }
}

// Add tour restart button to page
function addTourRestartButton() {
  // Add to footer or menu
  const restartBtn = document.createElement('button');
  restartBtn.className = 'tour-restart-btn';
  restartBtn.innerHTML = '🎯 Take Tour';
  restartBtn.title = 'Restart website tour';
  restartBtn.addEventListener('click', () => {
    if (window.aligniqueTour) {
      window.aligniqueTour.startTour();
    }
  });
  document.body.appendChild(restartBtn);
}

// Initialize tour when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.aligniqueTour = new AligniqueTour();
    addTourRestartButton();
  });
} else {
  window.aligniqueTour = new AligniqueTour();
  addTourRestartButton();
}
