# progresspieSVG

jQuery plug-in for dynamically rendering a pie or circle diagram comparable to a progress bar, depicting a progress, countdown, percent value or similar.

[Project home page][home]

## What is this?

This software module contains a [jQuery][jquery] plug-in for drawing a partially filled circle (pie-chart with only one slice of the pie) for visualizing a single value between 0% and 100% inclusive, i.e. a kind of progress bar, but not in form of a bar but of a pie. The graphic is rendered inside a web page as SVG. In difference to e.g. the HTML `canvas` element, SVGs are scalable and render sharply on high resolution displays with device-pixel-ratio > 1 (e.g. Apple's “retina displays”).

As the name suggests, this component may be used to display a progress, starting at 0%, incrementing until 100% are reached. For this purpose the graphic may be dynamically updated (or, more precisely, replaced). 

But just like progress bars these pies may actually be used to depict _any_ percentual value, including static ones like e.g. percents of points achieved in a test. Mainly for this purpose, the pie may be dynamically colored based on the percentual value with colors like red hinting at a “bad” result, yellow for “mediocre” and green for “good”. There are default color schemes (always grey, green or red or dynamically calculated red/yellow/gree-shade as described above), but you may also assign any static color or your own JavaScript function mapping the value into a color.

## Examples

See the examples pages to get an impression of the looks and for different demo scenarios. 

* `examples.html`: Examples for direct usage of the plug-in
* `examplesAppl.html`: Examples for use with `progresspiesvlAppl.js`

You'll also find an online live view of these exampled on the [project's home page][home].

(The pies look the same in both examples pages, the differences lie in the way of including them in your HTML pages.)

## JavaScripts

This package contains three files:

* `jquery-progresspiesvg.js`: The jQuery plug-in itself. It may be used stand-alone.
* `jquery-progresspiesvg-controlIcons.js`: A content plug-in as an addition to the jQuery plug-in above. Loading this file on top of jquery-progresspiesvg.js enables you to draw control icons (play, stop, pause) inside ring graphs using the `svgContentPlugin` option of the progresspiesvg plug-in.
* `progresspiesvgAppl.js`: This is meant to simplify the use for those who do not want to write JavaScript code to apply and configure the plug-in. This script file may be included into your HTML (in addition to jQuery and the plug-in above). If you do so, you may insert progresspie charts simply by writing HTML, inserting the percent values and assigning some predefined CSS classes or `data`-Attributes.

## Usage

### Direct usage of the plug-in (without `progresspiesvgAppl.js`)

#### Basics

* Include jQuery (tested with jQuery 1.11, but should work with jQuery 2, too) and the script file `jquery-progresspiesvg.js` into the head of your HTML file.
* Insert the percent values into your HTML body that are to be visualized. This may be done in two ways:
	* Should the number be visible and a pie in text height should be inserted before or behind the acutal number? This is the default. In this case, for each progresspie to insert, write the number (and only the up to three digits) into an HTML element like `span` and make sure this element may be selected via jQuery (e.g. by adding a classname like "percent" or "progresspie"). Example: `<span class="percent">42</span>&nbsp;%`.
	* Should the number / digits be invisible and only a pie is to be inserted? In this case create an empty HTML element where the pie chart is to be inserted and write the number into an attribute of this element (usually prefixed with `data-`), e.g.: `<span class="pie" data-percent="42"></span>`.
* Write and include some script code that gets executed after rendering the HTML (generating the DOM). This code is to select the (`span`-) elements you created in the second step with a jQuery query and to apply the plug-in to the selection/query result. 
	Example corresponding to both data elements above:
	    
	    <script type="text/javascript">
	        $(function() {
	            $(".percent").progressPie(); //default mode
	            $(".pie[data-percent]").progressPie({ //specifying options object
	                valueAttr:"data-percent",
	                color:"navy",
	                size:30
	            });
	        });
	    </script>

* For each selected element, the script will try to read the number (from the element's content or from an attribute, if the option `valueAttr` is given and the element provides an element of that name) and render the piechart SVG, which will be inserted into the selected element. By default it gets prepended to the content, optionally it may also be appended. Also, a separator string may be inserted between the pie and the original content (by default this is a non-breaking space: `&nbsp;`).

#### Options

If you simply call `progressPie()`, the plug-in will be used with default options. This includes that the percent number is expected to be the (only) content of the selected element, the pie will be prependet to this content (separated with an `&nbsp;`), it will be rendered in line-height and in a shade of grey (`#888`). It will only be inserted, if the element does not yet contain any SVG content: repetetive calling of the function will therefore neither insert the SVG multiple times nor will it update the graphic.

To modify the looks or behaviour, the function takes exactly one argument, which has to be a JavaScript object which defines options via its properties. The following option properties are defined:

* `mode`: constant of enum type `$.fn.progressPie.Mode`. Default is `$.fn.progressPie.Mode.GREY`. Possible values are:
	* `$.fn.progressPie.Mode.GREY`: Default Mode, pie is drawn in a shade of grey.
	* `$.fn.progressPie.Mode.RED`: The pie is drawn in red color regardless of the percentual value.
	* `$.fn.progressPie.Mode.GREEN`: The pie is drawn in green color regardless of the percentual value.
	* `$.fn.progressPie.Mode.COLOR`: The color of the pie is depending on the percentual value (see above). The color is the same green color as in mode GREEN for a value of 100 percent, the same red color as in mode RED for a value of 0%, a yellowish mix of both for 50% and a gradient in between green and yellow for values greater than 50% resp. between red and yellow for values less than 50%.
* `strokeWidth`: number. Default is `2`. Determines the stroke with of the outer circle.
* `strokeColor`: string, color code. Default is `undefined`. If undefined, the outer circle is drawn in the same color as the rest of the pie. If set to a color code like `#ddd` or `silver`, this defines the color of the outer circle.
* `ringWidth`: number. Default is `undefined`. If undefined, a portion of the pie will be filled, cut out just to the center of the circle (like a partial sweep of a radar). If ringWidth is a number, only the outer rim of this piece of the pie is drawn, leaving an empty circle in the middle with diameter `size-2*ringWidth`. `ringWidth` must be greater than `strokeWidth` in order for the (partial) ring to be visible. (See examples)
* `ringEndsRounded`: boolean. Default is `false`. Only applicable if `ringWidth` is defined, ignored in pie mode. If a ring is drawn, both ends of the ring are normally cut rectangularly. Enabling this option draws a semicircle cap on each end. This might look prettier especially for very large graphics with usually `strokeWidth === 0`. Note however that, the higher the `ringWidth` value, the longer the ring seems, for the semicircles are _added_ to the ring. Very high values like 99% will then look like a full 100% (for the semi circle ends overlap).
* `prepend`: boolean. Default is `true`. If true, the pie will be inserted at the beginning of the element's content, followed by the separator string. If false, the separator string followed by the pie will be appended to the element's content.
* `separator`: string. Default is `"&nbsp;"`. Will separate the inserted pie from the rest of the content (usually the number), see `prepend`.
* `verticalAlign`: string. Default is `"bottom"`. Defines the CSS-property `vertical-align` of the inserted SVG element and thus the vertical alignment. By default, the image is aligned with the bottom of a line. In certain circumstances (like setting a `line-height` style greater than `1em`) you might want to vertically center the image by setting this option to `"middle"`.
* `update`: boolean. Default is `false`. If false, the function will do nothing if the target element already contains an `svg` element. Set to `true` if repeated calls are meant to update the graphic. If `true`, the function will remove an existing `svg` before inserting a new one. Typically only needed in combination with `valueAttr`, see also: Dynamically updating pies
* `size`: number. Default is `undefined`. If undefined, the plug-in will try to draw the pie in the actual height of the parent element. Beware: If the element is empty, the browser may have calculated a height of 0! In this case, a default size will be used. Defining this option disables auto-sizing: the provided number will be used as height and width of the `svg`. It has to be a number (in pixels), not a string with a unit! This is typically used on empty elements in combination with `valueData`, `valueAttr` or `valueSelector`.
* `sizeFactor`: number. Default is 1. The size (either given by `size` option or auto-calculated, if no `size` is explicitly specified) is multiplied by this factor to get the “final” diameter before drawing the chart.
* `scale`: number. Default is 1. The already rendered SVG is finally scaled by this factor. In difference to `sizeFactor` this does not simply change the diameter/radius of the chart, but scales all other aspects, such as `strokeWidth`, `ringWidth` etc., too.
* `valueAttr`: string. Default is `undefined`. Name of a value attribute: If defined, the function will look for an attribute of this name inside the opening tag of the found element, and if found, it will parse this attribute's value instead of the element's content as the percent value. (If defined but not of type "string", the function will throw an exception.) For accessing `data-*` attributes, the next option `valueData` is usually preferred, use `valueAttr` only if you want to read other attributes (not beginning with `data-`) or if you really want to react to updates to the attribute in the DOM tree.
* `valueData`: string. Default is `undefined`. Mutually exclusive with `valueAttr` and `valueSelector`! Name of a jQuery data object. When parsing, jQuery will create data objects for each `data-*` attribute, e.g. for an attribute `data-percent="50"` in the HTML, the jQuery function `data("percent")` will return the _number_ 50 (not a string). In this example, you may specify the option `valueData: "percent"` to access the data from the `data-percent` attribute. This is _nearly_ equivalent to `valueAttr: "data-percent"`, but differs in two important respects: Firstly, numbers are automatically recognized and parsed, so the `valueAdapter` does not have to parse the string itself, secondly (and most important), value updates set by calling the jQuery function `data(id, newValue)` (e.g. `$(selector).data("percent", oldvalue++)`) will be recognized when updating the pies. Be aware that jQuery does not update data-attributes upon calling the `data`-setter-function. Attributes and stored data objects only match initially, but updates to the data objects are not propagated to the string attributes in the DOM tree. So if you were using option `valueAttr: "data-percent"` instead of `valueData` and wanted to dynamically update the pie, you'd have to explicitly update the data attribute via jQuery function `attr("data-percent", newValueAsString)`, whereas use of `valueData` enables you to simply update the value via `data("percent", newValueAsNumber)`, which is simpler and more efficient. (If this option is defined but not of type "string", the function will throw an exception.)
* `valueSelector`: jQuery-Selector (string). Default is `undefined`. Mutually exclusive with `valueAttr` and `valueData`! If defined, the function will apply a jQuery search within the selected element to find a sub-element whose text content is to be used as a value. Usually, the whole text content of the node previously selected (to which the progresspie plug-in is applied) is interpreted as the value. If you want to have more content, maybe for CSS styling reasons, and the actual value is in a sub-element, but the pie should not be inserted into that sub-element but into the previously selected main element, then this option is for you. The examples page demonstrates an application of this option.
* `valueAdapter`: function. Default: see below. The valueAdapter function is executed when interpreting the value, i.e. either the element's content (string), the value of the attribute denoted by the `valueAttr` option (also a string) or the data object denoted by the `valueData` option. It has to map the value (string or number) to a number within the range [0..100], which is then used to calculate the pie graphic. So if you have raw data that's not a percent value (for example an hour value out of [0..12]), you may write an own valueAdapter reading this value and returning an int in [0..100]. (See examples page.)
	* If you use the `valueData` option, the type of the argument is the type of the object stored in the data model. This is usually a string or a number, but your own script code controls the type of objects stored there.
	* If you don't use the `valueData` option, the type of the argument is always `string`.
	* The default valueAdapter `$.fn.progressPie.defaults.valueAdapter` (which is used whenever this option `valueAdapter`is undefined) applies `parseInt` to any `string` argument, returns any `number` argument unchanged and returns `0` for an argument of any other type.
* `color`: string or function. Default is `undefined`. If undefined, the color of the pie depends on the `mode` option, see above. A valid string value of this option would be a color name like `navy` or color code like `#888`, `#FF00BC`, `rgb(10,20,255)`. If the value is a function, this function has to read one parameter of type number (0..100) and return a color code (string). If the option is neiter `undefined` nor a string nor a function, the plug-in will throw an exception.
* `colorAttr`: string. Default is `undefined`. Only evaluated if `color` is undefined. Name of a color attribute: If defined, the function will look for an attribute of this name inside the opening tag of the found element, and if found, will try to use the attribute's content (string) to set the pie color. The attribute must contain a color name or code (see `color`).
* `colorFunctionAttr`: string. Default is `undefined`. Only evaluated if no color has already been set with `color` or `colorAttr`. Name of an attribute containing JavaScript code (as string literal) for calculating a color.
* `inner`: Object. Default is `undefined`. This object may contain a subset of the option properties described above {`mode`, `color`, `valueAttr`, `valueAdapter`, `colorAttr`, `colorFunctionAttr`, `size`, `ringWidth`}. If `inner` is not undefined, then _two_ piecharts will be drawn: An outer, larger chart with circle around it, described with all the other options, and a second, smaller, inner pie on top of the outer. The inner circle's value might be taken from a second attribute (denoted by `inner.valueAttr`) or might be calculated from the same value string as the outer value, just by a different `inner.valueAdapter` mapping. At least one of these two options should be defined. Also, the inner pie should have a different color than the outer one, defined by `inner.mode` or `inner.color`. If `inner.size` is specified, the outer `size` option should also be set manually and should be larger than `innser.size`. If `inner.size` is left undefined, the inner pie is automatically slightly smaller than the outer one (approx. two thirds of the outer).
* `rotation`: string, boolean or object. Default is `undefined`. If this option is ‘truthy’ (i.e. not `undefined`, not `false`, not `0` etc.), the (outer) pie or ring fragment will be animated by rotating around its center. The default speed is one rotation per second, the default direction is clockwise. (Both are applied, if you set `rotation: true`.) If the option is a string, this will be inserted into the `dur`-Attribute of the SVG animation, i.e. it will define the rotation speed by setting the duration for one full (clockwise) rotation. Legal values are numbers with units like `"2s"` for two seconds or `"500ms"` for 500 milliseconds, i.e. half a second. rotation may also be an object with _two (sub-)properties_: `duration` defining the duration of one turn (just like the simple string value for `rotation`, `clockwise` is a boolean defining the rotation direction. Set this to `false` for an anti-clockwise rotation.
	It's not recommended to define a `rotation` for pies or rings acually measuring a progress, but for usage with constant values to draw a “busy-indicator” like a rotating ring with a small gap. The constant value (like 90% for a ring with a 10% gap) may be specified by setting a `valueAdapter` function returning this constant. See `examples.html`!

#### Dynamically updating pies

* In default mode (value is content of element and SVG gets prepended (or appended) to this content) a dynamic value update is usually achieved by:
	* overwriting the content with a new value (effectively removing a previously rendered pie) and
	* re-calling the plug-in to render any missing pies (option `update: false`).
* In attribute value mode (the number is not visible but present as an attribute to the element whose content usually—but not necessarily—consists only of the pie), an update is best achieved by:
	* overwriting the value attribute and
	* re-calling the plug-in with option `update: true`.

#### Overwriting default options

* You may insert a JavaScript code executed immediately when loading the document (but only after loading the jQuery plug-in) that modifies the `$.fn.progressPie.defaults` object by either overwriting a property with a new default value other than that described above or by introducing a new property with a default value for an option that is normally undefined by default.
* The default color for progresspies (`#888`) is defined in the property `color` of the default Mode enum constant: `$.fn.progressPie.Mode.GREY.color`. This is a string property and may be overwritten with any valid color code in order to set a different default color for the default mode (`GREY`).
* Similarly, the default colors for modes `COLOR`, `GREEN` and `RED` are stored in properties of the Mode enum values:
	* `$.fn.progressPie.Mode.RED.value` is a number between 0 and 255 (inclusive), i.e. a byte, defaulting to 200.
	* `$.fn.progressPie.Mode.GREEN.value` is also a byte defaulting to 200.
	* The color in mode `RED` is simply `rgb($.fn.progressPie.Mode.RED.value, 0, 0)`.
	* The color in mode `GREEN` is thus `rgb(0, $.fn.progressPie.Mode.GREEN.value, 0)`.
	* The color in mode `COLOR` is calculated by `$.fn.progressPie.colorByPercent(number)` as an RGB code also based on these constants.
	* Thus, if you want to use these modes but want to adjust the brightness of the calculated colors, you may adjust these properties.

#### Writing your own color function

As described above, by simply setting the option `{mode: $.fn.progressPie.Mode.COLOR}`, the color of the pie get dynamically calculated based on the percent value, and the colors used for that are in some degree customizable via overwriting `$.fn.progressPie.Mode.GREEN.value` or `…RED.value`. 

But if you want more flexibility in dynamically setting a color, you may provide your own JavaScript function which receives the percent value as parameter (number) and has to return a string describing the color (like `#3bf` or `rgb(100,255,100)`).

You could simply _overwrite_ the function `$.fn.progressPie.colorByPercent`. This way your function would always be applied for any pie rendered in `COLOR` mode. 

But the more flexible way is to write one or more own color functions and apply them individually to (classes of) pies instead of using the default `COLOR` mode, which is then still available.

Simply write your function and then set a reference to it in the options passed to the options, like in:

    <script type="text/javascript">
    function blueGt25(percent) {
      var blue = percent < 25 ? 0 : (percent-25)*3; //range from 0 to 3*75 = 225 ( = max brightness for value of 100%)
      return "rgb(0,0," + blue + ")";
    }
		
    $(function() {
      $(".test.myblue").progressPie({color:blueGt25});
    });
    </script>

The example above defines a color function which sets the pie color to black for all values of 0% to 25% inclusive. For values greater than 25% the color is blue: an rgb code with red and green values of 0 and a blue component growing brighter with the percent value up to 225 (a little darker than the brightest blue (255)).

Of course, a color function may also be embedded inline in the options object, if it's not needed elsewhere. The following example defines an inline function setting one (greenish) color for values starting at 50% and another color (reddish) for lower values:

    $(".test.myfunc").progressPie({color:function(percent) {
      return percent >= 50 ? "#3f3" : "#f33";
    }});

Last but not least you may **reuse the internal color function** `$.fn.progressPie.colorByPercent` within your own color function instead of calculating a color code all by yourself: Let's say, you want all values between 0% and 50% to be drawn in the same red and apply the default `COLOR` scheme only for values starting at 50% (green for 100%, yellow for 75%, red for 50%). This could be done the following way:

    function colorGt50(percent) {
      var p = percent <= 50 ? 0 : 2 * (percent - 50);
      return $.fn.progressPie.colorByPercent(p);
    }

#### valueAdapters and double pies

If the source value to be visualized as filled circle (pie) is not a percent value (0..100), you may write your own adapter function for mapping the actual values (any string) to a percent number. This mapping might be of arithmetic nature (e.g. converting a value of 0 to 60 minutes into a percent number) or of syntactic nature (e.g. extracting a percent number out of a string also containing other characters)—or both. Use the `valueAdapter` option (see above) to specify your adapter function. (Default is `parseInt`, i.e. a function simply interpeting a string like "100" as a (decimal integer) number.

If you want to display _two_ values in one graphic (e.g. hours and minutes), that's also possible—not as simple to read/understand at first glance, though. Use the `inner` option (see above) to specify that and how the second, inner pie should be generated.

The examples page `examples.html` contains demonstrations for both options.

Note: These features are only available with direct use of `jquery-progresspiessvg.js` and not via `progresspiesvgAppl.js`.

### Simplified usage via `progresspiesvgAppl.js`

If you prefer not to write your own JavaScript-/jQuery-Code in order to apply the progresspie plug-in to selected elements of your choice, you may use this additional JavaScript file. It is a default application of the plug-ins to elements which must meet some conventions.

If you include this script into an HTML document, each HTML element _of class_ `progresspie` is fitted with a pie chart. This requires the element (which is usually an inline element like a `span`) to contain a number from 0 to 100 (inclusive) as its only content or alternatively in an attribute named `data-percent`. 

By default the pie is grey. By adding an additional _class_ `color`, `red` or `green` you get a dynamically colored resp. statically red or green pie. (These classes must not be combined and activate the corresponding plug-in mode `COLOR`, `RED` or `GREEN` respectively.)   
Adding the class `vcenter` activates vertical centering, otherwise the graphic is aligned with the bottom of the element.

For user-defined color you may either add an attribute `data-piecolor` defining a static color code or an attribute `data-piecolor-function` providung a string which evaluates to a function mapping a number (range 0..100) to a color code.

* See JsDoc documentation of the script file (Namespace `progressPies`) for a more detailed description. 
* See `examplesAppl.html`

## SVG Content plug-ins

The progresspieSVG jQuery plug-in provides a private plug-in mechanism itself, which may be used to plug additional drawing logic into the main plug-in, adding SVG content to the pie or ring chart.

To apply a content plugin, add the option `contentPlugin` to the argument object you pass to the jQuery plug-in. The value of this option is either a reference to a javascript function (conforming to the plug-in API as described below), or simply the name of a function as a string. In the latter case the function *must* be member of the namespace `jQuery.fn.progressPie.contentPlugin`. Only then it can be looked up by its name. This is the recommended namespace for any content plug-in.

A content plug-in may itself be configured by an object defining options. Any properties defined in an object passed to the jQuery progress pie plug-in via its option `contentPluginOptions` will be passed along to the content plug-in specified by `contentPlugin`.

### Control Icons

`jquery-progresspiesvg-controlIcons.js` is a script file defining three such content plug-ins `play`, `stop` and `pause` for drawing media control icons (a right-pointing triange, square or two parallel vertical rectangles, resp.) inside a ring graph. 

By default, the play-, pause or stop icon is drawn in the same color as the pie/ring chart itself. If combined with a ring chart (i.e. option `ringWidth` is set, see above), it is auto-sized to fit inside the ring, otherwise it's drawn on top of the pie and auto-sized to fit into the outer circle stroke. These defaults may be overridden by the following options (defined as properties of an object assigned to the `contentPluginOptions` option):

* `color`: string, color code. Defines the color for the control icon.
* `maxSize`: number. If defined, this defines a maximum constraint for the auto-sizing: For the play and stop icon, `maxSize` defines the maximum width and height. The play icon is always a bit larger in height and width than the others, due to the fact that the triangle icon fills much less areas and thus looks smaller.

See the content plug-ins example page for demonstrations of the plug-in and its options.

### Value Display

`jquery-progresspiesvg-valueDisplay.js` is a script file defining content plug-ins for drawing a value inside a ring graph.

This script defines two content plug-ins: `percent` and `rawValue`. Both are designed to be combined with ring charts (i.e. usage of the progressPie plug-in with the `ringWidth` option set) and draw a number (value) and optionally a unit label into the ring. The `percent` plug-in always renders a percent value (0..100).

If the chart is defined with other than percent values and a `valueAdapter` function is used to convert the raw value to a percent value, then the `percent` plug-in will render the result of the valueAdapter function, while the `rawValue` plug-in will draw the unconverted, raw value. The `percent` plug-in always adds the label "%" to the value, while the `rawVale` plug-in takes a `unit` argument defining an _optional_ label to append to the value.

The plug-ins accept the following options (defined via `contentPluginOptions`):

* `unit`: String. Default is `undefined`. Only for `rawValue` plug-in, ignored by `percent` plugin: This defines the unit label to append to the raw value, e.g. "sec."
* `singleLine`: boolean. Default is `undefined`. If truthy, the unit ("%" or value of `unit`) will be put _behind_ the value into the same line, otherwise (default) _below_ the value in a second line.
* `fontSizeFactor`: Number. Default is 1.0 (or 0.9 if `singleLine` is truthy). The font-size for the value is the inner radius of the ring multiplied by this factor.
* `unitFontSizeFactor`: Number. Default is 0.35. Defines the font-size for the unit label.
* `color`: String, color code: Overrides the default color for value and unit (which is the same color as that of the pie/ring graph itself).

Instead of passing an individual options object to the progressPie plugin via its `contentPluginOptions` option, you may also globally alter the defaults by manipulating the object `$.fn.progressPie.contentPlugin.valueDisplayDefaults`.

See the content plug-ins example page for demonstrations of the plug-in and its options.

### Writing your own content plug-ins (API)

You may create you own content plug-in function:

The function _should_ be in the namespace `jQuery.fn.progressPie.contentPlugin`. If it is, you may simply state the function's name as a string literal in the `contentPlugin` option. (Otherwise the options needs to hold a JavaScript function reference to the content plug-in function.)

Just like when [writing jQuery plug-ins][pluginCreation], you may locally bind the `$` sybol to `jQuery` in an immediately invoked function expression like:

    ( function($) {
        $.fn.progressPie.contentPlugin.yourPluginFunction = function(args) {
            …
        }
    } (jQuery));

Your function has to take exactly one argument (let's assume you call the formal parameter `args` like in the example above). When your plug-in function gets called by progressPie, this parameter will hold an object with at least the following properties:

* `newSvgElement`: function(name). Your plug-in may call this function to insert a new SVG node directly into the pie graph SVG (in addition to the SVG output already produced by the progressPie jQuery plug-in itself). The argument `name` defines the element/tag name for the new element. The function return a reference to the newly created node which you need to configure the node, like adding attributes or child elements.
* `newSvgSubelement`: function(parent, name). If you want to add child elements to an SVG element, use this function. The first argument takes a reference to parent element you want to add a child node to, the second argument takes the tag name like in `newSvgElement`.
* `radius`: number. If the progressPie plug-in draws a simple pie chart (i.e. option `ringWidth` is undefined), this is the radius of the pie. If `ringWidth` is set, this is the pie radius minus `ringWidth`, i.e. the radius of the free space inside the ring. Your content plug-in should base the size of the content it draws on this value.
* `color`: string (color code). By default this is exaclty the color of the pie/ring chart, unless the `contentPluginOptions` object overrides this.
* `precentValue`: number. The value in 0..100 depicted by the progressPie chart.
* `rawValue`: string. The raw string defining the value of the pie chart. This may be a percent number or any other value which gets converted into a percent value by a `valueAdapter` function, see above.

In addition to these properties, the `args` object will hold any property the user added to the `contentPluginOptions` object. If your plug-in should define its own properties (such as the `fontSizeFactor` option of the Value Display content plug-in described above), simply document these and the user of your content plug-in may insert these options into the `contentPluginOptions`.

After evaluating these arguments, your function may now insert SVG elements (using the `newSvgElement` function and maybe also `newSvgSubelement`). For positioning these elements, you need to know the origin of the coordinate system: The point (0, 0) refers to the _center of the circle_!

As a very simple example, the following function describes a content plug-in which simply draws a filled square inside the ring graph (or on top of a pie graph) in the same color and with a side length which equals the radius of the circle. So, since (0, 0) is the circle's center and the square should be circled and radius is the width and height of the square, its top left corner has to be located at the coordinates (-radius/2, -radius/2):

    ( function($) {
        $.fn.progressPie.contentPlugin.mySquare = function(args) {
            var square = args.newSvgElement("rect");
            var topleft = - args.radius / 2;
            square.setAttribute("x", topleft);
            square.setAttribute("y", topleft);
            square.setAttribute("width", args.radius);
            square.setAttribute("height", args.radius);
            square.setAttribute("style", "fill: " + args.color + "; stroke: none");
        }
    } (jQuery));

Have a look at the source code of the included content plug-ins for more examples.

## License: BSD 2-clause

Copyright (c) 2015, Immo Schulz-Gerlach, www.isg-software.de   
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.





[jquery]: https://jquery.com
[home]: http://www.isg-software.de/progresspie/indexe.html
[pluginCreation]: https://learn.jquery.com/plugins/basic-plugin-creation/