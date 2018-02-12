# DIUserscript

This userscript is trying to minimize and block audio and visual advertisement on all the websites and radios powered by the AudioAddict platform.

## Features

### Ads:
* Prevents **all** automated ads to play, bypassing them completely.
* Auto mute whenever an ad is playing, auto unmute when finished (just in case !).
* Removing most over-intrusive "premium" ad menu entry, popup, banners and panels on all pages. (If you want to upgrade you still can click on "Free Listener" while logged in)
* Confusing the anti-AdBlocker system, so you can enjoy the music with your favorite ad-blocker enabled.

### Audio Player
* Confusing the anti-AFK system, so you can let the music run for hours without any human interaction.
* Numeric volume input control for precise tuning.
* Download button for the current playing track
* Play previous track button (DI only)
* Skip current track button (DI only)
* Allowing to manually seek a specific position while playing a track (aka timeline scrubbing)

## Compatible webradios

DIUserscript is totally or partially functional on 5 known websites so far, consult the [complete list here](https://www.audioaddict.com).

* https://di.fm
* https://classicalradio.com
* https://radiotunes.com
* https://jazzradio.com
* https://rockradio.com

As a fan of Digital, Classical, Jazz and Rock music, I can listen to those web radio without interruption

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

#### Update

The userscript is setup to be auto-updated via metadata-block [[1]](https://wiki.greasespot.net/Metadata_Block)[[2]](https://tampermonkey.net/documentation.php#_updateURL).

Nothing to be done beside asking tampermonkey or greasemonkey to check for updates; or wait for/setup them to do it automatically.


## Versioning

Each public version of the script is released as a tag with the following format:

> YEAR.MONTH.build number for the month


## Still polluted by ads ? missing a feature ?

First, read the [troubleshooting](./doc/troubleshooting.md) section. Then let me know via the "issue" section of this repository with as much details as possible.
