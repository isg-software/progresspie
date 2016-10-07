/**
 * @license 
 * Copyright (c) 2016, Immo Schulz-Gerlach, www.isg-software.de 
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
	 * SVG Content Plug-in for jquery-progresspiesvg:
	 TODO
	 * <p>Please note: This function is called <em>internally</em> by the progressPie jQuery plug-in! Don't call this function directly,
	 * but use it as desrcibed above!</p>
	 * @function image
	 * @param {object} args object holding several arguments provided by the progressPie plug-in, including any option you specified in
	 * the object <code>contentPluginOptions</code>.
	 * @memberof jQuery.fn.progressPie.contentPlugin
	 * @requires jquery-progresspiesvg-min.js
	 */
	$.fn.progressPie.contentPlugin.image = {
		draw: function(args) {
			if (typeof args.href !== "string") {
				throw "$.fn.progressPie.contentPlugin.image requires argument 'href' of type 'string'!";
			}
			var opts = $.extend({}, $.fn.progressPie.contentPlugin.imageDefaults, args);
			
			var r = opts.getBackgroundRadius();
			if (opts.isFullSize()) {
				//in fullsize mode the image shall not only cover the pie chart, but the pie chart plus its padding (if > 0).
				r += opts.pieOpts.padding;
			}
			var w = 2 * r;
			
			var img = args.newSvgElement("image");
			img.setAttribute("width", w);
			img.setAttribute("height", w);
			img.setAttribute("x", -r);
			img.setAttribute("y", -r);
			img.setAttributeNS("http://www.w3.org/1999/xlink", "href", args.href);
			
			if (opts.clipCircle) {
				var cp = args.newDefElement("clipPath");
				var id = args.createId("clipcircle");
				cp.setAttribute("id", id);
				img.setAttribute("clip-path", "url(#" + id + ")");
				var c = args.newSvgSubelement(cp, "circle");
				c.setAttribute("cx", 0);
				c.setAttribute("cy", 0);
				c.setAttribute("r", r);
			}
		},
		inBackground: function(args) {
			var opts = $.extend({}, $.fn.progressPie.contentPlugin.imageDefaults, args);
			return opts.inBackground;
		}
	};
	
	/**
	 * Default Options.
	 * This is a public (static) object in order to allow users to globally modify the defaults
	 * before using the <code>checkComplete</code> content plug-in.
	 * @member imageDefaults
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
	 */
	$.fn.progressPie.contentPlugin.imageDefaults = {
		inBackground: true,
		clipCircle: false
	};

} (jQuery));