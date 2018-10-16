#Android support

Have a read thought the different android issues. (Android Information #465)

Bottomline, the problem is the predictive text functionality.  There is no way to prevent or control the input, which gives undesired results
and side effects in the inputmask.  I tried several ways multiple times.  Compositionevents, inputevent only masking, all with partial success.
The behavior also changes with the keyboard used. (google keyboard, samsung keyboard, ...)

In general, masks which only accepts numeric input tend to work even with predictive text enabled.  Inputmasks with alphanumeric input will all fail.

The solution would be a way to control (or hint) the predictive text or to disable it.
When browsers would implement the inputmode attribute, disabling will be possible.
[Inputmode html spec](https://html.spec.whatwg.org/multipage/forms.html#input-modalities:-the-inputmode-attribute)
[Inputmode chromestatus](https://www.chromestatus.com/feature/6225984592281600)

##Update 18/01/2017

It seems that the GBoard keyboard fires the keydown event only with 229 as keycode.  This behavior is not considered a bug as other means should be used to handle input.  
See https://github.com/w3c/input-events

##Update 10/10/2017

Masking on mobile devices is currently implemented solely based on the input event.  The beforeinput event isn't common in the browsers yet and so cannot be used.

I renamed the androidHack option to disablePredictiveText, so the option is now also available for other platforms.
This can be enabled by passing true for the option.  

 

<strike>
##The workaround, the patchwork, the bad and ugly ;-)

This is not enabled by default, because I find that the developer should be aware of what it does and what you need to take into account when using this hack.

What it does.
- changes the input type to password => disabled predictive text
- enables the colorMask option which creates a div, which surrounds the input.  
So we type in the hidden password input and render the mask in the a created div.

To use the colorMask, you need to include the inputmask.css you might need to add some css-tweaks to make it all visually correct in your page.

To enable the workaround add the androidHack option to your individual masks or globally by setting defaults.
You should set the option to "rtfm".

```
Inputmask("myfancymask", {androidHack: "rtfm"}).mask(selector);

Inputmask.extendDefaults({ androidHack: "rtfm" });
```
</strike>

##Reporting android related issues

Before you submit an issue related to Android.  Test the issue with and without predictive text enabled.

If the issue also occurs with predictive text disabled you may create an issue for it on Github.
Otherwise, retry the issue on a desktop browser and add the inputEventOnly: true and colorMask: true option.
If the problem is still there you may submit an issue.

Always include a jsfiddle or alike to ease reproducing the problem.

When the issue only occurs due to predictive text I cannot solve it, until browsers start implementing the inputmode attribute on inputs.
