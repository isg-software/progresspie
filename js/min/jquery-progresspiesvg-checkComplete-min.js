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
!function($){function e(e){var t="undefined"!=typeof e.pieOpts.ringWidth,n=t?e.radius:e.totalRadius,i=e.iconSizeFactor;return"number"!=typeof i&&(i=t?e.iconSizeFactorRing:e.iconSizeFactorPie),n*=i,"none"!==e.lineCap&&(n-=e.strokeWidth/2),n}$.fn.progressPie.contentPlugin.checkComplete=function(t){if(100===t.percentValue){var n=$.extend({},$.fn.progressPie.contentPlugin.checkCompleteDefaults,t),i=e(n),o=i/Math.sqrt(2),r=o/22,s="undefined"==typeof t.pieOpts.ringWidth?"white":n.color,u="M -"+o+",0 ",a="L -"+r+","+o+" ",l="L "+o+", -"+o,c=t.newSvgElement("path");if(c.setAttribute("d",u+a+l),c.setAttribute("style","stroke-width: "+n.strokeWidth+"; stroke-linecap: "+n.lineCap+"; stroke: "+s+"; fill: none"),n.animate){var p=t.newSvgSubelement(c,"animate");p.setAttribute("attributeName","d"),p.setAttribute("dur","string"==typeof n.animate?n.animate:"1s"),p.setAttribute("repeatCount","1"),p.setAttribute("values",u+"l0,0 l0,0; "+u+a+"l0,0; "+u+a+l),p.setAttribute("calcMode","spline"),p.setAttribute("keyTimes","0; .25; 1"),p.setAttribute("keySplines",".5 0 .3 1; .3 0 0 1")}}else if("undefined"!=typeof t.contentPlugin){var d=t.getContentPlugin(t.contentPlugin),f="object"==typeof t.contentPluginOptions?$.extend({},t,t.contentPluginOptions):t;d(f)}},$.fn.progressPie.contentPlugin.checkCompleteDefaults={strokeWidth:2,lineCap:"round",iconSizeFactorPie:.6,iconSizeFactorRing:.8}}(jQuery);