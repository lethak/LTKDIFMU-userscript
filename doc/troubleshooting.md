# Troubleshooting

* Sometimes, chrome and firefox will disable tampermonkey or greasemonkey  for some reasons.
* Please make sure they are installed and enabled before opening any issue here.

## The script is active but some features are not working
* Some features are only working with an account. This script must run with an account for all features to work best.
* This script is not intended to remove the need to register for a free/premium account.
* Make sure reloading the page after login since it was never intended for the script to be used while NOT logged in and if the login is done in xhr (ajax) or fetch,
a reload might be necessary for things to run smoothly without any bad side effect.

## I get the Enjoy "30 minutes of music" message
* Read above "The script is active but some features are not working"
* From issue #23

## Using a free account, it appears I have access to some premium features like "download playlists" under the section "EXTERNAL PLAYER SETTINGS"
* Since you have not a legitimate premium account, then this is a side effect of the script, without any consequences but if you try to download .pls files, they will contain your listen key attached to your non-premium account and this won't work ultimately.
* It is not possible to make it work this way without a proper, legitimate premium account. (or if it is, I won't bother dealing with this)
* From issue #22

## The use of this Userscript created some errors, what can I do ?

* Read our [Disclaimer page](./disclaimer.md).
* Check this current page for informations already existing regarding your issue.
* Browse the Issue section of the repository to look for some issues already related to your problem.
* You always can open a new GitHib Issue on this repository to kindly ask for help. 

## (old) A warning message keeps telling me to update the script

- - - 

|:warning:|**With release v2018.1.4, this repository AND USERSCRIPT changed its name and URL following a [Trademark claim](./DigitallyImportedTrademarkClaim.md) by "Digitally Imported, Inc"**|
|---|---|
|Problem|If you upgraded from version v2018.1.3 or v2018.1.3b, a big red announcement is showing on the music platform asking you to update despite already being updated |
|How to solve ?|  Make sure you dont have any older version of this userscript still installed in Tampermonkey. Remove all version prior to 2018.1.4 that are still named "Digitally Imported Userscript" |

- - -

## Weird behavior and doublons

- - - 

|:warning:|**With release v2018.1.4, this repository AND USERSCRIPT changed its name and URL following a [Trademark claim](./DigitallyImportedTrademarkClaim.md) by "Digitally Imported, Inc"**|
|---|---|
|Problem|If you upgraded from version older than v2018.1.3b, the script is going to run twice, and can have unwanted effects and doublons|
|How to solve ?|  Make sure you dont have any older version of this userscript still installed in Tampermonkey. Remove all version prior to 2018.1.4 that are still named "Digitally Imported Userscript" |

- - -

## Mobile/Tablet
I have not managed to make the script work on mobile or tablet. If you have any clue on how to do it, please create a new issue detailing a solution.

## Greasemonkey and Firefox Quantum
For [greasemonkey](https://addons.mozilla.org/en-gb/firefox/addon/greasemonkey/) users, the script is having troubles with Firefox since the "Quantum" update (version >= 57), this is why the latest version of  [tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) is now recommended for all browsers.

Compatibility:

| -  | Firefox < 57 |  Firefox Quantum >= 57 | Chrome |
|---|---|---|---|
| Tampermonkey >= 4.x* | - | OK | OK* |
| Tampermonkey <= 3.x | OK | Broken | OK |
| Greasemonkey <= 3.x | OK | Broken | OK |
| Greasemonkey >= 4.x | - | Broken | ? |

(*) *recommended*






- - -
* Back to [index](../README.md)
