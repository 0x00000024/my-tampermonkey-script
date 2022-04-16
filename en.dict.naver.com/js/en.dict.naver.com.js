// ==UserScript==
// @name         en.dict.naver.com
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://en.dict.naver.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=naver.com
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
  'use strict';

  const findAddWordElementAndClick = () => {
    const addWordElement = document.evaluate('//*[@id="searchPage_entry"]/div/div[1]/div/button', document,
      null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
    addWordElement.click();
  }
  const findSaveWordElementAndClick = () => {
    const saveWordElement = document.evaluate('//*[@id="pcLyAddWordBook"]/div[1]/div[1]/div[3]/a[2]',
      document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
    saveWordElement.click();
  }
  setTimeout(findAddWordElementAndClick, 3000);
  setTimeout(findSaveWordElementAndClick, 5000);
})();
