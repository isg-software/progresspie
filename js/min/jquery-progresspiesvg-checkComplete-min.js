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
!function($){function t(t,e){var n=e,o=t.iconSizeFactor;return"number"!=typeof o&&(o=void 0===t.pieOpts.ringWidth||t.backgroundColor?t.iconSizeFactorPie:t.iconSizeFactorRing),n*=o,"none"!==t.lineCap&&(n-=t.strokeWidth/2),n}$.fn.progressPie.contentPlugin.checkComplete={draw:function e(n){if(100===n.percentValue){var o=$.extend({},$.fn.progressPie.contentPlugin.checkCompleteDefaults,n),i=o.getBackgroundRadius(!o.backgroundColor);o.addBackground(i,o.cssClassBackgroundCircle);var r=t(o,i),s=r/Math.sqrt(2),c=s/22,u="M -"+s+",0 ",l="L -"+c+","+s+" ",a="L "+s+", -"+s,p=n.newSvgElement("path");p.setAttribute("d",u+l+a),p.style.strokeWidth=o.strokeWidth,p.style.strokeLinecap=o.lineCap;var g=void 0===n.pieOpts.ringWidth,f="string"!=typeof o.color;if(p.style.fill="none",f)g&&p.setAttribute("stroke","white");else{var d=g?"white":o.color;p.style.stroke=d}if(p.setAttribute("class",o.cssClass),o.animate){var b=n.newSvgSubelement(p,"animate");b.setAttribute("attributeName","d"),b.setAttribute("dur","string"==typeof o.animate?o.animate:"1s"),b.setAttribute("repeatCount","1"),b.setAttribute("values",u+"l0,0 l0,0; "+u+l+"l0,0; "+u+l+a),b.setAttribute("calcMode","spline"),b.setAttribute("keyTimes","0; .25; 1"),b.setAttribute("keySplines",".5 0 .3 1; .3 0 0 1")}}else if(void 0!==n.contentPlugin){var k=n.getContentPlugin(n.contentPlugin),y="object"===_typeof(n.contentPluginOptions)?$.extend({},n,n.contentPluginOptions):n;k(y)}},hidesChartIfFullSize:function t(e){var n=$.extend({},$.fn.progressPie.contentPlugin.checkCompleteDefaults,e);return 100===e.percentValue&&"string"==typeof n.backgroundColor&&"rgba"!==n.backgroundColor.substr(0,4)&&!n.margin&&!this.inBackground(e)},inBackground:function t(e){return $.extend({},$.fn.progressPie.contentPlugin.checkCompleteDefaults,e).inBackground}},$.fn.progressPie.contentPlugin.checkCompleteDefaults={strokeWidth:2,lineCap:"round",iconSizeFactorPie:.6,iconSizeFactorRing:.8,fullSize:!1,inBackground:!1,cssClass:"progresspie-check"}}(jQuery);