/**
 * @license 
 * Copyright (c) 2015-2017, Immo Schulz-Gerlach, www.isg-software.de 
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are 
 * permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT 
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, 
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED 
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; 
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN 
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY
 * WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/* exported progressPies */

/**
 * Module with a default application of the jQuery-ProgressPie-Plugin. This is to say: By inserting this javascript file
 * after the original plugin file (and of course jQuery itself) into your HTML document, you don't have to write any JavaScript
 * code for applying the plugin yourself, but this script applies the module to any element in your HTML of class "progresspie"
 * or class "progressring". Elements of class "progresspie" draw a "pie chart", elements of class "progressring" a fine circle with
 * a partial thicker ring inside (like a circular progress bar). See examplesAppl.html. (The stroke-widths are predefined when using
 * this application script—use the plugin directly to get more control.)
 * <p>
 * Some additional options (though not everything possible when using the plugin directly) may be applied by adding further predefined
 * class names to the element or by adding data-attributes of certain names:
 *
 * <ul>
 * <li>Simplest usage: Insert an HTML element (usually <code>span</code>) with <code>class="progresspie"</code> and with a number ranging from 0 to 100
 * als its only content. In this case the pie will be prepended to the number in the default color (grey),
 * e.g. <code>&lt;span class="progresspie"&gt;55&lt;/span&gt;</code></li>
 * <li>Use <code>class="progressring"</code> instead, if you prefer the ring display over the pie display.</li>
 * <li>Add class <code>color</code> to activate the default red-yellow-green-color-scheme for dynamically coloring the pie depending on the value,
 * e.g. <code>&lt;span class="progresspie color"&gt;55&lt;/span&gt;</code></li>
 * <li>Add one of the classes <code>red</code> or <code>green</code> for constant red or green color,
 * e.g. <code>&lt;span class="progresspie red"&gt;55&lt;/span&gt;</code></li>
 * <li>To apply a constant user-defined color, insert an attribute named <code>data-piecolor</code> with the color code or name,
 * e.g. <code>&lt;span class="progresspie" data-piecolor="#4f4"&gt;55&lt;/span&gt;</code></li>
 * <li>To apply a user-defined dynamic color (defined via a self-written JavaScript function), you may add the attribute <code>data-piecolor-function</code>.
 * The attribute value (a string) must evaluate to a function which takes a number (0..100) and returns a string describing a color.
 * This attribut value could be the function code itself, but it's usually better to just state the name of a function defined in a JavaScript block,
 * e.g. <code>&lt;span class="progresspie" data-piecolor-function="myColorFunction"&gt;55&lt;/span&gt;</code></li>
 * <li>By default the image is vertically aligned at the bottom of the element. For inline elements like span that is the bottom of the line.
 * In some cases you might want to vertically center the image inside the element (for instance if the line is higher than the text, which may
 * be achieved with setting <code>line-height</code>). For vertical centering add the class <code>vcenter</code>,
 * e.g. <code>&lt;span class="progresspie color vcenter"&gt;55&lt;/span&gt;</code></li>
 * <li>If you add the attribute <code>data-percent</code> to a .progresspie-element, the value of that attribute is used instead
 * of the element's content
 * e.g. <code>&lt;span class="progresspie" data-percent="55"&gt;&lt;/span&gt;</code></li>
 * <li>Add the class <code>busy</code> to the element if you don't want to display a percent value, but only
 * want to indicate your system is busy without measuring the progress. In this case a clockwise rotation animation
 * is inserted: either a small rotating pie slice (if combined with class <code>progresspie</code>) or a thins
 * ring with a rotating gap in it (if combined with class <code>progressring</code>).</li>
 * </ul>
 *
 * <p>Normally you don't have to call any JS function, the drawing function gets automatically applied once for each element of class progresspie or progressring 
 * when the document is loaded. Manual calls may be triggered for updates: Overwrite the content of a progresspie element with a new value
 * (removing the previously rendered pie) and then call {@link progressPies.draw} for updating all elements of class <code>progresspie</code>
 * with missing SVGs.
 *
 * @namespace
 */
var progressPies = {
	/**
	 * public static method to calculate a color for a percent value: green for 100%, red for 0%, yellow for 50%, 
	 * gradients for values in between.
	 * <p>This is an alias for / link to the original plugin function <code>$.fn.progressPie.colorByPercent</code>.
	 * This may be used, if you want to write your own color functions which call the colorByPercent function with modified values.
	 * If you are using this module anyway, calling <code>progressPies.colorByPercent</code> is simply a bit shorter and prettier than
	 * calling <code>$.fn.progressPie.colorByPercent</code>.
	 * @param {number} percent value from 0 to 100
	 * @return {string} color code the input has been mapped to
	 */
	colorByPercent: $.fn.progressPie.colorByPercent,
	/**
	 * The draw method triggers the search for all elements of class <code>progresspie</code> not already containing an
	 * <code>svg</code> element and insertion of the pies into those elements, regarding further classes like <code>color</code>
	 * for a red, yellow or green color (or something in between) dependent on the value (percent), <code>red</code> or <code>green</code>
	 * for constant colors and also taking into account the optional attributes <code>data-percent</code>, <code>data-piecolor</code> and
	 * <code>data-piecolor-function</code>.
	 *
	 * <p>This function gets executed automatically once after the DOM has been loaded!
	 */
	draw: function() {
		"use strict";
		var options = {valueAttr: "data-percent"};
		var apply = function(el, opts) {
			var localOpts = $.extend({}, opts);
			if (el.hasClass("vcenter")) {
				$.extend(localOpts, {verticalAlign: "middle"});
			}
			if (el.hasClass("progressring") && !el.hasClass("busy")) {
				$.extend(localOpts, {strokeWidth: 1, ringWidth: 3});
			}
			if (el.hasClass("busy")) {
				localOpts.rotation = true;
				if (el.hasClass("progressring")) {
					$.extend(localOpts, {
						strokeWidth: 0,
						ringWidth: 1,
						valueAdapter: function() {return 90;}
					});
				} else {
					localOpts.valueAdapter = function() {return 5;};
				}
			}
			el.progressPie(localOpts);
		};
		$(".progresspie:not(.color):not(.green):not(.red):not([data-piecolor]):not([data-piecolor-function]), .progressring:not(.color):not(.green):not(.red):not([data-piecolor]):not([data-piecolor-function])").each(function(){apply($(this), options);});
		$(".progresspie.color, .progressring.color").each(function(){apply($(this), $.extend({mode:$.fn.progressPie.Mode.COLOR}, options));});
		$(".progresspie.green, .progressring.green").each(function(){apply($(this), $.extend({mode:$.fn.progressPie.Mode.GREEN}, options));});
		$(".progresspie.red, .progressring.red").each(function(){apply($(this), $.extend({mode:$.fn.progressPie.Mode.RED}, options));});
		$(".progresspie[data-piecolor], .progressring[data-piecolor]").each(function(){apply($(this), $.extend({colorAttr: "data-piecolor"}, options));});
		$(".progresspie[data-piecolor-function], .progressring[data-piecolor-function]").each(function(){apply($(this), $.extend({colorFunctionAttr: "data-piecolor-function"}, options));});
	}
};


$(function () {
	"use strict";
	progressPies.draw();
});