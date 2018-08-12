/**
 * @license 
 * Copyright (c) 2018, Immo Schulz-Gerlach, www.isg-software.de 
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

	function iconRad(opts, contentRad) {
		var r = contentRad;
		var factor = opts.iconSizeFactor;
		if (typeof factor !== "number") {
			factor = typeof opts.pieOpts.ringWidth !== "undefined" && !opts.backgroundColor ? opts.iconSizeFactorRing : opts.iconSizeFactorPie;
		}
		r *= factor;
		if (opts.lineCap !== "none") {
			r -= opts.strokeWidth / 2; //Radius of lineCap is half the strokeWidth
		}
		return r;
	}

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
	 * <li><code>backgroundColor</code>: Defaults to <code>undefined</code>. If undefined, the check icon is drawn directly onto the fully filled pie resp.
	 * onto the blank space inside a fully filled ring. Especially if combined with a ring, you may optionally set this option do draw a filled circle inside the ring
	 * and to draw the check mark onto this circle.</li>
	 * <li><code>fullSize</code>: Only for progress rings (and only meant for combination with a <code>backgroundColor</code>): Setting this to true
	 * causes the filled background circle of the check icon to fully cover the whole ring chart instead of being drawn inside the free space of the ring.
	 * Defaults to false.</li>
	 * <li><code>inBackground</code>: boolean, defaults to false. If set to true, the icon will be drawn behind the chart
	 * instead of on top of it. In that case, the chart has to provide some kind of transparency in order for the check icon
	 * to be at least partly visible, e.g. by using a foreground color with alpha channel (rgba) or by drawing a ring chart
	 * with free/transparent room in the middle.</li>
	 * <li><code>margin</code>: number, defaults to undefined: Only used if the <code>backgroundColor</code> option is set. In that case, it defines the margin
	 * in pixels left free around the filled background circle. For a progress <em>pie</em> or if the <code>fullSize</code> option is truthy, this value (if the property is
	 * not set) defaults to zero, which means the background completely covers the pie graph. Increasing the value will reduce the icon in size, leaving some of
	 * the pie chart visible around it.<br>
	 * For a progress <em>ring</em> without <code>fullSize</code> option, the default
	 * margin value (if the property is not set) is 1, meaning a gap of 1 pixel width is left free between the ring and the filled background. Set this to zero
	 * in order for the background to "touch" the ring, or to a negative value in order to (partially) overlap the ring.</li>
	 * <li><code>iconSizeFactor</code>: Defines the ration between the background radius and the radius of the circumcircle of the check's stroke. I.e. if set to 1.0,
	 * the check's stroke ends will touch the edge of the background circle, smaller values will leave a margin between the background and the check.
	 * This defaults to 0.6 if the check is drawn onto a pie or if the <code>backgroundColor</code> option is set. If the check is drawn directly into the inner space
	 * of a ring graph without background color, this defaults to 0.8.</li>
	 * <li><code>animate</code>: boolean or string with duration (number and time unit): If true or string, an animation drawing the check (from left to right) will be added.
	 * If the value is a string, it has to be a valid duration value defining the speed of the animation. If "true", the default duration (1s) will be applied.</li>
	 * <li><code>contentPlugin</code> and <code>contentPluginOptions</code>: These options are ignored vor a value of 100%, i.e. in case the check mark gets drawn as
	 * content for the progress pie. But if set, this content plug-in will delegate to the alternative content plug-in stated here-in for any percent value less than 100%.
	 * I.e.: This plug-in will decide if the percent value is 100 or less, in the first case drawing the check mark as content, while in the second case, i.e. for any percent
	 * value in 0..99, the content of this "secondary" plug-in will be added to the pie/ring chart.</li>
	 * </ul>
	 * <p>Please note: This function is called <em>internally</em> by the progressPie jQuery plug-in! Don't call this function directly,
	 * but use it as desrcibed above!</p>
	 * @function checkComplete
	 * @param {object} args object holding several arguments provided by the progressPie plug-in, including any option you specified in
	 * the object <code>contentPluginOptions</code>.
	 * @memberof jQuery.fn.progressPie.contentPlugin
	 * @requires jquery-progresspiesvg-min.js
	 */
	$.fn.progressPie.contentPlugin.checkComplete = {
		draw: function(args) {
			if (args.percentValue === 100) {
				var opts = $.extend({}, $.fn.progressPie.contentPlugin.checkCompleteDefaults, args);
				var r = opts.getBackgroundRadius(!opts.backgroundColor);
				opts.addBackground(r, opts.cssClassBackgroundCircle);
				var r2 = iconRad(opts, r);
				var offset = r2 / Math.sqrt(2); //see errorIcons plug-in
				var innerOffset = offset / 22;
				var start = "M -" + offset + ",0 ";
				var line1 = "L -" + innerOffset + "," + offset + " ";
				var line2 = "L " + offset + ", -" + offset;
				var check = args.newSvgElement("path");
				check.setAttribute("d", start + line1 + line2);
				//Color styles
				const pieMode = typeof args.pieOpts.ringWidth === "undefined";
				const cssMode = typeof opts.color !== "string";
				//Filling for a check mark never makes sense, so always (even in CSS mode)
				//add style fill:none, which can only be overridden by !important directive:
				check.style.fill = "none";
				//Now for the stroke color, depending on the modes:
				if (!cssMode) { //Not CSS mode, apply normal inline CSS
					var color = pieMode ? "white" : opts.color;
					check.style.stroke = color;
					check.style.strokeWidth = opts.strokeWidth;
					check.style.strokeLinecap = opts.lineCap;
				} else {
					check.setAttribute("stroke-width", opts.strokeWidth);
					check.setAttribute("stroke-linecap", opts.lineCap);
					//In CSS Mode, normally add no stroke style at all, except in pie mode: Then, the check
					//should still default to white color, but not set as inline CSS style but
					//as SVG attribute in order to enable CSS override without "!important" directive.
					if (pieMode) {
						check.setAttribute("stroke", "white");
					}
				}
				check.setAttribute("class", opts.cssClass);
				if (opts.animate) {
					var anim = args.newSvgSubelement(check, "animate");
					anim.setAttribute("attributeName", "d");
					anim.setAttribute("dur", typeof opts.animate === "string" ? opts.animate : "1s");
					anim.setAttribute("repeatCount", "1");
					anim.setAttribute("values", start + "l0,0 l0,0; " + start + line1 + "l0,0; " + start + line1 + line2);
					anim.setAttribute("calcMode", "spline");
					anim.setAttribute("keyTimes", "0; .25; 1");
					anim.setAttribute("keySplines", ".5 0 .3 1; .3 0 0 1");
				}
			} else if (typeof args.contentPlugin !== "undefined") {
				var f = args.getContentPlugin(args.contentPlugin);
				var cpArgs = typeof args.contentPluginOptions === "object" ? $.extend({}, args, args.contentPluginOptions) : args;
				f(cpArgs);
			}
		},
		hidesChartIfFullSize: function(args) {
			var opts = $.extend({}, $.fn.progressPie.contentPlugin.checkCompleteDefaults, args);
			return args.percentValue === 100 && typeof opts.backgroundColor === 'string' && opts.backgroundColor.substr(0,4) !== 'rgba' && !opts.margin &&
					 !this.inBackground(args);
		},
		inBackground: function(args) {
			var opts = $.extend({}, $.fn.progressPie.contentPlugin.checkCompleteDefaults, args);
			return opts.inBackground;
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
	 * @property {number} iconSizeFactorPie - Defines the size of the check icon for a pie graph (i.e. when the <code>ringWidth</code> option is not set) and also for the ring, if the <code>backgroundColor</code> plug-in option is set (it's undefined by default):
	 * If r is the total radius of the pie chart, the check mark is fit into an inner circle with radius r * iconSizeFactorPie.
	 * Defaults to 0.6 (i.e. filling 60% of the pie).
	 * This is ignored, if the iconSizeFactor option is defined! It's just the default value for iconSizeFactor for pie graphs and for filled circular backgrounds inside a ring graph.
	 * @property {number} iconSizeFactorRing - Defines the size of the check icon for a ring graph (i.e. if the ringWidth option is set) if no <code>backgroundColor</code> option is set (i.e. if the check is drawn directly onto the blank / transparent space inside the ring):
	 * If r is the radius of the <em>free space inside the ring</em>, then the check mark is fit into an inner circle with 
	 * radius r * iconSizeFactorRing. Defaults to 0.8 (i.e. filling 80% of the free space inside the ring). (If set to 1.0, the
	 * check mark would touch the ring.)
	 * This is ignored, if the iconSizeFactor option is defined! It's just the default value for iconSizeFactor for ring graphs.
	 * If a user wants to set an individual size factor in the <code>contentPluginOptions</code> object, he does not have to
	 * overwrite one of these two values, but may specify simply a <code>iconSizeFactor</code> property. Only if the latter is
	 * undefined, the plug-in will evaluate <code>iconSizeFactorPie</code> or <code>iconSizeFactorRing</code>, depending
	 * on the <code>ringWidth</code> option.
	 * @property {boolean} fullSize - If true and if the plug-in gets called with a ring chart, this causes the icon to be drawn full-size onto the whole
	 * chart instead of being fitted into the blank space inside the ring. Should only be combined with the <code>backgroundColor</code> option. Defaults to false.
	 * @property {boolean} inBackground - If false, the check icon is placed on top of the chart (into the foreground),
	 * if true, the check will be drawn as background with the chart on top. Defaults to false.
	 * @property {string} cssClass – The content of the <code>class</code> attribute to be added to the check stroke,
	 *  defaults to "progresspie-check". Allows selection of the check icon for CSS formatting.
	 * @property {string} cssClassBackgroundCircle – Optional, default is undefined. If defined, a background circle
	 *  (behind the actual check mark) will be added to the chart regardless of the presence of the backgroundColor option.
	 *  Will add a class attribute with this value to the circle element.
	 */
	$.fn.progressPie.contentPlugin.checkCompleteDefaults = {
		strokeWidth: 2,
		lineCap: "round",
		iconSizeFactorPie: 0.6,
		iconSizeFactorRing: 0.8,
		fullSize: false,
		inBackground: false,
		cssClass: "progresspie-check", 
		cssClassBackgroundCircle: undefined
	};

} (jQuery));