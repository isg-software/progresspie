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
!function($){$.fn.progressPie.contentPlugin.image={draw:function(e){if("string"!=typeof e.href)throw"$.fn.progressPie.contentPlugin.image requires argument 'href' of type 'string'!";var t=$.extend({},$.fn.progressPie.contentPlugin.imageDefaults,e),i=t.getBackgroundRadius(),n=-i,r=-i,o=2*i,g=o;if(t.isFullSize()){var s=t.pieOpts.getPadding(0),u=t.pieOpts.getPadding(1),a=t.pieOpts.getPadding(2),c=t.pieOpts.getPadding(3);n-=c,r-=s,o+=c+u,g+=s+a}var f=e.newSvgElement("image");if(f.setAttribute("width",o),f.setAttribute("height",g),f.setAttribute("x",n),f.setAttribute("y",r),f.setAttributeNS("http://www.w3.org/1999/xlink","href",e.href),t.clipCircle){var l=e.newDefElement("clipPath"),d=e.createId("clipcircle");l.setAttribute("id",d),f.setAttribute("clip-path","url(#"+d+")");var p=e.newSvgSubelement(l,"circle");p.setAttribute("cx",0),p.setAttribute("cy",0),p.setAttribute("r",i)}},inBackground:function(e){var t=$.extend({},$.fn.progressPie.contentPlugin.imageDefaults,e);return t.inBackground}},$.fn.progressPie.contentPlugin.backgroundRect={draw:function(e){if("string"!=typeof e.stroke&&"string"!=typeof e.fill)throw"$.fn.progressPie.contentPlugin.backgroundRect requires at least one of the two arguments 'fill' and 'stroke'.";var t="string"==typeof e.stroke?e.stroke:"none",i="string"==typeof e.fill?e.fill:"none",n="number"==typeof e.strokeWidth&&"none"!==t?e.strokeWidth:void 0;e.addBackgroundRect(t,i,n)},inBackground:function(){return!0}},$.fn.progressPie.contentPlugin.imageDefaults={inBackground:!0,clipCircle:!1,fullSize:!1}}(jQuery);