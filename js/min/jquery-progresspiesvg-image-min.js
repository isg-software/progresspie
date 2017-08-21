"use strict";/**
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
!function($){$.fn.progressPie.contentPlugin.image={draw:function e(t){if("string"!=typeof t.href)throw new Error("$.fn.progressPie.contentPlugin.image requires argument 'href' of type 'string'!");var r=$.extend({},$.fn.progressPie.contentPlugin.imageDefaults,t),i=r.getBackgroundRadius(),n=-i,o=-i,s=2*i,g=s;if(r.isFullSize()){var u=r.pieOpts.getPadding(0),a=r.pieOpts.getPadding(1),c=r.pieOpts.getPadding(2),f=r.pieOpts.getPadding(3);n-=f,o-=u,s+=f+a,g+=u+c}var l=t.newSvgElement("image");if(l.setAttribute("width",s),l.setAttribute("height",g),l.setAttribute("x",n),l.setAttribute("y",o),l.setAttributeNS("http://www.w3.org/1999/xlink","href",t.href),r.clipCircle){var d=t.newDefElement("clipPath"),p=t.createId("clipcircle");d.setAttribute("id",p),l.setAttribute("clip-path","url(#"+p+")");var P=t.newSvgSubelement(d,"circle");P.setAttribute("cx",0),P.setAttribute("cy",0),P.setAttribute("r",i)}},inBackground:function e(t){return $.extend({},$.fn.progressPie.contentPlugin.imageDefaults,t).inBackground}},$.fn.progressPie.contentPlugin.backgroundRect={draw:function e(t){if("string"!=typeof t.stroke&&"string"!=typeof t.fill)throw new Error("$.fn.progressPie.contentPlugin.backgroundRect requires at least one of the two arguments 'fill' and 'stroke'.");var r="string"==typeof t.stroke?t.stroke:"none",i="string"==typeof t.fill?t.fill:"none",n="number"==typeof t.strokeWidth&&"none"!==r?t.strokeWidth:void 0;t.addBackgroundRect(r,i,n)},inBackground:function e(){return!0}},$.fn.progressPie.contentPlugin.imageDefaults={inBackground:!0,clipCircle:!1,fullSize:!1}}(jQuery);