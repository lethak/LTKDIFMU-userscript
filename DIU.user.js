// ==UserScript==
// @name        Rednote
// @namespace   rednote
// @version     0.4.0
// @author      LethaK Maas
// @description Removes afk popup and minimize ads if possible
// @include     http://www.di.fm*
// @include     http://www.di.fm/*
// @xdownloadURL http://FIXME.user.js
// @xupdateURL   http://FIXME.meta.js
// @icon        http://i.imgur.com/7yj2PGY.png
// @grant       none
// ==/UserScript==
(function () {

setInterval(function(){
di.app.timedAlerts.stop();
AudioAddict.WP.AdManager.providers = {}
AudioAddict.webplayer.adblocks.gracePeriodTimer_.finish_();
},2000);

}) ()
