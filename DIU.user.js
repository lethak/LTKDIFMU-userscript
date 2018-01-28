// ==UserScript==
// @name        Digitally Imported Userscript
// @namespace   LTKDIFMU
// @version     2018.1.3
// @author      LethaK Maas
// @description Removes afk popup and minimize ads if possible
// @include     https://*.di.fm*
// @include     https://*.classicalradio.com*
// @include     https://*.radiotunes.com*
// @include     https://*.jazzradio.com*
// @include     https://*.rockradio.com*
// @downloadURL https://raw.githubusercontent.com/lethak/LTKDIFMU-userscript/live/DIUserscript.user.js
// @updateURL   https://raw.githubusercontent.com/lethak/LTKDIFMU-userscript/live/DIUserscript.meta.js
// @icon        http://i.imgur.com/7yj2PGY.png
// @grant       none
// @run-at      document-start
// ==/UserScript==
(function(){
    console.log('[DIUserscript] Initializing (migration version 2018.1.3)');

    document.addEventListener("DOMContentLoaded", function(event) {
        console.log('[DIUserscript] window.document ready');
        initTimeout();
        console.log('[DIUserscript] Initialized');
    });

    /**
     * Executed once, 2s after DOM document is ready
     */
    var initTimeout = function(){
        console.log('[DIUserscript] initTimeout');
        setTimeout(function(){
            jQuery('<li class="menu-item"><a href="https://github.com/lethak/LTKDIFMU-userscript" target="_blank"><i class="icon-forward"></i> <span>DIUserscript</span></a></li>').appendTo('#side-nav ul');
            di.app.commands.execute('message:warn:persistent', '<strong>A message from DIUserscript</strong>: <br>We are changing our GitHub repository name soon, following a Trademark Claim by "Digitally Imported, Inc". <a href="https://github.com/lethak/LTKDIFMU-userscript/blob/live/doc/DigitallyImportedTrademarkClaim.md" target="_blank">Read more</a> or <a href="https://raw.githubusercontent.com/lethak/LTKDIFMU-userscript/live/DIUserscript.user.js" target="_blank">Click here to update now !</a>');
        }, 2000);
    };

})();
