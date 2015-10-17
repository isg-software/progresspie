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
		text.style.textAnchor = "middle";
		text.style.fill = args.color;
		var fsFactor = typeof args.fontSizeFactor === 'number' ? args.fontSizeFactor : args.singleLine ? 0.9 : 1.0;
		text.style.fontSize = args.radius * fsFactor;
		var text1 = args.newSvgSubelement(text, "tspan");
		text1.textContent = line1;
		if (typeof line2 === 'string') {
			var text2 = args.newSvgSubelement(text, "tspan");
			text2.textContent = line2;
			if (!args.singleLine) {
				text2.setAttribute("dy", "1.1em");
				text2.setAttribute("x", 0);
			}
			var fsFactor2 = typeof args.unitFontSizeFactor === 'number' ? args.unitFontSizeFactor : 0.35;
			text2.style.fontSize = args.radius * fsFactor2;
		}
	};
	
	$.fn.progressPie.svgContentPlugin.percent = function(args) {
		drawText(Math.round(args.percentValue), "%", args);
	};
	
	$.fn.progressPie.svgContentPlugin.rawValue = function(args) {
		drawText(args.rawValue, args.unit, args);
	};


} (jQuery));

