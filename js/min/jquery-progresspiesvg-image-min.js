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
!function($){$.fn.progressPie.contentPlugin.image={draw:function(e){if("string"!=typeof e.href)throw"$.fn.progressPie.contentPlugin.image requires argument 'href' of type 'string'!";var t=$.extend({},$.fn.progressPie.contentPlugin.imageDefaults,e),i=t.getBackgroundRadius(),r=2*i,n=e.newSvgElement("image");if(n.setAttribute("width",r),n.setAttribute("height",r),n.setAttribute("x",-i),n.setAttribute("y",-i),n.setAttributeNS("http://www.w3.org/1999/xlink","href",e.href),t.clipCircle){var u=e.newDefElement("clipPath");u.setAttribute("id","clipcircle"),n.setAttribute("clip-path","url(#clipcircle)");var c=e.newSvgSubelement(u,"circle");c.setAttribute("cx",0),c.setAttribute("cy",0),c.setAttribute("r",i)}},inBackground:function(e){var t=$.extend({},$.fn.progressPie.contentPlugin.imageDefaults,e);return t.inBackground}},$.fn.progressPie.contentPlugin.imageDefaults={inBackground:!0,clipCircle:!1}}(jQuery);