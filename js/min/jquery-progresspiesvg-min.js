"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};/**
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
!function($){function e(e){var t=e.valueInput;if("object"===(void 0===t?"undefined":_typeof(t))){if("function"==typeof t.val)return t;throw new Error("option 'valueInput' is an object, but does not have a 'val' method, i.e. it's obviously not a jQuery result object.")}return"string"==typeof t?$(t):null}var t={};$.fn.setupProgressPie=function(t,r){var n=this;$(this).each(function(){var e=$(this).data($.fn.setupProgressPie.dataKey);if(r||"object"!==(void 0===e?"undefined":_typeof(e))){var n=$.extend({},$.fn.progressPie.defaults,{update:!0},t);$(this).data($.fn.setupProgressPie.dataKey,n)}else $.extend(e,t)});var o=$.extend({},$.fn.progressPie.defaults,t),i=e(o);if(null!==i){if("string"!=typeof o.valueInputEvents)throw new Error("'valueInputEvents' has to be a string (space-separated list of event names)!");i.on(o.valueInputEvents,function(){$(n).progressPie()})}return this},$.fn.setupProgressPie.dataKey="$.fn.setupProgressPie",$.fn.progressPie=function(r){function n(e,t){if("number"==typeof e)return e;if(Array.isArray(e)&&e.length>0){if(1===e.length)return e[0];for(var r=t;r>=e.length;)r-=2;return e[r]}return 0}function o(e){return void 0===t[e]&&(t[e]=0),e+ ++t[e]}function i(e,t){var r=e.getAttribute("class");"string"!=typeof r?r=t:r+=" "+t,e.setAttribute("class",r)}function a(e){return.02*Math.PI*e}function s(e,t){var r=eval,n=r(e);if("function"==typeof n)return n(t);throw new Error("The value of the colorFunctionAttr attribute is NOT a function: "+e)}function u(e){var t=eval,r=t(j+"."+e);if("function"==typeof r||"object"===(void 0===r?"undefined":_typeof(r))&&"function"==typeof r.draw)return r;throw new Error(e+" is not the name of a function or object in namespace "+j+"!")}function l(e){var t;if("function"==typeof e||"object"===(void 0===e?"undefined":_typeof(e))&&"function"==typeof e.draw)t=e;else{if("string"!=typeof e)throw new Error("contentPlugin option must either be a function or an object with method named 'draw' or the name of such a function or object in the namespace "+j+"!");t=u(e)}return t}function d(e){return Array.isArray(e)?$.map(e,l):[l(e)]}function f(e,t){return null===e?null:Array.isArray(e)?e[t]:0===t&&"object"===(void 0===e?"undefined":_typeof(e))?e:null}function p(e,t){return.02*Math.PI*e*t}function c(e,t,r,n,o){var a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"1s",s=$(e),u=s.css("transition");"string"!=typeof u&&(u=""),u.length>0&&(u+=", "),s.css("transition",u+" "+t+" "+a+" cubic-bezier(0.23, 1, 0.32, 1)");var l=$(e).data("transitions");l||(l=[],$(e).data("transitions",l)),l.push([t,o]),i(e,B)}function g(e){var t=$(e).data("transitions");if(t)for(var r in t){var n=t[r];window.getComputedStyle(e),e.setAttribute(n[0],n[1])}}function v(e){var t=$(e);t.is("."+B)&&window.requestAnimationFrame(function(){g(e),t.removeClass(B)},0)}function h(){return K||(K=new MutationObserver(function(e){for(var t=0,r=e.length,n,o;t<r;t++)if(n=e[t],o=n.addedNodes)for(var i=0,a=o.length;i<a;i++)v(o[i])})),K}function m(e,t,r,n,o,i){var a=document.createElementNS(D,"animate");a.setAttribute("attributeName",t),a.setAttribute("attributeType",r),a.setAttribute("from",n),a.setAttribute("to",o),a.setAttribute("fill","freeze");for(var s in i)a.setAttribute(s,i[s]);e.appendChild(a)}function y(e,t,r,n,o,i){if("object"===(void 0===i?"undefined":_typeof(i))){m(e,t,r,n,o,$.extend({},F.defaultAnimationAttributes,i))}else"string"==typeof i?c(e,t,r,n,o,i):!0===i&&c(e,t,r,n,o)}function b(e,t,r){var n,o;if("number"==typeof t)n=t;else{if("object"!==(void 0===t?"undefined":_typeof(t)))throw new Error("illegal option: 'strokeDashes' is neither number (count) nor object!");n=t.count,o=t.length}if(void 0===n)throw new Error("illegal option: 'strokeDashes' does not specify the 'count' property!");if(void 0===o)o=r/n/2;else if("string"==typeof o){o=o.trim();var i="%"===o.substring(o.length-1);o=Number.parseInt(o,10),i&&(o=r*o/100)}if(o*n>=r)throw new Error("Illegal options: strokeDashCount * strokeDashLength >= circumference, can't set stroke-dasharray!");var a=(r-o*n)/n,s="object"===(void 0===t?"undefined":_typeof(t))&&t.centered?1*o/2:0;"object"===(void 0===t?"undefined":_typeof(t))&&t.inverted?(e.style.strokeDasharray=a+"px, "+o+"px",e.style.strokeDashoffset=a+s+"px"):(e.style.strokeDasharray=o+"px, "+a+"px",0!==s&&(e.style.strokeDashoffset=s+"px"))}function A(e,t){if("string"==typeof t){var r=document.createElementNS(D,"title");$(r).text(t),e.appendChild(r)}}function S(e,t,r,n,o,s,u,l,d,f,c,g,v,h,m,S,C,w,P,E){"number"==typeof n&&(n=Math.min(n,r)),"number"==typeof d&&(d=Math.min(d,r));var k=-1;if("number"==typeof n&&"number"==typeof d&&n>0&&d>0&&n!==d&&l&&(c===F.RingAlign.CENTER||c===F.RingAlign.INNER)){var M=Math.max(d,n),R=Math.min(d,n);k=c===F.RingAlign.CENTER?r-M/2:r-M+R/2}var N,_,x=!1;if("number"==typeof n){_=document.createElementNS(D,"circle"),_.setAttribute("cx",0),_.setAttribute("cy",0),k>0&&n<d?N=k:(N=r-n/2,l||c!==F.RingAlign.INNER||(N-=d)),_.setAttribute("r",N),_.setAttribute("transform","rotate(-90)"),s&&b(_,s,2*Math.PI*N),x="string"==typeof o;var I=x?o:S;"string"==typeof I&&_.setAttribute("stroke",I),"string"==typeof u&&_.setAttribute("fill",u),_.setAttribute("stroke-width",n),i(_,g),A(_,w),e.appendChild(_)}var O=d||(l||"number"!=typeof n?r:r-n);if(k>0&&d<n?N=k:(N=r-O/2,l||"number"!=typeof n||c!==F.RingAlign.OUTER||(N-=n)),100!==h||P||"string"!=typeof S){if(h>0&&h<100||(P||void 0===S)&&(0===h||100===h)){var j=document.createElementNS(D,"path"),T=h;if(P){var B=h-m,K=p(N,B),V=B<0,z,U;V?(T=m,z="0px",U=-K+"px"):(z=K+"px",U="0px");var W=p(N,T);j.setAttribute("stroke-dasharray",W+"px "+W+"px"),j.setAttribute("stroke-dashoffset",z),y(j,"stroke-dashoffset","CSS",z,U,P),f&&0===h&&y(j,"stroke-linecap","CSS","round","butt",P),C&&C!==S&&(y(j,"stroke","CSS",C,S,P),!x&&_&&(_.setAttribute("stroke",C),y(_,"stroke","CSS",C,S,P)))}var G=a(T),L=100===T?-1e-5:Math.sin(G)*N,Y=Math.cos(G-Math.PI)*N,Q=T>50?"1":"0",q="1",H=-N,J="M0,"+H;if(J+=" A"+N+","+N+" 0 "+Q+",1 "+L+","+Y,j.setAttribute("d",J),j.setAttribute("fill","none"),C?j.setAttribute("stroke",C):"string"==typeof S&&j.setAttribute("stroke",S),j.setAttribute("stroke-width",O),j.setAttribute("stroke-linecap",f&&h>0?"round":"butt"),E){var X="progresspie-rotation-style",Z="progresspie-rotate",ee="@keyframes "+Z+" {100% {transform: rotate(360deg);}}";if(!$("#"+X).length){var te=$("head");if(te.length){var re=document.createElement("style");re.id=X,$(re).text(ee),te.get(0).appendChild(re)}else{var ne=document.createElementNS(D,"style");ne.id=X,$(ne).text(ee),t.appendChild(ne)}}var oe=!1===E.clockwise,ie="string"==typeof E?E:"string"==typeof E.duration?E.duration:"1s",ae="string"==typeof E.timing?E.timing:"linear";j.style.animation=Z+" "+ie+" "+ae+(oe?" reverse":"")+" infinite"}i(j,v),A(j,w),e.appendChild(j)}}else{var se=document.createElementNS(D,"circle");se.setAttribute("cx",0),se.setAttribute("cy",0),se.setAttribute("r",N),se.setAttribute("stroke",S),se.setAttribute("stroke-width",O),se.setAttribute("fill","none"),i(se,v),A(se,w),e.appendChild(se)}}function C(t,r){var n,o=e(r);if(null!==o){if(n=o.val(),void 0!==r.valueData||void 0!==r.valueAttr||void 0!==r.valueSelector)throw new Error("options 'valueInput', 'valueData', 'valueAttr' and 'valueSelector' are mutually exclusive, i.e. at least three must be undefined!")}else if("string"==typeof r.valueData){if(n=t.data(r.valueData),void 0!==r.valueAttr||void 0!==r.valueSelector)throw new Error("options 'valueData', 'valueAttr' and 'valueSelector' are mutually exclusive, i.e. at least two must be undefined!")}else{if(void 0!==r.valueData)throw new Error("option 'valueData' is not of type 'string'!");if("string"==typeof r.valueAttr){if(n=t.attr(r.valueAttr),void 0!==r.valueSelector)throw new Error("options 'valueAttr' and 'valueSelector' are mutually exclusive, i.e. at least one must be undefined!")}else{if(void 0!==r.valueAttr)throw new Error("option 'valueAttr' is not of type 'string'!");void 0!==r.valueSelector&&(n=$(r.valueSelector,t).text())}}return void 0===n&&(n=t.text()),n}function w(e,t){return Math.max(0,Math.min(100,t.valueAdapter(e)))}function P(e,t){var r=t.mode,n=t.color,o=void 0===n?"undefined":_typeof(n);if("undefined"!==o&&"string"!==o&&"function"!==o)throw new Error("option 'color' has to be either a function or a string, but is of type '"+o+"'!");return"function"===o?r=T.USER_COLOR_FUNC:("undefined"===o&&"string"==typeof t.colorAttr&&(n=e.attr(t.colorAttr)),"string"==typeof n?r=T.USER_COLOR_CONST:"string"==typeof t.colorFunctionAttr&&"string"==typeof(n=e.attr(t.colorFunctionAttr))&&(r=T.DATA_ATTR_FUNC)),{mode:r,color:n}}function E(e,t,r){return e===T.CSS?void 0:e===T.MASK?T.MASK.color:e===T.IMASK?T.IMASK.color:e===T.GREY?T.GREY.color:e===T.GREEN?F.colorByPercent(100):e===T.RED?F.colorByPercent(0):e===T.COLOR||void 0===t?F.colorByPercent(r):e===T.USER_COLOR_CONST?t:e===T.USER_COLOR_FUNC?t(r):e===T.DATA_ATTR_FUNC?s(t,r):"black"}function k(e,t,r){return e===T.CSS?void 0:"string"==typeof t.backgroundColor?t.backgroundColor:"function"==typeof t.backgroundColor?t.backgroundColor(r):e===T.IMASK?T.MASK.color:"none"}function M(e,t){return void 0===e.ringWidth||t&&t.fullSize}function R(e,t,r,o,i,a){var s=document.createElementNS(D,"rect");e.appendChild(s);var u=t+n(r,3),l=t+n(r,0),d=u+t+n(r,1),f=l+t+n(r,2);"number"==typeof a&&"none"!==o&&(s.setAttribute("stroke-width",a),d-=a,f-=a,u-=a/2,l-=a/2),s.setAttribute("x","-"+u),s.setAttribute("y","-"+l),s.setAttribute("width",d),s.setAttribute("height",f),s.setAttribute("stroke",o),s.setAttribute("fill",i)}function N(e,t){var r=document.createElementNS(D,"svg"),n=e+t.getPadding(3)+t.getMargin(3),o=e+t.getPadding(0)+t.getMargin(0),i=n+e+t.getPadding(1)+t.getMargin(1),a=o+e+t.getPadding(2)+t.getMargin(2),s=i,u=a;return"number"==typeof t.scale&&(s*=t.scale,u*=t.scale),r.setAttribute("width",Math.ceil(s)),r.setAttribute("height",Math.ceil(u)),r.setAttribute("viewBox","-"+n+" -"+o+" "+i+" "+a),r}function _(e,t,r){var n={};if(n.raw=C(e,t),"function"==typeof t.optionsByRawValue){var o=t.optionsByRawValue(n.raw);void 0!==o&&null!==o&&($.extend(t,o),n.raw=C(e,t))}n.p=w(n.raw,t);var i=0===r?F.prevValueDataName:F.prevInnerValueDataName;if(r>1&&(i+=r),n.prevP=e.data(i),n.isInitialValue=void 0===n.prevP,e.data(i,n.p),"number"!=typeof n.prevP&&(n.prevP=0),"function"==typeof t.optionsByPercent){var a=t.optionsByPercent(n.p);void 0!==a&&null!==a&&($.extend(t,a),n.raw=C(e,t),n.p=w(n.raw,t))}return n}var x={getMargin:function e(t){return n(this.margin,t)},getPadding:function e(t){return n(this.padding,t)}},I=$.extend({},$.fn.progressPie.defaults,r,x),O=void 0===r,D="http://www.w3.org/2000/svg",j="jQuery.fn.progressPie.contentPlugin",F=$.fn.progressPie,T=$.extend({USER_COLOR_CONST:{},USER_COLOR_FUNC:{},DATA_ATTR_FUNC:{}},F.Mode),B="autoTransitionPending",K;return $(this).each(function(){var e=$(this),t=$.extend({},I);if(O){var r=$(this).data($.fn.setupProgressPie.dataKey);"object"===(void 0===r?"undefined":_typeof(r))&&(t=$.extend({},r,x))}var n=$("svg",e);if(!n.length||t.update){n.length&&t.update&&(n.remove(),t.separator="");var i=_(e,t,0),a=Math.ceil("number"==typeof t.size?t.size:e.height());0===a&&(a=20),a*=t.sizeFactor;var s=a/2,u=s,p=P(e,t),c=E(p.mode,p.color,i.p),g=k(p.mode,t,i.p),v;(!0===t.animateColor||void 0===t.animateColor&&!i.isInitialValue)&&(v=E(p.mode,p.color,i.prevP));var m=t.animate;"object"!==(void 0===m?"undefined":_typeof(m))||F.smilSupported()||(m="string"!=typeof m.dur||m.dur);var y=null,b=!1;if(t.contentPlugin){y=d(t.contentPlugin);for(var C={color:c,percentValue:i.p,rawValue:i.raw,pieOpts:t},w=0;w<y.length;w++){var j=y[w],T=f(t.contentPluginOptions,w),B=C;null!==T&&"object"===(void 0===T?"undefined":_typeof(T))&&(B=$.extend({},C,T)),"object"===(void 0===j?"undefined":_typeof(j))&&"function"==typeof j.hidesChartIfFullSize&&(b=b||t.mode!==F.Mode.MASK&&t.mode!==F.Mode.IMASK&&M(t,T)&&j.hidesChartIfFullSize(B))}}var K=N(s,t),V=document.createElementNS(D,"defs");p.mode!==F.Mode.CSS&&(K.style.verticalAlign=t.verticalAlign),e.is(":empty")?e.append(K):t.prepend?e.prepend(K,t.separator):e.append(t.separator,K),m&&"object"!==(void 0===m?"undefined":_typeof(m))&&h().observe(K,{childList:!0}),A(K,t.globalTitle);var z=null,U=K;if(!b){t.mode!==F.Mode.MASK&&t.mode!==F.Mode.IMASK||(U=document.createElementNS(D,"mask"),V.appendChild(U),z=o("pie"),U.setAttribute("id",z),t.mode===F.Mode.IMASK&&R(U,s,t.padding,"none",g));var W=t.cssClassForegroundPie,G=t.cssClassBackgroundCircle;"object"===_typeof(t.inner)&&(W+=" "+t.cssClassOuter,G+=" "+t.cssClassOuter),S(U,V,s,t.strokeWidth,t.strokeColor,t.strokeDashes,g,t.overlap,t.ringWidth,t.ringEndsRounded,t.ringAlign,G,W,i.p,i.prevP,c,v,t.title,m,t.rotation)}for(var L="number"==typeof t.ringWidth?t.ringWidth:"number"==typeof t.strokeWidth?t.strokeWidth:0,Y=t.inner,Q=0;"object"===(void 0===Y?"undefined":_typeof(Y));){Q++,Y=$.extend({},Y),void 0===Y.valueAdapter&&(Y.valueAdapter=F.defaults.valueAdapter),void 0===Y.overlap&&(Y.overlap=F.defaults.overlap),void 0===Y.ringAlign&&(Y.ringAlign=t.ringAlign);var q=_(e,Y,Q),H=t.cssClassInner;Q>1&&(H+=Q),p=P(e,Y),s="number"==typeof Y.size?Y.size*t.sizeFactor/2:.6*s;var J=E(p.mode,p.color,q.p),X=null;(!0===Y.animateColor||void 0===Y.animateColor&&(!0===t.animateColor||void 0===t.animateColor&&q.isInitialValue))&&(X=E(p.mode,p.color,q.prevP)),void 0!==Y.animate&&(m=Y.animate),"object"!==(void 0===m?"undefined":_typeof(m))||F.smilSupported()||(m="string"!=typeof m.dur||m.dur),b||S(U,V,s,Y.strokeWidth,Y.strokeColor,Y.strokeDashes,g,Y.overlap,Y.ringWidth,Y.ringEndsRounded,Y.ringAlign,t.cssClassBackgroundCircle+" "+H,t.cssClassForegroundPie+" "+H,q.p,q.prevP,J,X,Y.title,m,Y.rotation),L="number"==typeof Y.ringWidth?Y.ringWidth:0,Y=Y.inner}if(null!==y){var Z=s;L<s&&(Z-=L);for(var ee={newSvgElement:function e(t){var r=document.createElementNS(D,t);return oe.appendChild(r),r},newSvgSubelement:function e(t,r){var n=document.createElementNS(D,r);return t.appendChild(n),n},newDefElement:function e(t){var r=document.createElementNS(D,t);return V.appendChild(r),r},createId:o,isFullSize:function e(){return M(t,this)},getBackgroundRadius:function e(t){var r=this.isFullSize()?this.totalRadius:this.radius;if(!t){r-="number"==typeof this.margin?this.margin:this.isFullSize()?this.pieOpts.defaultContentPluginBackgroundMarginFullSize:this.pieOpts.defaultContentPluginBackgroundMarginInsideRing}return r},addBackground:function e(t){if(this.backgroundColor){var r=this.newSvgElement("circle");r.setAttribute("cx","0"),r.setAttribute("cy","0"),r.setAttribute("r",t),r.setAttribute("fill",this.backgroundColor)}},addBackgroundRect:function e(r,n,o){R(oe,u,t.padding,r,n,o)},getContentPlugin:l,radius:Z,totalRadius:u,color:c,percentValue:i.p,rawValue:i.raw,pieOpts:t},te=!0,re=0;re<y.length;re++){var ne=y[re],oe=document.createElementNS(D,"g"),ie="function"==typeof ne?ne:ne.draw,ae=ee,se=f(t.contentPluginOptions,re);null!==se&&"object"===(void 0===se?"undefined":_typeof(se))&&(ae=$.extend({},ee,se)),ie(ae),"boolean"==typeof ne.inBackground&&ne.inBackground||"function"==typeof ne.inBackground&&ne.inBackground(ae)?($(K).prepend(oe),null!==z&&te&&(oe.setAttribute("mask","url(#"+z+")"),te=!1)):$(K).append(oe)}if(null!==z&&te)throw new Error("MASK mode could not be applied since no content plug-in drew a background to be masked! You need do specify at least one content plug-in which draws into the background!")}V.hasChildNodes()&&$(K).prepend(V)}}),this},$.fn.progressPie.Mode={GREY:{color:"#888"},RED:{value:200},GREEN:{value:200},COLOR:{},CSS:{},MASK:{color:"white"},IMASK:{color:"black"}},$.fn.progressPie.colorByPercent=function(e,t){var r=$.fn.progressPie.Mode.GREEN.value,n=$.fn.progressPie.Mode.RED.value,o=e>50?r:Math.floor(r*e/50),i=e<50?n:Math.floor(n*(100-e)/50),a=i+","+o+",0";return"number"==typeof t?"rgba("+a+","+t+")":"rgb("+a+")"},$.fn.progressPie.smilSupported=function(){return void 0===$.fn.progressPie.smilSupported.cache&&($.fn.progressPie.smilSupported.cache=/SVGAnimate/.test(document.createElementNS("http://www.w3.org/2000/svg","animate").toString())),$.fn.progressPie.smilSupported.cache},$.fn.progressPie.RingAlign={OUTER:{},CENTER:{},INNER:{}},$.fn.progressPie.defaults={mode:$.fn.progressPie.Mode.GREY,margin:0,padding:0,strokeWidth:2,overlap:!0,ringAlign:$.fn.progressPie.RingAlign.OUTER,prepend:!0,separator:"&nbsp;",verticalAlign:"bottom",update:!1,valueAdapter:function e(t){return"string"==typeof t?parseFloat(t):"number"==typeof t?t:0},valueInputEvents:"change",ringEndsRounded:!1,sizeFactor:1,scale:1,defaultContentPluginBackgroundMarginFullSize:0,defaultContentPluginBackgroundMarginInsideRing:1,cssClassBackgroundCircle:"progresspie-background",cssClassForegroundPie:"progresspie-foreground",cssClassOuter:"progresspie-outer",cssClassInner:"progresspie-inner"},$.fn.progressPie.defaultAnimationAttributes={dur:"1s",calcMode:"spline",keySplines:"0.23 1 0.32 1",keyTimes:"0;1"},$.fn.progressPie.contentPlugin={},$.fn.progressPie.prevValueDataName="_progresspieSVG_prevValue",$.fn.progressPie.prevInnerValueDataName="_progresspieSVG_prevInnerValue"}(jQuery);