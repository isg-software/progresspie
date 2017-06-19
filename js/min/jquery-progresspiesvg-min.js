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
!function($){"use strict";var e="$.fn.setupProgressPie",t={};$.fn.setupProgressPie=function(e,t){return $(this).each(function(){var r=$(this).data("$.fn.setupProgressPie");if(t||"object"!=typeof r){var n=$.extend({},$.fn.progressPie.defaults,{update:!0},e);$(this).data("$.fn.setupProgressPie",n)}else $.extend(r,e)}),this},$.fn.progressPie=function(e){function r(e,t){if("number"==typeof e)return e;if(Array.isArray(e)&&e.length>0){if(1===e.length)return e[0];for(var r=t;r>=e.length;)r-=2;return e[r]}return 0}function n(e){return void 0===t[e]&&(t[e]=0),e+ ++t[e]}function o(e){return.02*Math.PI*e}function i(e,t){var r=eval,n=r(e);if("function"==typeof n)return n(t);throw"The value of the colorFunctionAttr attribute is NOT a function: "+e}function a(e){var t=eval,r=t(w+"."+e);if("function"==typeof r||"object"==typeof r&&"function"==typeof r.draw)return r;throw e+" is not the name of a function or object in namespace "+w+"!"}function s(e){var t;if("function"==typeof e||"object"==typeof e&&"function"==typeof e.draw)t=e;else{if("string"!=typeof e)throw"contentPlugin option must either be a function or an object with method named 'draw' or the name of such a function or object in the namespace "+w+"!";t=a(e)}return t}function u(e){return Array.isArray(e)?$.map(e,s):[s(e)]}function l(e,t){return null===e?null:Array.isArray(e)?e[t]:0===t&&"object"==typeof e?e:null}function d(e,t){return.02*Math.PI*e*t}function p(e,t,r,n,o,i){var a=document.createElementNS(R,"animate");a.setAttribute("attributeName",t),a.setAttribute("attributeType",r),a.setAttribute("from",n),a.setAttribute("to",o),a.setAttribute("fill","freeze");for(var s in i)a.setAttribute(s,i[s]);e.appendChild(a)}function c(e,t,r){var n,o;if("number"==typeof t)n=t;else{if("object"!=typeof t)throw"illegal option: 'strokeDashes' is neither number (count) nor object!";n=t.count,o=t.length}if(void 0===n)throw"illegal option: 'strokeDashes' does not specify the 'count' property!";if(void 0===o)o=r/n/2;else if("string"==typeof o){o=o.trim();var i="%"===o.substring(o.length-1);o=Number.parseInt(o,10),i&&(o=r*o/100)}if(o*n>=r)throw"Illegal options: strokeDashCount * strokeDashLength >= circumference, can't set stroke-dasharray!";var a=(r-o*n)/n,s="object"==typeof t&&t.centered?1*o/2:0;"object"==typeof t&&t.inverted?(e.style.strokeDasharray=a+"px, "+o+"px",e.style.strokeDashoffset=a+s+"px"):(e.style.strokeDasharray=o+"px, "+a+"px",0!==s&&(e.style.strokeDashoffset=s+"px"))}function f(e,t,r,n,i,a,s,u,l,f,g,v,h,m,b,y,A,S){"number"==typeof r&&(r=Math.min(r,t)),"number"==typeof u&&(u=Math.min(u,t));var C=-1;if("number"==typeof r&&"number"==typeof u&&r>0&&u>0&&r!==u&&s&&(f===E.RingAlign.CENTER||f===E.RingAlign.INNER)){var P=Math.max(u,r),k=Math.min(u,r);C=f===E.RingAlign.CENTER?t-P/2:t-P+k/2}var M,w,N=!1;if("number"==typeof r){w=document.createElementNS(R,"circle"),w.setAttribute("cx",0),w.setAttribute("cy",0),C>0&&r<u?M=C:(M=t-r/2,s||f!==E.RingAlign.INNER||(M-=u)),w.setAttribute("r",M),w.setAttribute("transform","rotate(-90)"),i&&c(w,i,2*Math.PI*M),N="string"==typeof n;var x=N?n:b;"string"==typeof x&&(w.style.stroke=x),"string"==typeof a&&(w.style.fill=a),w.style.strokeWidth=r,w.setAttribute("class",g),e.appendChild(w)}var O=u||(s||"number"!=typeof r?t:t-r);if(C>0&&u<r?M=C:(M=t-O/2,s||"number"!=typeof r||f!==E.RingAlign.OUTER||(M-=r)),100!==h||A||"string"!=typeof b){if(h>0&&h<100||(A||void 0===b)&&(0===h||100===h)){var I=document.createElementNS(R,"path"),D,T=h;if(A){var B=h-m,F=d(M,B),_=B<0,j,V;_?(T=m,j="0px",V=-F+"px"):(j=F+"px",V="0px");var z=d(M,T);I.setAttribute("stroke-dasharray",z+"px "+z+"px"),I.setAttribute("stroke-dashoffset",j),p(I,"stroke-dashoffset","CSS",j,V,A),l&&0===h&&p(I,"stroke-linecap","CSS","round","butt",A),y&&y!==b&&(p(I,"stroke","CSS",y,b,A),N||(w.style.stroke=y,p(w,"stroke","CSS",y,b,A)))}var U=o(T),W=100===T?-1e-5:Math.sin(U)*M,K=Math.cos(U-Math.PI)*M,L=T>50?"1":"0",G="1",Y=-M,Q="M0,"+Y;if(Q+=" A"+M+","+M+" 0 "+L+",1 "+W+","+K,I.setAttribute("d",Q),I.style.fill="none","string"==typeof b&&(I.style.stroke=b),I.style.strokeWidth=O,I.style.strokeLinecap=l&&h>0?"round":"butt",S){var X=!1===S.clockwise,q="string"==typeof S?S:"string"==typeof S.duration?S.duration:"1s";D=document.createElementNS(R,"animateTransform"),D.setAttribute("attributeName","transform"),D.setAttribute("attributeType","XML"),D.setAttribute("type","rotate"),D.setAttribute("from","0"),D.setAttribute("to",X?"-360":"360"),D.setAttribute("dur",q),D.setAttribute("repeatDur","indefinite"),I.appendChild(D)}I.setAttribute("class",v),e.appendChild(I)}}else{var H=document.createElementNS(R,"circle");H.setAttribute("cx",0),H.setAttribute("cy",0),H.setAttribute("r",M),H.style.stroke=b,H.style.strokeWidth=O,H.style.fill="none",H.setAttribute("class",v),e.appendChild(H)}}function g(e,t){var r;if("string"==typeof t.valueData){if(r=e.data(t.valueData),void 0!==t.valueAttr||void 0!==t.valueSelector)throw"options 'valueData', 'valueAttr' and 'valueSelector' are mutually exclusive, i.e. at least two must be undefined!"}else{if(void 0!==t.valueData)throw"option 'valueData' is not of type 'string'!";if("string"==typeof t.valueAttr){if(r=e.attr(t.valueAttr),void 0!==t.valueSelector)throw"options 'valueAttr' and 'valueSelector' are mutually exclusive, i.e. at least one must be undefined!"}else{if(void 0!==t.valueAttr)throw"option 'valueAttr' is not of type 'string'!";void 0!==t.valueSelector&&(r=$(t.valueSelector,e).text())}}return void 0===r&&(r=e.text()),r}function v(e,t){return Math.max(0,Math.min(100,t.valueAdapter(e)))}function h(e,t){var r=t.mode,n=t.color,o=typeof n;if("undefined"!==o&&"string"!==o&&"function"!==o)throw"option 'color' has to be either a function or a string, but is of type '"+o+"'!";return"function"===o?r=N.USER_COLOR_FUNC:("undefined"===o&&"string"==typeof t.colorAttr&&(n=e.attr(t.colorAttr)),"string"==typeof n?r=N.USER_COLOR_CONST:"string"==typeof t.colorFunctionAttr&&"string"==typeof(n=e.attr(t.colorFunctionAttr))&&(r=N.DATA_ATTR_FUNC)),{mode:r,color:n}}function m(e,t,r){return e===N.CSS?void 0:e===N.MASK?N.MASK.color:e===N.IMASK?N.IMASK.color:e===N.GREY?N.GREY.color:e===N.GREEN?E.colorByPercent(100):e===N.RED?E.colorByPercent(0):e===N.COLOR||void 0===t?E.colorByPercent(r):e===N.USER_COLOR_CONST?t:e===N.USER_COLOR_FUNC?t(r):e===N.DATA_ATTR_FUNC?i(t,r):"black"}function b(e,t,r){return e===N.CSS?void 0:"string"==typeof t.backgroundColor?t.backgroundColor:"function"==typeof t.backgroundColor?t.backgroundColor(r):e===N.IMASK?N.MASK.color:"none"}function y(e,t){return void 0===e.ringWidth||t&&t.fullSize}function A(e,t,n,o,i,a){var s=document.createElementNS(R,"rect");e.appendChild(s);var u=t+r(n,3),l=t+r(n,0),d=u+t+r(n,1),p=l+t+r(n,2);"number"==typeof a&&"none"!==o&&(s.setAttribute("stroke-width",a),d-=a,p-=a,u-=a/2,l-=a/2),s.setAttribute("x","-"+u),s.setAttribute("y","-"+l),s.setAttribute("width",d),s.setAttribute("height",p),s.setAttribute("stroke",o),s.setAttribute("fill",i)}function S(e,t){var r=document.createElementNS(R,"svg"),n=e+t.getPadding(3)+t.getMargin(3),o=e+t.getPadding(0)+t.getMargin(0),i=n+e+t.getPadding(1)+t.getMargin(1),a=o+e+t.getPadding(2)+t.getMargin(2),s=i,u=a;return"number"==typeof t.scale&&(s*=t.scale,u*=t.scale),r.setAttribute("width",Math.ceil(s)),r.setAttribute("height",Math.ceil(u)),r.setAttribute("viewBox","-"+n+" -"+o+" "+i+" "+a),r}function C(e,t,r){var n={};if(n.raw=g(e,t),"function"==typeof t.optionsByRawValue){var o=t.optionsByRawValue(n.raw);void 0!==o&&null!==o&&($.extend(t,o),n.raw=g(e,t))}n.p=v(n.raw,t);var i=0===r?E.prevValueDataName:E.prevInnerValueDataName;if(r>1&&(i+=r),n.prevP=e.data(i),n.isInitialValue=void 0===n.prevP,e.data(i,n.p),"number"!=typeof n.prevP&&(n.prevP=0),"function"==typeof t.optionsByPercent){var a=t.optionsByPercent(n.p);void 0!==a&&null!==a&&($.extend(t,a),n.raw=g(e,t),n.p=v(n.raw,t))}return n}var P={getMargin:function(e){return r(this.margin,e)},getPadding:function(e){return r(this.padding,e)}},k=$.extend({},$.fn.progressPie.defaults,e,P),M=void 0===e,R="http://www.w3.org/2000/svg",w="jQuery.fn.progressPie.contentPlugin",E=$.fn.progressPie,N=$.extend({USER_COLOR_CONST:{},USER_COLOR_FUNC:{},DATA_ATTR_FUNC:{}},E.Mode);return $(this).each(function(){var e=$(this),t=$.extend({},k);if(M){var r=$(this).data("$.fn.setupProgressPie");"object"==typeof r&&(t=$.extend({},r,P))}var o=$("svg",e);if(!o.length||t.update){o.length&&t.update&&(o.remove(),t.separator="");var i=C(e,t,0),a=Math.ceil("number"==typeof t.size?t.size:e.height());0===a&&(a=20),a*=t.sizeFactor;var d=a/2,p=d,c=h(e,t),g=m(c.mode,c.color,i.p),v=b(c.mode,t,i.p),w;(!0===t.animateColor||void 0===t.animateColor&&!i.isInitialValue)&&(w=m(c.mode,c.color,i.prevP));var N=E.smilSupported()?!0===t.animate?E.defaultAnimationAttributes:"object"==typeof t.animate?$.extend({},E.defaultAnimationAttributes,t.animate):null:null,x=null,O=!1;if(t.contentPlugin){x=u(t.contentPlugin);for(var I={color:g,percentValue:i.p,rawValue:i.raw,pieOpts:t},D=0;D<x.length;D++){var T=x[D],B=l(t.contentPluginOptions,D),F=I;null!==B&&"object"==typeof B&&(F=$.extend({},I,B)),"object"==typeof T&&"function"==typeof T.hidesChartIfFullSize&&(O=O||t.mode!==E.Mode.MASK&&t.mode!==E.Mode.IMASK&&y(t,B)&&T.hidesChartIfFullSize(F))}}var _=S(d,t),j=document.createElementNS(R,"defs");c.mode!==E.Mode.CSS&&(_.style.verticalAlign=t.verticalAlign),e.is(":empty")?e.append(_):t.prepend?e.prepend(_,t.separator):e.append(t.separator,_);var V=null,z=_;if(!O){t.mode!==E.Mode.MASK&&t.mode!==E.Mode.IMASK||(z=document.createElementNS(R,"mask"),j.appendChild(z),V=n("pie"),z.setAttribute("id",V),t.mode===E.Mode.IMASK&&A(z,d,t.padding,"none",v));var U=t.cssClassForegroundPie,W=t.cssClassBackgroundCircle;"object"==typeof t.inner&&(U+=" "+t.cssClassOuter,W+=" "+t.cssClassOuter),f(z,d,t.strokeWidth,t.strokeColor,t.strokeDashes,v,t.overlap,t.ringWidth,t.ringEndsRounded,t.ringAlign,W,U,i.p,i.prevP,g,w,N,t.rotation)}for(var K="number"==typeof t.ringWidth?t.ringWidth:"number"==typeof t.strokeWidth?t.strokeWidth:0,L=t.inner,G=0;"object"==typeof L;){G++,void 0===L.valueAdapter&&(L.valueAdapter=E.defaults.valueAdapter),void 0===L.overlap&&(L.overlap=E.defaults.overlap),void 0===L.ringAlign&&(L.ringAlign=t.ringAlign),i=C(e,L,G);var Y=t.cssClassInner;G>1&&(Y+=G),c=h(e,L),d="number"==typeof L.size?L.size*t.sizeFactor/2:.6*d,g=m(c.mode,c.color,i.p),w=null,(!0===L.animateColor||void 0===L.animateColor&&(!0===t.animateColor||void 0===t.animateColor&&i.isInitialValue))&&(w=m(c.mode,c.color,i.prevP)),!1!==L.animate&&E.smilSupported()?!0===L.animate&&null===N?N=E.defaultAnimationAttributes:"object"==typeof L.animate&&(N=null===N?$.extend({},E.defaultAnimationAttributes,L.animate):$.extend({},N,L.animate)):N=null,O||f(z,d,L.strokeWidth,L.strokeColor,L.strokeDashes,v,L.overlap,L.ringWidth,L.ringEndsRounded,L.ringAlign,t.cssClassBackgroundCircle+" "+Y,t.cssClassForegroundPie+" "+Y,i.p,i.prevP,g,w,N),K="number"==typeof L.ringWidth?L.ringWidth:0,L=L.inner}if(null!==x){var Q=d;K<d&&(Q-=K);for(var X={newSvgElement:function(e){var t=document.createElementNS(R,e);return Z.appendChild(t),t},newSvgSubelement:function(e,t){var r=document.createElementNS(R,t);return e.appendChild(r),r},newDefElement:function(e){var t=document.createElementNS(R,e);return j.appendChild(t),t},createId:n,isFullSize:function(){return y(t,this)},getBackgroundRadius:function(e){var t=this.isFullSize()?this.totalRadius:this.radius;if(!e){t-="number"==typeof this.margin?this.margin:this.isFullSize()?this.pieOpts.defaultContentPluginBackgroundMarginFullSize:this.pieOpts.defaultContentPluginBackgroundMarginInsideRing}return t},addBackground:function(e){if(this.backgroundColor){var t=this.newSvgElement("circle");t.setAttribute("cx","0"),t.setAttribute("cy","0"),t.setAttribute("r",e),t.setAttribute("fill",this.backgroundColor)}},addBackgroundRect:function(e,r,n){A(Z,p,t.padding,e,r,n)},getContentPlugin:s,radius:Q,totalRadius:p,color:g,percentValue:i.p,rawValue:i.raw,pieOpts:t},q=!0,H=0;H<x.length;H++){var J=x[H],Z=document.createElementNS(R,"g"),ee="function"==typeof J?J:J.draw,te=X,re=l(t.contentPluginOptions,H);null!==re&&"object"==typeof re&&(te=$.extend({},X,re)),ee(te),"boolean"==typeof J.inBackground&&J.inBackground||"function"==typeof J.inBackground&&J.inBackground(te)?($(_).prepend(Z),null!==V&&q&&(Z.setAttribute("mask","url(#"+V+")"),q=!1)):$(_).append(Z),j.hasChildNodes()&&$(_).prepend(j)}if(null!==V&&q)throw"MASK mode could not be applied since no content plug-in drew a background to be masked! You need do specify at least one content plug-in which draws into the background!"}}}),this},$.fn.progressPie.Mode={GREY:{color:"#888"},RED:{value:200},GREEN:{value:200},COLOR:{},CSS:{},MASK:{color:"white"},IMASK:{color:"black"}},$.fn.progressPie.colorByPercent=function(e,t){var r=$.fn.progressPie.Mode.GREEN.value,n=$.fn.progressPie.Mode.RED.value,o=e>50?r:Math.floor(r*e/50),i=e<50?n:Math.floor(n*(100-e)/50),a=i+","+o+",0";return"number"==typeof t?"rgba("+a+","+t+")":"rgb("+a+")"},$.fn.progressPie.smilSupported=function(){return void 0===$.fn.progressPie.smilSupported.cache&&($.fn.progressPie.smilSupported.cache=/SVGAnimate/.test(document.createElementNS("http://www.w3.org/2000/svg","animate").toString())),$.fn.progressPie.smilSupported.cache},$.fn.progressPie.RingAlign={OUTER:{},CENTER:{},INNER:{}},$.fn.progressPie.defaults={mode:$.fn.progressPie.Mode.GREY,margin:0,padding:0,strokeWidth:2,overlap:!0,ringAlign:$.fn.progressPie.RingAlign.OUTER,prepend:!0,separator:"&nbsp;",verticalAlign:"bottom",update:!1,valueAdapter:function(e){return"string"==typeof e?parseFloat(e):"number"==typeof e?e:0},ringEndsRounded:!1,sizeFactor:1,scale:1,defaultContentPluginBackgroundMarginFullSize:0,defaultContentPluginBackgroundMarginInsideRing:1,cssClassBackgroundCircle:"progresspie-background",cssClassForegroundPie:"progresspie-foreground",cssClassOuter:"progresspie-outer",cssClassInner:"progresspie-inner"},$.fn.progressPie.defaultAnimationAttributes={dur:"1s",calcMode:"spline",keySplines:"0.23 1 0.32 1",keyTimes:"0;1"},$.fn.progressPie.contentPlugin={},$.fn.progressPie.prevValueDataName="_progresspieSVG_prevValue",$.fn.progressPie.prevInnerValueDataName="_progresspieSVG_prevInnerValue"}(jQuery);