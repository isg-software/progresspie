"use strict";function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function t(e){return typeof e}:function t(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(t)}
/**
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
/**
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
!function(b){function y(t,e){var n=e,o=t.iconSizeFactor;return"number"!=typeof o&&(o=void 0===t.pieOpts.ringWidth||t.backgroundColor||t.cssClassBackgroundCircle?t.iconSizeFactorPie:t.iconSizeFactorRing),n*=o,"none"!==t.lineCap&&(n-=t.strokeWidth/2),n}b.fn.progressPie.contentPlugin.checkComplete={draw:function t(e){if(100===e.percentValue){var n=b.extend({},b.fn.progressPie.contentPlugin.checkCompleteDefaults,e),o=n.getBackgroundRadius(!n.backgroundColor);n.addBackground(o,n.cssClassBackgroundCircle);var i,r=y(n,o)/Math.sqrt(2),s,c="M -"+r+",0 ",u="L -"+r/22+","+r+" ",l="L "+r+", -"+r,a=e.newSvgElement("path");a.setAttribute("d",c+u+l);var p=void 0===e.pieOpts.ringWidth;if(a.style.fill="none",n.isCssMode())a.setAttribute("stroke-width",n.strokeWidth),a.setAttribute("stroke-linecap",n.lineCap),p&&a.setAttribute("stroke","white");else{var g=p?"white":n.color;a.style.stroke=g,a.style.strokeWidth=n.strokeWidth,a.style.strokeLinecap=n.lineCap}if(a.setAttribute("class",n.cssClass),n.animate){var d=e.newSvgSubelement(a,"animate");d.setAttribute("attributeName","d"),d.setAttribute("dur","string"==typeof n.animate?n.animate:"1s"),d.setAttribute("repeatCount","1"),d.setAttribute("values",c+"l0,0 l0,0; "+c+u+"l0,0; "+c+u+l),d.setAttribute("calcMode","spline"),d.setAttribute("keyTimes","0; .25; 1"),d.setAttribute("keySplines",".5 0 .3 1; .3 0 0 1")}}else if(void 0!==e.contentPlugin){var f,k;e.getContentPlugin(e.contentPlugin)("object"===_typeof(e.contentPluginOptions)?b.extend({},e,e.contentPluginOptions):e)}},hidesChartIfFullSize:function t(e){var n=b.extend({},b.fn.progressPie.contentPlugin.checkCompleteDefaults,e);return 100===e.percentValue&&"string"==typeof n.backgroundColor&&"rgba"!==n.backgroundColor.substr(0,4)&&!n.margin&&!this.inBackground(e)},inBackground:function t(e){var n;return b.extend({},b.fn.progressPie.contentPlugin.checkCompleteDefaults,e).inBackground}},b.fn.progressPie.contentPlugin.checkCompleteDefaults={strokeWidth:2,lineCap:"round",iconSizeFactorPie:.6,iconSizeFactorRing:.8,fullSize:!1,inBackground:!1,cssClass:"progresspie-check",cssClassBackgroundCircle:void 0}}(jQuery);