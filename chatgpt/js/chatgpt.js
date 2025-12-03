// ==UserScript==
// @name         ChatGPT Auto-Run from ?q=
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  Auto-fill and auto-send ChatGPT prompt when URL has ?q= or ?prompt=
// @author       Ethan Yu
// @match        https://chatgpt.com/*
// @match        https://chat.openai.com/*
// @icon         https://www.google.com/s2/favicons?domain=chatgpt.com
// @updateURL    https://raw.githubusercontent.com/0x00000024/my-tampermonkey-script/main/chatgpt/js/chatgpt.js
// @downloadURL  https://raw.githubusercontent.com/0x00000024/my-tampermonkey-script/main/chatgpt/js/chatgpt.js
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  // --- Config ---
  const MAX_TIME = 20000; // how long we keep trying (ms)
  const INTERVAL = 500;   // interval between attempts (ms)

  // --- Helpers ---
  function log(...args) {
    console.log('[ChatGPT Auto-Run]', ...args);
  }

  const url = new URL(window.location.href);
  // Support both ?q= and ?prompt=
  const query = url.searchParams.get('q') || url.searchParams.get('prompt');

  if (!query) {
    log('No ?q= or ?prompt= parameter found, exiting.');
    return;
  }

  log('Script initialized with query:', query);

  const start = Date.now();
  let attempts = 0;

  function findTextarea() {
    // Try several selectors (ChatGPT UI changes often)
    const el =
      document.getElementById('prompt-textarea') ||
      document.querySelector('#prompt-textarea') ||
      document.querySelector('textarea[data-testid="chat-input"]') ||
      document.querySelector('textarea[placeholder^="Message"]');

    if (!el && attempts === 1) {
      log('Textarea not found yet, will keep polling…');
    }
    return el;
  }

  function findSendButton() {
    // Known selectors for the send button
    const btn =
      document.getElementById('composer-submit-button') || // newer id
      document.querySelector("button[data-testid='send-button']") ||
      document.querySelector("button[aria-label*='Send']") ||
      document.querySelector("button[aria-label*='보내기']") ||
      document.querySelector("button[type='submit']");

    if (!btn && attempts === 1) {
      log('Send button not found yet, will keep polling…');
    }
    return btn;
  }

  function fillTextarea(textarea) {
    const current = (textarea.value || '').trim();

    if (current) {
      // Usually when ChatGPT itself pre-fills from ?q=
      log('Textarea already has content, not overwriting. Current value:', current);
      return;
    }

    log('Filling textarea with query…');

    try {
      textarea.focus();
      // execCommand simulates real typing, which helps React enable the send button
      const ok = document.execCommand('insertText', false, query);
      log('execCommand("insertText") result:', ok);
    } catch (e) {
      log('execCommand failed, falling back to value + input event:', e);
      textarea.value = query;
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  function trySend() {
    attempts++;
    log(`Attempt #${attempts}`);

    if (Date.now() - start > MAX_TIME) {
      log('Gave up after timeout. Total attempts:', attempts);
      return;
    }

    const textarea = findTextarea();
    if (!textarea) {
      setTimeout(trySend, INTERVAL);
      return;
    }

    if (attempts === 1) {
      log('Found textarea element:', textarea);
    }

    // Only fill if empty; if ChatGPT already pre-filled from ?q=, we just send it
    fillTextarea(textarea);

    const sendButton = findSendButton();
    if (!sendButton) {
      setTimeout(trySend, INTERVAL);
      return;
    }

    const isDisabled =
      sendButton.disabled ||
      sendButton.getAttribute('aria-disabled') === 'true';

    if (isDisabled) {
      log('Send button found but currently disabled; waiting…');
      setTimeout(trySend, INTERVAL);
      return;
    }

    log('Clicking send button now:', sendButton);
    sendButton.click();
  }

  function startLoop() {
    log('Starting auto-run loop…');
    setTimeout(trySend, 1000);
  }

  if (document.readyState === 'complete') {
    // Page already fully loaded
    startLoop();
  } else {
    window.addEventListener('load', startLoop);
  }
})();
