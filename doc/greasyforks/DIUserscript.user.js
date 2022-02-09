// ==UserScript==
// @name (Greasy Forks) DIUserscript for AudioAddict platforms
// @namespace LTKDIFMU
// @author LethaK Maas
// @license WTFPL
// @description Fanmade script, Removing audio & visual Ads, allowing ad-blockers, allowing to be away from keyboard (AFK) without audio interruption on websites & webradios using the platform from AudioAddict.com
// @include https://*.di.fm*
// @include https://di.fm
// @include https://*.classicalradio.com*
// @include https://classicalradio.com
// @include https://*.radiotunes.com*
// @include https://radiotunes.com
// @include https://*.jazzradio.com*
// @include https://jazzradio.com
// @include https://*.rockradio.com*
// @include https://rockradio.com
// @include https://*.zenradio.com*
// @include https://zenradio.com
// @homepage https://github.com/lethak/LTKDIFMU-userscript
// @downloadURL https://raw.githubusercontent.com/lethak/LTKDIFMU-userscript/live/DIUserscript.user.js
// @updateURL https://raw.githubusercontent.com/lethak/LTKDIFMU-userscript/live/DIUserscript.meta.js
// @icon https://i.imgur.com/vhn9FD6.png
// @noframes
// @grant GM_info
// @grant GM_listValues
// @grant GM_deleteValue
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_addValueChangeListener
// @grant GM_removeValueChangeListener
// @grant GM_download
// @inject-into page
// @run-at document-start
// @version 2021.0.0
// ==/UserScript==
var readmeUrl = 'https://github.com/lethak/LTKDIFMU-userscript/tree/live/doc/greasyforks/README.md';
var gfMessage = '<strong>DIUserscript</strong>: You installed LTKDIFMU-userscript using Greasy Forks which is an old site with limits preventing us to deploy our fully packaged modern script. <strong>Therefore, you need to re-install it from our github to enjoy the features. <a href="'+readmeUrl+'">CLICK HERE</a></strong>';
setInterval( function() {
  if (di && di.app && di.app.commands) {
    di.app.commands.execute('message:warn:persistent', gfMessage);
  }
}, 1000)
console.error(gfMessage, { readmeUrl: readmeUrl });
