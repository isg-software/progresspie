"use strict";/**
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
!function($){var t=function t(e,n,i){var s=$.extend({},$.fn.progressPie.contentPlugin.valueDisplayDefaults,i),r=i.newSvgElement("text");r.setAttribute("x",0),r.setAttribute("y",0),r.setAttribute("dy","0.33em"),r.textContent=e;var o="number"==typeof i.fontSizeFactor?i.fontSizeFactor:s.singleLine?s.fontSizeFactorSingleLine:s.fontSizeFactorTwoLines;if(r.style.textAnchor="middle",r.style.fontSize=s.radius*o+"px","string"==typeof i.color&&r.setAttribute("fill",s.color),r.setAttribute("class",s.cssClass),"string"==typeof n){var a=i.newSvgSubelement(r,"tspan");a.textContent=n,s.singleLine||(a.setAttribute("dy","1.1em"),a.setAttribute("x",0));var u="number"==typeof s.unitFontSizeFactor?s.unitFontSizeFactor:.35;a.style.fontSize=s.radius*u+"px",a.setAttribute("class",s.cssClassUnit)}};$.fn.progressPie.contentPlugin.percent=function(e){t(Math.round(e.percentValue),"%",e)},$.fn.progressPie.contentPlugin.rawValue=function(e){t(e.rawValue,e.unit,e)},$.fn.progressPie.contentPlugin.valueDisplayDefaults={singleLine:!1,fontSizeFactorTwoLines:1,fontSizeFactorSingleLine:.9,unitFontSizeFactor:.35,cssClass:"progresspie-valuedisplay",cssClassUnit:"progresspie-unit"}}(jQuery);