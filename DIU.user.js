// ==UserScript==
// @name        Digitally Imported Userscript
// @namespace   LTKDIFMU
// @version     2017.3.18
// @author      LethaK Maas
// @description Removes afk popup and minimize ads if possible
// @include     http://www.di.fm*
// @include     http://www.di.fm/*
// @downloadURL https://github.com/lethak/digitally_imported_userscript/raw/master/DIU.user.js
// @updateURL   https://github.com/lethak/digitally_imported_userscript/raw/master/DIU.meta.js
// @icon        http://i.imgur.com/7yj2PGY.png
// @grant       none
// ==/UserScript==
(function () {
    setInterval(function(){

        try{


            jQuery('[id^="adprovider"]').remove();
            //$(document).trigger("ad-end");
            //di.eventbus.trigger("webplayer:ad:end");

            jQuery(document).on("ad-begin", function(e){
                console.warn('Ad begin event (muting) ', e);
                AudioAddict.WP.wp.mute();
            });
            jQuery(document).on("ad-end", function(e){
                console.warn('Ad end event (unmuting) ', e);
                AudioAddict.WP.wp.unMute();
            });


            di.app.module("WebplayerApp.Ads.Adblocks").logger = new di.log.Console("WebplayerApp.Ads.Adblocks (Silenced)");
            di.app.module("WebplayerApp.Ads.Supervisor").logger = new di.log.Console("WebplayerApp.Ads.Supervisor (Silenced)");

            di.app.module("WebplayerApp.Ads.Adblocks").adHasVisual = function(){
                return false;
            };

            di.app.module("WebplayerApp.Ads.Adblocks").onAdBlockEnd = function(){
                this.adblockActive = !1;
                di.eventbus.trigger("webplayer:adblock:end");
            };

            di.app.module("WebplayerApp.Ads.Adblocks").onAdBegin = function(e, t) {
                return void 0;
            };

            NS("AudioAddict.WP.AdManager").providers = null;
            NS("AudioAddict.WP.AdManager.providers");

            di.app.module("WebplayerApp.Ads.Supervisor").supervise = function(e){};
            di.app.module("WebplayerApp.Ads.Supervisor").eligibleForPreroll = function(){return false;};
            di.app.module("WebplayerApp.Ads.Supervisor").eligibleForMidroll = function(){return false;};
            di.app.module("WebplayerApp.Ads.Supervisor").requestAd = function(e){};
            di.app.module("WebplayerApp.Ads.Supervisor").selectAds_ = function(e){return [];};
            di.app.module("WebplayerApp.Ads.Supervisor").startAd = function(e){return };
            di.app.module("WebplayerApp.app.webplayer").submodules.ads = null;
            di.app.timedAlerts.stop();
            di.app.WebplayerApp.Ads.Provider = null;
            //AudioAddict.WP.wp.adManager.stop();

            //AudioAddict.WP.adManager = null;
            //AudioAddict.WP.wp.adManager = null;

            NS("AudioAddict.WP").AdManager = null;
            NS("AudioAddict.WP").AdProvider = null;
            di.app.webplayer.ads = null;

            NS("AudioAddict.WP.wp").initAdManager = function(){ return null;};


            jQuery('.premium-upsell').remove();
        } catch(ex){
            console.warn('An error occured while silencing ads', ex);
        }

    }, 500);
})();
