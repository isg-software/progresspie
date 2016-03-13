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
!function($){$.fn.progressPie.contentPlugin.cross=function(t){var e=$.extend({},$.fn.progressPie.contentPlugin.crossDefaults,t),i;if("undefined"==typeof e.pieOpts.ringWidth||e.fullSize?i=e.totalRadius:(i=e.radius,e.backgroundColor&&(i-=e.gapToRing)),e.backgroundColor){var r=t.newSvgElement("circle");r.setAttribute("cx","0"),r.setAttribute("cy","0"),r.setAttribute("r",i),r.setAttribute("fill",e.backgroundColor)}var n=t.newSvgElement("path"),o=i/2.5,s="M-"+o+",-"+o+" ",u="L"+o+","+o+" ",l="M-"+o+","+o+" ",a="L"+o+",-"+o;if(n.setAttribute("d",s+u+l+a),n.setAttribute("style","stroke-width: "+e.strokeWidth+"; stroke-linecap: "+e.lineCap+"; stroke: "+e.iconColor+"; fill: none"),e.animate){var c=t.newSvgSubelement(n,"animate");c.setAttribute("attributeName","d"),c.setAttribute("dur","string"==typeof e.animate?e.animate:"1s"),c.setAttribute("repeatCount","1"),c.setAttribute("values",s+"l0,0 m0,0 l0,0; "+s+u+"m0,0 l0,0; "+s+u+l+" l0,0; "+s+u+l+a),c.setAttribute("calcMode","spline"),c.setAttribute("keyTimes","0; .45; .55; 1"),c.setAttribute("keySplines",".5 0 .3 1; .5 0 0 1; .3 0 0 1")}},$.fn.progressPie.contentPlugin.crossDefaults={iconColor:"white",backgroundColor:"red",strokeWidth:2,lineCap:"round",gapToRing:1}}(jQuery);