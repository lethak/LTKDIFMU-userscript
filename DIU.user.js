// ==UserScript==
// @name        Digitally Imported Userscript
// @namespace   LTKDIFMU
// @version     2017.3.19
// @author      LethaK Maas
// @description Removes afk popup and minimize ads if possible
// @include     http://www.di.fm*
// @include     http://www.di.fm/*
// @downloadURL https://github.com/lethak/digitally_imported_userscript/raw/master/DIU.user.js
// @updateURL   https://github.com/lethak/digitally_imported_userscript/raw/master/DIU.meta.js
// @icon        http://i.imgur.com/7yj2PGY.png
// @grant       none
// ==/UserScript==
setTimeout(function () {
    setInterval(function(){
        // Member Premium Emulator (less ads)
        try{
            di.app.MemberApp.Controller.models.member.attributes.user_type = "premium";
            di.app.MemberApp.Controller.models.member.attributes.confirmed = true;
            di.app.MemberApp.Controller.models.member.attributes.confirmed_at = di.app.MemberApp.Controller.models.member.attributes.created_at;
        }catch(err){}
        di.app.module("WebplayerApp.IcecastPlayer.player.member").getAccess = function() { console.warn('[DIUserscript] member.getAccess: %s', 'premium'); return "premium"; };


    }, 100);
    setInterval(function(){

        try{
            var WebplayerApp = di.app.module("WebplayerApp");


            // Ads Blocks
            WebplayerApp.Ads.Adblocks.logger = new di.log.Console("WebplayerApp.Ads.Adblocks [DIUserscript]");
            WebplayerApp.Ads.Adblocks.onAdBlockEnd = function(){
                console.warn('[DIUserscript] Adblocks.onAdBlockEnd');
                this.adblockActive = !1;
                di.eventbus.trigger("webplayer:adblock:end");
            };
            //WebplayerApp.Ads.Adblocks.onAdBegin = function(e, t) {
            //    console.warn('[DIUserscript] Adblocks.onAdBegin: void');
            //    return void 0;
            //};
            WebplayerApp.Ads.Adblocks.adHasVisual = function(){
                console.warn('[DIUserscript] Adblocks.adHasVisual: false');
                return false;
            };
            WebplayerApp.Ads.Adblocks._events.start[0] = function(e){
                console.warn('[DIUserscript] Adblocks._events.start: void 0; (premium)');
                return void 0;
            };

            di.app.WebplayerApp.Ads.Supervisor._events.start[0].callback = function(e){
                console.warn('[DIUserscript] Ads.Supervisor._events.start: void 0; (premium)');
                return void 0;
            };


            // Ads Supervisor
            WebplayerApp.Ads.Supervisor.logger = new di.log.Console("WebplayerApp.Ads.Supervisor [DIUserscript]");
            WebplayerApp.Ads.Supervisor.supervise = function(e){};
            WebplayerApp.Ads.Supervisor.eligibleForPreroll = function(){
                console.warn('[DIUserscript] Ads.Supervisor.eligibleForPreroll: false');
                return false;
            };
            WebplayerApp.Ads.Supervisor.eligibleForMidroll = function(){
                console.warn('[DIUserscript] Ads.Supervisor.eligibleForMidroll: false');
                return false;
            };
            WebplayerApp.Ads.Supervisor.requestAd = function(e){
                console.warn('[DIUserscript] Ads.Supervisor.requestAd: resolved promise');
                return jQuery.Deferred().resolve().promise();
            };
            WebplayerApp.Ads.Supervisor.selectAds_ = function(e){
                console.warn('[DIUserscript] Ads.Supervisor.selectAds_: []');
                return [];
            };
            WebplayerApp.Ads.Supervisor.startAd = function(e){
                console.warn('[DIUserscript] Ads.Supervisor.selectAds_: []');
                //return jQuery.Deferred().resolve().promise();
            };

            // Silence ads whenever they get played ...
            jQuery(document).off("ad-begin.diu").on("ad-begin.diu", function(e, x){
                console.warn('[DIUserscript] Ad begin (muting)', e, x);
                //jQuery(document).trigger("metadata-track-complete", [jQuery.extends(x, {duration: 1000, ended: x.started+1000, length: 1})]);
                //AudioAddict.WP.wp.mute();
                di.app.WebplayerApp.IcecastPlayer.player.mute();
            });
            jQuery(document).off("ad-end.diu").on("ad-end.diu", function(e, x){
                console.warn('[DIUserscript] Ad end (unmuting)', e, x);
                //AudioAddict.WP.wp.unMute();
                di.app.WebplayerApp.IcecastPlayer.player.unMute();
            });

            //// Emptying ad providers
            //var defaultProvider = function(e){
            //    if (this.type = "default", this.isReady = e.yes, this.isExternal = e.no, this.hasBanner = e.yes, this.begin = function() {
            //            return console.warn("[DIUserscript] AudioAddict.WP.AdProvider_X: Beginning ad"), t.show(), this
            //        }, this.end = function() {
            //            return console.warn("[DIUserscript] AudioAddict.WP.AdProvider_X: Ending ad"), t.hide(), this
            //        }, "undefined" == typeof e)
            //        throw "[DIUserscript] AudioAddict.WP.AdProvider_X: FATAL: Ad manager reference object not provided";
            //    var t = $("#adprovider-default").appendTo(e.canvas()).hide()
            //};
            //
            //
            ////di.eventbus.trigger = function (e, tpl, tplB){
            ////    console.warn('EVENTBUS', e);
            ////};
            //
            //NS("AudioAddict.WP.AdManager.providers").default = defaultProvider;
            //NS("AudioAddict.WP.AdManager.providers").internal = null;
            //NS("AudioAddict.WP.AdManager.providers").adswizz = null;

            //NS("AudioAddict.WP.AdManager").providers = null;
            //NS("AudioAddict.WP.AdManager.providers");
            //di.app.module("WebplayerApp.app.webplayer").submodules.ads = null;
            //di.app.webplayer.ads = null;


            // //NS("AudioAddict.WP.wp").initAdManager = function(){ return null;};
            // //di.app.WebplayerApp.Ads.Provider = null;
            // //AudioAddict.WP.wp.adManager.stop();
            // //AudioAddict.WP.adManager = null;
            // //AudioAddict.WP.wp.adManager = null;
            // //NS("AudioAddict.WP").AdManager = null;
            // //NS("AudioAddict.WP").AdProvider = null;
            // //jQuery('[id^="adprovider"]').remove();

            // Removing Premium ad display
            jQuery('.premium-upsell').remove();

            // Breaking anti AFK system
            di.app.timedAlerts.stop();
            di.eventbus.trigger('user:active');

        } catch(err){
            console.error('[DIUserscript] An error occured: %s', err.message, err);
        }

    }, 1000);
}, 2000);
