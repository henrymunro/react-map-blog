if(!window.AWSC){window.AWSC={}}window.AWSC.stdeltaStartTime=new Date().getTime();if(!window.AWSC){var AWSC={}}AWSC.Clog=(function(){var w=100;var j=[],W=function(){},Q=[],e=[],k=[],z="",a,Z,H=false,f=null;var y=false,K=false,V=false;var i=function m(aj,ad,ai,ag,af,ac,ae){var ah={},ab=M();if(typeof aj==="object"){ah=aj}else{ah.key=aj;if(ad!==undefined){ah.value=ad}if(ai!==undefined){ah.detail=ai}if(af){ah.unit=af}if(ac){ah.metricType=ac}if(ae){ah.logLevel=ae}}if(ah.pageId){ag=ah.pageId}if(!ag){ag=Z}ah.pageId=l(ag,ah.metricType);switch(ah.logLevel){case"INFO":i("INFO",1,undefined,ah.pageId);if(!y){y=true;i("custInfo",1,undefined,ah.pageId)}break;case"WARN":i("WARN",1,undefined,ah.pageId);if(!K){K=true;i("custWarn",1,undefined,ah.pageId)}break;case"FATAL":i("FATAL",1,undefined,ah.pageId);if(!V){V=true;i("custFatal",1,undefined,ah.pageId)}}if(ah.key){if(ab&&ab.key===ah.key&&ab.detail===ah.detail&&ab.pageId===ah.pageId&&ab.unit===ah.unit&&ab.category===ah.category&&ah.value===1){ab.value+=1}else{if(j.length<w){j.push(ah)}}if(W){W()}}else{}},t=function(af,ae,ac,ab){var ad=j.length;i(af,ae,ac,ab);if(j.length>ad){j.unshift(j.pop())}},B=function E(){return j.shift()},T=function X(){return j[0]},M=function h(){return j[j.length-1]},aa=function o(ab){W=ab},G=function U(ab){Z=ab},n=function(){var af=location.pathname.replace(/\//g,"_"),ae=window.location.hash,ab,ad;if(af[0]=="_"){af=af.substr(1)}if(!af){return"_"}else{var ac=af.indexOf("_");af=af.substring(ac+1)}ab=ae.match(/^#?s=(.+)/);if(ab){ad=ab[1];if(ad=="Home"){ad=""}}else{ab=ae.match(/^#?([^:]+):.*/);if(ab){ad=ab[1]}}if(ad){af+="_"+ad}return af},l=function F(ac,ad){var ab;if(typeof ac==="function"){ab=ac(ad)}else{ab=ac}if(ad&&!ab){ab=n()}if(ab){ab=ab.replace(/[^a-zA-Z0-9_]/g,"")}return ab},q=function J(ad,ac,ab){i("jsError",ad,ac,ab);if(!H){i("custJsError",1);H=true}},N=function A(ad,ac,ab){q(1,"MSG:"+ad+" URL:"+ac+" LN:"+ab)},D=function O(ab){if(ab.message){q(1,ab.message)}else{q(1,ab.toString())}},r=function d(ab){z=ab},s=function v(ab){a=ab},p=function C(){if(a){return a}if(z){return z}return""},u=function Y(){if(f===null){var ab=document.querySelector("meta[name='awsc-proxy-request-id']");if(ab){f=ab.getAttribute("content")}else{f=""}}return f};i("clogPing",1);window.onerror=function S(ae,ac,ab){N(ae,ac,ab);for(var ad=0;ad<Q.length;ad++){Q[ad](ae,ac,ab)}return false};window.onerror.sbh=true;var R=function g(ab){Q.push(ab)};window.error=function I(ab){D(ab);for(var ac=0;ac<e.length;ac++){e[ac](ab)}return false};window.error.sbh=true;var L=function b(ab){e.push(ab)};window.onbeforeunload=function P(ac){W(true);var af,ab,ae;for(var ad=0;ad<k.length;ad++){af=k[ad](ac);ab=(typeof ac.returnValue==="string"&&ac.returnValue!=="")?ac.returnValue:undefined;if(af===undefined&&ab){af=ab}if(af!==undefined){ae=af}}if(ae!==undefined){ac.returnValue=ae}return ae};window.onbeforeunload.sbh=true;var x=function c(ab){k.push(ab)};return{log:i,addOnErrorHandler:R,addErrorHandler:L,addOnBeforeUnloadHandler:x,setDefaultEndpoint:r,setEndpointOverride:s,setPageId:G,system:{getEndpoint:p,dequeue:B,curItem:T,onEnqueue:aa,prequeue:t,extractProxyRequestID:u}}})();var AWSCLog=AWSC.Clog;if(window.AWSConsoleMetrics&&window.AWSConsoleMetrics.pageId){AWSC.Clog.setPageId(window.AWSConsoleMetrics.pageId)}(function(){var a=document.getElementById("awsc-alternate-host");if(a){AWSC.Clog.setEndpointOverride("https://"+a.content)}})();(function(){var b=document.getElementById("awsc-mezz-fb"),a=1;if(b){a=(b.content==="0"?0:1)}AWSC.Clog.log("navFb",a)})();if(!window.AWSC){var AWSC={}}if(typeof XMLHttpRequest=="undefined"){XMLHttpRequest=function(){try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(a){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(a){}try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(a){}throw new Error("This browser does not support XMLHttpRequest.")}}AWSC.CustomEvents={customListeners:{},resetCustomListeners:function(a){if(a){this.customListeners[a]=[]}else{this.customListeners={}}},getCustomListeners:function(a){var b=this.customListeners[a];if(!b){b=[];this.customListeners[a]=b}return b},addCustomListener:function(a,b){this.getCustomListeners(a).push(b)},fireCustomEvent:function(b,a){var d=this.getCustomListeners(b);for(var c=0;c<d.length;c+=1){try{d[c].apply(null,a)}catch(f){}}}};AWSC.XhrEvents={addBeforeXhrOpenListener:function(a){AWSC.CustomEvents.addCustomListener("beforexhropen",a)},addAfterXhrDoneListener:function(a){AWSC.CustomEvents.addCustomListener("afterxhrdone",a)},fireBeforeXhrOpen:function(a){AWSC.CustomEvents.fireCustomEvent("beforexhropen",arguments)},fireAfterXhrDone:function(){AWSC.CustomEvents.fireCustomEvent("afterxhrdone",arguments)},resetXhrListeners:function(){AWSC.CustomEvents.resetCustomListeners("beforexhropen");AWSC.CustomEvents.resetCustomListeners("afterxhrdone")},init:function(){var a=XMLHttpRequest.prototype;if(!a){return}if(a.extendxhr){return}a.extendxhr=true;a.callAfterDone=function(){if(this.readyState===4){AWSXhrEvents.fireAfterXhrDone(this)}};a.originalOpen=a.open;a.open=function(){var b=this;var c=Array.prototype.slice.apply(arguments);b.urlcalled=c[1];AWSC.XhrEvents.fireBeforeXhrOpen(b);if(b.addEventListener){b.addEventListener("readystatechange",a.callAfterDone,false)}else{if(window.attachEvent){b.oldOnreadystatechange=b.onreadystatechange;b.onreadystatechange=function(){if(b.oldOnreadystatechange){var d=Array.prototype.slice.apply(arguments);b.oldOnreadystatechange.apply(b,c)}b.callAfterDone()}}}a.originalOpen.apply(b,c)}}};AWSC.XhrEvents.init();var AWSCustomEvents=AWSC.CustomEvents;var AWSXhrEvents=AWSC.XhrEvents;if(!window.AWSC){AWSC={}}AWSC.Timer=(function(){var B={},q=window.AWSC.XhrEvents,b={},f=true,c=0,E=0,v=100,y=false,z=false,F,l,u={},G={},i={},H=function(){},j;if(window.performance){j=window.performance.timing}else{j={}}var t={navigationStart:j.navigationStart,unloadEventStart:j.unloadEventStart,unloadEventEnd:j.unloadEventEnd,redirectStart:j.redirectStart,redirectEnd:j.redirectEnd,fetchStart:j.fetchStart,domainLookupStart:j.domainLookupStart,domainLookupEnd:j.domainLookupEnd,connectStart:j.connectStart,connectEnd:j.connectEnd,secureConnectionStart:j.secureConnectionStart,requestStart:j.requestStart,responseStart:j.responseStart,responseEnd:j.responseEnd,domLoading:j.domLoading,domInteractive:j.domInteractive,domContentLoadedEventStart:j.domContentLoadedEventStart,domContentLoadedEventEnd:j.domContentLoadedEventEnd,domComplete:j.domComplete,loadEventStart:j.loadEventStart,loadEventEnd:j.loadEventEnd,redirectCount:j.redirectCount};if(window.AWSC.Clog&&AWSC.Clog.log){F=AWSC.Clog.log}else{F=H}var C=Date.now?Date.now:function(){return new Date().getTime()};if(window.performance){B.clickTime=window.performance.timing.navigationStart;B.startTime=window.performance.timing.responseStart}else{if(window.AWSConsoleMetrics){B=window.AWSConsoleMetrics}}var s=1406876400000;if(!B.startTime||B.startTime<s){B.startTime=C();B.clickTime=0;l=1}else{l=0}F("fst",l);AWSC.startTime=B.startTime;AWSC.clickTime=B.clickTime;var g=function(O,M,N){F(M,N,"","","ms",O)};var m=function(M,N){g("pageload",M,N-B.startTime)};m("initialLoad",C());var I=function(M,N){if(B.clickTime!=0){g("pageload",M,N-B.clickTime)}};var J=function(M,N){g("custom",M,N)};var d=function(M){b[M]=C()};var r=function(M){var O=C(),N=b[M];if(N){delete b[M];J(M,O-N)}};var w=function(M){delete b[M]};var e=function(M,N){J(M,parseInt(N,10))};var L=function(M){if(typeof M!=="object"){throw new Error("Invalid argument.")}if(!M.hasOwnProperty("metricName")){throw new Error("Must have a metricName in the argument object")}var N=M.metricName;if(!M.hasOwnProperty("events")||(M.events.length<1)){throw new Error('setMetricEvents requires at least one event in "events" array')}var P=M.events;if(N in G){throw new Error(N+" events may not be set more than once per page load")}i[N]=false;if(M.startTime==="click"){if(B.clickTime!==0){i[N]=true}else{delete i[N];return}}G[N]=true;u[N]={};for(var O=0;O<P.length;O++){u[N][P[O]]=false}};var x=function(M){if(u.hasOwnProperty(M)){for(var N in u[M]){if(u[M][N]===false){return false}}return true}};var a=function(M){var O=C();if(M&&u){for(var N in u){if(u[N].hasOwnProperty(M)){if(u[N][M]===false){u[N][M]=true;if(x(N)){if(i[N]){I(N,O)}else{m(N,O)}if(N==="customerReady"){z=true}delete u[N];delete i[N]}}}}}};var K=function(N,M){L({metricName:"customerReady",events:N});L({metricName:"clickToCustomerReady",startTime:"click",events:N})};var o=function(M){if(M){a(M)}else{if(!z){z=true;var N=C();m("customerReady",N);m("customerReadyPageTransition",N);I("clickToCustomerReady",N)}else{r("pageTransition");r("customerReadyPageTransition")}}};var D=function(N){if(!N.urlcalled){return false}var M=/feedback\/custsat\/1\/popquestion/;return M.test(N.urlcalled)};var h=function(M){if(!D(M)){c++;if(f){f=false;m("pageReady",C())}}};var k=function(N){if(!D(N)){var M;c--;if(c===0){M=C();E=M;setTimeout(function(){p(M)},v)}}};var p=function(M){if(c===0&&M===E&&!y){g("pageload","loadFinished",E-B.startTime);A();y=true}};var A=function A(){if(!window.performance){return}var N=j.navigationStart;for(var M in t){if(t.hasOwnProperty(M)){if(t[M]){F(M,t[M]-N,"","","ms")}else{setTimeout(function(){if(t[M]){F(M,t[M]-N,"","","ms")}},2000)}}}};var n=function(){d("pageTransition");d("customerReadyPageTransition")};q.addBeforeXhrOpenListener(h);q.addAfterXhrDoneListener(k);window.addEventListener("hashchange",n);return{start:d,stop:r,submitCustomTimer:e,discardTimer:w,isInitialLoadPending:false,metricEvent:a,setMetricEvents:L,customerReady:o,hasPageTransition:true,setCustomerReadyEvents:K,initialLoadFlag:false}})();var metricsTimer=AWSC.Timer;(function(){if(AWSC.XhrEvents&&AWSC.Clog){var a=function a(c){c.startTime=new Date().getTime()},b=function b(d){var c=(new Date().getTime())-d.startTime;AWSC.Clog.log({key:"ajaxStatus"+d.status,value:c,unit:"ms"})};AWSC.XhrEvents.addBeforeXhrOpenListener(a);AWSC.XhrEvents.addAfterXhrDoneListener(b)}})();