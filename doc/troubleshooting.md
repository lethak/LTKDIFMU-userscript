# Troubleshooting

## Sometimes, chrome and firefox will disable tampermonkey or my userscript manager for some reasons.
* Please make sure they are installed and enabled before opening any issue here.
* Before reporting a problem with chromium, enable developer mode in extensions and Tampermonkey : [issue #81](https://github.com/lethak/LTKDIFMU-userscript/issues/81)

## The script is active but some features are not working
* Some features are only working with an account, like some show/episodes.
* Make sure to reload the page after login or logout since it is done in xhr (ajax), and might be necessary for things to run smoothly without any bad side effect.
* Script page-injection timing can be tricky. The script will try to self diagnose and prompt the user when detecting a necessary page reload. It will often happen when loading the page too fast on chromium browsers. Reloading the page with devtool open (F12) will help slowing it down. In extreme cases, you can also enable network throttling inside the same devtool to help pass the diagnostic check at 100% and then revert it back to "no throttling".

## Using a free account, it appears I have access to some premium features like "download playlists" under the section "EXTERNAL PLAYER SETTINGS"
* Since you have not a real premium account, this is a side effect of the script, without any consequences but if you try to download .pls files, they will contain your listen key attached to your non-premium account and this won't work ultimately.
* It is not possible to make it work this way without a proper, legitimate premium account.
* From issue #22

## Using a free account, something is broken
* Free accounts are not supposed to receive audio source (url) anymore from the backend server. The script is trying to help by re-wiring client-side logic to bypass this inconvenience, but there can be side effect. Please open a new issue if you encounter one.

## Troubles using exotic browsers and script manager
* Other browsers such as Vivaldi (#34) and script manager such as ViolentMonkey (#36) might have issues but might also work in some capacity.
* Even if thoughts are put into making it widely generic and cross platform, this script is intended to work and be tested with Tampermonkey for Chrome or Firefox.

## I cannot click on the Seek Bar to play the track at a different position
* This is not always the case and may appear to work at random. Workaround exists by dragging the cursor instead of clicking the position, or to click play/pause multiple times before clicking the position again.
* From issue #41

## The use of this Userscript created some errors, what can I do ?

* Read our [Disclaimer page](./disclaimer.md).
* Check this current page for information already existing regarding your issue.
* Browse the Issue section of the repository to look for some issues already related to your problem.
* You always can open a new GitHib Issue on this repository to kindly ask for help.
* Not every error is actually impacting the features. (issue #23)

- - -
* Back to [index](../README.md)
