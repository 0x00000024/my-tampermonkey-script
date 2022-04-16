// ==UserScript==
// @name         Google
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include      *://*.google*/search*
// @exclude      *://*.google*/search?tbm=shop*
// @icon         https://www.google.com/s2/favicons?domain=google.com
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @resource     customCSS https://raw.githubusercontent.com/0x00000024/my-tampermonkey-script/main/google/build/stylesheets/google.css
// @run-at       document-start
// ==/UserScript==

(function() {
  'use strict';
  console.debug('start: add CSS');
  const cssTxt = GM_getResourceText("customCSS");
  GM_addStyle(cssTxt);
  console.debug('done: add CSS');
})();
