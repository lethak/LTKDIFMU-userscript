// ==UserScript==
// @name        Digitally Imported Userscript
// @namespace   LTKDIFMU
// @version     2017.8.4
// @author      LethaK Maas
// @description Removes afk popup and minimize ads if possible
// @include     https://*.di.fm*
// @include     https://*.classicalradio.com*
// @include     https://*.radiotunes.com*
// @include     https://*.jazzradio.com*
// @include     https://*.rockradio.com*
// @downloadURL https://github.com/lethak/digitally_imported_userscript/raw/master/DIU.user.js
// @updateURL   https://github.com/lethak/digitally_imported_userscript/raw/master/DIU.meta.js
// @icon        http://i.imgur.com/7yj2PGY.png
// @grant       none
// @run-at      document-start
// ==/UserScript==
(function(){
    console.warn('[DIUserscript] Initializing');

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

    var adSilencer = function(){
        console.warn('[DIUserscript] adSilencer');

        // Silence ads whenever they get played ... (should not be happening, but we never know, the rascals ;)
        di.app.vent.on('webplayer:ad:begin', function(t) {
            console.warn('[DIUserscript] webplayer:ad:begin (mute)', t);
            di.app.commands.execute('webplayer:mute');
        });

        di.app.vent.on('webplayer:ad:end', function(t) {
            console.warn('[DIUserscript] webplayer:ad:end (unmute)', t);
            di.app.commands.execute('webplayer:unmute');
        });
    };

    var redefineTimers = function(){
        console.warn('[DIUserscript] redefineTimers');
        try{
            di.app.WebplayerApp.Ads.Supervisor.timers.gracePeriod.getTimeRemaining = function() { return 1337; };
            di.app.WebplayerApp.Ads.Supervisor.timers.midroll.getTimeRemaining = function() { return 1337; };
            di.app.WebplayerApp.Ads.Supervisor.timers.session.getTimeRemaining = function() { return 1337; };
        } catch(err) {
            console.error('[DIUserscript] redefineTimers error', err.message);
        }
    };

    var redefineCommands = function(){
        console.warn('[DIUserscript] redefineCommands');

        // Go away
        defineProp(di.app.commands._wreqrHandlers['adblocker:enforceWall'], 'callback', function () {
            console.warn('[DIUserscript] adblocker:enforceWall', 'rejected');
            return jQuery.Deferred().reject().promise();
        });

    };

    var redefineReqres = function(){
        console.warn('[DIUserscript] redefineReqres');

        try {

            NS('di.app.reqres._wreqrHandlers');

            // Rejecting ad request
            defineProp(di.app.reqres._wreqrHandlers['webplayer:ads:requestAd'], 'callback', function () {
                console.warn('[DIUserscript] webplayer:ads:requestAd', 'rejected');
                return jQuery.Deferred().reject().promise();
            });

            // Should we show midroll ads ? Nope, no thanks.
            defineProp(di.app.reqres._wreqrHandlers['webplayer:ads:shouldShowMidroll'], 'callback', function () {
                console.warn('[DIUserscript] webplayer:ads:shouldShowMidroll', false);
                return false;
            });

            // Rejecting midroll ad request
            defineProp(di.app.reqres._wreqrHandlers['webplayer:ads:requestMidrollAd'], 'callback', function () {
                console.warn('[DIUserscript] webplayer:ads:requestMidrollAd', 'rejected');
                return jQuery.Deferred().reject().promise();
            });

            // Should we show preroll ads ? Nope, no thanks.
            defineProp(di.app.reqres._wreqrHandlers['webplayer:ads:shouldShowPreroll'], 'callback', function () {
                console.warn('[DIUserscript] webplayer:ads:shouldShowPreroll', false);
                return false;
            });

            // Rejecting preroll ad request
            defineProp(di.app.reqres._wreqrHandlers['webplayer:ads:requestPrerollAd'], 'callback', function () {
                console.warn('[DIUserscript] webplayer:ads:requestPrerollAd', 'rejected');
                return jQuery.Deferred().reject().promise();
            });

            // Anti Adblocker ? kill this with fire ! (mostly impacting free unregistered users)
            defineProp(di.app.reqres._wreqrHandlers['adblocker:detected'], 'callback', function () {
                console.warn('[DIUserscript] adblocker:detected', false);
                return false;
            });

            // Make Adblocker Great Again
            defineProp(di.app.reqres._wreqrHandlers['adblocker:isWallEnforced'], 'callback', function () {
                console.warn('[DIUserscript] adblocker:isWallEnforced', false);
                return false;
            });


            // Always judging people ...
            defineProp(di.app.reqres._wreqrHandlers['current_user:isPremium'], 'callback', function () {
                console.warn('[DIUserscript] current_user:isPremium', true);
                return true;
            });

            // Lets pretend
            var userType = di.app.reqres.request('current_user:type'); // guest|public|premium
            console.warn('[DIUserscript] current_user:type ORIGINAL ', userType);
            if (userType === 'guest') {
                defineProp(di.app.reqres._wreqrHandlers['current_user:type'], 'callback', function () {
                    console.warn('[DIUserscript] current_user:type', 'premium');
                    return 'public';
                });
            }
        }
        catch(err) {
            console.error('[DIUserscript] redefineReqres error', err.message);
        }

    };

    // jQuery(window.document).ready(function() {
    document.addEventListener("DOMContentLoaded", function(event) {
        console.warn('[DIUserscript] window.document ready');

        redefineCommands();
        redefineReqres();
        adSilencer();

        setTimeout(function(){
            // // Improved webplayer quality (3 = High) (disabled, Free Listeners can change it via their account settings)
            // console.warn('[DIUserscript] preferredQuality:set', 3);
            // di.app.commands.execute('preferredQuality:set', 3);
            // setTimeout(function(){
            //     var audioQuality = di.app.reqres.request('audioQualities:selected').attributes;
            //     di.app.commands.execute('message:success', 'Webplayer audio quality is now: '+audioQuality.name+' '+audioQuality.content_quality.name+' '+audioQuality.content_format.name);
            // }, 2000);

            redefineTimers();
            di.app.commands.execute('message:notice', 'DIUserscript is enabled ! enjoy free uninterrupted music');
        }, 2000);

        setInterval(function(){
            // Removing Premium ad display
            jQuery('.premium-upsell').remove();
            jQuery('.menu-item.go-premium').remove();
            jQuery('.sidebar-ad-component').remove();
            jQuery('#panel-ad').remove();

            // Breaking anti AFK system
            try { di.eventbus.trigger('user:active'); } catch(err) { console.error('(DIUserscript) : '+err.message); }
            try { di.app.vent.trigger('user:active'); } catch(err) { console.error('(DIUserscript) : '+err.message); }
            try { di.app.timedAlerts.stop(); } catch(err) { console.error('(DIUserscript) : '+err.message); }
        }, 1000);



        // Fuck BlockAdBlock
        var BlockAdBlock = function(options) {
            BlockAdBlock.prototype.setOption = function() {
                console.warn('[DIUserscript] (BlockAdBlock) setOption FuckBlockAdBlock', this);
                return this;
            };
            BlockAdBlock.prototype.check = function() {
                console.warn('[DIUserscript] (FuckBlockAdBlock) check', true);
                return true;
            };
            BlockAdBlock.prototype.emitEvent = function() {
                console.warn('[DIUserscript] (FuckBlockAdBlock) emitEvent', this);
                return this;
            };
            BlockAdBlock.prototype.clearEvent = function() {
                console.warn('[DIUserscript] (FuckBlockAdBlock) clearEvent');
            };
            BlockAdBlock.prototype.on = function() {
                console.warn('[DIUserscript] (FuckBlockAdBlock) on', this);
                return this;
            };
            BlockAdBlock.prototype.onDetected = function() {
                console.warn('[DIUserscript] (FuckBlockAdBlock) onDetected', this);
                return this;
            };
            BlockAdBlock.prototype.onNotDetected = function() {
                console.warn('[DIUserscript] (FuckBlockAdBlock) onNotDetected', this);
                return this;
            };
        };
        defineProp(window, 'BlockAdBlock', BlockAdBlock);
    });

})();
