// ==UserScript==
// @name        Digitally Imported Userscript
// @namespace   LTKDIFMU
// @version     2017.4.0
// @author      LethaK Maas
// @description Removes afk popup and minimize ads if possible
// @include     http://www.di.fm*
// @include     http://www.di.fm/*
// @downloadURL https://github.com/lethak/digitally_imported_userscript/raw/master/DIU.user.js
// @updateURL   https://github.com/lethak/digitally_imported_userscript/raw/master/DIU.meta.js
// @icon        http://i.imgur.com/7yj2PGY.png
// @grant       none
// ==/UserScript==
(function(){

    console.warn('[DIUserscript] Initializing');

    window.trackCandidate = null;


    var defineProp = function(obj, propName, propValue){
        delete obj[propName];
        Object.defineProperty(obj, propName, {
            value: propValue,
            writable : false,
            enumerable : true,
            configurable : false
        });
        return obj;
    };

    var WebplayerApp = di.app.module("WebplayerApp");

    // Ads Adblocks...
    defineProp(WebplayerApp.Ads.Adblocks, 'logger', new di.log.Console("(DIUserscript) WebplayerApp.Ads.Adblocks "));

    defineProp(WebplayerApp.Ads.Adblocks, 'adHasVisual', function(){
        console.warn('[DIUserscript] Ads.Adblocks.adHasVisual: false');
        return false; // Prevents the player popup from displaying during 'Sponsored Message' ad
    });

    // Ads Supervisor...
    NS('di.app.WebplayerApp.Ads.Supervisor');
    defineProp(di.app.WebplayerApp.Ads.Supervisor, 'logger',  new di.log.Console("(DIUserscript) WebplayerApp.Ads.Supervisor "));

    defineProp(di.app.WebplayerApp.Ads.Supervisor, 'selectAds_', function(e){
        console.warn('[DIUserscript] Ads.Supervisor.selectAds_: []', this);
        return [];
    });
    defineProp(di.app.WebplayerApp.Ads.Supervisor, 'requestAd', function(e){
        console.warn('[DIUserscript] Ads.Supervisor.requestAd: false');
        return jQuery.Deferred().reject().promise();
    });
    defineProp(di.app.WebplayerApp.Ads.Supervisor, 'eligibleForPreroll', function(){
        console.warn('[DIUserscript] Ads.Supervisor.eligibleForPreroll: false');
        return false;
    });
    defineProp(di.app.WebplayerApp.Ads.Supervisor, 'eligibleForMidroll', function(){
        console.warn('[DIUserscript] Ads.Supervisor.eligibleForMidroll: false');
        return false;
    });
    defineProp(di.app.WebplayerApp.Ads.Supervisor, 'startAd', function(){
        console.warn('[DIUserscript] Ads.Supervisor.startAd: void 0');
        return jQuery.Deferred().reject().promise();
    });

    // AdManagers !
    /*
     (AudioAddict.WP.wp.adManager) instanceof (window.AdManager) // true
     (AudioAddict.WP.AdManager) instanceof (window.AdManager) // false, object
     (AudioAddict.WP.wp.adManager) // object
     */

    // Silence ads whenever they get played ...
    jQuery(document).off("ad-begin.diu").on("ad-begin.diu", function(e, x){
        console.warn('[DIUserscript] Ad begin (muting)', e, x);
        if(trackCandidate!==null){
            //AudioAddict.WP.wp.adapter.load(trackCandidate);
        }
        AudioAddict.WP.wp.tempMute();
    });
    jQuery(document).off("ad-end.diu").on("ad-end.diu", function(e, x){
        console.warn('[DIUserscript] Ad end (unmuting)', e, x);
        AudioAddict.WP.wp.tempUnMute();
    });

    // WebPlayer...

    /*
     (AudioAddict.WP.wp) instanceof (AudioAddict.WP.WebPlayer) //true
     (AudioAddict.WP.wp.channel) instanceof (window.Channel) // true
     */

    NS('AudioAddict.WP.WebPlayer').prototype.logger = new di.log.Console("(DIUserscript) AudioAddict.WP.WebPlayer");

    // Member...
    defineProp(window, 'Member', function(e) {
        if (this.getAccess = function() {
                console.warn('[DIUserscript] Member getAccess (premium) instead of ', n);
                return 'premium';
            }
                ,
                this.setAccess = function(e) {
                    e != n && (n = e,
                        $(document).trigger("member-access", 'premium'));
                }
                ,
                this.getListenKey = function() {
                    return i;
                }
                ,
                this.setListenKey = function(e) {
                    e != i && (i = e ? e : "",
                        $(document).trigger("member-listenkey", e));
                }
                ,
                this.getSpeed = function() {
                    var e = t.wp.streamlist.getSpeeds(t.wp.member.getAccess(), "webplayer");
                    return e[r] && "object" == typeof e[r] ? r : ($.log(LogPrefix() + "(DIUserscript) AudioAddict.WP.Member: Current speed {" + r + "} is invalid; defaulting to first available {" + Object.keys(e)[0] + "}"),
                        r = Object.keys(e)[0]);
                }
                ,
            "undefined" == typeof e)
            throw "(DIUserscript) AudioAddict.WP.Member: FATAL: No parameters provided";
        if ("premium" == e.access && !e.listenKey)
            throw "(DIUserscript) AudioAddict.WP.Member: FATAL: listenKey is required for Premium users";
        var t = NS("AudioAddict.WP")
            , n = "premium"/*e.access*/
            , i = e.listenKey ? e.listenKey : ""
            , r = e.speed;
        $.log(LogPrefix() + "(DIUserscript) AudioAddict.WP.Member: Initialized");
    });


    setInterval(function(){
        // Removing Premium ad display
        jQuery('.premium-upsell').remove();
        jQuery('.menu-item.go-premium').remove();
        jQuery('.sidebar-ad-component').remove();

        // Breaking anti AFK system
        di.eventbus.trigger('user:active');
        di.app.timedAlerts.stop();
        jQuery('.modal-btn.continue').click();
        jQuery('.modal-btn.countdown-btn').click();
    }, 1000);



    // R&D
    //jQuery('#player').get(0)._stop();

    //jQuery(document).on('add-new', function(e, d){
    //    console.warn('[DIUserscript] on add-new (nope)', e, d);
    //});

    // Trying to bypass audio ads
    jQuery(document).off("metadata-load.diu").on("metadata-load.diu", function(e,d){
        console.warn('[DIUserscript] metadata-load.diu trackCandidate', e, d);
        trackCandidate = d;
    });


})();
