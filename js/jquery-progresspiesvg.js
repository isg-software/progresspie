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
 
 
/**
 * The jQuery plugin namespace.
 * @external "jQuery.fn"
 * @see {@link http://learn.jquery.com/plugins/|jQuery Plugins}
 */
(function( $ ) {
	"use strict";

	/**
	 * This plug-in may be used to draw a piechart with only one filled pie (rest empty). 
	 * It is designed to be an alternative to a progress bar, since it simply depicts a single value (in percent).
	 * The plug-in assumes that values in percent are part of the document (either visible or as attribute value)
	 * and a small pie representing each value is to be dynamically inserted. This may be either a static display
	 * or the pie may be updated upon data changes.
	 * 
	 * <p>Typical application: Append or prepend to visible percent value:<br>
	 * This mode assumes by default, that a value (integer number between 0 and 100 inclusive, 
	 * floating point numbers are supported, but truncated) is the only text content of an HTML element, e.g. a span
	 * element, and the pie is to be prepended (or appended) to the same element. The pie will usually be auto-sized to fit 
	 * into the text line. A separator String to be placed between the pie and the number may be configured.
	 * Defaults are to prepend the pie and use a non-breaking space as separator.
	 * E.g. say you have HTML code like <code>&lt;p&gt;You have achieved 25 points out of 50 (&lt;span class="pie"&gt;50&lt;/span&gt;%)&lt;/p&gt;</code>,
	 * then you may insert a pie filled by 50% with <code>$(.pie).progressPie();</code>, resulting in a line like:
	 * <code>&lt;p&gt;You have achieved 25 points out of 50 (&lt;span class="pie"&gt;&lt;svg&gt;the pie chart&lt;/svg&gt;&amp;nbsp;50&lt;/span&gt;%)&lt;/p&gt;</code>
	 * 
	 * <p>Usage:
	 * Select the elements holding the percent number and to insert the pie into by a jQuery selector.
	 * On the jQuery result set call "progressPie(options)", where options is an optional object
	 * with configuration options. See <a href="index.html">Home</a> (or README) for a documentation of supported options.
	 * The plugin is applied to any element in the result set, i.e. if the selector did not found any matching
	 * element, nothing will happen, while if the selector found several matching elements, the plugin
	 * will try to insert a corresponding pie into each of the found elements individually.
	 * 
	 * <p>The progressPie method will <code>return this</code>, enabling chaining of method calls
	 * on the result set.</p>
	 *
	 * @function external:"jQuery.fn".progressPie
	 * @namespace "$.fn.progressPie"
	 * @param options - object containing individual options (merged with default options)
	 * @return this / result set (for chainable method calls on the result set)
	 */
	$.fn.progressPie = function( options ) {

		// Extend our default options with those provided.
		// Note that the first argument to extend is an empty
		// object – this is to keep from overriding our "defaults" object.
		var opts = $.extend( {}, $.fn.progressPie.defaults, options );

		var NS = "http://www.w3.org/2000/svg";
		
		
		//Naming convention:
		// "self" is used to refer to the function object in order to simplify access to public members.
		// "me", on the other hand, may be used in functions to save the object reference "this" (or "$(this)").
		var self = $.fn.progressPie;
		
		var internalMode = $.extend( {USER_COLOR_CONST:{}, USER_COLOR_FUNC:{}, DATA_ATTR_FUNC:{}}, self.Mode );


		//private functions
		function angle(percent) {
			return 0.02 * Math.PI * percent; //2 Pi * percent / 100
		}

		function evalDataAttrFunc(functionString, percent) {
			var evalIndirect = eval;
			var handler = evalIndirect(functionString);
			if (typeof handler === "function") {
				return handler(percent);
			} else {
				throw "The value of the attribute " + opts.colorFunctionAttr + " is NOT a function: "+ functionString;
			}
		}
		
		function evalContentPluginName(name) {
			var evalIndirect = eval;
			var f = evalIndirect("$.fn.progressPie.svgContentPlugin." + name);
			if (typeof f === "function") {
				return f;
			} else {
				throw name + " is not the name of a function in namespace $.fn.progressPie.svgContentPlugin!";
			}
		}
		

		function drawPie(svg, rad, strokeWidth, strokeColor, ringWidth, ringEndsRounded, percent, color, rotation) {
			
			//strokeWidth or ringWidth must not be greater than the radius:
			if (typeof strokeWidth === 'number') {
				strokeWidth = Math.min(strokeWidth, rad);
			}
			if (typeof ringWidth === 'number') {
				ringWidth = Math.min(ringWidth, rad);
			}
						
			var circle = document.createElementNS(NS, "circle");
			//1. Circle
			//Special cases: 100% value: don't draw simple circle with arc inside,
			//but draw filled circle (in pie mode) or with ringWidth instead of strokeWidth
			//in ring-mode (i.e. if ringWidth is defined and > 0).
			circle.setAttribute("cx", 0);
			circle.setAttribute("cy", 0);
			var sw = ringWidth && percent === 100 ? ringWidth : strokeWidth;
			circle.setAttribute("r", rad - sw / 2);
			circle.style.stroke = typeof strokeColor === 'string' && percent < 100 ? strokeColor : color;
			circle.style.strokeWidth = sw;
			circle.style.fill = !ringWidth && percent === 100 ? color : "none";
			svg.appendChild(circle);

			//2. Pie (or ring)
			if (percent > 0 && percent < 100) {
				var arc = document.createElementNS(NS, "path");
				var alpha = angle(percent);
				var targetX = Math.sin(alpha)*rad;
				var targetY = Math.cos(alpha-Math.PI)*rad;
				var largeArcFlag = percent > 50 ? "1" : "0";
				var clockwiseFlag = "1";
				var innerrad = ringWidth ? rad - ringWidth : 0;
				var starty =  -innerrad;
				//start
				var path = "M0,"+starty;
				var rrad; //radius for rounded ring ends
				if (ringWidth && ringEndsRounded) {
					rrad = ringWidth / 2;
					path += "a"+rrad+","+rrad+" 0 0,"+clockwiseFlag+" 0,-"+ringWidth;
				} else {
					path += " v-"+(ringWidth?ringWidth:rad);
				}
				//outer arc
				path += " A"+rad+","+rad+" 0 "+largeArcFlag+","+clockwiseFlag+" "+targetX+","+targetY;
				if (!ringWidth) {
					//pie: simply close path
					path += " Z";
				} else {
					//ring: 
					var innerStartX = Math.sin(alpha)*innerrad;
					var innerStartY = Math.cos(alpha-Math.PI)*innerrad;
					var anticlockwiseFlag = "0";
					//-move inwards on radius by ringWidth
					if (ringEndsRounded) {
						path += " A"+rrad+","+rrad+" 0 0,"+clockwiseFlag+" "+innerStartX+","+innerStartY;
					} else {
						path += " L"+innerStartX+","+innerStartY;
					}
					//-inner arc
					path += " A"+innerrad+","+innerrad+" 0 "+largeArcFlag+","+anticlockwiseFlag+" 0,-"+innerrad;
				}

				arc.setAttribute("d", path);
				arc.style.fill = color;
				arc.style.stroke = "none";
				if (rotation) {
					//rotation is "truthy".
					//May be "true" or a String (i.e. duration) or an object holding properties "duration" and "clockwise".
					var anticlockwise = rotation.clockwise === false;
					var dur = typeof rotation === "string" ? rotation :
							  typeof rotation.duration === "string" ? rotation.duration :
							  "1s"; //Default duration for true or any other truthy value is 1 second.
					var anim = document.createElementNS(NS, "animateTransform");
					anim.setAttribute("attributeName", "transform");
					anim.setAttribute("attributeType", "XML");
					anim.setAttribute("type", "rotate");
					anim.setAttribute("from", "0");
					anim.setAttribute("to", anticlockwise ? "-360" : "360");
					anim.setAttribute("dur", dur);
					anim.setAttribute("repeatDur", "indefinite");
					arc.appendChild(anim);
				}
				svg.appendChild(arc);
			}
		}
		
		function getValue(me, opts) {
			var stringOrNumber;
			if (typeof opts.valueData === "string") {
				stringOrNumber = me.data(opts.valueData);
				if (typeof opts.valueAttr !== "undefined" || typeof opts.valueSelector !== "undefined") {
					throw "options 'valueData', 'valueAttr' and 'valueSelector' are mutually exclusive, i.e. at least two must be undefined!";
				}
			} else if (typeof opts.valueData !== "undefined") {
				throw "option 'valueData' is not of type 'string'!";
			} else if (typeof opts.valueAttr === "string") {
				stringOrNumber = me.attr(opts.valueAttr);
				if (typeof opts.valueSelector !== "undefined") {
					throw "options 'valueAttr' and 'valueSelector' are mutually exclusive, i.e. at least one must be undefined!";
				}
			} else if (typeof opts.valueAttr !== "undefined") {
				throw "option 'valueAttr' is not of type 'string'!";
			} else if (typeof opts.valueSelector !== "undefined") {
				stringOrNumber = $(opts.valueSelector, me).text();
			}
			if (typeof stringOrNumber === "undefined") {
				stringOrNumber = me.text();
			}
			return Math.max(0, Math.min(100, opts.valueAdapter(stringOrNumber)));
		}
		
		function getModeAndColor(me, opts) {
			var mode = opts.mode;
			var color = opts.color;
			//color may be a function or a constant
			var ct = typeof color;
			if (ct !== "undefined" && ct !== "string" && ct !== "function") {
				throw "option 'color' has to be either a function or a string, but is of type '" + ct + "'!";
			}
			if (ct === 'function') {
				mode = internalMode.USER_COLOR_FUNC;
			} else {
				if (ct === 'undefined' && typeof opts.colorAttr === "string") {
					color = me.attr(opts.colorAttr);
				}
				if (typeof color === 'string') {
					mode = internalMode.USER_COLOR_CONST;
				} else if (typeof opts.colorFunctionAttr === "string") {
					color = me.attr(opts.colorFunctionAttr);
					if (typeof color === 'string') {
						mode = internalMode.DATA_ATTR_FUNC;
					}
				}
			}
			return {mode: mode, color: color};
		}
		
		function calcColor(mode, userdefinedPieColor, percent) {
			return mode === internalMode.GREY ? internalMode.GREY.color :
						mode === internalMode.GREEN ? self.colorByPercent(100) :
						mode === internalMode.RED ? self.colorByPercent(0) :
						mode === internalMode.COLOR || userdefinedPieColor === undefined ? self.colorByPercent(percent) :
						mode === internalMode.USER_COLOR_CONST ? userdefinedPieColor :
						mode === internalMode.USER_COLOR_FUNC ? userdefinedPieColor(percent) :
						mode === internalMode.DATA_ATTR_FUNC ? evalDataAttrFunc(userdefinedPieColor, percent)
						: "black";
		}
 
 		$(this).each(function () {
			var me = $(this);
			var existing = $("svg", me); //existing SVGs in target element
			if (!existing.length || opts.update) { //Only draw if no SVG already existing or update mode
				if (existing.length && opts.update) { //remove existing SVG
					existing.remove();
					opts.separator = ''; //reset any separator when applying an update in order not to repeatedly insert a new one with each update.
				}
				var p = getValue(me, opts);
				var mc = getModeAndColor(me, opts);
				
				var h = Math.ceil(typeof opts.size === "number" ? opts.size : me.height());
				if (h === 0) {
					h = 20;
				}
				var mid = Math.floor(h / 2);
				var rad = mid;

				var svg = document.createElementNS(NS, "svg");
				svg.setAttribute("width", h);
				svg.setAttribute("height", h);
				svg.setAttribute("viewBox", "-" + rad + " -" + rad + " " + h + " " + h);
				svg.style.verticalAlign = opts.verticalAlign;
				if (opts.prepend) {
					me.prepend(svg, opts.separator);
				} else {
					me.append(opts.separator, svg);
				}
				var color = calcColor(mc.mode, mc.color, p);
				drawPie(svg, rad, opts.strokeWidth, opts.strokeColor, opts.ringWidth, opts.ringEndsRounded, p, color, opts.rotation);
				
				var w = typeof opts.ringWidth === 'number' ? opts.ringWidth : typeof opts.strokeWidth === 'number' ? opts.strokeWidth : 0;
				
				//Draw a second, inner pie?
				if (typeof opts.inner === 'object') {
					if (typeof opts.inner.valueAdapter === "undefined") {
						opts.inner.valueAdapter = $.fn.progressPie.defaults.valueAdapter;
					}
					p = getValue(me, opts.inner);
					mc = getModeAndColor(me, opts.inner);
					rad = Math.floor(typeof opts.inner.size === "number" ? opts.inner.size/2 : rad*0.6);
					color = calcColor(mc.mode, mc.color, p);
					drawPie(svg, rad, 0, undefined, opts.inner.ringWidth, opts.inner.ringEndsRounded, p, mc.mode, mc.color);
					
					w = typeof opts.inner.ringWidth === 'number' ? opts.inner.ringWidth : 0;
				}
				
				if (opts.svgContentPlugin) {
					var f;
					if (typeof opts.svgContentPlugin === 'function') {
						f = opts.svgContentPlugin;
					} else if (typeof opts.svgContentPlugin === 'string') {
						f = evalContentPluginName(opts.svgContentPlugin);
					}
					var r = rad;
					if (w < rad) {
						r -= w;	
					}
					f({
						newSvgElement: function(name) {
							var el = document.createElementNS(NS, name);
							svg.appendChild(el);
							return el;
						},
						radius: r,
						color: color
					});
				}
			}
		});
		
		return this;
	};
	
	/**
	 * Enum defining possible values for the <code>mode</code> option.
	 * @memberOf "$.fn.progressPie"
	 * @enum 
	 * @readonly
	 */
	$.fn.progressPie.Mode = {
		/** Default Mode: Pie is drawn in a shade of grey. The HTML color code is "#888" and may be changed by
	 	 * overwriting <code>jQuery.fn.progressPie.Mode.GREY.color</code> (of type string).
	 	 * @type {Object}
	 	 */
		GREY:{color:"#888"}, 
		/** In mode RED the pie is drawn in red color regardless of the percentual value. 
		 * <code>jQuery.fn.progressPie.Mode.RED.value</code> is a variable of type "number" with the default value
		 * of 200 and means the red color will be <code>rgb(200, 0, 0)</code>.
		 * The variable RED.value is not only used in mode RED, but also in mode COLOR for calculating the
		 * color of any value between 0 and 50.
		 * @type {Object}
		 */
		RED:{value:200},
		/** In mode GREEN the pie is drawn in green color regardless of the percentual value. 
		 * <code>jQuery.fn.progressPie.Mode.GREEN.value</code> is a variable of type "number" with the default value
		 * of 200 and means the green color will be <code>rgb(0, 200, 0)</code>.
		 * The variable GREEN.value is not only used in mode GREE, but also in mode COLOR for calculating the
		 * color of any value between 50 and 100.
		 * @type {Object}
		 */
		GREEN:{value:200}, 
		/** In mode COLOR the color of the pie is depending on the percentual value.
		 * The color is calculated via {@link "$.fn.progressPie".colorByPercent}.
		 * It's the same green color as in mode GREEN for a value of 100 percent, the same red color
		 * as in mode RED for a value of 0%.
		 * The colors may be altered by overwriting progressPie.Mode.RED.value or progressPie.Mode.GREEN.value.
		 */ 
		COLOR:{}
	};
	
	/** public static method to calculate a color for a percent value: green for 100%, red for 0%, yellow for 50%, 
	 * gradients for values in between.
	 * This is used internally in mode progressPie.Mode.COLOR
	 * @param {number} percent - a value between 0 and 100 (inclusive). 0 results in red color, 100 in green, 50 in yellow,
	 * any other value greater than 50 generates a gradient between green and yellow, values less than 50 a gradient
	 * between red and yellow.
	 * @memberOf "$.fn.progressPie"
	 * @function colorByPercent
	 */
	$.fn.progressPie.colorByPercent = function(percent) { 
		var maxGreen = $.fn.progressPie.Mode.GREEN.value;
		var maxRed = $.fn.progressPie.Mode.RED.value;
		var green = percent > 50 ? maxGreen : Math.floor(maxGreen * percent / 50);
		var red = percent < 50 ? maxRed : Math.floor(maxRed * (100 - percent) / 50);
		return "rgb(" + red + "," + green + ",0)";
	};
	

	/**
	 * Default Options.
	 * This is a public (static) object in order to allow users to globally modify the defaults
	 * before using the plug-in.
	 * @memberOf "$.fn.progressPie"
	 * @member defaults
	 */
	$.fn.progressPie.defaults = {
		mode: $.fn.progressPie.Mode.GREY,
		strokeWidth: 2,
		prepend: true,
		separator: "&nbsp;",
		verticalAlign: "bottom",
		update: false,
		valueAdapter: function(value) {
			if (typeof value === "string") {
				return parseInt(value);
			} else if (typeof value === "number") {
				return value;
			} else {
				return 0;
			}
		},
		ringEndsRounded: false
	};
	
	$.fn.progressPie.svgContentPlugin = {};
 
}( jQuery ));