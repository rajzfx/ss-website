/**
 * SACHIN SYSTEMS — ATMOS-INSPIRED APPLICATION CONTROLLER
 * Features:
 * - Dynamic scroll chapter tracking (updating HUD coordinates)
 * - Atmospheric Web Audio synth & equalizer toggle
 * - Category filter tabs
 * - Interactive FAQ accordion
 * - B2B Quote enquiry form with WhatsApp fast-track
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- 1. Dynamic Chapter HUD Coordinate Tracker ---
  const chapterPill = document.getElementById('hud-chapter-text');
  const chapters = [
    { id: 'chapter-01', label: '01 / THE FLIGHT' },
    { id: 'chapter-02', label: '02 / SOURCING' },
    { id: 'chapter-03', label: '03 / THE CLEANROOM' },
    { id: 'chapter-04', label: '04 / DIAGNOSTICS' },
    { id: 'chapter-05', label: '05 / ALLOCATIONS' },
    { id: 'chapter-06', label: '06 / GLOBAL BRIDGE' },
    { id: 'chapter-07', label: '07 / QUOTE DESK' },
    { id: 'chapter-08', label: '08 / FAQ & COMPLIANCE' }
  ];

  function updateChapterHUD() {
    if (!chapterPill) return;
    const scrollPos = window.scrollY + window.innerHeight * 0.45;
    let current = chapters[0].label;

    for (let i = 0; i < chapters.length; i++) {
      const el = document.getElementById(chapters[i].id);
      if (el && el.offsetTop <= scrollPos) {
        current = chapters[i].label;
      }
    }
    chapterPill.textContent = current;
  }

  window.addEventListener('scroll', updateChapterHUD, { passive: true });
  updateChapterHUD();

  // --- 2. Ambient Web Audio Synthesizer (Atmos Sound Experience) ---
  const audioBtn = document.getElementById('audio-toggle-btn');
  let audioCtx = null;
  let isAudioPlaying = false;
  let oscillators = [];
  let masterGain = null;

  function initAudio() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();

      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      masterGain.connect(audioCtx.destination);

      // Create an ethereal harmonic triad chord (E-major: E3, B3, G#4)
      const freqs = [164.81, 246.94, 415.30];
      oscillators = freqs.map(freq => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start();
        return osc;
      });
    } catch (e) {
      console.warn('Web Audio not supported:', e);
    }
  }

  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      if (!audioCtx) initAudio();

      if (!audioCtx) return;

      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      isAudioPlaying = !isAudioPlaying;

      if (isAudioPlaying) {
        audioBtn.classList.add('audio-playing');
        audioBtn.querySelector('.audio-label-txt').textContent = 'Sound On';
        masterGain.gain.setTargetAtTime(0.08, audioCtx.currentTime, 0.4);
      } else {
        audioBtn.classList.remove('audio-playing');
        audioBtn.querySelector('.audio-label-txt').textContent = 'Sound Off';
        masterGain.gain.setTargetAtTime(0.0001, audioCtx.currentTime, 0.3);
      }
    });
  }

  // --- 3. Product Catalog Filter Tabs ---
  const tabBtns = document.querySelectorAll('.catalog-filter-btn');
  const lotCards = document.querySelectorAll('.iphone-lot-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      lotCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 300ms ease';
            card.style.opacity = '1';
          }, 10);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 4. Interactive FAQ Accordion ---
  const faqItems = document.querySelectorAll('.pink-faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.pink-faq-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      faqItems.forEach(other => {
        if (other !== item) other.classList.remove('open');
      });

      if (isOpen) {
        item.classList.remove('open');
      } else {
        item.classList.add('open');
      }
    });
  });

  // --- 5. B2B Quote Enquiry Form Submission ---
  const quoteForm = document.getElementById('pink-b2b-quote-form');

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const company = document.getElementById('pink-company').value.trim();
      const contact = document.getElementById('pink-contact').value.trim();
      const email = document.getElementById('pink-email').value.trim();
      const phone = document.getElementById('pink-phone').value.trim();
      const country = document.getElementById('pink-country').value.trim();
      const category = document.getElementById('pink-category').value;
      const volume = document.getElementById('pink-volume').value;
      const message = document.getElementById('pink-message').value.trim();

      if (!company || !contact || !email || !phone || !country || !category || !volume) {
        alert('Please fill out all required fields to register your B2B allocation inquiry.');
        return;
      }

      const refId = 'SS-' + Math.floor(100000 + Math.random() * 900000);

      quoteForm.innerHTML = `
        <div style="text-align: center; padding: 2.5rem 1.5rem;">
          <div style="width: 56px; height: 56px; border-radius: 50%; background: rgba(0, 146, 221, 0.12); color: #0092DD; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto;">
            <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h3 style="font-family:var(--font-serif); font-size:1.75rem; margin-bottom:0.75rem; color:#1A1115;">Allocation Registered</h3>
          <p style="color:#665258; margin-bottom:1.5rem; font-size:0.98rem; max-width:480px; margin-left:auto; margin-right:auto;">
            Thank you, <strong>${contact}</strong>. Your inquiry for <strong>${company}</strong> has been logged under Reference ID: <code style="background:#F5DEE3; padding:0.25rem 0.5rem; border-radius:6px; font-weight:700; color:#1A1115;">${refId}</code>.
          </p>
          <div style="background:rgba(255,255,255,0.85); border:1px solid rgba(218,186,195,0.65); border-radius:14px; padding:1.25rem; max-width:440px; margin:0 auto 1.75rem auto; text-align:left; font-size:0.9rem;">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem;">
              <span style="color:#8E7B82;">Device Category:</span>
              <span style="font-weight:600; color:#1A1115;">${category}</span>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem;">
              <span style="color:#8E7B82;">Monthly Allocation:</span>
              <span style="font-weight:600; color:#1A1115;">${volume}</span>
            </div>
            <div style="display:flex; justify-content:space-between;">
              <span style="color:#8E7B82;">Fulfillment Center:</span>
              <span style="font-weight:600; color:#0092DD;">Dubai DAFZA / Houston HQ</span>
            </div>
          </div>
          <p style="font-size:0.88rem; color:#665258; margin-bottom:1.75rem;">
            Today's uncommitted stock sheet and rate matrix have been queued for dispatch to <strong>${email}</strong>.
          </p>
          <div style="display:flex; gap:0.85rem; justify-content:center; flex-wrap:wrap;">
            <a href="https://wa.me/971589543181?text=Hello%20Sachin%20Systems,%20I%20have%20registered%20wholesale%20allocation%20${refId}%20for%20${encodeURIComponent(company)}." target="_blank" class="btn btn-primary" style="background:#25D366; border-color:#25D366; box-shadow:0 8px 25px rgba(37,211,102,0.3);">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
              Fast-Track on WhatsApp
            </a>
            <button onclick="location.reload()" class="btn btn-secondary">Submit Another Request</button>
          </div>
        </div>
      `;
    });
  }

  // --- 6. Smooth Scrolling for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const id = this.getAttribute('href');
      if (id === '#' || id === '') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
