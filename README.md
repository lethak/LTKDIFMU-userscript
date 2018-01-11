# Digitally Imported Userscript

This userscript is trying to minimize and block audio and visual advertisement on all the websites and radios managed by DI.



## Features

* Ads: Prevents **all** automated ads to reach your ears, bypassing them.
* Ads: Auto mute whenever an ad is playing, auto unmute when finished (just in case !).
* Ads: Removing most over-intrusive "premium" ad menu entry, popup, banners and panels on all pages. (If you want to upgrade You still can click on "Free Listener" while logged in)
* Ads: Confusing the anti-AdBlocker system, so you can enjoy the music with your favorite ad-blocker enabled.
* Audio Player: Confusing the anti-AFK system, so you can let the music run for hours without any human interaction.
* Audio Player: Numeric volume input control for precise tuning.
* Audio Player: Download button for the current playing track
* Audio Player: Play previous track button (di.fm only)
* Audio Player: Skip current track button (di.fm only)

## Supported sites

* https://di.fm
* https://classicalradio.com
* https://radiotunes.com
* https://jazzradio.com
* https://rockradio.com

Since I am only using di.fm, please consider helping by [giving feedback](https://github.com/lethak/digitally_imported_userscript/issues/5) for the other sites (what is not working, almost working, etc...)

## Installation

### First time
Load this [userscript](https://github.com/lethak/digitally_imported_userscript/raw/master/DIU.user.js) with the recommended [tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) browser extension.

If you prefer greasemonkey over tampermonkey, please read the Troubleshooting section.

Userscript: https://github.com/lethak/digitally_imported_userscript/raw/master/DIU.user.js

#### Update

The userscript is setup to be auto-updated via [metadata-block](https://wiki.greasespot.net/Metadata_Block).

You should not have anything to do beside asking greasemonkey or tampermonkey to check for updates; or wait for them to do it automatically.

#### Troubleshooting

Sometimes, chrome and firefox will disable greasemonkey or tampermonkey for some reasons. Please make sure they are installed and enabled before opening any issue here.

I have not managed to make the script work on mobile or tablet. If you have any clue on how to do it, please create a new issue or submit a pull request.

For [greasemonkey](https://addons.mozilla.org/en-gb/firefox/addon/greasemonkey/) users, the script is having troubles with Firefox since the "Quantum" update (version >= 57), this is why the latest version of  [tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) is now recommended for all browsers.

Compatibility:

| -  | Firefox < 57 |  Firefox Quantum >= 57 | Chrome |
|---|---|---|---|
| Greasemonkey <= 3.x | OK | Broken | OK |
| Tampermonkey <= 3.x | OK | Broken | OK |
| Greasemonkey >= 4.x | - | Broken | ? |
| Tampermonkey >= 4.x | - | OK | OK |

[more on this here](https://github.com/lethak/digitally_imported_userscript/issues/8)

## Versioning

Each public version of the script is released as a tag with the following format:

> YEAR.MONTH.release number for the month

## Disclaimer

This user-script is in no way affiliated with DI or associated companies, brands or trademarks, and is provided for private personal use only, without any warranty whatsoever.


## Still polluted by ads ?

Let me know via the "issue" section of this repository, or submit a pull request if you know how to fix the script.

If you can afford it, please consider [becoming premium](https://www.di.fm/premium). You will get access to DI in high quality and can listen from VLC or other players.


