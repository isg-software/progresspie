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
!function($){var t=function(t){var e=t.radius*t.sizeFactor;return"number"==typeof t.maxSize&&t.maxSize>0&&(e=Math.min(e,t.maxSize)),e},e=function(t,e){t.setAttribute("style","fill: "+e.color+"; stroke: none")};$.fn.progressPie.contentPlugin.stop=function(n){var i=$.extend({},$.fn.progressPie.contentPlugin.controlIconDefaults,n),r=t(i),o=r/2,s=n.newSvgElement("rect");s.setAttribute("x",-o),s.setAttribute("y",-o),s.setAttribute("width",r),s.setAttribute("height",r),e(s,i)},$.fn.progressPie.contentPlugin.pause=function(n){var i=$.extend({},$.fn.progressPie.contentPlugin.controlIconDefaults,n),r=t(i),o=r/2,s=n.newSvgElement("rect");s.setAttribute("x",-o),s.setAttribute("y",-o),s.setAttribute("width",.7*o),s.setAttribute("height",r),e(s,i),s=n.newSvgElement("rect"),s.setAttribute("x",.3*o),s.setAttribute("y",-o),s.setAttribute("width",.7*o),s.setAttribute("height",r),e(s,i)},$.fn.progressPie.contentPlugin.play=function(n){var i=$.extend({},$.fn.progressPie.contentPlugin.controlIconDefaults,n),r=t(i),o=r/2,s=n.newSvgElement("path"),u=-.732*o;o=1.2*o,s.setAttribute("d","M"+u+",-"+o+" L"+o+",0 L"+u+","+o+" Z"),e(s,i)},$.fn.progressPie.contentPlugin.controlIconDefaults={sizeFactor:.85,maxSize:0}}(jQuery);