// ==UserScript==
// @name         Dict.cn
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       Ethan Yu
// @match        *://*.dict.cn/*
// @icon         https://www.google.com/s2/favicons?domain=dict.cn
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';

    const cssURL = 'https://raw.githubusercontent.com/0x00000024/my-tampermonkey-script/main/dict.cn/build/stylesheets/dict.cn.css';

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
