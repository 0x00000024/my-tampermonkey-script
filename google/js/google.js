// ==UserScript==
// @name         Google
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  try to take over the world!
// @author       Ethan Yu
// @include      *://*.google*/search*
// @exclude      *://*.google*/search?tbm=shop*
// @icon         https://www.google.com/s2/favicons?domain=google.com
// @updateURL    https://raw.githubusercontent.com/0x00000024/my-tampermonkey-script/main/google/js/google.js
// @downloadURL  https://raw.githubusercontent.com/0x00000024/my-tampermonkey-script/main/google/js/google.js
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
  'use strict';

  const cssURL = 'https://raw.githubusercontent.com/0x00000024/my-tampermonkey-script/main/google/build/stylesheets/google.css';

  console.debug('start: add CSS');

  GM_xmlhttpRequest({
    method: "GET",
    url: cssURL,
    onload: function(response) {
      GM_addStyle(response.responseText);
      console.debug('done: add CSS');
    }
  });
})();
