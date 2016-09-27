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
 
 
/**
 * Namespace of jQuery. Usually bound to the alias <code>$</code>.
 *  
 * @see http://jquery.com/
 * @namespace jQuery 
 */
 
/**
 * Namespace for jQuery plug-ins.
 *  
 * @see http://jquery.com/
 * @namespace fn
 * @memberOf jQuery
 */
 

(function( $ ) {
	"use strict";
	
	/**
	 * Namespace for this jQuery plugin
	 * @namespace progressPie
	 * @memberOf jQuery.fn
	 */
	 
	 var setupDataKey = "$.fn.setupProgressPie";
	 
	/**
	 * Stores options for the progressPie plug-in. If this plug-in function is called, any succeeding calls to the progressPie plug-in
	 * without argument will behave the same like when called with the options stored here.
	 * This is recommended, if the progressPie plug-in gets called repeatedly (to update its graphic due to changed values).
	 * Then, this setup provides the means to set the options only once and to keep update calls simple instead of
	 * calling the progressPie repeatedly with the same options argument over and over again.
	 * <p>The "update" option, if not specified in the options of this call, will default to true (regardless of
 	 * the value defined in $.fn.progressPie.defaults.</p>
	 * <p>Usage pattern:</p>
	 * <pre><code>$(selector).setupProgressPie({options}).progressPie();
	 * update value;
	 * $(selector).progresssPie(); //update the graphic using the same options.
	 * </code></pre>
	 * <p>Repeated calls of setupProgressPie are allowed and will update the options: The options of the subsequent call
	 * get merged into the existing setup. Example:
	 * <pre><code>
	 * $(selector).setupProgressPie({color: "green", strokeWidth: 3});
	 * ...
	 * $(selector).setupProgressPie({color: "navy"});
	 * </code></pre>
	 * <p>In this example the second call will change the color for any following call of <code>progressPie()</code>, but
	 * will leave the <code>strokeWidth: 3</code> option untouched, i.e. will not reset it to the default.</p>
	 * @function setupProgressPie()
	 * @memberOf jQuery.fn
	 * @param options - object containing individual options (merged with default options)
	 * @return this / result set (for chainable method calls on the result set)
	 */
	$.fn.setupProgressPie = function( options ) {
		$(this).each(function() {
			var existingSetup = $(this).data(setupDataKey);
			if (typeof existingSetup !== "object") {
				var opts = $.extend( {}, $.fn.progressPie.defaults, {update: true}, options );
				$(this).data(setupDataKey, opts);
			} else {
				$.extend(existingSetup, options);
			}
		});
		return this;
	};

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
	 * @function progressPie()
	 * @memberOf jQuery.fn
	 * @param options - object containing individual options (merged with default options)
	 * @return this / result set (for chainable method calls on the result set)
	 */
	$.fn.progressPie = function( options ) {
		//Note: Normally the @function directive for jsDoc should not contain the parentheses "()".
		//But I needed to add something to the name in order to be able to document the plugin function and its namespace
		//separately (though in reality both are the same).

		// Extend our default options with those provided.
		// Note that the first argument to extend is an empty
		// object – this is to keep from overriding our "defaults" object.
		var globalOpts = $.extend( {}, $.fn.progressPie.defaults, options );
		var noargs = typeof options === "undefined";
		//If noargs === true and the setupProgressPie plug-in has been called for a target element, don't use "globalOpts", but use the stored setup instead.
		//Since any element in the result set may have a different individual setup, this decision can't be made here globally, but has to be made individually in 
		//the forEach loop below...

		var NS = "http://www.w3.org/2000/svg";
		var contentPluginNS = "jQuery.fn.progressPie.contentPlugin";
		
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
				throw "The value of the colorFunctionAttr attribute is NOT a function: "+ functionString;
			}
		}
		
		function evalContentPluginName(name) {
			var evalIndirect = eval;
			var f = evalIndirect(contentPluginNS + "." + name);
			if (typeof f === "function" || typeof f === 'object' && typeof f.draw === 'function') {
				return f;
			} else {
				throw name + " is not the name of a function or object in namespace " + contentPluginNS + "!";
			}
		}
		
		function getContentPlugin(property) {
			var f;
			if (typeof property === 'function' || typeof property === 'object' && typeof property.draw === 'function') {
				f = property;
			} else if (typeof property === 'string') {
				f = evalContentPluginName(property);
			} else {
				throw "contentPlugin option must either be a function or an object with method named 'draw' or the name of such a function or object in the namespace " + contentPluginNS + "!";
			}
			return f;
		}
		
		function getArcLength(rad, percent) {
			return 0.02 * Math.PI * rad * percent; //2πr * percent/100 = 0.02πr * percent
		}

		function addAnimationFromTo(target, attrName, attrType, from, to, animationAttrs) {
			var anim = document.createElementNS(NS, "animate");
			anim.setAttribute("attributeName", attrName);
			anim.setAttribute("attributeType", attrType);
			anim.setAttribute("from", from);
			anim.setAttribute("to", to);
			anim.setAttribute("fill", "freeze"); //when the animation stops, it's final state shall persist.
			for (var key in animationAttrs) {
				anim.setAttribute(key, animationAttrs[key]);
			}
			target.appendChild(anim);
		}
		
		function setStrokeDashArray(circle, strokeDashes, circumference) {
			var cnt;
			var len;
			if (typeof strokeDashes === 'number') {
				cnt = strokeDashes;
			} else if (typeof strokeDashes === 'object') {
				cnt = strokeDashes.count;
				len = strokeDashes.length;
			} else {
				throw "illegal option: 'strokeDashes' is neither number (count) nor object!";
			}
			if (typeof cnt === 'undefined') {
				throw "illegal option: 'strokeDashes' does not specify the 'count' property!";
			}
			if (typeof len === 'undefined') {
				//default: strokes and gaps equally long
				len = circumference / cnt / 2;
			} else if (typeof len === 'string') {
				len = len.trim();
				var percent = len.substring(len.length - 1) === '%';
				len = Number.parseInt(len, 10);
				if (percent) {
					len = circumference * len / 100;
				}
			}
			if (len * cnt >= circumference) {
				throw "Illegal options: strokeDashCount * strokeDashLength >= circumference, can't set stroke-dasharray!";
			} else {
				var gap = (circumference - len * cnt) / cnt;
				var offset = typeof strokeDashes === 'object' && strokeDashes.centered ? 1.0 * len / 2 : 0;
				if (typeof strokeDashes !== 'object' || !strokeDashes.inverted) {
					circle.style.strokeDasharray = "" + len + "px, " + gap + "px";
					if (offset !== 0) {
						circle.style.strokeDashoffset = "" + offset + "px";
					}
				} else {
					circle.style.strokeDasharray = "" + gap + "px, " + len + "px";
					circle.style.strokeDashoffset = "" + (gap + offset) + "px";
				}
			}
		}

		function drawPie(svg, rad, strokeWidth, strokeColor, strokeDashes, overlap, ringWidth, ringEndsRounded, cssClassBackgroundCircle, cssClassForegroundPie, percent, prevPercent, color, prevColor, animationAttrs, rotation) {
			
			//strokeWidth or ringWidth must not be greater than the radius:
			if (typeof strokeWidth === 'number') {
				strokeWidth = Math.min(strokeWidth, rad);
			}
			if (typeof ringWidth === 'number') {
				ringWidth = Math.min(ringWidth, rad);
			}

			var r;
			var circle;
			var strokeColorConfigured = false; //default value

			//1. background Circle 	
			//   (now always drawn, even with strokeWidth==0, with CSS class allowing 
			//    to set the CSS fill property for the background)
			//   (not drawn with undefined strokeWidth, which is the usual value for inner pies)
			if (typeof strokeWidth === 'number') {
				circle = document.createElementNS(NS, "circle");
				circle.setAttribute("cx", 0);
				circle.setAttribute("cy", 0);
				r = rad - strokeWidth / 2;
				circle.setAttribute("r", r);
				//Starting point of a circle's stroke is 3 o'clock by default. 
				//Normally this point is invisible, but it might get visible if a stroke-dasharray is set
				//(which the user can do at any time via CSS):
				//Then this point where the stroke starts end ends is at 3 o'clock, but it should be at 12 o'clock,
				//since that's also the starting/ending point of the pie charts. Therefore, the circle will be 
				//rotated 90 degrees anti-clockwise:
				circle.setAttribute("transform", "rotate(-90)");
				if (strokeDashes) {
					setStrokeDashArray(circle, strokeDashes, 2.0 * Math.PI * r);
				}
				strokeColorConfigured = typeof strokeColor === 'string';
				var stroke = strokeColorConfigured ? strokeColor : color;
				if (typeof stroke === "string") {
					circle.style.stroke = stroke;
					circle.style.fill = "none";
					//In case of color animation this may be overwritten later on...
				}
				circle.style.strokeWidth = strokeWidth;
				circle.setAttribute("class", cssClassBackgroundCircle);
				svg.appendChild(circle);
			}
			
			var sw = ringWidth ? ringWidth : (overlap || typeof strokeWidth !== 'number') ? rad : rad - strokeWidth;
			r = rad - sw / 2;
			if (!overlap && typeof strokeWidth === 'number') {
				r -= strokeWidth;
			}

			if (percent === 100 && !animationAttrs && typeof color === "string") {
				//Simply draw filled circle. (Not in CSS color mode, not with animation activated.)
				//"value" circle (full pie or ring)
				var circle2 = document.createElementNS(NS, "circle");
				circle2.setAttribute("cx", 0);
				circle2.setAttribute("cy", 0);
				circle2.setAttribute("r", r);
				circle2.style.stroke = color;
				circle2.style.strokeWidth = sw;
				circle2.style.fill = "none";
				circle2.setAttribute("class", cssClassForegroundPie);
				svg.appendChild(circle2);
			}  else	if (percent > 0 && percent < 100 || (animationAttrs || typeof color === "undefined") && (percent === 0 || percent === 100)) {
				//2. Pie (or ring)
				var arc = document.createElementNS(NS, "path");
				var anim;
				
				var arcToPercent = percent;
				//Before calculating the arc's path, first evaluate the optional animation.
				//Reason: For backwards animation, the arc has to span to the previous value instead
				//        to the real target value, and only the delta part of it will be (animatedly)
				//        made invisible via stroke dash properties.
				//		  I.e. the arcToPercent value may be overwritten in the following block:
				if (animationAttrs) {
					var delta = percent - prevPercent;
					var deltaArcLen = getArcLength(r, delta);
					var backwards = delta < 0;
					var animFrom;
					var animTo;
					if (backwards) {
						arcToPercent = prevPercent;
						animFrom = "0px";
						animTo = -deltaArcLen + "px";
					} else {
						animFrom = deltaArcLen + "px";
						animTo = "0px";
					}
					var arcLen = getArcLength(r, arcToPercent);
					arc.setAttribute("stroke-dasharray", arcLen + "px " + arcLen + "px");
					arc.setAttribute("stroke-dashoffset", animFrom);
					//Setting the "static image" to the animFrom value, i.e. to the state of the image *before animation starts*,
					//a) requires the fill="freeze" attribute in order to finally (after animation) show the correct state (animTo).
					//b) ensures smooth animation without flicker (setting this attribute to animTo causes some browsers to display
					//	 the target state (animTo) for a slit second bevor animation starts, which can look irritating),
					//c) requires a SMIL detection fork (see smilSupported()): Since Browsers without SMIL support will display this static image and
					//   never replace it with the animation's end state, setting this stroke-dashoffset attribute must only be
					//   executed in browsers with SMIL support! 
					//   Setting this to animFrom would be compatible with no-SMIL-browsers, but for the price of said flicker.
					//=> This function (in this state) requires animationAttrs to be falsy if smilSupported() === false, see function call!
					addAnimationFromTo(arc, "stroke-dashoffset", "CSS", animFrom, animTo, animationAttrs);
					//Remove linecap when reduced to 0 percent!
					if (ringEndsRounded && percent === 0) {
						addAnimationFromTo(arc, "stroke-linecap", "CSS", "round", "butt", animationAttrs);
					}
					//Color Animation?
					if (prevColor && prevColor !== color) {
						addAnimationFromTo(arc, "stroke", "CSS", prevColor, color, animationAttrs);
						//Apply to outer circle's stroke?
						if (!strokeColorConfigured) { //implies circle to be defined
							circle.style.stroke = prevColor;
							addAnimationFromTo(circle, "stroke", "CSS", prevColor, color, animationAttrs);
						}
					}
				}
				
				var alpha = angle(arcToPercent);
				//Special case 100% (only in animated mode): targetX must not be 0: Arc won't be visible
				//if start and end point are identical. Move end point minimally to the left.
				//(Gap should not be visible if the graphic does not get scaled up too much.)
				var targetX = arcToPercent === 100 ? -0.00001 : Math.sin(alpha)*r;
				var targetY = Math.cos(alpha-Math.PI)*r;
				var largeArcFlag = arcToPercent > 50 ? "1" : "0";
				var clockwiseFlag = "1";
				var starty =  -r;
				
				//start
				var path = "M0,"+starty;
				//arc
				path += " A"+r+","+r+" 0 "+largeArcFlag+","+clockwiseFlag+" "+targetX+","+targetY;

				arc.setAttribute("d", path);
				arc.style.fill = "none";
				if (typeof color === "string") {
					arc.style.stroke = color;
				}
				arc.style.strokeWidth = sw; 
				arc.style.strokeLinecap = ringEndsRounded && percent > 0 ? "round" : "butt";
				if (rotation) {
					//rotation is "truthy".
					//May be "true" or a String (i.e. duration) or an object holding properties "duration" and "clockwise".
					var anticlockwise = rotation.clockwise === false;
					var dur = typeof rotation === "string" ? rotation :
						  typeof rotation.duration === "string" ? rotation.duration :
						  "1s"; //Default duration for true or any other truthy value is 1 second.
					anim = document.createElementNS(NS, "animateTransform");
					anim.setAttribute("attributeName", "transform");
					anim.setAttribute("attributeType", "XML");
					anim.setAttribute("type", "rotate");
					anim.setAttribute("from", "0");
					anim.setAttribute("to", anticlockwise ? "-360" : "360");
					anim.setAttribute("dur", dur);
					anim.setAttribute("repeatDur", "indefinite");
					arc.appendChild(anim);
				}
				arc.setAttribute("class", cssClassForegroundPie);
				svg.appendChild(arc);
			}
		}
		
		/*
			Gedanken zur Animation (SMIL vs. CSS Transitions)
			* Erstmal mit SMIL animieren. 
			* Wenn das läuft, vielleicht auch mal mit CSS-Transitions testen? In diesem Fall geht es ja mit 
			  stroke-dashoffset um eine Style-Property, die also auch CSS-animierbar sein sollte.
			  Vorteil wäre, dass das hoffentlich auch IE-/Edge-kompatibel wäre.
			  * Updates:
			  	+ Alte IE sollen auch keine CSS-Animationen auf Inline-SVG erlauben, Edge aber schon.
			  	+ CSS-Animations erfordern KeyFrames, welche nicht inline im SVG-Code (in style-Attributen) möglich sind!
			  	+ CSS-Transitions dagegen wären eine Möglichkeit:
			  		+ Dazu einen vollen Kreis zeichnen und den "Balken"/ das Tortenstück allein über die
			  		  stroke-dashoffset-Property (ggf. kombiniert mit stroke-dasharray) darstellen.
			  		+ Dann könnte eine Update-Methode als eigene Plugin-Methode geschrieben werden,
			  		  die den neuen Prozentwert (oder bei Value-Adapter Rohwert) übergeben bekommt
			  		  und daraus die neuen Dash-CSS-Styles errechnet und auf dem vorhandenen SVG anwendet.
			  		  Dann käme die Transition zum Einsatz.
			  		+ Für initiale Animation müsste wohl ein Timer gesetzt werden, der die Transition erst
			  		  nach erfolgtem Rendern der Grafik mit Startwert triggert!
			  		=> Das alles erfordert aber eine völlig andere API und ist nicht mal eben so
			  		   als Alternative zur derzeitigen API möglich. 
			  		   Ggf. kann man der derzeitigen progressPie-Plugin-Methode eine Option mitgeben,
			  		   die einen solchen animierbaren/updatebaren "Dash-Circle" rendert.
			  		-> Ob das aber wirklich sinnvoll ist? Vor allem ist zu bedenken, dass gerade der Edge-
			  		   Browser ja die Pies als Dashed Stroke nicht sauber zeichnet, sondern leicht verkrümmt!
			  		   Vor dem Hintergrund stelle ich dies erstmal zurück und bevorzuge die SMIL-Variante!
		*/
		
		function getRawValueStringOrNumber(me, opts) {
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
			return stringOrNumber;
		}
		
		function getPercentValue(rawValueStringOrNumber, opts) {
			return Math.max(0, Math.min(100, opts.valueAdapter(rawValueStringOrNumber)));
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
			return mode === internalMode.CSS ? undefined :
						mode === internalMode.GREY ? internalMode.GREY.color :
						mode === internalMode.GREEN ? self.colorByPercent(100) :
						mode === internalMode.RED ? self.colorByPercent(0) :
						mode === internalMode.COLOR || userdefinedPieColor === undefined ? self.colorByPercent(percent) :
						mode === internalMode.USER_COLOR_CONST ? userdefinedPieColor :
						mode === internalMode.USER_COLOR_FUNC ? userdefinedPieColor(percent) :
						mode === internalMode.DATA_ATTR_FUNC ? evalDataAttrFunc(userdefinedPieColor, percent) 
						: "black";
		}
		
		function ctPluginIsFullSize(opts) {
			return typeof opts.ringWidth === "undefined" || opts.contentPluginOptions && opts.contentPluginOptions.fullSize;
		}
 
 		$(this).each(function () {
			var me = $(this);
			var opts = globalOpts;
			if (noargs) {
				var localOpts = $(this).data(setupDataKey);
				if (typeof localOpts === "object") {
					opts = localOpts; //use stored individual setup instead of gobalOpts (which in this case (noargs) are just defaults anyway).
				}
			}
			var existing = $("svg", me); //existing SVGs in target element
			if (!existing.length || opts.update) { //Only draw if no SVG already existing or update mode
				if (existing.length && opts.update) { //remove existing SVG
					existing.remove();
					opts.separator = ''; //reset any separator when applying an update in order not to repeatedly insert a new one with each update.
				}
				var raw = getRawValueStringOrNumber(me, opts);
				var p = getPercentValue(raw, opts);
				
				var prevP = me.data($.fn.progressPie.prevValueDataName);
				var isInitialValue = typeof prevP === 'undefined';
				me.data($.fn.progressPie.prevValueDataName, p);
				if (typeof prevP !== 'number') {
					prevP = 0;
				}
				
				if (typeof opts.optionsByPercent === "function") {
					var newOpts = opts.optionsByPercent(p);
					if (typeof newOpts !== "undefined" && newOpts !== null) {
						opts = $.extend({}, opts, newOpts);
						//Update values in case the optionsByPercent define different value adapter functions or value data selectors
						raw = getRawValueStringOrNumber(me, opts);
						p = getPercentValue(raw, opts);
					}
				}
				
				var mc = getModeAndColor(me, opts);
				
				var h = Math.ceil(typeof opts.size === "number" ? opts.size : me.height());
				if (h === 0) {
					h = 20;
				}
				h *= opts.sizeFactor;
				var mid = h / 2;
				var rad = mid;
				var totalRad = rad;

				//Create and insert SVG...
				var svg = document.createElementNS(NS, "svg");
				var scaledSize = h;
				if (typeof opts.scale === "number") {
					scaledSize *= opts.scale;
				}
				svg.setAttribute("width", Math.ceil(scaledSize));
				svg.setAttribute("height", Math.ceil(scaledSize));
				svg.setAttribute("viewBox", "-" + rad + " -" + rad + " " + h + " " + h);
				if (mc.mode !== $.fn.progressPie.Mode.CSS) {
					svg.style.verticalAlign = opts.verticalAlign;
				}
				if (me.is(":empty")) { //simply insert (regardless of prepend option, and without separator)
					me.append(svg);
				} else if (opts.prepend) {
					me.prepend(svg, opts.separator);
				} else {
					me.append(opts.separator, svg);
				}
				

				var cssForeground = opts.cssClassForegroundPie;
				var cssBackground = opts.cssClassBackgroundCircle;
				if (typeof opts.inner === 'object') {
					cssForeground += " " + opts.cssClassOuter;
					cssBackground += " " + opts.cssClassOuter;
				}
				var color = calcColor(mc.mode, mc.color, p);
				var prevColor;

				if (opts.animateColor === true || typeof opts.animateColor === "undefined" && !isInitialValue) {
					prevColor = calcColor(mc.mode, mc.color, prevP);
				}
				var animationAttrs = !$.fn.progressPie.smilSupported() ? null
					: opts.animate === true ? $.fn.progressPie.defaultAnimationAttributes 
					: typeof opts.animate === 'object' ? $.extend({}, $.fn.progressPie.defaultAnimationAttributes, opts.animate)
					: null;
					
					
				//Check for content plug-in and whether the pie chart is to be drawn at all:
				var ctPlugin;
				var hideChart = false;
				if (opts.contentPlugin) {
					ctPlugin = getContentPlugin(opts.contentPlugin);
					var checkArgs = {
						color: color,
						percentValue: p,
						rawValue: raw,
						pieOpts: opts
					};
					if (typeof opts.contentPluginOptions === 'object') {
						$.extend(checkArgs, opts.contentPluginOptions);
					}
					if (typeof ctPlugin === 'object' && typeof ctPlugin.hidesChartIfFullSize === 'function') {
						hideChart = ctPluginIsFullSize(opts) && ctPlugin.hidesChartIfFullSize(checkArgs);
					}
				}
					
				//Draw/insert Pie
				if (!hideChart) {
					drawPie(svg, rad, opts.strokeWidth, opts.strokeColor, opts.strokeDashes, opts.overlap, opts.ringWidth, opts.ringEndsRounded, cssBackground, cssForeground, p, prevP, color, prevColor, animationAttrs, opts.rotation);
				}
				
				//w: ringWidth of innermost ring to calculate free disc inside avaliable for content plug-in.
				var w = typeof opts.ringWidth === 'number' ? opts.ringWidth : typeof opts.strokeWidth === 'number' ? opts.strokeWidth : 0;
				
				//Draw a second, inner pie?
				var inner = opts.inner;
				var innerCnt = 1;
				while (typeof inner === 'object') {
					if (typeof inner.valueAdapter === "undefined") {
						inner.valueAdapter = $.fn.progressPie.defaults.valueAdapter;
					}
					if (typeof inner.overlap === 'undefined') {
						inner.overlap = $.fn.progressPie.defaults.overlap;
					}
					raw = getRawValueStringOrNumber(me, inner);
					p = getPercentValue(raw, inner);
					var innerDataName = $.fn.progressPie.prevInnerValueDataName;
					var cssClassName = opts.cssClassInner;
					if (innerCnt > 1) {
						innerDataName += innerCnt;
						cssClassName += innerCnt;
					}
					prevP = me.data(innerDataName);
					isInitialValue = typeof prevP === 'undefined';
					me.data(innerDataName, p);
					if (typeof prevP !== 'number') {
						prevP = 0;
					}
					mc = getModeAndColor(me, inner);
					rad = typeof inner.size === "number" ? inner.size * opts.sizeFactor / 2 : rad * 0.6;
					color = calcColor(mc.mode, mc.color, p);
					prevColor = null;
					if (inner.animateColor === true || typeof inner.animateColor === "undefined" && (opts.animateColor === true || typeof opts.animateColor === "undefined" && isInitialValue)) {
						prevColor = calcColor(mc.mode, mc.color, prevP);
					}
					if (inner.animate === false || !$.fn.progressPie.smilSupported()) {
						animationAttrs = null;
					} else if (inner.animate === true && animationAttrs === null) {
						animationAttrs = $.fn.progressPie.defaultAnimationAttributes;
					} else if (typeof inner.animate === "object") {
						if (animationAttrs === null) {
							animationAttrs = $.extend({}, $.fn.progressPie.defaultAnimationAttributes, inner.animate);
						} else {
							animationAttrs = $.extend({}, animationAttrs, inner.animate);
						}
					}
					
					if (!hideChart) {
						drawPie(svg, rad, inner.strokeWidth, inner.strokeColor, inner.strokeDashes, inner.overlap, inner.ringWidth, inner.ringEndsRounded, opts.cssClassBackgroundCircle + " " + cssClassName, opts.cssClassForegroundPie + " " + cssClassName, p, prevP, color, prevColor, animationAttrs);
					}
					
					w = typeof inner.ringWidth === 'number' ? inner.ringWidth : 0;
					
					inner = inner.inner;
					innerCnt++;
				}
				
				if (ctPlugin) {
					var group = document.createElementNS(NS, "g");
					var f = typeof ctPlugin === 'function' ? ctPlugin : ctPlugin.draw;
					var r = rad;
					if (w < rad) {
						r -= w;	
					}
					var args = {
						newSvgElement: function(name) {
							var el = document.createElementNS(NS, name);
							group.appendChild(el);
							return el;
						},
						newSvgSubelement: function(parent, name) {
							var el = document.createElementNS(NS, name);
							parent.appendChild(el);
							return el;
						},
						isFullSize: function() {
							return ctPluginIsFullSize(opts);
						},
						getBackgroundRadius: function(ignoreMargin) {
							var r = this.isFullSize() ?  this.totalRadius: this.radius;
							if (! ignoreMargin) {
								var margin = typeof this.margin === "number" ? this.margin : 
										this.isFullSize() ? this.pieOpts.defaultContentPluginBackgroundMarginFullSize 
														  : this.pieOpts.defaultContentPluginBackgroundMarginInsideRing;
								r -= margin;
							}
							return r;
						},
						addBackground: function(radius) {
							//fill background if set
							if (this.backgroundColor) {
								var bg = this.newSvgElement("circle");
								bg.setAttribute("cx", "0");
								bg.setAttribute("cy", "0");
			
								bg.setAttribute("r", radius);
								bg.setAttribute("fill", this.backgroundColor);
							}
						},
						getContentPlugin: getContentPlugin,
						radius: r,
						totalRadius: totalRad,
						color: color,
						percentValue: p,
						rawValue: raw,
						pieOpts: opts
					};
					if (typeof opts.contentPluginOptions === 'object') {
						$.extend(args, opts.contentPluginOptions);
					}
					f(args);
					if (typeof ctPlugin.isBackground === 'boolean' && ctPlugin.isBackground ||
						typeof ctPlugin.isBackground === 'function' && ctPlugin.isBackground(args) ) {
						svg.prepend(group);				
					} else {
						svg.append(group);
					}
				}
			}
		});
		
		return this;
	};
	
	/**
	 * Enum defining possible values for the <code>mode</code> option.
	 * @memberOf jQuery.fn.progressPie
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
		 * @type {Object}
		 */ 
		COLOR:{},
		/** In mode SMIL the color style properties {@code stroke} and {@code fill} of the background circle
		 * and the {@code stroke} property of the foreground (pie or ring) are not set at all and are 
		 * required to be set via CSS rules by the user. (The {@code fill} style of the foreground 
		 * is always set to 'none', even in CSS mode.)
		 */
		CSS:{}
	};
	
	/** 
	 * public static method to calculate a color for a percent value: green for 100%, red for 0%, yellow for 50%, 
	 * gradients for values in between.
	 * This is used internally in mode progressPie.Mode.COLOR
	 * @param {number} percent - a value between 0 and 100 (inclusive). 0 results in red color, 100 in green, 50 in yellow,
	 * any other value greater than 50 generates a gradient between green and yellow, values less than 50 a gradient
	 * between red and yellow.
	 * @memberOf jQuery.fn.progressPie
	 * @function colorByPercent
	 */
	$.fn.progressPie.colorByPercent = function(percent) { 
		var maxGreen = $.fn.progressPie.Mode.GREEN.value;
		var maxRed = $.fn.progressPie.Mode.RED.value;
		var green = percent > 50 ? maxGreen : Math.floor(maxGreen * percent / 50);
		var red = percent < 50 ? maxRed : Math.floor(maxRed * (100 - percent) / 50);
		return "rgb(" + red + "," + green + ",0)";
	};
	
	$.fn.progressPie.smilSupported = function() {
		if (typeof $.fn.progressPie.smilSupported.cache === "undefined") {
			//Test taken from Modernizr Library (MIT License) with special thanks to that project. 
			//This one line is pretty much identical to Modernizr's SMIl test routine, but by extracting it from that library,
			//I don't need the whole Modernizr Framework around that test. This one line is actually more compact than even the 
			//smallest Modernizr custom feature build (supporting only the SMIL test and not generating CSS classes),
			//and by integrating it here, I don't introduce unnecessary library dependencies.
			$.fn.progressPie.smilSupported.cache = /SVGAnimate/.test(document.createElementNS("http://www.w3.org/2000/svg", "animate").toString());
		}
		return $.fn.progressPie.smilSupported.cache;
	};

	/**
	 * Default Options.
	 * This is a public (static) object in order to allow users to globally modify the defaults
	 * before using the plug-in.
	 * @memberOf jQuery.fn.progressPie
	 * @member defaults
	 * @property {Mode} mode - A value of the enum type Mode, defaults to $.fn.progressPie.Mode.GREY
	 * @property {number} strokeWidth - The default width of the background circle stroke, defaults to 2
	 * @property {boolean} overlap - if true (default), the foreground pie or ring fragment is drawn full size 
	 * on top of the always visible background circle stroke, overlapping it. If set to false, the foreground pie/ring
	 * will be scaled down to fit into the background circle, not overlapping the latter's stroke.
	 * This is only advisable if the <code>strokeWidth</code> is small enough to leave free space inside the
	 * background circle. Also, this only makes any sense if the background circle's color differs from the
	 * foreground color (i.e. the <code>strokeColor</code> option is set) or if the foreground color is semi transparent.
	 * @property {boolean} prepend - true for prepending the SVG graph to the selected element's content, false for appending. Defaults to true.
	 * @property {string} separator - String to be inserted between prepended or appended SVG and target element's content.
	 * If the target element is empty, i.e. there's no content to append or prepend the graph to 
	 * (example: <code>&lt;span class="pie" data-percent="10"&gt;&lt;/span&gt;</code>), the separator and prepend options will be ignored 
	 * and only the SVG will be inserted into the element (starting with V2.0.0)
	 * @property {string} verticalAlign - CSS value for the verticalAlign style attribute of the inserted SVG node (defaults to "bottom", option is ignored in special CSS mode).
	 * @property {boolean} update - true will remove any SVG child from the selected target element before inserting a new image,
	 * false will only insert a new SVG if none exists yet. Defaults to false.
	 * @property {function} valueAdapter - Function takes a value (string or number) and returns a number in range (0..100),
	 * defaults to a function returning number values unchanged and applying parseFloat to string values. Note that this may
	 * parse percent numbers with decimal digits if the "dot" is used as decimal separator, while if any unknown character
	 * like a comma (european decimal separator) is found, the parsing stops and the rest of the string is ignored. 
	 * I.e. a string like "23.5" is parsed as twenty-three and a half percent while "23,5" is parsed as exactly 
	 * 23 percent, which usually should be exact enough if the pie chart is not very big.
	 * @property {boolean} ringEndsRounded - If setting a ringWidth, this flag controls if the ends of the ring are simply
	 * cut (false) or if half a circle is appended to each end of the ring section (true). Defaults to false.
	 * @property {number} sizeFactor - Defaults to 1. The "original" diameter for the pie chart as either auto-sized
	 * or specified by the <code>size</code> option, is multiplied with this factor to get the final diameter before
	 * drawing the pie chart.
	 * @property {number} scale - Defaults to 1. The already rendered SVG graphic is finally scaled by this factor.
	 * In difference to <code>sizeFactor</code> this does not simply change the diameter/radius of the chart, but scales
	 * all other aspects such as the <code>strokeWidth</code>, too.
	 * @property {number} defaultContentPluginBackgroundMarginFullSize - Defaults to 0. Sets the default value for a content plug-in's margin
	 * property if that plug-in uses the API's <code>getBackgroundRadius()</code> function, if the <code>contentPluginOptions</code> object does not
	 * specify a <code>margin</code> property and if a pie chart is drawn (i.e. the <code>ringWidth</code> option is not set) or if (on a ring chart)
	 * the <code>fullSize</code> property of the <code>contentPluginOption</code> is set to true.<br>
	 * The value of 0 causes a filled background to cover the whole pie.
	 * @property {number} defaultContentPluginBackgroundMarginInsideRing - Defaults to 1. Sets the default value for a content plug-in's margin
	 * property if that plug-in uses the API's <code>getBackgroundRadius()</code> function, if the <code>contentPluginOptions</code> object does not
	 * specify a <code>margin</code> property and does not set <code>fullSize</code> and if a ring is drawn (i.e. the <code>ringWidth</code> option <em>is</em> set).<br>
	 * The default value of 1 leaves free circular gap of 1 pixel between the ring and the filled content plug-in's background inside the ring. With a value of zero,
	 * the content background would "touch" the ring.
	 * @property {string} cssClassBackgroundCircle - name of a CSS class assigned to the circle shape drawn as background
	 * behind the pie or ring segment. Defaults to <code>progresspie-background</code>.
	 * @property {string} cssClassForegroundPie - name of a CSS class assigned to the pie or ring segment (foreground). 
	 * Defaults to <code>progresspie-foreground</code>.
	 * @property {string} cssClassOuter - If the <code>inner</code> option is used to draw a second value, this CSS
	 * class is assigned to the background circle as well as the foreground pie/ring segment of the outer/main value 
	 * <em>in addition to</em> the respective cssClassBackgroundCircle or cssClassForegroundPie class. 
	 * Defaults to <code>progresspie-outer</code>.
	 * @property {string} cssClassOuter - If the <code>inner</code> option is used to draw a second value, this CSS
	 * class as assigned to the background circle and the forground pie/ring segment of the inner value 
	 * in addition to the respective cssClassBackgroundCircle or cssClassForegroundPie. 
	 * Defaults to <code>progresspie-inner</code>. If the inner option contains a second inner option (third value),
	 * the background and foreground elements of the "inner inner" value get assigned this class with suffix "2",
	 * an "inner inner inner" value will be assigned this class with suffix "3" and so on. 
	 */
	$.fn.progressPie.defaults = {
		mode: $.fn.progressPie.Mode.GREY,
		strokeWidth: 2,
		overlap: true,
		prepend: true,
		separator: "&nbsp;", 
		verticalAlign: "bottom",
		update: false,
		valueAdapter: function(value) {
			if (typeof value === "string") {
				return parseFloat(value);
			} else if (typeof value === "number") {
				return value;
			} else {
				return 0;
			}
		},
		ringEndsRounded: false,
		sizeFactor: 1,
		scale: 1,
		defaultContentPluginBackgroundMarginFullSize: 0,
		defaultContentPluginBackgroundMarginInsideRing: 1,
		cssClassBackgroundCircle: "progresspie-background",
		cssClassForegroundPie: "progresspie-foreground",
		cssClassOuter: "progresspie-outer",
		cssClassInner: "progresspie-inner",
	};
	
	/**
	 * Default SMIL animation attributes for value transitions.
	 * keys and value syntax follow the SMIL language for SVG animation. 
	 * Each property of this object will be turned into an attribute of the SMIL animation 
	 * element, the property's key serving as attribute name, the property's value as attribute value.
	 * <p>If the plug-in is called with option <code>animate: true</code>, these options will be applied to
	 * the animation.<br>
	 * If the plug-in is called with option <code>animate: {options}</code>, the options enumerated by the
	 * user get added to these defaults. Each stated option will override the default option, while those
	 * properties of this defaults object that are not overridden by the user will be applied unchanged.<br>
	 * If the user, for example, adds the option <code>animate: {dur: "2s"}</code>, the default duration will
	 * be overriden, the animation will last 2 seconds, while the other animation properties (spline mode)
	 * will be applied exactly as defined in this defaults object.
	 * @memberOf jQuery.fn.progressPie
	 * @member defaultAnimationAttributes
	 * @property {string} dur - the duration of the animation (number with unit, e.g. "1s" or "700ms")
	 * @property {string} calcMode - mode for calculating the animation speed, defaults to "spline", see SMIL {@link http://www.w3.org/TR/SVG/animate.html#CalcModeAttribute specification}.
	 * @property {string} keySplines - see {@link http://www.w3.org/TR/SVG/animate.html#KeySplinesAttribute specification}
	 * @property {string} keyTimes - see {@link http://www.w3.org/TR/SVG/animate.html#KeyTimesAttribute specification}
	 */
	$.fn.progressPie.defaultAnimationAttributes = {
		dur: "1s",
		calcMode: "spline",
		keySplines: "0.23 1 0.32 1",
		keyTimes: "0;1"
	};
	
	/**
	 * Default namespace for content plug-ins.
	 * If you write contentPlugin functions, it is recommended to add them as members to this object
	 * (see bundled jquery-progresspiesvg-controlIcons.js for eample).
	 * Though you may use any function as a plugin (if it conforms to the plug-in interface),
	 * only functions within this default namespace may be specified by a string holding their function name
	 * in the <code>contentPlugin</code> option. Functions not in this namespace have to be referred to
	 * by a function reference (an expression evaluating to the very function object).
	 * @namespace contentPlugin
	 * @memberOf jQuery.fn.progressPie
	 */
	$.fn.progressPie.contentPlugin = {};
	
	/**
	 * If a user enables animated state transitions via the <code>animate</code> option, the plug-in
	 * stores the last drawn value in jQuery's data map associated with the target element. If the user
	 * later first updates the value to be shown and then calls the progressPie() plug-in again on the target
	 * element, it will not only find the new value, but also the previous value in said data, which it
	 * needs to calculate the transition.
	 * <p>This option defines the name of the data entry which will be added to the target DOM node
	 * to hold the lastly draw percent value.
	 * @memberOf jQuery.fn.progressPie
	 * @member prevValueDataName
	 */
	$.fn.progressPie.prevValueDataName = "_progresspieSVG_prevValue";
	/**
	 * Just like <code>prevValueDataName</code>, but used for double/multiple pies:
	 * The lastly drawn percent value for the <code>inner</code> pie will be stored in a data
	 * entry of this name.
	 * If even more than two values are drawn (by nested <code>inner</code> options), the value of
	 * a number will be appended to this name. So the lastly drawn value of the third pie (<code>inner.inner</code>)
	 * will be stored in a data entry named <code>prevInnerValueDataName+"2"</code>.
	 * @memberOf jQuery.fn.progressPie
	 * @member prevInnerValueDataName
	 */
	$.fn.progressPie.prevInnerValueDataName = "_progresspieSVG_prevInnerValue";
 
}( jQuery ));