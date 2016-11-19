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
	 * Add an image to a progress pie chart, by default in background, alternatively in foreground. 
	 * The image has to be available as external file in a web compatible format such as SVG, JPEG or PNG.
	 * This plug-in needs at least one argument (option <code>href</code>) specifying the URL from which to load the image.
	 * It will insert an image element into the SVG containing this reference URL. When rendering the pie's SVG code,
	 * the browser will then resolve this URL and lazily load the actual image resource, just like browsers
	 * load image files specified by <code>img</code> tags with <code>href</code> attributes in HTML.
	 * <p>The images, at least background images, used should usually be square (i.e. width == height). 
	 * Non-square images are shrunk to fully fit into the square target area, vertically resp. horizontally centered.</p>
	 * <p>The target area, in which the image is fitted, is by default a square.
	 * You may set the <code>clipCircle</code> option in order to clip this square to a circle (with the
	 * square's width as diameter). Non-circular images fitted into that square will then be circularly clipped.
	 * <p>When drawing a pie, the target square is the full area covered by the pie chart plus the padding around it
	 * (which defaults to 0 but may be specified via the <code>progressPie</code>'s <code>padding</code> option).</p>
	 * <p>When drawing a ring (i.e. <code>progressPie</code>'s <code>ringWidth</code> option is defined), then, by
	 * default, this target area is fitted into the ring such that its width (and height) is the width of the
	 * free space inside the ring minus twice the <code>margin</code> which may optionally be set in the
	 * <code>contentPluginOptions</code>, see below. Yet this square area will still overlap the ring (except
	 * if the <code>clipCircle</code> option is true, see above).</p>
	 * <p>In ring mode you may set the <code>fullSize</code> option to true. In this case the image's target area
	 * is equivalent to that in pie mode.</p>
	 * <p>Via the <code>inBackground</code> option you may specify whether the image is to be positioned on top of
	 * the chart or behind it.</p>
	 * <p>A background image may also be used to fill the pie chart (instead of the background behind it).
	 * To achieve this, the pie has to be drawn in MASK mode,
	 * and the image has to be drawn as its first background (i.e. option <code>inBackground</code> has to be true (default)
	 * and no other content plug-in also draw into the background must be inserted before the image). See examples.</p>
	 * <p>To use this content plug-in add the option <code>contentPlugin: "image"</code> (or <code>contentPlugin: $.fn.progressPie.contentPlugin.image</code>)
	 * to your call of the progresspie plug-in.
	 * <p>Furthermore, also add the option <code>contentPluginOptions</code> to the progressPie plugin options.
	 * This is to be an object which must hold at least an <code>href</code> option. The following options are supported:</p>
	 * <ul>
	 * <li><code>href</code>: string, mandatory, holding the URL from which to load the image file.</li>
	 * <li><code>clipCircle</code>: boolean, defaults to false. If true, the target area (square) is reduced to a circle.
	 * The image is clipped by this circle, i.e. all areas of the image outside the circle will be invisible.</li>
	 * <li><code>fullSize</code>: boolean, defaults to false. Only affects drawing on a ring chart (i.e. with option <code>ringWidth</code> set): 
	 * In this case, the value true causes the image to cover the whole ring graph (plus optional padding) 
	 * instead of just the free space inside the ring.</li>
	 * <li><code>inBackground</code>: boolean, defaults to true. If false, the content is drawn on top of the pie or ring chart, if true, 
	 * the pie or ring chart is drawn on top of the image. This only makes a difference if both overlap or if the MASK mode
	 * is used.</li>
	 * <li><code>margin</code>: number, defaults to undefined: Defines the margin in pixels left free around 
	 * the image inside its target area. For a progress <em>pie</em> or if the <code>fullSize</code> option is truthy, 
	 * this value (if the property is not set) defaults to zero. For a progress <em>ring</em> without <code>fullSize</code> option, 
	 * the default margin value (if the property is not set) is 1.</li>
	 * </ul>
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
			var x = -r;
			var y = -r;
			var w = 2 * r;
			var h = w;
			if (opts.isFullSize()) {
				//in fullsize mode the image shall not only cover the pie chart, but the pie chart plus its padding (if > 0).
				var paddingTop = opts.pieOpts.getPadding(0);
				var paddingRight = opts.pieOpts.getPadding(1);
				var paddingBottom = opts.pieOpts.getPadding(2);
				var paddingLeft = opts.pieOpts.getPadding(3);
				x -= paddingLeft;
				y -= paddingTop;
				w += paddingLeft + paddingRight;
				h += paddingTop + paddingBottom;
			}
			
			var img = args.newSvgElement("image");
			img.setAttribute("width", w);
			img.setAttribute("height", h);
			img.setAttribute("x", x);
			img.setAttribute("y", y);
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
	 * SVG Content Plug-in for jquery-progresspiesvg:
	 * Adds a square as background to a progress pie. The square's area is the area of the actual
	 * chart plus its padding (padding defaults to zero but can be set in the progress pie's options).
	 * <p>Use this plug-in by adding the option <code>contentPlugin: "backgroundRect"</code> (or <code>contentPlugin: $.fn.progressPie.contentPlugin.backgroundRect</code>)
	 * to your call of the progressPie plug-in.
	 * <p>Furthermore, also add the option <code>contentPluginOptions</code> to the progressPie plugin options.
	 * The following options are supported:</p>
	 * <ul>
	 * <li><code>stroke</code>: string defining the stroke of the rectangle (a color code or 'none')</li>
	 * <li><code>fill</code>: string defining the filling of the rectangle (a color code or 'none')</li>
	 * <li><code>strokeWidth</code>: number, optional: Width of the stroke in pixels.</li>
	 * </ul>
	 * <p>At least on of the options <code>stroke</code> or <code>fill</code> has to be specified. 
	 * If you only want a filled square without a differently colored outline, only set the <code>fill</code>
	 * option and leave the <code>stroke</code> option undefined (no need to set it to 'none'). 
	 * Or vice-versa: If you want to draw a non-filled square, just set <code>stroke</code> and optionally
	 * also <code>strokeWidth</code>.</p>
	 * <p>Please note: This function is called <em>internally</em> by the progressPie jQuery plug-in! Don't call this function directly,
	 * but use it as described above!</p>
	 * @function backgroundRect
	 * @param {object} args object holding several arguments provided by the progressPie plug-in, including any option you specified in
	 * the object <code>contentPluginOptions</code>.
	 * @memberof jQuery.fn.progressPie.contentPlugin
	 * @requires jquery-progresspiesvg-min.js
	 */
	$.fn.progressPie.contentPlugin.backgroundRect = {
		draw: function(args) {
			if (typeof args.stroke !== "string" && typeof args.fill !== "string") {
				throw "$.fn.progressPie.contentPlugin.backgroundRect requires at least one of the two arguments 'fill' and 'stroke'.";
			}
			var stroke = typeof args.stroke === "string" ? args.stroke : "none";
			var fill = typeof args.fill === "string" ? args.fill : "none";
			var strokeWidth = typeof args.strokeWidth === "number" && stroke !== "none" ? args.strokeWidth : undefined;
			args.addBackgroundRect(stroke, fill, strokeWidth);
		},
		inBackground: function() {
			return true;
		}
	};
	
	/**
	 * Default Options for the content plug-in "image".
	 * This is a public (static) object in order to allow users to globally modify the defaults
	 * before using the <code>image</code> content plug-in.
	 * @member imageDefaults
	 * @memberof jQuery.fn.progressPie.contentPlugin
	 * @property {boolean} inBackground - If false, the image is drawn on top of the chart (into the foreground),
	 * if true, the error icon will be drawn as background behind the chart. Defaults to true.
	 * @property {boolean} fullSize - when combined with a ring chart (<code>ringWidth</code> option set), the value
	 * true causes the image to be drawn (just like with pie charts) in full size, i.e. covering the whole chart plus
	 * its padding (if greater than zero). Defaults to false.
	 * @property {boolean} clipCircle - If set to true, the image will be clipped to the area of the circle centered
	 * in its square area with diameter equal to the square's side lengths. If the chart's padding is zero and the
	 * image is drawn full sized, the image will thus cover exactly the circular chart. If drawn inside a ring with
	 * fullSize == true, the image will be clipped to the inner space in order not to overlap the ring. Defaults to false.
	 */
	$.fn.progressPie.contentPlugin.imageDefaults = {
		inBackground: true,
		clipCircle: false,
		fullSize: false
	};

} (jQuery));