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
!function($){$.fn.progressPie.contentPlugin.checkComplete=function(e){if(100===e.percentValue){var t=e.newSvgElement("path"),n=e.radius/2.2,i=e.radius/10,r=$.extend({},$.fn.progressPie.contentPlugin.checkCompleteDefaults,e),s="undefined"==typeof e.pieOpts.ringWidth?"white":r.color,u="M -"+n+",0 ",l="L -"+i+","+n+" ",o="L "+n+", -"+n;if(t.setAttribute("d",u+l+o),t.setAttribute("style","stroke-width: "+r.strokeWidth+"; stroke-linecap: "+r.lineCap+"; stroke: "+s+"; fill: none"),r.animate){var a=e.newSvgSubelement(t,"animate");a.setAttribute("attributeName","d"),a.setAttribute("dur","string"==typeof r.animate?r.animate:"0.5s"),a.setAttribute("repeatCount","1"),a.setAttribute("values",u+"l0,0 l0,0; "+u+l+"l0,0; "+u+l+o)}}else"undefined"!=typeof e.contentPlugin&&alert("TODO")},$.fn.progressPie.contentPlugin.checkCompleteDefaults={strokeWidth:2,lineCap:"round"}}(jQuery);