function debounce(e,t,n){var r;return function(){var n=this,o=arguments,a=function(){r=null,e.apply(n,o)};clearTimeout(r),r=setTimeout(a,t)}}function include(e,t,n){var r=window.innerWidth,o=e,a=e,c=0,i=0;for(n&&(i=n.length);c<i;)r>n[c]&&(a=o+"."+n[c]+".html"),c++;var u=document.querySelector("script[jm-name="+t+"]:not(.accounted)");if(u.style.display="block",u.style.height="20px",u.hasAttribute("jm-lazy")){var s=u.getAttribute("jm-lazy")||100,d=window.innerHeight,l=u.getBoundingClientRect().top-d-s;window.addEventListener("scroll",function f(e){if(l=u.getBoundingClientRect().top-d-s,l<=0){window.removeEventListener("scroll",f);var t=new XMLHttpRequest;t.onreadystatechange=function(){4==t.readyState&&200==t.status&&bob(u,t.responseText,a)},t.open("GET",a,!0),t.send()}})}else{var p=new XMLHttpRequest;p.onreadystatechange=function(){4==p.readyState&&200==p.status&&bob(u,p.responseText,a)},p.open("GET",a,!0),p.send()}}function scriptCheck(){var e=document.querySelectorAll("script:not(.accounted)");e.forEach(function(e){e.classList.add("accounted")})}function scriptAdd(e){var t=document.querySelectorAll("script:not(.accounted)");t.forEach(function(t){var n=document.createElement("SCRIPT");n.innerHTML=t.innerHTML,t.hasAttribute("src")&&n.setAttribute("src",t.getAttribute("src")),n.setAttribute("data-jxy-injected-script-from",e),document.head.appendChild(n)})}function bob(e,t,n){if(e.hasAttribute("jm-data")){var r=e.getAttribute("jm-data"),o=new XMLHttpRequest;o.onreadystatechange=function(){if(4==o.readyState&&200==o.status){var r=doT.template(t);t=r(JSON.parse(o.responseText)),scriptCheck(),e.outerHTML=t,scriptAdd(n),debounceClassName()}},o.open("GET",r,!0),o.send()}else scriptCheck(),e.outerHTML=t,scriptAdd(n),debounceClassName()}function fullReplace(e){var t=new XMLHttpRequest;t.onreadystatechange=function(){if(4==t.readyState&&200==t.status){document.documentElement.innerHTML=t.responseText;var e=document.querySelectorAll("script:not([src$='jxy.js']):not([src$='jxy.min.js'])");e.forEach(function(e){var t=document.createElement("SCRIPT");t.innerHTML=e.innerHTML,e.hasAttribute("src")&&t.setAttribute("src",e.getAttribute("src")),document.head.appendChild(t)})}},t.open("GET",e,!0),t.send()}!function(){"use strict";function e(t,n,r){return("string"==typeof n?n:n.toString()).replace(t.define||a,function(e,n,o,a){return 0===n.indexOf("def.")&&(n=n.substring(4)),n in r||(":"===o?(t.defineParams&&a.replace(t.defineParams,function(e,t,o){r[n]={arg:t,text:o}}),n in r||(r[n]=a)):new Function("def","def['"+n+"']="+a)(r)),""}).replace(t.use||a,function(n,o){t.useParams&&(o=o.replace(t.useParams,function(e,t,n,o){if(r[n]&&r[n].arg&&o){var a=(n+":"+o).replace(/'|\\/g,"_");return r.__exp=r.__exp||{},r.__exp[a]=r[n].text.replace(new RegExp("(^|[^\\w$])"+r[n].arg+"([^\\w$])","g"),"$1"+o+"$2"),t+"def.__exp['"+a+"']"}}));var a=new Function("def","return "+o)(r);return a?e(t,a,r):a})}function t(e){return e.replace(/\\('|\\)/g,"$1").replace(/[\r\t\n]/g," ")}var n,r={name:"doT",version:"1.1.1",templateSettings:{evaluate:/\{\{([\s\S]+?(\}?)+)\}\}/g,interpolate:/\{\{=([\s\S]+?)\}\}/g,encode:/\{\{!([\s\S]+?)\}\}/g,use:/\{\{#([\s\S]+?)\}\}/g,useParams:/(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,define:/\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,defineParams:/^\s*([\w$]+):([\s\S]+)/,conditional:/\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,iterate:/\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,varname:"it",strip:!0,append:!0,selfcontained:!1,doNotSkipEncoded:!1},template:void 0,compile:void 0,log:!0};r.encodeHTMLSource=function(e){var t={"&":"&#38;","<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","/":"&#47;"},n=e?/[&<>"'\/]/g:/&(?!#?\w+;)|<|>|"|'|\//g;return function(e){return e?e.toString().replace(n,function(e){return t[e]||e}):""}},n=function(){return this||(0,eval)("this")}(),"undefined"!=typeof module&&module.exports?module.exports=r:"function"==typeof define&&define.amd?define(function(){return r}):n.doT=r;var o={append:{start:"'+(",end:")+'",startencode:"'+encodeHTML("},split:{start:"';out+=(",end:");out+='",startencode:"';out+=encodeHTML("}},a=/$^/;r.template=function(c,i,u){i=i||r.templateSettings;var s,d,l=i.append?o.append:o.split,p=0,f=i.use||i.define?e(i,c,u||{}):c;f=("var out='"+(i.strip?f.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g," ").replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g,""):f).replace(/'|\\/g,"\\$&").replace(i.interpolate||a,function(e,n){return l.start+t(n)+l.end}).replace(i.encode||a,function(e,n){return s=!0,l.startencode+t(n)+l.end}).replace(i.conditional||a,function(e,n,r){return n?r?"';}else if("+t(r)+"){out+='":"';}else{out+='":r?"';if("+t(r)+"){out+='":"';}out+='"}).replace(i.iterate||a,function(e,n,r,o){return n?(p+=1,d=o||"i"+p,n=t(n),"';var arr"+p+"="+n+";if(arr"+p+"){var "+r+","+d+"=-1,l"+p+"=arr"+p+".length-1;while("+d+"<l"+p+"){"+r+"=arr"+p+"["+d+"+=1];out+='"):"';} } out+='"}).replace(i.evaluate||a,function(e,n){return"';"+t(n)+"out+='"})+"';return out;").replace(/\n/g,"\\n").replace(/\t/g,"\\t").replace(/\r/g,"\\r").replace(/(\s|;|\}|^|\{)out\+='';/g,"$1").replace(/\+''/g,""),s&&(i.selfcontained||!n||n._encodeHTML||(n._encodeHTML=r.encodeHTMLSource(i.doNotSkipEncoded)),f="var encodeHTML = typeof _encodeHTML !== 'undefined' ? _encodeHTML : ("+r.encodeHTMLSource.toString()+"("+(i.doNotSkipEncoded||"")+"));"+f);try{return new Function(i.varname,f)}catch(m){throw"undefined"!=typeof console&&console.log("Could not create a template function: "+f),m}},r.compile=function(e,t){return r.template(e,null,t)}}();var debounceClassName=debounce(function(){document.documentElement.classList.add("loaded")},100);window.addEventListener("click",function(e){e.preventDefault(),e=e||window.event;var t=e.target||e.srcElement;if(t.href){document.documentElement.classList.remove("loaded"),document.documentElement.classList.add("loading");var n=t.href;fullReplace(n),history.pushState(null,null,t.href)}}),window.addEventListener("popstate",function(e){document.documentElement.classList.remove("loaded"),document.documentElement.classList.add("loading"),fullReplace(window.location.href)});