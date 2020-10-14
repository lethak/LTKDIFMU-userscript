# DIUserscript

This userscript is trying to minimize and block audio and visual advertisement on all the websites and radios powered by the AudioAddict platform, 
while improving user experience and comfort of use of many features.

## Features

* Toggleable features (ON / OFF).

### Ads:
* Prevents **all** automated ads to play, bypassing them completely.
* Auto mute whenever an ad is playing, auto unmute when finished (just in case !).
* Removing most over-intrusive "premium" ad menu entry, popup, banners and panels on all pages.
* Enjoy the music with your favorite ad-blocker enabled ! jamming the anti-AdBlocker system.
* Disabling as many unsolicited, under the hood tracking as possible. (ex: Facebook, Triton, Bing, Adwords)

### Audio Player
* Confusing the anti-AFK system, so you can let the music run for hours without any human interaction.
* Slowly ease up the volume when playing for the first time in the session.
* Numeric volume input control for precise tuning.

![volume ui](https://i.imgur.com/AvLaa0T.png "volume UI")

* Download button for the playing track.
* Play previous track button.
* Skip current track button with unlimited use.
* Allowing to manually seek a specific position while playing a track (aka timeline scrubbing).

![player UI features](https://i.imgur.com/G4Ite25.png "player UI features")

* Play any track from the "previous track" history list.

![track ui](https://i.imgur.com/d5Cx1LT.png "Track UI") ![track ui](https://i.imgur.com/hpA3Oel.png "Track UI")

* Play any track from its hero page (di-only).

![track ui](https://i.imgur.com/nIFodnW.png "Track UI")


* Play your "Likes" as a playlist (di-only).

![likes ui](https://i.imgur.com/3zfCaqM.png "Likes UI")

* Support for browser's Global Media Controls.

![likes ui](https://i.imgur.com/SG3lYkP.png "Support for browser's Global Media Controls")

## Compatible webradios

DIUserscript is totally or partially functional on 5 known websites so far, consult the [official list here](https://www.audioaddict.com).

* https://di.fm
* https://classicalradio.com
* https://radiotunes.com
* https://jazzradio.com
* https://rockradio.com
* https://www.zenradio.com (new)

As a fan of Digital, Classical, Zen, Jazz and Rock music, I can listen to those web radio without interruption

## Installation

### Disclaimer

This fan-made userscript is in no way affiliated with AudioAddict.com, or any associated companies, brands or trademarks, and is provided only for experimental private and personal use, without any warranty whatsoever.

> Read the dedicated [disclaimer page](./doc/disclaimer.md).

### First time
Load the [userscript](https://github.com/lethak/LTKDIFMU-userscript/raw/live/DIUserscript.user.js) with the recommended __tampermonkey__ browser extension
* [Tampermonkey for Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
* [Tampermonkey for Firefox](https://addons.mozilla.org/fr/firefox/addon/tampermonkey/).

For using greasemonkey over tampermonkey, please read the [troubleshooting](./doc/troubleshooting.md) section. 

Direct link to the userscript: https://github.com/lethak/LTKDIFMU-userscript/raw/live/DIUserscript.user.js

> Read the dedicated [troubleshooting page](./doc/troubleshooting.md).

### Update

Nothing to be done by default.

The userscript is setup to be auto-updated via metadata-block [[1]](https://wiki.greasespot.net/Metadata_Block)[[2]](https://tampermonkey.net/documentation.php#_updateURL).

Just make sure your script manager checks for updates or setup it to do it automatically.


## Versioning

Each public version of the script is released as a tag with the following format:

> YEAR.MONTH.build number for the month


## Join Discord !

Our new community discord can be accessed here: https://discord.gg/sjGQ7YU

You can use it to say hi or discuss whatever you want with us, and follow releases thanks to github-to-discord hooks.

## Still polluted by ads ? missing a feature ?

First, read the [troubleshooting](./doc/troubleshooting.md) section. Then let us know via the "issue" section of this repository with as much details as possible.
