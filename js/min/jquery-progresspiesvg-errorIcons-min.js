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
!function($){function t(t){if("undefined"==typeof t.pieOpts.ringWidth||t.fullSize)return t.totalRadius;var e=t.radius;return t.backgroundColor&&(e-=t.gapToRing),e}function e(t,e){if(t.backgroundColor){var i=t.newSvgElement("circle");i.setAttribute("cx","0"),i.setAttribute("cy","0"),i.setAttribute("r",e),i.setAttribute("fill",t.backgroundColor)}}$.fn.progressPie.contentPlugin.cross=function(i){var r=$.extend({},$.fn.progressPie.contentPlugin.crossDefaults,i),n=t(r);e(r,n);var s=i.newSvgElement("path"),o=n/2.5,u="M-"+o+",-"+o+" ",a="L"+o+","+o+" ",l="M-"+o+","+o+" ",c="L"+o+",-"+o;if(s.setAttribute("d",u+a+l+c),s.setAttribute("style","stroke-width: "+r.strokeWidth+"; stroke-linecap: "+r.lineCap+"; stroke: "+r.iconColor+"; fill: none"),r.animate){var b=i.newSvgSubelement(s,"animate");b.setAttribute("attributeName","d"),b.setAttribute("dur","string"==typeof r.animate?r.animate:"1s"),b.setAttribute("repeatCount","1"),b.setAttribute("values",u+"l0,0 m0,0 l0,0; "+u+a+"m0,0 l0,0; "+u+a+l+" l0,0; "+u+a+l+c),b.setAttribute("calcMode","spline"),b.setAttribute("keyTimes","0; .45; .55; 1"),b.setAttribute("keySplines",".5 0 .3 1; 1 0 0 1; .3 0 0 1")}},$.fn.progressPie.contentPlugin.exclamationMark=function(i){var r=$.extend({},$.fn.progressPie.contentPlugin.crossDefaults,i),n=t(r);e(r,n);var s=i.newSvgElement("path"),o=n/2,u="M0,-"+o+" ",a="L0, "+(o-(r.strokeWidth<2?3:1.5*r.strokeWidth)),l="M0,"+o+" ",c="L0,"+(o-(r.strokeWidth<2?1:0));if(s.setAttribute("d",u+a+l+c),s.setAttribute("style","stroke-width: "+r.strokeWidth+"; stroke-linecap: "+r.lineCap+"; stroke: "+r.iconColor+"; fill: none"),r.animate){var b=i.newSvgSubelement(s,"animate");b.setAttribute("attributeName","d"),b.setAttribute("dur","string"==typeof r.animate?r.animate:"1s"),b.setAttribute("repeatCount","1"),b.setAttribute("values",u+"l0,0 "+u+"l0,0 ; "+u+a+u+a+"; "+u+a+l+" l0,0; "+u+a+l+c),b.setAttribute("calcMode","spline"),b.setAttribute("keyTimes","0; .6; .8; 1"),b.setAttribute("keySplines",".5 0 .3 1; 1 0 0 1; .3 0 0 1")}},$.fn.progressPie.contentPlugin.crossDefaults={iconColor:"white",backgroundColor:"red",strokeWidth:2,lineCap:"round",gapToRing:1}}(jQuery);