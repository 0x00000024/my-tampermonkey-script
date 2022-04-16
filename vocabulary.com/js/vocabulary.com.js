// ==UserScript==
// @name         Vocabulary.com
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.vocabulary.com/*
// @icon         https://www.google.com/s2/favicons?domain=vocabulary.com
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @resource     customCSS https://raw.githubusercontent.com/0x00000024/my-tampermonkey-script/main/vocabulary.com/build/stylesheets/vocabulary.com.css
// @run-at       document-start
// ==/UserScript==

(function() {
  'use strict';
  console.debug('start: add CSS');
  const cssTxt = GM_getResourceText("customCSS");
  GM_addStyle(cssTxt);
  console.debug('done: add CSS');
})();
