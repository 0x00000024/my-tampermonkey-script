// ==UserScript==
// @name         Vocabulary.com Enhancements
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Enhance vocabulary.com with custom styles
// @author       Ethan Yu
// @match        *://*.vocabulary.com/*
// @icon         https://www.google.com/s2/favicons?domain=vocabulary.com
// @updateURL    https://raw.githubusercontent.com/0x00000024/my-tampermonkey-script/main/vocabulary.com/js/vocabulary.com.js
// @downloadURL  https://raw.githubusercontent.com/0x00000024/my-tampermonkey-script/main/vocabulary.com/js/vocabulary.com.js
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';

    // Update the CSS URL if necessary to point to a stylesheet applicable for vocabulary.com
    const cssURL = 'https://raw.githubusercontent.com/0x00000024/my-tampermonkey-script/main/vocabulary.com/build/stylesheets/vocabulary.com.css';

    console.debug('start: add CSS');

    GM_xmlhttpRequest({
        method: "GET",
        url: cssURL,
        onload: function (response) {
            GM_addStyle(response.responseText);
            console.debug('done: add CSS');
        }
    });
})();
