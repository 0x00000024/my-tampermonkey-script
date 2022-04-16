// ==UserScript==
// @name         manpages.ubuntu.com
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://manpages.ubuntu.com/manpages/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ubuntu.com
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  const jammyElement = document.evaluate('//*[@id="navigation-container"]/li[last()]', document,
    null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
  if (!jammyElement.className.includes('is-selected')) {
    jammyElement.getElementsByTagName('a')[0].click()
  }
})();
