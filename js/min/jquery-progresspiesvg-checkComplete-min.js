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
!function($){function e(e,t){var n=t,i=e.iconSizeFactor;return"number"!=typeof i&&(i="undefined"==typeof e.pieOpts.ringWidth||e.backgroundColor?e.iconSizeFactorPie:e.iconSizeFactorRing),n*=i,"none"!==e.lineCap&&(n-=e.strokeWidth/2),n}$.fn.progressPie.contentPlugin.checkComplete={draw:function(t){if(100===t.percentValue){var n=$.extend({},$.fn.progressPie.contentPlugin.checkCompleteDefaults,t),i=n.getBackgroundRadius(!n.backgroundColor);n.addBackground(i);var o=e(n,i),r=o/Math.sqrt(2),u=r/22,a="undefined"==typeof t.pieOpts.ringWidth?"white":n.color,l="M -"+r+",0 ",s="L -"+u+","+r+" ",c="L "+r+", -"+r,d=t.newSvgElement("path");if(d.setAttribute("d",l+s+c),d.setAttribute("style","stroke-width: "+n.strokeWidth+"; stroke-linecap: "+n.lineCap+"; stroke: "+a+"; fill: none"),n.animate){var g=t.newSvgSubelement(d,"animate");g.setAttribute("attributeName","d"),g.setAttribute("dur","string"==typeof n.animate?n.animate:"1s"),g.setAttribute("repeatCount","1"),g.setAttribute("values",l+"l0,0 l0,0; "+l+s+"l0,0; "+l+s+c),g.setAttribute("calcMode","spline"),g.setAttribute("keyTimes","0; .25; 1"),g.setAttribute("keySplines",".5 0 .3 1; .3 0 0 1")}}else if("undefined"!=typeof t.contentPlugin){var p=t.getContentPlugin(t.contentPlugin),f="object"==typeof t.contentPluginOptions?$.extend({},t,t.contentPluginOptions):t;p(f)}},hidesChartIfFullSize:function(e){var t=$.extend({},$.fn.progressPie.contentPlugin.checkCompleteDefaults,e);return 100===e.percentValue&&"string"==typeof t.backgroundColor&&"rgba"!==t.backgroundColor.substr(0,4)&&!t.margin}},$.fn.progressPie.contentPlugin.checkCompleteDefaults={strokeWidth:2,lineCap:"round",iconSizeFactorPie:.6,iconSizeFactorRing:.8,fullSize:!1}}(jQuery);