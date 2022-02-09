# Greasy Forks

:warning: Read this page if you clicked a red message notification from your webradio. This means your version is now deprecated and cannot be updated unless you follow these instructions

## TLDR; Re-install manually from github


We will not update this script on the Greasy Forks platform anymore.

It is advised to go to your script manager settings/dashboard and remove our Userscript, then head hover ----> [there](https://github.com/lethak/LTKDIFMU-userscript/blob/live/README.md) <---- and follow the instructions to manually install it.
You will only have to do this once as it is setup to auto-update via github urls directly. Something that Greasy Forks was also preventing us to do.

## Long version


[Greasy Forks](https://greasyfork.org/) is an old website acting as a central repository for userscripts.

Publishing and updating [our script on this platform](https://greasyfork.org/en/scripts/397697-diuserscript-for-audioaddict-platforms) proved problematic as its rules prevent us to do so.
* Max character limit reached
* Minified code

You might notice those 2 rules are working against each others, but this site is using this archaic policy because the owners might not be aware of modern frameworks such as reactjs, vuejs, npm... and they think we will include all the dependencies as static "lib" userscript using the @require meta-function.

They think this is acceptable but really this is not when you have the complexity we have.


> The latest working version of LTKDIFMU published on GF was [v2020.6.14](https://github.com/lethak/LTKDIFMU-userscript/tree/v2020.6.14) from 2 Jun 2020, an old and semi broken version by now.

Since our script, packaged, minified and trimmed to the limits of what is technically possible, has reached GF's max character limit, updates are not working anymore.
Furthermore, a moderator over there removed it from public access because it was minified.



|Date|Moderator|Action|Reason|
|---|---|---|---|
|3/9/2021|wOxxOm|Delete|Minified code|


In effect, they are preventing their userbase to reach more complex and qualitative scripts that require a lot of code and dependencies.

At the time of writing, the latest experimental packaged build of this script was *2.39 MB* in size, so, no compromize can be reached about minification either.

Therefore, we deployed a minimalist version on Greasyforks to notify users coming from this venue to read this page.
The full, long loved and experimental features can still be enabled by re-installing the script manually from github and forgetting about Greasy Forks.
