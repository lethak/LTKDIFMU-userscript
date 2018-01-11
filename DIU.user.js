// ==UserScript==
// @name        Digitally Imported Userscript
// @namespace   LTKDIFMU
// @version     2018.1.1
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
    console.log('[DIUserscript] Initializing...');

    document.addEventListener("DOMContentLoaded", function(event) {
        console.log('[DIUserscript] window.document ready');

        redefineCommands();
        redefineReqres();
        redefineBlockAdBlock();
        redefineOptions();
        adSilencer();
        initTimeout();
        initInterval();

        WebPlayer.init();

        // Comment those lines if you don't want the associated feature ...
        addVolumeNumericInput();
        addPlayingTrackDownloadActionButton();
        addWebplayerPrevTrackButton();
        addWebplayerSkipTrackButton();

        console.log('[DIUserscript] Initialized');
    });

    /**
     * Utility function
     *
     * @param obj
     * @param propName
     * @param propValue
     * @returns {*}
     */
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

    /**
     * Seems useful to identify if we are on DI or the other sites.
     * Not required at the moment
     *
     * @returns string di|jazzradio|radiotunes|classicalradio|rockradio
     */
    var getCurrentSiteKey = function() {
        return di.app.options.network_key;
    };

    /**
     * WebPlayer Utilities
     *
     * @type {{getVolume: getVolume, setVolume: setVolume}}
     */
    var WebPlayer = {
        prevTrackModel: null,
        curTrackModel: null,
        event: {
            onVolumeChange: function(func) {
                console.log('[DIUserscript] WebPlayer.event.onVolumeChange (new handler)');
                if (typeof func !== 'function') {
                    var func = function(e,value){};
                }
                di.app.WebplayerApp.model.on('change:volume', func);
            }
        },
        init: function() {
            di.app.vent.on('webplayer:track:change', function(e) {
                console.warn('[DIUserscript] WebPlayer.init (webplayer:track:change)');
                WebPlayer.prevTrackModel = WebPlayer.curTrackModel;
                WebPlayer.curTrackModel = WebPlayer.getCurrentTrackModel();
            });
        },
        getVolume: function() {
            return di.app.reqres.request('webplayer:volume');
        },
        setVolume: function(volume) {
            console.log('[DIUserscript] WebPlayer.setVolume ', volume);
            if (typeof volume === 'undefined') {
                var volume = 10;
            }
            if (volume < 0) {
                volume = 0;
            }
            if (volume > 100) {
                volume = 100;
            }

            di.app.commands.execute('webplayer:volume', volume);
            // di.app.WebplayerApp.model.setVolume(value);
        },
        getCurrentTrackModel: function (){
            return di.app.reqres.request('webplayer:track');
        },
        downloadCurrentTrack: function (){
            console.log('[DIUserscript] WebPlayer.downloadCurrentTrack');

            var trackModel = WebPlayer.getCurrentTrackModel();
            if (trackModel === null) {
                console.error('[DIUserscript] WebPlayer.downloadCurrentTrack : ', trackModel);
                return;
            }
            return WebPlayer.downloadTrack(trackModel);
        },
        downloadTrack: function (trackModel){
            console.log('[DIUserscript] WebPlayer.downloadTrack ', trackModel);

            var retail = trackModel.get('retail');
            if (typeof retail !== 'object' || typeof retail['download'] === 'undefined') {
                var src = trackModel.get('src');
                // retail = {download:{url: src}};
                // trackModel.set('retail', retail);
                // console.log('[DIUserscript] WebPlayer.downloadTrack (retail changed)', retail);
                window.open('https:' + src);
            } else {
                // Legit Download Process
                return di.app.commands.execute("track:download", {
                    stateModel: {
                        set: function (obj) {console.warn('[DIUserscript] WebPlayer.downloadTrack (stateModel set) ', obj, this);}
                    },
                    trackModel: trackModel
                });
            }
        },
        playNextItem: function() {
            di.app.commands.execute('webplayer:playNextItem');
        },
        playPreviousTrack: function() {
            di.app.commands.execute("webplayer:play:track", WebPlayer.prevTrackModel, di.app.reqres.request("webplayer:context"));
        }
    };

    var removeHomeHeroPremiumVisualAds = function() {
        var $bannersAnchors = jQuery('.banner a[href^="/premium?"]', '#hero.home');
        var iRemoved = 0;
        $bannersAnchors.each(function(i,v) {
            jQuery(v).parents('.banner').remove();
            iRemoved = iRemoved + 1;
        });

        if (iRemoved > 0) {
            console.log('[DIUserscript] removeHomeHeroPremiumVisualAds (removed count): ', iRemoved);
        }
    };


    /**
     * Removing most premium ad display
     */
    var removeVisualAds = function() {
        var $visualAds = jQuery('.premium-upsell, .menu-item.go-premium, .sidebar-ad-component, #panel-ad, .go-premium-cta');
        var iRemoved = 0;
        $visualAds.each(function(i,v) {
            jQuery(v).remove();
            iRemoved = iRemoved + 1;
        });

        if (iRemoved > 0) {
            console.log('[DIUserscript] removeVisualAds (removed count): ', iRemoved);
        }

        removeHomeHeroPremiumVisualAds();
    };

    /**
     * This seems like a good idea to help keeping ads away
     */
    var redefineOptions = function() {
        console.log('[DIUserscript] redefineOptions');

        defineProp(di.app.options.advertising, 'ad_repeat_cap', 0);
        defineProp(di.app.options.advertising, 'interruptible_track_length', 13371337);
        defineProp(di.app.options.advertising, 'interruptible_track_grace_period', 13371337);
        defineProp(di.app.options.advertising, 'midroll_banner_continue_delay', 0);
        defineProp(di.app.options, 'registration_wall', null);
    };

    /**
     * Silencing audio ads whenever they get played.
     */
    var adSilencer = function(){
        console.log('[DIUserscript] adSilencer');

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

    /**
     * Adding a new volume control as a numerical input form
     */
    var addVolumeNumericInput = function(){
        console.log('[DIUserscript] addVolumeNumericInput');

        try{
            var $inputVolume = jQuery('<input type="number" value="0" min="0" max="100" step="1" style="font-weight:bold;border:0 solid #000;max-width:45px;max-height:20px;color:gold;background-color:black;padding:0;margin:0 5px;display:inline-block;">');
            $inputVolume
                .val(WebPlayer.getVolume()) // Initializing the input value with the current app volume
                .on('change', function(e){
                    e.stopPropagation();
                    // When the user is using the input, we set the app volume corresponding to the value displayed.
                    WebPlayer.setVolume(jQuery(this).val());
                })
                .on('click', function(e){
                    // Prevents the volume to reach 100 each time we change the volume using the input's native arrows, due to where the input is injected into the DOM for convenience.
                    e.stopPropagation();
                })
            ;

            var $containerCandidates = jQuery('#popup-volume'); // multisite supported: di and the others
            if ($containerCandidates <= 0) {
                throw {message: 'Cannot find a proper container in the DOM'};
            }
            $inputVolume.appendTo($containerCandidates.first().find('.icon-sound')); // This is kind of hacky, but quick and working.
            $containerCandidates.first()
                .css('width', '210px')
                .css('left', '-186px')
            ;

            // When the user is changing the volume using the default slider, we adjust the input value with the new volume value.
            WebPlayer.event.onVolumeChange(function(e, volume) {
                this.val(volume);
            }.bind($inputVolume));

        } catch(err) {
            console.error('[DIUserscript] addVolumeNumericInput error: ', err.message);
        }
    };

    /**
     * @todo multisite support
     */
    var addPlayingTrackDownloadActionButton = function () {
        console.log('[DIUserscript] addPlayingTrackDownloadAction: ');

        di.app.vent.on('webplayer:track:change', function(e) {
            console.warn('[DIUserscript] addPlayingTrackDownloadAction (webplayer:track:change)', e);

            setTimeout(function() {
                var $container = jQuery('.actions-container .purchase-control-region, #webplayer-region .right.side #toolbar menu:first'); // multisite support
                jQuery('.dui-addPlayingTrackDownloadActionButton').remove();
                if (getCurrentSiteKey() === 'di') {
                    var $btns = jQuery('<div class="dui-addPlayingTrackDownloadActionButton"><ul class="dui-buttons"><li class="dlAction ico icon-download" title="Download [DUI]"></li></ul></div>');
                } else {
                    var $btns = jQuery('<li class="dui-addPlayingTrackDownloadActionButton"><button title="Download [DUI]" type="button" class="dlAction icon-download">Download</button></li>');
                }

                $btns.appendTo($container);
                $btns.find('.dlAction').first().on('click', function (e) {
                    WebPlayer.downloadCurrentTrack();
                })
            }, 1000);
        });
    };

    /**
     * @todo multisite support
     */
    var addWebplayerSkipTrackButton = function () {
        console.log('[DIUserscript] addWebplayerSkipButton');

        di.app.vent.on('webplayer:playing:change', function() {
            console.warn('[DIUserscript] addWebplayerSkipButton (webplayer:playing:change)');

            var isPlayingTrack = di.app.reqres.request('webplayer:isPlayingTrack');
            var isPlaying = di.app.reqres.request('webplayer:isPlaying');

            $skipTrackDomElems = jQuery('.dui-skip-container');
            if (!isPlaying) {
                //$skipTrackDomElems.remove();
            }
            else if ($skipTrackDomElems.length < 1) {
                $skipTrackDomElems = jQuery('<div class="dui-skip-container"><a class="ico icon-hero_next" aria-label="Skip [DIU]" title="Skip [DIU]"></a></div>')
                $skipTrackDomElems.css('display', 'inline-block');
                $skipTrackDomElems.find('.icon-hero_next')
                    .css('font-size', '32px')
                    .css('width', '32px')
                    .css('color', '#e9f1f9')
                ;
                $container = jQuery('#webplayer-region .controls');
                $container.css('width', '126px');
                $skipTrackDomElems.appendTo($container);
                $container.find('div').each(function(i,v){
                    jQuery(v).css('display', 'inline-block').css('margin', '0 5px');
                });
                $skipTrackDomElems.on('click', function(e){
                    WebPlayer.playNextItem();
                });
            }
        });
    };

    var addWebplayerPrevTrackButton = function () {
        console.log('[DIUserscript] addWebplayerPrevTrackButton');

        di.app.vent.on('webplayer:track:change', function() {
            console.warn('[DIUserscript] addWebplayerPrevTrackButton (webplayer:track:change)');
            render();
        });

        di.app.vent.on('webplayer:playing:change', function() {
            console.warn('[DIUserscript] addWebplayerPrevTrackButton (webplayer:playing:change)');
            render();
        });

        var render = function(){
            $domElems = jQuery('.dui-prevtrack-container');
            if ($domElems.length < 1 && WebPlayer.prevTrackModel !== null) {
                $domElems = jQuery('<div class="dui-prevtrack-container"><a class="ico icon-hero_previous" aria-label="Previous [DIU]" title="Previous [DIU]"></a></div>')
                $domElems.css('display', 'inline-block');
                $domElems.find('.icon-hero_previous')
                    .css('font-size', '32px')
                    .css('width', '32px')
                    .css('color', '#e9f1f9')
                ;
                $container = jQuery('#webplayer-region .controls');
                $container.css('width', '126px');
                $domElems.prependTo($container);
                $container.find('div').each(function(i,v){
                    jQuery(v).css('display', 'inline-block').css('margin', '0 5px');
                });
                $domElems.on('click', function(e){
                    WebPlayer.playPreviousTrack();
                });
            }
        };


    };

    /**
     * Confusing the client internal timers
     * No certain this is still useful
     */
    var redefineTimers = function(){
        console.log('[DIUserscript] redefineTimers');
        var getTimeRemaining = function() {
            console.warn('[DIUserscript] timers getTimeRemaining', 1337);
            return 1337;
        };

        try{
            di.app.WebplayerApp.Ads.Supervisor.timers.gracePeriod.getTimeRemaining = getTimeRemaining;
            di.app.WebplayerApp.Ads.Supervisor.timers.session.getTimeRemaining = getTimeRemaining;
        } catch(err) {
            console.error('[DIUserscript] redefineTimers error: ', err.message);
        }
    };

    /**
     * Overriding parts of the Command bus
     */
    var redefineCommands = function(){
        console.log('[DIUserscript] redefineCommands');

        // Go away: Confusing the anti-adblock system into thinking we will not enforce its rules
        defineProp(di.app.commands._wreqrHandlers['adblocker:enforceWall'], 'callback', function () {
            console.warn('[DIUserscript] adblocker:enforceWall', 'rejected');
            return jQuery.Deferred().reject().promise();
        });
    };

    /**
     * Overriding parts of the Request bus
     */
    var redefineReqres = function(){
        console.log('[DIUserscript] redefineReqres');

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
                // This is only to confuse the DI client, this will not give access to higher audio qualitiy or premium perks, unless if logged in with a real paid premium account from DI.
                return true;
            });

            // Lets pretend
            var userType = di.app.reqres.request('current_user:type'); // guest|public|premium
            console.log('[DIUserscript] current_user:type ORIGINAL ', userType);
            if (userType === 'guest') {
                defineProp(di.app.reqres._wreqrHandlers['current_user:type'], 'callback', function () {
                    console.warn('[DIUserscript] current_user:type', 'premium');
                    return 'public';
                });
            }
        }
        catch(err) {
            console.error('[DIUserscript] redefineReqres error: ', err.message);
        }
    };

    /**
     * Overriding BlockAdBlock to prevent the anti-adblock system from messing with us. Who wants to be forced to eat shit ?
     */
    var redefineBlockAdBlock = function(){
        console.log('[DIUserscript] redefineBlockAdBlock');

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
    };

    /**
     * Executed once, 2s after DOM document is ready
     */
    var initTimeout = function(){
        console.log('[DIUserscript] initTimeout');

        setTimeout(function(){
            // // Improved webplayer quality (3 = High) (disabled, Free Listeners can change it via their account settings)
            // console.warn('[DIUserscript] preferredQuality:set', 3);
            // di.app.commands.execute('preferredQuality:set', 3);
            // setTimeout(function(){
            //     var audioQuality = di.app.reqres.request('audioQualities:selected').attributes;
            //     di.app.commands.execute('message:success', 'Webplayer audio quality is now: '+audioQuality.name+' '+audioQuality.content_quality.name+' '+audioQuality.content_format.name);
            // }, 2000);

            redefineTimers();

            // Self promoting this script in case you want to quickly find the link to send to a friend ;) just comment this next line if you don't want it.
            jQuery('<li class="menu-item"><a href="https://github.com/lethak/digitally_imported_userscript" target="_blank"><i class="icon-forward"></i> <span>DI Userscript</span></a></li>').appendTo('#side-nav ul');

            di.app.commands.execute('message:notice', 'Enjoy free uninterrupted music thanks to DIUserscript !');
        }, 2000);
    };

    /**
     * Executed every 1s, removing visual ads and blocking panels, popups, etc...
     * Also making sure the anti AFK system stay confused.
     */
    var initInterval = function(){
        console.log('[DIUserscript] initInterval');

        setInterval(function(){
            removeVisualAds();

            // Breaking anti AFK system
            try { di.app.vent.trigger('user:active'); } catch(err) { console.error('[DIUserscript] : '+err.message); }
            try { di.app.timedAlerts.stop(); } catch(err) { console.error('[DIUserscript] : '+err.message); }
        }, 1000);
    };

})();
