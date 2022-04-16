// ==UserScript==
// @name         vcpkg
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://vcpkg.io/en/packages.html*
// @icon         https://www.google.com/s2/favicons?domain=vcpkg.io
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  document.getElementById('pkg-search').focus()
})();
