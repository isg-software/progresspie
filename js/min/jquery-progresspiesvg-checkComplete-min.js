"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};/**
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
!function($){function t(t,e){var n=e,i=t.iconSizeFactor;return"number"!=typeof i&&(i=void 0===t.pieOpts.ringWidth||t.backgroundColor?t.iconSizeFactorPie:t.iconSizeFactorRing),n*=i,"none"!==t.lineCap&&(n-=t.strokeWidth/2),n}$.fn.progressPie.contentPlugin.checkComplete={draw:function e(n){if(100===n.percentValue){var i=$.extend({},$.fn.progressPie.contentPlugin.checkCompleteDefaults,n),o=i.getBackgroundRadius(!i.backgroundColor);i.addBackground(o,i.cssClassBackgroundCircle);var r=t(i,o),s=r/Math.sqrt(2),c=s/22,u="M -"+s+",0 ",l="L -"+c+","+s+" ",a="L "+s+", -"+s,p=n.newSvgElement("path");p.setAttribute("d",u+l+a);var g=void 0===n.pieOpts.ringWidth;if(p.style.fill="none",i.isCssMode())p.setAttribute("stroke-width",i.strokeWidth),p.setAttribute("stroke-linecap",i.lineCap),g&&p.setAttribute("stroke","white");else{var d=g?"white":i.color;p.style.stroke=d,p.style.strokeWidth=i.strokeWidth,p.style.strokeLinecap=i.lineCap}if(p.setAttribute("class",i.cssClass),i.animate){var f=n.newSvgSubelement(p,"animate");f.setAttribute("attributeName","d"),f.setAttribute("dur","string"==typeof i.animate?i.animate:"1s"),f.setAttribute("repeatCount","1"),f.setAttribute("values",u+"l0,0 l0,0; "+u+l+"l0,0; "+u+l+a),f.setAttribute("calcMode","spline"),f.setAttribute("keyTimes","0; .25; 1"),f.setAttribute("keySplines",".5 0 .3 1; .3 0 0 1")}}else if(void 0!==n.contentPlugin){var k=n.getContentPlugin(n.contentPlugin),b="object"===_typeof(n.contentPluginOptions)?$.extend({},n,n.contentPluginOptions):n;k(b)}},hidesChartIfFullSize:function t(e){var n=$.extend({},$.fn.progressPie.contentPlugin.checkCompleteDefaults,e);return 100===e.percentValue&&"string"==typeof n.backgroundColor&&"rgba"!==n.backgroundColor.substr(0,4)&&!n.margin&&!this.inBackground(e)},inBackground:function t(e){return $.extend({},$.fn.progressPie.contentPlugin.checkCompleteDefaults,e).inBackground}},$.fn.progressPie.contentPlugin.checkCompleteDefaults={strokeWidth:2,lineCap:"round",iconSizeFactorPie:.6,iconSizeFactorRing:.8,fullSize:!1,inBackground:!1,cssClass:"progresspie-check",cssClassBackgroundCircle:void 0}}(jQuery);