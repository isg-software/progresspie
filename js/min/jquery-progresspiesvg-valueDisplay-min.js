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
!function($){var t=function(t,e,n){var i=$.extend({},$.fn.progressPie.contentPlugin.valueDisplayDefaults,n),o=n.newSvgElement("text");o.setAttribute("x",0),o.setAttribute("y",0),o.setAttribute("dy","0.33em"),o.textContent=t;var r="number"==typeof n.fontSizeFactor?n.fontSizeFactor:i.singleLine?i.fontSizeFactorSingleLine:i.fontSizeFactorTwoLines;if(o.setAttribute("style","text-anchor: middle; fill: "+n.color+"; font-size: "+n.radius*r+"px"),"string"==typeof e){var u=n.newSvgSubelement(o,"tspan");u.textContent=e,i.singleLine||(u.setAttribute("dy","1.1em"),u.setAttribute("x",0));var s="number"==typeof i.unitFontSizeFactor?i.unitFontSizeFactor:.35;u.setAttribute("style","font-size: "+n.radius*s+"px")}};$.fn.progressPie.contentPlugin.percent=function(e){t(Math.round(e.percentValue),"%",e)},$.fn.progressPie.contentPlugin.rawValue=function(e){t(e.rawValue,e.unit,e)},$.fn.progressPie.contentPlugin.valueDisplayDefaults={singleLine:!1,fontSizeFactorTwoLines:1,fontSizeFactorSingleLine:.9,unitFontSizeFactor:.35}}(jQuery);