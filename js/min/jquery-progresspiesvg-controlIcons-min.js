"use strict";/**
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
!function($){var t=function t(e){var n=e.radius*e.sizeFactor;return"number"==typeof e.maxSize&&e.maxSize>0&&(n=Math.min(n,e.maxSize)),n},e=function t(e,n){"string"==typeof n.color&&e.setAttribute("style","fill: "+n.color+"; stroke: none"),e.setAttribute("class",n.cssClass)};$.fn.progressPie.contentPlugin.stop=function(n){var r=$.extend({},$.fn.progressPie.contentPlugin.controlIconDefaults,n),s=t(r),i=s/2,o=n.newSvgElement("rect");o.setAttribute("x",-i),o.setAttribute("y",-i),o.setAttribute("width",s),o.setAttribute("height",s),e(o,r)},$.fn.progressPie.contentPlugin.pause=function(n){var r=$.extend({},$.fn.progressPie.contentPlugin.controlIconDefaults,n),s=t(r),i=s/2,o=n.newSvgElement("rect");o.setAttribute("x",-i),o.setAttribute("y",-i),o.setAttribute("width",.7*i),o.setAttribute("height",s),e(o,r),o=n.newSvgElement("rect"),o.setAttribute("x",.3*i),o.setAttribute("y",-i),o.setAttribute("width",.7*i),o.setAttribute("height",s),e(o,r)},$.fn.progressPie.contentPlugin.play=function(n){var r=$.extend({},$.fn.progressPie.contentPlugin.controlIconDefaults,n),s=t(r),i=s/2,o=n.newSvgElement("path"),u=-.732*i;i*=1.2,o.setAttribute("d","M"+u+",-"+i+" L"+i+",0 L"+u+","+i+" Z"),e(o,r)},$.fn.progressPie.contentPlugin.controlIconDefaults={sizeFactor:.85,maxSize:0,cssClass:"progresspie-control-icon"}}(jQuery);