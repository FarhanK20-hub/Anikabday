document.addEventListener('DOMContentLoaded', () => {
  
  /* --- 1. HERO ANIMATION & START --- */
  const heroTexts = document.querySelectorAll('.hero-text');
  const heroFinal = document.getElementById('hero-final');
  const startBtn = document.getElementById('start-btn');
  const heroSection = document.getElementById('hero');
  const mainContent = document.getElementById('main-content');
  const softWord = document.getElementById('soft-word');

  // Sequence the hero texts
  let delay = 1000;
  heroTexts.forEach((text, index) => {
    setTimeout(() => {
      text.classList.add('active');
      
      // Remove previous text after a delay, except for the last one which transitions to final
      setTimeout(() => {
        text.classList.remove('active');
      }, 2500); // 2.5s display time
      
    }, delay);
    delay += 3500; // time between texts
  });

  // Show final hero CTA
  setTimeout(() => {
    heroFinal.classList.add('active');
  }, delay - 1000);

  startBtn.addEventListener('click', () => {
    // Fade out hero
    heroSection.style.transition = 'opacity 1s ease';
    heroSection.style.opacity = '0';
    
    // Play music if allowed (browsers might block it, but since it's a click event it should work)
    const audio = document.getElementById('bg-music');
    if (audio) {
      audio.play().catch(e => console.log('Audio autoplay blocked', e));
      document.getElementById('music-btn').classList.add('playing');
    }

    setTimeout(() => {
      heroSection.style.display = 'none';
      mainContent.style.display = 'block';
      // Trigger observers on newly visible content
      window.scrollTo(0, 0);
    }, 1000);
  });


  /* --- 2. SCROLL ANIMATIONS (Intersection Observer) --- */
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -15% 0px', // Trigger slightly before the element hits the bottom
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Special case for the word "soft" in chapter 1
        if (entry.target.innerHTML.includes('soft-word')) {
          setTimeout(() => {
            if(softWord) softWord.style.opacity = '1';
          }, 1500); // Delay for "soft" to appear after the sentence
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => observer.observe(el));


  /* --- 3. INTERACTIVE ELEMENTS --- */
  
  // Cards (Things I love, Memories)
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });

  // Bubbles (Stupid Little World jokes)
  const bubbles = document.querySelectorAll('.bubble');
  bubbles.forEach(bubble => {
    bubble.addEventListener('click', () => {
      bubble.classList.toggle('revealed');
    });
  });

  // Envelopes (Open When)
  const envelopes = document.querySelectorAll('.envelope');
  envelopes.forEach(envelope => {
    envelope.addEventListener('click', () => {
      const isOpen = envelope.classList.contains('open');
      // Close all others
      envelopes.forEach(env => env.classList.remove('open'));
      // Toggle current
      if (!isOpen) {
        envelope.classList.add('open');
        // Optional: Scroll to it
        setTimeout(() => {
          envelope.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }
    });
  });


  /* --- 4. EASTER EGG --- */
  const easterEgg = document.getElementById('easter-egg');
  const easterMsg = document.getElementById('easter-msg');
  const lastSection = document.getElementById('chapter-12');

  const finalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // When user reaches the final section, wait several seconds then show the octopus
        setTimeout(() => {
          easterEgg.classList.add('visible');
        }, 8000); // Wait 8 seconds at the end
      }
    });
  }, { threshold: 0.5 });

  if (lastSection) {
    finalObserver.observe(lastSection);
  }

  easterEgg.addEventListener('click', () => {
    easterMsg.classList.toggle('show');
  });


  /* --- 5. BACKGROUND MUSIC BUTTON --- */
  const musicBtn = document.getElementById('music-btn');
  const audio = document.getElementById('bg-music');
  
  musicBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      musicBtn.classList.add('playing');
    } else {
      audio.pause();
      musicBtn.classList.remove('playing');
    }
  });


  /* --- 6. BACKGROUND HEARTS GLOBALLY --- */
  function createHearts() {
    const container = document.getElementById('hearts-container');
    if (!container) return;
    const heartCount = 35; // Number of floating hearts
    
    for (let i = 0; i < heartCount; i++) {
      const heart = document.createElement('div');
      heart.classList.add('heart-float');
      heart.innerHTML = '&#x2764;'; // Heart character
      
      // Random position along X axis
      const left = Math.random() * 100;
      
      // Random size
      const size = Math.random() * 1.5 + 0.5;
      
      // Random animation duration
      const duration = (Math.random() * 15 + 10) + 's';
      
      // Random animation delay so they don't all start at once
      const delay = (Math.random() * 10) + 's';
      
      heart.style.left = left + '%';
      heart.style.fontSize = size + 'rem';
      heart.style.setProperty('--duration', duration);
      heart.style.animationDelay = delay;
      
      container.appendChild(heart);
    }
  }
  
  createHearts();

});
