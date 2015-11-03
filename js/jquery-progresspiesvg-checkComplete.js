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

	

	/**
	 * SVG Content Plug-in for jquery-progresspiesvg: Does nothing for values less than 100%, but draws a check mark / tick onto the 
	 * fully filled pie resp. inside the full ring for a value of 100%.
	 * Use by adding the option <code>contentPlugin: "checkComplete"</code> (or <code>contentPlugin: $.fn.progressPie.contentPlugin.checkComplete</code>)
	 * to your call of the progresspie plug-in.
	 * <p>Additional arguments may be supplied by adding the option <code>contentPluginOptions</code> to the progressPie plugin options.
	 * This is to be an object which may hold the following properties:</p>
	 * <ul>
	 * <li><code>strokeWidth</code>: Defaults to 2. Width of the stroke for the check mark (not equal to the strokeWidth option of the pie chart (outer circle)</li>
	 * <li><code>lineCap</code>: Defaults to "round", may take any value allowed for the SVG line-cap style, like "square".</li>
	 * <li><code>color</code>: draw the check mark in a specific color (defaults to the color of the surrounding ring chart resp. to white on a pie chart).</li>
	 * </ul>
	 * <p>Please note: This function is called <em>internally</em> by the progressPie jQuery plug-in! Don't call this function directly,
	 * but use it as desrcibed above!</p>
	 * @function checkComplete
	 * @param {object} args object holding several arguments provided by the progressPie plug-in, including any option you specified in
	 * the object <code>contentPluginOptions</code>.
	 * @memberof jQuery.fn.progressPie.contentPlugin
	 * @requires jquery-progresspiesvg-min.js
	 */
	$.fn.progressPie.contentPlugin.checkComplete = function(args) {
		if (args.percentValue === 100) {
			var check = args.newSvgElement("path");
			var r2 = args.radius / 2.2;
			var r10 = args.radius / 10;
			var opts = $.extend({}, $.fn.progressPie.contentPlugin.checkCompleteDefaults, args);
			//checkCompleteDefaults ma
			var color = typeof args.pieOpts.ringWidth === "undefined" ? "white" : opts.color;

			check.setAttribute("d", "M -" + r2 + ",0 L -" + r10 + "," + r2 + " L " + r2 + ", -" + r2);
			check.setAttribute("style", "stroke-width: " + opts.strokeWidth + "; stroke-linecap: " + opts.lineCap + "; stroke: " + color + "; fill: none");
		}
	};
	
	/**
	 * Default Options.
	 * This is a public (static) object in order to allow users to globally modify the defaults
	 * before using the <code>checkComplete</code> content plug-in.
	 * @member checkCompleteDefaults
	 * @memberof jQuery.fn.progressPie.contentPlugin
	 * @property {number} strokeWidth - Width of the stroke the check mark is drawn width, defaults to 2.
	 * @property {string} lineCap - Value for SVG style property "line-cap" defining the look of the line ends of the check mark. Defaults to "round".
	 */
	$.fn.progressPie.contentPlugin.checkCompleteDefaults = {
		strokeWidth: 2,
		lineCap: "round"
	};

} (jQuery));