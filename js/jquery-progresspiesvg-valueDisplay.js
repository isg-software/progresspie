/**
 * @license 
 * Copyright (c) 2015, Immo Schulz-Gerlach, www.isg-software.de 
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


( function($) {

	var drawText = function(line1, line2, args) {
		var text = args.newSvgElement("text");
		text.setAttribute("x", 0);
		text.setAttribute("y", 0);
		text.setAttribute("dy", "0.33em");
		text.textContent = line1;
		var fsFactor = typeof args.fontSizeFactor === 'number' ? args.fontSizeFactor : args.singleLine ? 0.9 : 1.0;
		//Set style attribute manually (instead of using the style properties like text.style.textAnchor etc.) for better browser support.
		//(At least Firefox 38 did not support the latter.)
		text.setAttribute("style", "text-anchor: middle; fill: " + args.color + "; font-size: " + args.radius * fsFactor + "px");
		if (typeof line2 === 'string') {
			var text2 = args.newSvgSubelement(text, "tspan");
			text2.textContent = line2;
			if (!args.singleLine) {
				text2.setAttribute("dy", "1.1em");
				text2.setAttribute("x", 0);
			}
			var fsFactor2 = typeof args.unitFontSizeFactor === 'number' ? args.unitFontSizeFactor : 0.35;
			text2.setAttribute("style", "font-size: " + args.radius * fsFactor2 + "px");
		}
	};
	
	/**
	 * SVG Content Plug-in for jquery-progresspiesvg: Display the percent value (rounded to integer) with a "%" label inside
	 * a ring graph rendered by the progressPie component.
	 * <p>Use by adding the option <code>svgContentPlugin: "percent"</code> (or <code>svgContentPlugin: $.fn.progressPie.svgContentPlugin.percent</code>)
	 * to your call of the progresspie plug-in.
	 * <p>Additional arguments may be supplied by adding the option <code>svgContentPluginOptions</code> to the progressPie plugin options.
	 * This is to be an object which may hold the following properties:</p>
	 * <ul>
	 * <li><code>singleLine</code>: Default is "undefinied". If truthy, the unit label ("%" in this case) 
	 * is displayed in the same line <em>behind</em> the percent value, otherwise in a new line below the value.</li>
	 * <li><code>fontSizeFactor</code>: Number, Default is 1.0 (0.9 in singleLine mode). The font-size for the percent number inside the ring is the inner radius
	 * of the ring multiplied by this factor. E.g. to shrink the text by 10%, set fontSizeFactor to 0.9. A factor larger than 1.0 is not recommended, because
	 * the text (especially a "100") might not fit into the graphic!</li>
	 * <li><code>unitFontSizeFactor</code>: Number, Default is 0.35. Defines the font size for the unit label ("%"),
	 * see <code>fontSizeFactor</code>.</li>
	 * <li><code>color</code>: color code (string). Defaults to the color of the ring graph. Overwrite to draw content in different color
	 * than the surrounding ring.</li>
	 * </ul>
	 * <p>Please note: This function is called <em>internally</em> by the progressPie jQuery plug-in! Don't call this function directly,
	 * but use it as desrcibed above!</p>
	 * @function precent
	 * @param {object} args object holding several arguments provided by the progressPie plug-in, including any option you specified in
	 * the object <code>svgContentPluginOptions</code>.
	 * @memberof jQuery.fn.progressPie.svgContentPlugin
	 * @requires jquery-progresspiesvg-min.js
	 */
	$.fn.progressPie.svgContentPlugin.percent = function(args) {
		drawText(Math.round(args.percentValue), "%", args);
	};
	
	/**
	 * SVG Content Plug-in for jquery-progresspiesvg: Display the the raw value of a ring graph (before translation to a percent
	 * value via a valueAdapter function) inside the ring graph, optionally combined with a second string, intended as a unit label for the value.
	 * <p>Use by adding the option <code>svgContentPlugin: "rawValue"</code> (or <code>svgContentPlugin: $.fn.progressPie.svgContentPlugin.rawValue</code>)
	 * to your call of the progresspie plug-in.
	 * <p>Additional arguments may be supplied by adding the option <code>svgContentPluginOptions</code> to the progressPie plugin options.
	 * This is to be an object which may hold the following properties:</p>
	 * <ul>
	 * <li><code>unit</code>: String, default is "undefined". If defined <code>(typeof unit === "string")</code>, this string will
	 * be displayed behind or below the value. It should be a very short string holding a unit label like "s" or "sec.".
	 * If not of type string (especially if left undefined), the value will be the sole content.</li>
	 * <li><code>singleLine</code>: Default is "undefinied". If truthy, the unit label (see above) 
	 * is displayed in the same line <em>behind</em> the percent value, otherwise in a new line below the value.</li>
	 * <li><code>fontSizeFactor</code>: Number, Default is 1.0 (0.9 in singleLine mode). The font-size for the percent number inside the ring is the inner radius
	 * of the ring multiplied by this factor. E.g. to shrink the text by 10%, set fontSizeFactor to 0.9. A factor larger than 1.0 is not recommended, because
	 * the text (especially a "100") might not fit into the graphic!</li>
	 * <li><code>unitFontSizeFactor</code>: Number, Default is 0.35. Defines the font size for the unit label,
	 * see <code>fontSizeFactor</code>.</li>
	 * <li><code>color</code>: color code (string). Defaults to the color of the ring graph. Overwrite to draw content in different color
	 * than the surrounding ring.</li>
	 * </ul>
	 * <p>Please note: This function is called <em>internally</em> by the progressPie jQuery plug-in! Don't call this function directly,
	 * but use it as desrcibed above!</p>
	 * @function rawValue
	 * @param {object} args object holding several arguments provided by the progressPie plug-in, including any option you specified in
	 * the object <code>svgContentPluginOptions</code>.
	 * @memberof jQuery.fn.progressPie.svgContentPlugin
	 * @requires jquery-progresspiesvg-min.js
	 */
	$.fn.progressPie.svgContentPlugin.rawValue = function(args) {
		drawText(args.rawValue, args.unit, args);
	};


} (jQuery));

